"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FileText, Download, Plus, Trash2, Save, User as UserIcon, GraduationCap, Briefcase, Cpu, ArrowRight, Shield, Zap, X } from "lucide-react";

interface PersonalInfo {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  linkedin: string;
  website: string;
}

interface Education {
  id: string;
  institution: string;
  degree: string;
  startDate: string;
  endDate: string;
  description: string;
}

interface Experience {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  description: string;
}

interface Skill {
  id: string;
  name: string;
  level: number; // 1-5
}

export default function ResumeBuilderPage() {
  const router = useRouter();
  
  // Personal Info State
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo>({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    linkedin: "",
    website: ""
  });

  // Education State
  const [education, setEducation] = useState<Education[]>([
    {
      id: "1",
      institution: "",
      degree: "",
      startDate: "",
      endDate: "",
      description: ""
    }
  ]);

  // Experience State
  const [experience, setExperience] = useState<Experience[]>([
    {
      id: "1",
      company: "",
      position: "",
      startDate: "",
      endDate: "",
      description: ""
    }
  ]);

  // Skills State
  const [skills, setSkills] = useState<Skill[]>([
    { id: "1", name: "", level: 3 }
  ]);

  // Handlers
  const handlePersonalInfoChange = (field: keyof PersonalInfo, value: string) => {
    setPersonalInfo(prev => ({ ...prev, [field]: value }));
  };

  const handleEducationChange = (id: string, field: keyof Education, value: string) => {
    setEducation(prev => prev.map(edu => edu.id === id ? { ...edu, [field]: value } : edu));
  };

  const addEducation = () => {
    setEducation(prev => [...prev, { id: Date.now().toString(), institution: "", degree: "", startDate: "", endDate: "", description: "" }]);
  };

  const removeEducation = (id: string) => {
    if (education.length > 1) setEducation(prev => prev.filter(edu => edu.id !== id));
  };

  const handleExperienceChange = (id: string, field: keyof Experience, value: string) => {
    setExperience(prev => prev.map(exp => exp.id === id ? { ...exp, [field]: value } : exp));
  };

  const addExperience = () => {
    setExperience(prev => [...prev, { id: Date.now().toString(), company: "", position: "", startDate: "", endDate: "", description: "" }]);
  };

  const removeExperience = (id: string) => {
    if (experience.length > 1) setExperience(prev => prev.filter(exp => exp.id !== id));
  };

  const handleSkillChange = (id: string, field: keyof Skill, value: string | number) => {
    setSkills(prev => prev.map(skill => skill.id === id ? { ...skill, [field]: value } : skill));
  };

  const addSkill = () => {
    setSkills(prev => [...prev, { id: Date.now().toString(), name: "", level: 3 }]);
  };

  const removeSkill = (id: string) => {
    if (skills.length > 1) setSkills(prev => prev.filter(skill => skill.id !== id));
  };

  const saveResume = () => {
    const resumeData = { personalInfo, education, experience, skills };
    localStorage.setItem("doubleDownResume", JSON.stringify(resumeData));
    alert("Dossier saved to encrypted storage.");
  };

  const loadResume = () => {
    const savedResume = localStorage.getItem("doubleDownResume");
    if (savedResume) {
      const resumeData = JSON.parse(savedResume);
      setPersonalInfo(resumeData.personalInfo);
      setEducation(resumeData.education);
      setExperience(resumeData.experience);
      setSkills(resumeData.skills);
      alert("Dossier decrypted and loaded.");
    } else {
      alert("No active dossier found.");
    }
  };

  const exportAsJSON = () => {
    const resumeData = { personalInfo, education, experience, skills };
    const dataStr = JSON.stringify(resumeData, null, 2);
    const dataUri = `data:application/json;charset=utf-8,${encodeURIComponent(dataStr)}`;
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', 'doubledown-dossier.json');
    linkElement.click();
  };

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8">
        <div>
          <h1 className="text-3xl font-black tracking-tight mb-2 uppercase flex items-center gap-3">
            DOSSIER <span className="text-primary italic">FORGE</span>
            <FileText className="text-primary animate-pulse" />
          </h1>
          <p className="text-muted-foreground font-medium italic">Crafting absolute proof of your execution capabilities.</p>
        </div>
        
        <div className="flex flex-wrap gap-4">
          <button onClick={loadResume} className="px-6 py-3 glass border-white/10 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-white/5 transition-all flex items-center gap-2">
            <Shield className="w-4 h-4 text-primary" /> Decrypt
          </button>
          <button onClick={saveResume} className="px-6 py-3 bg-white/5 border border-white/10 rounded-2xl font-black text-xs uppercase tracking-widest hover:border-primary/50 transition-all flex items-center gap-2">
            <Save className="w-4 h-4 text-primary" /> Secure
          </button>
          <button onClick={exportAsJSON} className="px-8 py-4 bg-primary text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-xl glow-primary hover:scale-105 transition-all flex items-center gap-2">
            <Download className="w-4 h-4" /> Export Intel
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-10">
        {/* Input Forge */}
        <div className="space-y-8">
          {/* Identity */}
          <section className="glass p-8 md:p-10 rounded-[2.5rem] border-white/5 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-5">
               <UserIcon size={100} />
            </div>
            <h2 className="text-xl font-black text-primary mb-8 uppercase tracking-widest flex items-center gap-3">
              <span className="w-8 h-1 bg-primary rounded-full" />
              Primary Identity
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
              {[
                { label: "Full Designation", field: "fullName", placeholder: "e.g., John Constantine" },
                { label: "Comms Link (Email)", field: "email", placeholder: "tactical@comms.io" },
                { label: "Signal (Phone)", field: "phone", placeholder: "+1 (800) DOUBLE-DOWN" },
                { label: "Base of Ops", field: "address", placeholder: "San Francisco, CA" },
                { label: "Network Node (LinkedIn)", field: "linkedin", placeholder: "linkedin.com/in/node" },
                { label: "Bio-Link (Website)", field: "website", placeholder: "https://dossier.engine" }
              ].map((input) => (
                <div key={input.field} className="space-y-2">
                  <label className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.15em] pl-1">{input.label}</label>
                  <input
                    type="text"
                    value={(personalInfo as any)[input.field]}
                    onChange={(e) => handlePersonalInfoChange(input.field as any, e.target.value)}
                    className="w-full bg-black/40 border border-white/10 p-4 rounded-xl focus:ring-1 focus:ring-primary focus:outline-none font-bold text-sm placeholder:text-muted-foreground/20"
                    placeholder={input.placeholder}
                  />
                </div>
              ))}
            </div>
          </section>

          {/* Education Engine */}
          <section className="glass p-8 md:p-10 rounded-[2.5rem] border-white/5 relative">
            <div className="flex justify-between items-center mb-10">
              <h2 className="text-xl font-black text-primary uppercase tracking-widest flex items-center gap-3">
                <span className="w-8 h-1 bg-primary rounded-full" />
                Training Modules
              </h2>
              <button onClick={addEducation} className="p-3 bg-primary/10 text-primary rounded-xl hover:bg-primary hover:text-white transition-all">
                <Plus className="w-5 h-5" />
              </button>
            </div>
            
            <div className="space-y-8">
              {education.map((edu) => (
                <div key={edu.id} className="p-6 md:p-8 rounded-3xl bg-white/5 border border-white/10 relative group hover:border-primary/30 transition-all">
                  {education.length > 1 && (
                    <button onClick={() => removeEducation(edu.id)} className="absolute -top-3 -right-3 p-2 bg-red-500 rounded-full text-white shadow-lg hover:scale-110 transition-all">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2 md:col-span-2">
                      <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest pl-1">Institution</label>
                      <input
                        value={edu.institution}
                        onChange={(e) => handleEducationChange(edu.id, "institution", e.target.value)}
                        className="w-full bg-black/20 border border-white/5 p-4 rounded-xl focus:ring-1 focus:ring-primary focus:outline-none font-bold"
                        placeholder="Elite University"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest pl-1">Specialization</label>
                      <input
                        value={edu.degree}
                        onChange={(e) => handleEducationChange(edu.id, "degree", e.target.value)}
                        className="w-full bg-black/20 border border-white/5 p-4 rounded-xl focus:ring-1 focus:ring-primary focus:outline-none font-bold"
                        placeholder="Master of Applied Execution"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                       <div className="space-y-2">
                          <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest pl-1">Initiation</label>
                          <input type="month" value={edu.startDate} onChange={(e) => handleEducationChange(edu.id, "startDate", e.target.value)} className="w-full bg-black/20 border border-white/5 p-4 rounded-xl font-bold text-xs" />
                       </div>
                       <div className="space-y-2">
                          <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest pl-1">Termination</label>
                          <input type="month" value={edu.endDate} onChange={(e) => handleEducationChange(edu.id, "endDate", e.target.value)} className="w-full bg-black/20 border border-white/5 p-4 rounded-xl font-bold text-xs" />
                       </div>
                    </div>
                    <div className="md:col-span-2 space-y-2">
                      <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest pl-1">Course Summary</label>
                      <textarea
                        value={edu.description}
                        onChange={(e) => handleEducationChange(edu.id, "description", e.target.value)}
                        className="w-full bg-black/20 border border-white/5 p-4 rounded-xl focus:ring-1 focus:ring-primary focus:outline-none font-medium text-sm h-24 resize-none"
                        placeholder="Key breakthroughs and honors..."
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Deployment Engine */}
          <section className="glass p-8 md:p-10 rounded-[2.5rem] border-white/5 relative">
            <div className="flex justify-between items-center mb-10">
              <h2 className="text-xl font-black text-primary uppercase tracking-widest flex items-center gap-3">
                <span className="w-8 h-1 bg-primary rounded-full" />
                Battle Deployments
              </h2>
              <button onClick={addExperience} className="p-3 bg-primary/10 text-primary rounded-xl hover:bg-primary hover:text-white transition-all">
                <Plus className="w-5 h-5" />
              </button>
            </div>
            
            <div className="space-y-8">
              {experience.map((exp) => (
                <div key={exp.id} className="p-6 md:p-8 rounded-3xl bg-white/5 border border-white/10 relative group hover:border-primary/30 transition-all">
                  {experience.length > 1 && (
                    <button onClick={() => removeExperience(exp.id)} className="absolute -top-3 -right-3 p-2 bg-red-500 rounded-full text-white shadow-lg hover:scale-110 transition-all">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest pl-1">Command Unit</label>
                      <input
                        value={exp.company}
                        onChange={(e) => handleExperienceChange(exp.id, "company", e.target.value)}
                        className="w-full bg-black/20 border border-white/5 p-4 rounded-xl focus:ring-1 focus:ring-primary focus:outline-none font-bold"
                        placeholder="Sector X"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest pl-1">Function</label>
                      <input
                        value={exp.position}
                        onChange={(e) => handleExperienceChange(exp.id, "position", e.target.value)}
                        className="w-full bg-black/20 border border-white/5 p-4 rounded-xl focus:ring-1 focus:ring-primary focus:outline-none font-bold"
                        placeholder="Lead Architect"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4 md:col-span-2">
                       <div className="space-y-2">
                          <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest pl-1">Deployment Start</label>
                          <input type="month" value={exp.startDate} onChange={(e) => handleExperienceChange(exp.id, "startDate", e.target.value)} className="w-full bg-black/20 border border-white/5 p-4 rounded-xl font-bold text-xs" />
                       </div>
                       <div className="space-y-2">
                          <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest pl-1">Deployment End</label>
                          <input type="month" value={exp.endDate} onChange={(e) => handleExperienceChange(exp.id, "endDate", e.target.value)} className="w-full bg-black/20 border border-white/5 p-4 rounded-xl font-bold text-xs" />
                       </div>
                    </div>
                    <div className="md:col-span-2 space-y-2">
                      <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest pl-1">Impact Summary</label>
                      <textarea
                        value={exp.description}
                        onChange={(e) => handleExperienceChange(exp.id, "description", e.target.value)}
                        className="w-full bg-black/20 border border-white/5 p-4 rounded-xl focus:ring-1 focus:ring-primary focus:outline-none font-medium text-sm h-24 resize-none"
                        placeholder="High-signal outcomes..."
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Arsenal */}
          <section className="glass p-8 md:p-10 rounded-[2.5rem] border-white/5">
            <div className="flex justify-between items-center mb-10">
              <h2 className="text-xl font-black text-primary uppercase tracking-widest flex items-center gap-3">
                <span className="w-8 h-1 bg-primary rounded-full" />
                Technical Arsenal
              </h2>
              <button onClick={addSkill} className="p-3 bg-primary/10 text-primary rounded-xl hover:bg-primary hover:text-white transition-all">
                <Plus className="w-5 h-5" />
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {skills.map((skill) => (
                <div key={skill.id} className="group flex items-center gap-4 p-4 bg-white/5 border border-white/5 rounded-2xl hover:border-primary/30 transition-all relative">
                   <button onClick={() => removeSkill(skill.id)} className="absolute -top-2 -right-2 p-1 bg-red-500 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity">
                    <X size={10} />
                  </button>
                  <div className="flex-1">
                    <input
                      value={skill.name}
                      onChange={(e) => handleSkillChange(skill.id, "name", e.target.value)}
                      className="w-full bg-transparent border-none outline-none font-bold text-sm placeholder:text-muted-foreground/20"
                      placeholder="e.g., Rust Execution"
                    />
                  </div>
                  <select
                    value={skill.level}
                    onChange={(e) => handleSkillChange(skill.id, "level", parseInt(e.target.value))}
                    className="bg-black/20 border border-white/10 rounded-lg px-2 py-1 text-[10px] font-black uppercase tracking-tighter outline-none"
                  >
                    {[1, 2, 3, 4, 5].map((l) => (
                      <option key={l} value={l} className="bg-slate-900">LVL {l}</option>
                    ))}
                  </select>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Tactical Preview */}
        <div className="relative">
          <div className="sticky top-10 space-y-6">
            <h2 className="text-xl font-black text-primary uppercase tracking-widest pl-2 mb-6 flex items-center gap-3">
              <span className="w-8 h-1 bg-primary rounded-full" />
              Real-time Rendering
            </h2>
            
            <div className="glass p-10 md:p-16 rounded-[3rem] border-white/5 shadow-2xl min-h-[1000px] relative overflow-hidden flex flex-col group">
               {/* Aesthetic overlays */}
               <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
               <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/5 rounded-full blur-[100px] pointer-events-none" />
               <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/20 to-transparent" />

               {/* Personal Info Preview */}
               <header className="mb-12 border-b border-white/5 pb-12 relative z-10">
                 <h1 className="text-5xl md:text-6xl font-black mb-6 tracking-tighter leading-none group-hover:text-primary transition-colors">
                   {personalInfo.fullName.toUpperCase() || "UNIDENTIFIED UNIT"}
                 </h1>
                 
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3 text-xs font-black uppercase tracking-widest text-muted-foreground/70">
                    {personalInfo.email && <div className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-primary" /> {personalInfo.email}</div>}
                    {personalInfo.phone && <div className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-primary" /> {personalInfo.phone}</div>}
                    {personalInfo.address && <div className="flex items-center gap-2 decoration-primary decoration-1 underline underline-offset-4">{personalInfo.address}</div>}
                    <div className="flex flex-wrap gap-4 mt-2">
                       {personalInfo.linkedin && <a href={`https://linkedin.com/in/${personalInfo.linkedin}`} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline italic">NET_NODE</a>}
                       {personalInfo.website && <a href={personalInfo.website.startsWith('http') ? personalInfo.website : `https://${personalInfo.website}`} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline italic">BIO_DATA</a>}
                    </div>
                 </div>
               </header>

               {/* Experience Render */}
               <div className="space-y-16 relative z-10 flex-1">
                  {/* Deployment History */}
                  <section>
                    <h2 className="text-[10px] font-black tracking-[0.3em] uppercase text-muted-foreground mb-8 border-l-2 border-primary pl-4">Deployments_</h2>
                    <div className="space-y-10">
                      {experience.map((exp, i) => (
                        (exp.company || exp.position) && (
                          <div key={i} className="relative pl-8 before:absolute before:left-0 before:top-2 before:w-2 before:h-2 before:bg-primary before:rounded-full after:absolute after:left-[3px] after:top-4 after:w-[2px] after:h-[calc(100%+2.5rem)] after:bg-white/5 last:after:hidden">
                            <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-2 mb-2">
                               <h3 className="text-xl font-black tracking-tight">{exp.position.toUpperCase()}</h3>
                               <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest bg-white/5 px-2 py-1 rounded-md">
                                 {exp.startDate || "init"} &mdash; {exp.endDate || "active"}
                               </span>
                            </div>
                            <h4 className="text-sm font-black text-primary uppercase tracking-widest mb-4">{exp.company}</h4>
                            <p className="text-sm text-muted-foreground font-medium leading-relaxed max-w-lg">
                               {exp.description || "Synthesizing operation protocols..."}
                            </p>
                          </div>
                        )
                      ))}
                    </div>
                  </section>

                  {/* Knowledge Base */}
                  <section>
                    <h2 className="text-[10px] font-black tracking-[0.3em] uppercase text-muted-foreground mb-8 border-l-2 border-primary pl-4">Neural_Training_</h2>
                    <div className="space-y-8">
                       {education.map((edu, i) => (
                          (edu.institution || edu.degree) && (
                            <div key={i} className="pl-6 border-l border-white/5">
                               <h3 className="text-lg font-black tracking-tight mb-1">{edu.degree.toUpperCase()}</h3>
                               <p className="text-sm font-bold text-muted-foreground mb-3">{edu.institution} | {edu.startDate?.split('-')[0]} - {edu.endDate?.split('-')[0] || "Present"}</p>
                               <p className="text-xs text-muted-foreground/60 font-medium italic">{edu.description}</p>
                            </div>
                          )
                       ))}
                    </div>
                  </section>

                  {/* Capabilities */}
                  <section>
                    <h2 className="text-[10px] font-black tracking-[0.3em] uppercase text-muted-foreground mb-8 border-l-2 border-primary pl-4">Core_Arsenal_</h2>
                    <div className="flex flex-wrap gap-4">
                      {skills.map((skill, i) => (
                        skill.name && (
                          <div key={i} className="px-5 py-3 glass border-white/10 rounded-2xl flex items-center gap-3 group/skill hover:border-primary/50 transition-all">
                             <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                             <span className="text-xs font-black uppercase tracking-widest">{skill.name}</span>
                             <div className="flex gap-0.5 ml-2">
                               {[...Array(5)].map((_, idx) => (
                                 <div key={idx} className={`w-1 h-3 rounded-full ${idx < skill.level ? 'bg-primary' : 'bg-white/10'}`} />
                               ))}
                             </div>
                          </div>
                        )
                      ))}
                    </div>
                  </section>
               </div>

               {/* Signature Footer */}
               <footer className="mt-20 pt-12 border-t border-white/5 flex justify-between items-center text-[10px] font-black tracking-widest text-muted-foreground/40 uppercase relative z-10">
                  <div>Ref: DD_DOSSIER_{new Date().getFullYear()}</div>
                  <div className="flex items-center gap-2"><Shield size={12} className="text-primary" /> Fully Verified Execution</div>
               </footer>

               {/* Empty State */}
               {!personalInfo.fullName && !education.some(e => e.institution) && !experience.some(e => e.company) && (
                 <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-10 z-20 pointer-events-none opacity-40">
                    <div className="w-24 h-24 bg-white/5 rounded-[2rem] flex items-center justify-center mb-8 border border-white/10">
                       <Cpu size={48} className="text-muted-foreground/20" />
                    </div>
                    <h3 className="text-2xl font-black mb-4 uppercase tracking-[0.2em]">Ready For Input</h3>
                    <p className="text-sm font-medium italic max-w-xs">Awaiting strategic intelligence for neural forge synchronization.</p>
                 </div>
               )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}