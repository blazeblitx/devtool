"use client";

import React, { useMemo, useState } from "react";
import { Calendar as RBCalendar, dateFnsLocalizer, Views, SlotInfo, Event as RBCEvent } from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import { startOfWeek } from "date-fns/startOfWeek";
import { getDay } from "date-fns/getDay";
import { add } from "date-fns/add";
import { isSameDay } from "date-fns/isSameDay";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Locale } from "date-fns/locale";
import { Plus, X, List, Trash2, Edit3, Clock } from "lucide-react";
import StarBorder from "@/components/StarBorder";

export interface CalendarEvent {
	id: string;
	title: string;
	start: Date;
	end: Date;
	allDay?: boolean;
}

const locales: Record<string, Locale> = {};
const localizer = dateFnsLocalizer({
	format,
	parse,
	startOfWeek: (date: Date) => startOfWeek(date, { weekStartsOn: 0 }), // Sunday start
	getDay,
	locales,
});

function uid(prefix = "") {
	return `${prefix}${Math.random().toString(36).slice(2, 9)}`;
}

function combineDateWithTime(date: Date, timeStr: string) {
	const [hh = "0", mm = "0"] = timeStr.split(":");
	const d = new Date(date);
	d.setHours(parseInt(hh, 10), parseInt(mm, 10), 0, 0);
	return d;
}

export default function CalendarView(): React.JSX.Element {
	// sample temporary events
	const [events, setEvents] = useState<CalendarEvent[]>(() => {
		const today = new Date();
		return [
			{
				id: "e1",
				title: "Read HTML5 guide",
				start: add(today, { days: 1, hours: 9 }),
				end: add(today, { days: 1, hours: 10 }),
			},
			{
				id: "e2",
				title: "Practice Flexbox",
				start: add(today, { days: 3, hours: 14 }),
				end: add(today, { days: 3, hours: 16 }),
			},
			{
				id: "e3",
				title: "JS closures exercises",
				start: add(today, { days: 5, hours: 18 }),
				end: add(today, { days: 5, hours: 19, minutes: 30 }),
			},
			{
				id: "e4",
				title: "Build React todo",
				start: add(today, { days: 7, hours: 11 }),
				end: add(today, { days: 7, hours: 14 }),
			},
			{
				id: "e5",
				title: "Write tests for utils",
				start: add(today, { days: -2, hours: 10 }),
				end: add(today, { days: -2, hours: 11, minutes: 30 }),
			},
		];
	});

	const [modalOpen, setModalOpen] = useState(false);
	const [selectedDate, setSelectedDate] = useState<Date | null>(null);

	const [titleInput, setTitleInput] = useState("");
	const [startTimeInput, setStartTimeInput] = useState<string>("09:00");
	const [endTimeInput, setEndTimeInput] = useState<string>("10:00");
	const [allDayInput, setAllDayInput] = useState(false);

	function handleSelectSlot(slotInfo: SlotInfo) {
		const { start, end } = slotInfo;
		setSelectedDate(start);
		setStartTimeInput(format(start, "HH:mm"));
		setEndTimeInput(format(end ?? add(start, { hours: 1 }), "HH:mm"));
		setAllDayInput(false);
		setTitleInput("");
		setModalOpen(true);
	}

	const eventsForSelectedDay = useMemo(() => {
		if (!selectedDate) return [];
		return events.filter((ev) => isSameDay(ev.start, selectedDate));
	}, [events, selectedDate]);

	function handleCreateEvent(e?: React.FormEvent) {
		if (e) e.preventDefault();
		if (!selectedDate) return;

		const start =
			allDayInput || !startTimeInput ? new Date(selectedDate) : combineDateWithTime(selectedDate, startTimeInput);
		const end =
			allDayInput || !endTimeInput
				? new Date(start.getTime() + 60 * 60 * 1000)
				: combineDateWithTime(selectedDate, endTimeInput);

		if (end <= start) {
			alert("End time must be after start time.");
			return;
		}

		const newEvent: CalendarEvent = {
			id: uid("evt_"),
			title: titleInput || "Untitled",
			start,
			end,
			allDay: allDayInput,
		};

		setEvents((prev) => [...prev, newEvent]);
		setTitleInput("");
		setModalOpen(false);
	}

	function handleDeleteEvent(id: string) {
		setEvents((prev) => prev.filter((ev) => ev.id !== id));
	}

	function handleSelectEvent(event: RBCEvent) {
		const ev = event as CalendarEvent;
		setSelectedDate(ev.start);
		setTitleInput(ev.title);
		setStartTimeInput(format(ev.start, "HH:mm"));
		setEndTimeInput(format(ev.end, "HH:mm"));
		setAllDayInput(Boolean(ev.allDay));
		setModalOpen(true);
	}

	const eventPropGetter = () => {
		return {
			className: "calendar-event-primary",
			style: {
				backgroundColor: "rgba(var(--primary-rgb), 0.2)",
				border: "1px solid rgba(var(--primary-rgb), 0.5)",
				color: "white",
				borderRadius: "8px",
				fontSize: "12px",
				fontWeight: "600",
			}
		};
	};

	return (
		<div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
			<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
				<div>
					<h1 className="text-3xl font-black tracking-tight mb-2 uppercase">
						Strategic <span className="text-primary italic">Timeline</span>
					</h1>
					<p className="text-muted-foreground font-medium">Map out your execution schedule and track every milestone.</p>
				</div>
				<div className="text-sm font-black text-muted-foreground uppercase tracking-widest flex items-center gap-2">
					<Clock size={16} className="text-primary" /> Synchronized
				</div>
			</div>

			<div className="glass p-4 md:p-8 rounded-[2.5rem] border-white/5 shadow-2xl h-[700px]">
				<RBCalendar
					localizer={localizer}
					events={events}
					startAccessor="start"
					endAccessor="end"
					selectable
					views={[Views.MONTH, Views.WEEK, Views.DAY, Views.AGENDA]}
					defaultView={Views.MONTH}
					onSelectSlot={handleSelectSlot}
					onSelectEvent={handleSelectEvent}
					popup
					eventPropGetter={eventPropGetter}
					style={{ height: "100%" }}
				/>
			</div>

			{/* Modal */}
			{modalOpen && selectedDate && (
				<div role="dialog" aria-modal="true" className="fixed inset-0 z-[100] flex items-center justify-center p-4 animate-in fade-in duration-300">
					{/* backdrop */}
					<div className="absolute inset-0 bg-black/60 backdrop-blur-md" onClick={() => setModalOpen(false)} />

					<div className="relative z-10 w-full max-w-4xl glass rounded-[3rem] border-white/10 shadow-2xl overflow-hidden flex flex-col md:flex-row max-h-[90vh]">
						{/* Left Pillar: Info & Events List */}
						<div className="w-full md:w-1/2 p-8 border-r border-white/5 bg-white/5 overflow-y-auto">
							<div className="flex justify-between items-start mb-8">
								<div>
									<h3 className="text-2xl font-black tracking-tight">{format(selectedDate, "MMMM do, yyyy")}</h3>
									<p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mt-1">Timeline Audit</p>
								</div>
								<button 
									onClick={() => setModalOpen(false)}
									className="p-2 rounded-full hover:bg-white/10 transition-colors md:hidden"
								>
									<X size={20} />
								</button>
							</div>

							<div className="space-y-6">
								<h4 className="text-sm font-black text-muted-foreground uppercase tracking-wider flex items-center gap-2">
									<List size={14} className="text-primary" /> Active Missions
								</h4>

								{eventsForSelectedDay.length === 0 ? (
									<div className="p-8 rounded-3xl bg-black/20 border border-white/5 text-center italic text-muted-foreground font-medium">
										No missions initialized for this slot.
									</div>
								) : (
									<div className="space-y-4">
										{eventsForSelectedDay
											.slice()
											.sort((a, b) => a.start.getTime() - b.start.getTime())
											.map((ev) => (
												<div key={ev.id} className="p-4 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-between group">
													<div>
														<div className="font-bold text-base">{ev.title}</div>
														<div className="text-xs text-muted-foreground font-bold mt-1">
															{ev.allDay ? "FULL CYCLE" : `${format(ev.start, "HH:mm")} — ${format(ev.end, "HH:mm")}`}
														</div>
													</div>

													<div className="flex items-center gap-2 scale-0 group-hover:scale-100 transition-all">
														<button
															onClick={() => handleDeleteEvent(ev.id)}
															className="p-2 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500 transition-all"
														>
															<Trash2 size={16} />
														</button>
													</div>
												</div>
											))}
									</div>
								)}
							</div>
						</div>

						{/* Right Pillar: Control Form */}
						<div className="w-full md:w-1/2 p-8 relative flex flex-col">
							<button 
								onClick={() => setModalOpen(false)}
								className="absolute top-6 right-6 p-2 rounded-full hover:bg-white/10 transition-colors hidden md:flex"
							>
								<X size={20} />
							</button>

							<h4 className="text-sm font-black text-muted-foreground uppercase tracking-wider mb-8 flex items-center gap-2">
								<Plus size={14} className="text-primary" /> Command Script
							</h4>

							<form onSubmit={handleCreateEvent} className="space-y-6 flex-1">
								<div className="space-y-2">
									<label className="text-xs font-black text-muted-foreground uppercase tracking-widest pl-1">Mission Identifier</label>
									<input
										value={titleInput}
										onChange={(e) => setTitleInput(e.target.value)}
										placeholder="e.g., Tactical Refactoring"
										className="w-full bg-black/40 border border-white/10 p-4 rounded-2xl focus:ring-2 focus:ring-primary focus:outline-none font-medium placeholder:text-muted-foreground/30"
									/>
								</div>

								<div className="flex items-center gap-3 glass p-4 rounded-2xl border-white/5">
									<input
										type="checkbox"
										id="all-day"
										checked={allDayInput}
										onChange={(e) => setAllDayInput(e.target.checked)}
										className="w-5 h-5 rounded-md accent-primary"
									/>
									<label htmlFor="all-day" className="text-sm font-bold cursor-pointer">Continuous Cycle (All Day)</label>
								</div>

								{!allDayInput && (
									<div className="grid grid-cols-2 gap-4">
										<div className="space-y-2">
											<label className="text-xs font-black text-muted-foreground uppercase tracking-widest pl-1">Initiation</label>
											<input
												type="time"
												value={startTimeInput}
												onChange={(e) => setStartTimeInput(e.target.value)}
												className="w-full bg-black/40 border border-white/10 p-4 rounded-2xl focus:ring-2 focus:ring-primary focus:outline-none font-bold"
											/>
										</div>

										<div className="space-y-2">
											<label className="text-xs font-black text-muted-foreground uppercase tracking-widest pl-1">Termination</label>
											<input
												type="time"
												value={endTimeInput}
												onChange={(e) => setEndTimeInput(e.target.value)}
												className="w-full bg-black/40 border border-white/10 p-4 rounded-2xl focus:ring-2 focus:ring-primary focus:outline-none font-bold"
											/>
										</div>
									</div>
								)}

								<div className="pt-4 mt-auto">
									<StarBorder
										color="var(--primary)"
										speed="2s"
										thickness={2}
										className="w-full hover:scale-[1.02] shadow-xl"
										onClick={handleCreateEvent}
									>
										<span className="flex items-center justify-center gap-3 font-black text-xl py-2 px-10 uppercase tracking-widest whitespace-nowrap">
											Commit Mission <Edit3 size={20} />
										</span>
									</StarBorder>
								</div>
							</form>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
