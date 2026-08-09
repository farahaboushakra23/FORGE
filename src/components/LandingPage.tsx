import React, { useState } from "react";
import { 
  PhoneCall, 
  CalendarDays, 
  Headphones, 
  UserPlus, 
  Layers, 
  Briefcase, 
  CheckCircle2, 
  Zap, 
  Activity, 
  Cpu, 
  Lock, 
  TrendingUp, 
  ArrowRight, 
  FileText,
  BadgeAlert,
  Sliders,
  Award,
  Users,
  Terminal,
  VolumeX,
  Gauge,
  Sun,
  X
} from "lucide-react";
import { 
  SERVICES_DATA, 
  INDUSTRIES_DATA, 
  APPROACH_DATA, 
  TECHNOLOGY_DATA, 
  PROMISES, 
  WHY_CHOOSE_FORGE 
} from "../data";
import { ServiceDetail } from "../types";

// Premium generated image assets
const ambientBg = "/src/assets/images/ambient_office_bg_1782925752684.jpg";
const premiumWorkspace = "/src/assets/images/premium_workspace_1782674911953.jpg";

export default function LandingPage() {
  const [selectedService, setSelectedService] = useState<ServiceDetail | null>(null);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactMessage, setContactMessage] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Helper to resolve string icon name to lucide icon component
  const renderIcon = (name: string, className: string = "h-6 w-6") => {
    switch (name) {
      case "PhoneCall": return <PhoneCall className={className} />;
      case "CalendarDays": return <CalendarDays className={className} />;
      case "Headphones": return <Headphones className={className} />;
      case "UserPlus": return <UserPlus className={className} />;
      case "ShieldAlert": return <Layers className={className} />;
      case "Briefcase": return <Briefcase className={className} />;
      default: return <Briefcase className={className} />;
    }
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setIsContactOpen(false);
      setIsSubmitted(false);
      setContactName("");
      setContactEmail("");
      setContactMessage("");
    }, 2500);
  };

  return (
    <div className="space-y-24 pb-24">
      
      {/* 1. Immersive Luxury Hero Section */}
      <section className="relative overflow-hidden min-h-[90vh] flex flex-col justify-between py-16 px-4">
        {/* Immersive background image with luxury bright/luminous overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src={ambientBg} 
            alt="Forge Luxury Headquarters" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          {/* Luminous bright sunset/daylight glass-like gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#FAF8F5]/85 via-[#FAF8F5]/45 to-[#FAF8F5]/90" />
          <div className="absolute inset-0 bg-radial-[at_center] from-teal-200/20 via-transparent to-transparent opacity-90" />
        </div>

        {/* Top Spacer */}
        <div className="relative z-10 w-full" />

        {/* Central Hero Branding & Content */}
        <div className="relative z-10 mx-auto max-w-5xl flex flex-col items-center justify-center text-center my-auto py-8">
          
          {/* Main Massive Brand Header */}
          <h1 className="font-display text-5xl sm:text-7xl lg:text-8xl font-black tracking-tight text-black drop-shadow-xs">
            FORGE
          </h1>

          {/* Hero Statement */}
          <div className="mt-6 max-w-3xl space-y-3">
            <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-black tracking-tight leading-snug">
              Forge is a System Builder, A People Manager &amp; A Problem Solver
            </p>
          </div>

          {/* Action Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row items-center gap-4 justify-center">
            <button
              onClick={() => setIsContactOpen(true)}
              className="w-full sm:w-auto bg-black hover:bg-teal-600 text-white font-display font-bold px-8 py-4 tracking-[0.15em] text-xs uppercase shadow-lg transition-all hover:scale-[1.03] active:scale-[0.97] cursor-pointer flex items-center justify-center gap-2 rounded-xl"
            >
              Inquire Now
              <ArrowRight className="h-4 w-4 stroke-[2.5]" />
            </button>
            <button 
              onClick={() => setIsContactOpen(true)}
              className="w-full sm:w-auto bg-white/90 hover:bg-white text-black border-2 border-teal-400 font-display font-bold px-8 py-4 tracking-[0.15em] text-xs uppercase shadow-md transition-all hover:scale-[1.03] active:scale-[0.97] cursor-pointer rounded-xl backdrop-blur-md"
            >
              Consult Our Experts
            </button>
          </div>

          {/* Hero Feature Highlights Row - Enriching the hero section so it feels complete & dynamic */}
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-4xl">
            <div className="bg-gradient-to-br from-white via-teal-50/70 to-teal-100/60 backdrop-blur-md border-2 border-teal-400 rounded-2xl p-4 text-center shadow-md hover:border-teal-500 hover:shadow-lg transition-all">
              <span className="block text-xs font-bold uppercase tracking-wider text-teal-700">01 / Systems</span>
              <p className="text-xs font-black text-black mt-1">End-to-End Operational Architecture</p>
            </div>
            <div className="bg-gradient-to-br from-white via-teal-50/70 to-teal-100/60 backdrop-blur-md border-2 border-teal-400 rounded-2xl p-4 text-center shadow-md hover:border-teal-500 hover:shadow-lg transition-all">
              <span className="block text-xs font-bold uppercase tracking-wider text-teal-700">02 / People</span>
              <p className="text-xs font-black text-black mt-1">Global Talent & Management Pipelines</p>
            </div>
            <div className="bg-gradient-to-br from-white via-teal-50/70 to-teal-100/60 backdrop-blur-md border-2 border-teal-400 rounded-2xl p-4 text-center shadow-md hover:border-teal-500 hover:shadow-lg transition-all">
              <span className="block text-xs font-bold uppercase tracking-wider text-teal-700">03 / Solutions</span>
              <p className="text-xs font-black text-black mt-1">Custom Business Process Outsourcing</p>
            </div>
          </div>

        </div>


      </section>

      {/* Promises floating banner directly below Hero */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 -mt-16 relative z-20">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3 max-w-5xl mx-auto">
          {PROMISES.map((promise, idx) => {
            const colors = [
              { bg: "bg-gradient-to-br from-white via-teal-50/70 to-teal-100/60 backdrop-blur-md", border: "border-2 border-teal-400 shadow-lg", text: "text-teal-600", count: "01" },
              { bg: "bg-gradient-to-br from-white via-teal-50/70 to-teal-100/60 backdrop-blur-md", border: "border-2 border-teal-400 shadow-lg", text: "text-teal-600", count: "02" },
              { bg: "bg-gradient-to-br from-white via-teal-50/70 to-teal-100/60 backdrop-blur-md", border: "border-2 border-teal-400 shadow-lg", text: "text-teal-600", count: "03" }
            ][idx % 3];
            
            return (
              <div 
                key={idx}
                className={`relative overflow-hidden rounded-2xl border ${colors.border} ${colors.bg} p-6 text-left shadow-xl transition-all hover:-translate-y-1`}
              >
                <div className="flex items-center justify-between mb-4">
                  <span className={`text-2xl font-black font-display opacity-85 ${colors.text}`}>
                    {colors.count}
                  </span>
                  <CheckCircle2 className={`h-5 w-5 ${colors.text}`} />
                </div>
                <p className="text-sm font-black text-black leading-relaxed">
                  {promise.text}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* 2. Our Mission & Corporate Ambience Section */}
      <section className="bg-white/40 backdrop-blur-md py-20 border-y border-teal-500/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left: Beautiful Typography of Our Mission */}
            <div className="lg:col-span-6 space-y-6">
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-teal-600">Global Infrastructure</span>
                <h2 className="font-display text-3xl font-black tracking-tight text-black sm:text-4xl">
                  Our Mission
                </h2>
                <div className="h-1 w-12 bg-teal-400 rounded-full" />
              </div>
              
              <div className="text-black text-sm sm:text-base leading-relaxed space-y-4 font-semibold">
                <p>
                  At <span className="font-black text-black">Forge</span>, we are dedicated to empowering businesses across the globe through our specialized Business Process Outsourcing (BPO) services.
                </p>
                <p>
                  Our expertise assists partners in scaling their operations, expanding their teams, and enhancing their sales funnels by providing highly skilled professionals with industry-specific backgrounds.
                </p>
                <p className="text-black font-bold italic bg-teal-50/20 border-l-2 border-teal-400 p-3 rounded-r-xl">
                  Our talented workforce enables seamless integration with businesses in any sector, ensuring tailored solutions that drive success.
                </p>
              </div>
            </div>

            {/* Right: Space for Images (Our High-End Offices & Ambience) */}
            <div className="lg:col-span-6">
              <div className="relative group">
                {/* Visual shadow glow */}
                <div className="absolute -inset-1.5 bg-gradient-to-r from-teal-500/15 to-teal-600/15 rounded-3xl blur-lg opacity-75 group-hover:opacity-100 transition duration-1000" />
                
                {/* Main Image Frame */}
                <div className="relative overflow-hidden rounded-2xl border-2 border-teal-400 bg-white p-2 shadow-xl">
                  <img 
                    src={premiumWorkspace} 
                    alt="Forge Premium Office Ambience" 
                    className="w-full h-auto rounded-xl object-cover aspect-[4/3] transition-transform duration-700 group-hover:scale-[1.01]"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-md p-3.5 rounded-lg border border-teal-400 text-black flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-bold tracking-widest uppercase text-teal-600">Ambience Showcase</span>
                      <p className="text-xs font-bold text-black">Forge Operations Hub & Tech Suite</p>
                    </div>
                    <span className="text-[10px] font-mono text-teal-600 bg-teal-50 px-2 py-0.5 rounded">Active</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. Our Services Interactive Section */}
      <section id="services" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 scroll-mt-24">
        <div className="text-center">
          <h2 className="mt-2 font-display text-3xl font-black tracking-tight text-black sm:text-4xl">
            Our Services
          </h2>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES_DATA.map((service, idx) => {
            const backgroundColors = "bg-gradient-to-br from-white via-teal-50/70 to-teal-100/60 border-2 border-teal-400";
            const iconColors = "text-teal-600";

            return (
              <div
                key={idx}
                className={`group rounded-2xl border p-6 shadow-xs transition-all duration-300 hover:shadow-md ${backgroundColors}`}
              >
                <div className="flex items-center gap-4">
                  <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white border border-teal-400 shadow-xs ${iconColors}`}>
                    {renderIcon(service.iconName, "h-5 w-5 stroke-[2.2]")}
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-black group-hover:text-teal-600 transition-colors">
                      {service.title}
                    </h3>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. Industries We Serve Section */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <span className="text-xs font-bold uppercase tracking-widest text-teal-600">Sectors & Adaptations</span>
          <h2 className="mt-2 font-display text-3xl font-black tracking-tight text-black sm:text-4xl">
            Industries We Serve
          </h2>
          <p className="mt-3 text-black max-w-2xl mx-auto text-sm sm:text-md font-semibold">
            Seamless cross-sector integration. Our workforce holds industry-specific credentials and deep pipeline literacy.
          </p>
        </div>

        {/* Bento grid style with turquoise frame and black text */}
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {INDUSTRIES_DATA.map((ind, idx) => (
            <div
              key={idx}
              className="rounded-2xl border-2 border-teal-400 p-8 shadow-xs hover:shadow-md transition-all duration-300 flex items-center justify-center text-center bg-gradient-to-br from-white via-teal-50/70 to-teal-100/60"
            >
              <h3 className="text-base font-bold tracking-wider uppercase text-black">
                {ind.name}
              </h3>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Our Approach (Process) & Systems */}
      <section className="bg-white/40 backdrop-blur-md py-20 border-y border-teal-500/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
            
            {/* Our Approach (PDF content with beautiful turquoise/black design) */}
            <div className="space-y-8">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-teal-600">Operational Philosophy</span>
                <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-black">
                  Our Approach
                </h2>
                <p className="mt-3 text-sm text-black font-semibold">
                  We match people, technology, and robust management to deliver outcomes that shape the future.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                {APPROACH_DATA.map((approach, idx) => {
                  const colors = "bg-gradient-to-br from-white via-teal-50/70 to-teal-100/60 border-2 border-teal-400 text-black";
                  return (
                    <div key={idx} className={`rounded-2xl border p-5 ${colors}`}>
                      <h3 className="font-display font-bold text-black mb-2">
                        {approach.title}
                      </h3>
                      {approach.description && (
                        <p className="text-xs text-black leading-relaxed font-bold">
                          {approach.description}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Technology & Systems (PDF items) */}
            <div className="rounded-3xl border-2 border-teal-400 bg-gradient-to-br from-white via-teal-50/70 to-teal-100/60 backdrop-blur-md p-6 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-teal-50 text-teal-600 border border-teal-400">
                    <Cpu className="h-4 w-4" />
                  </div>
                  <h3 className="font-display text-lg font-bold text-black">
                    Technology & Systems
                  </h3>
                </div>

                <div className="space-y-4 mt-4">
                  {TECHNOLOGY_DATA.map((tech, idx) => {
                    const icons = [
                      <Sliders className="h-4 w-4" />,
                      <Activity className="h-4 w-4" />,
                      <VolumeX className="h-4 w-4" />,
                      <Lock className="h-4 w-4" />,
                      <Gauge className="h-4 w-4" />
                    ];
                    return (
                      <div key={idx} className="flex gap-3 items-start">
                        <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-teal-55 text-teal-600">
                          {icons[idx % icons.length]}
                        </div>
                        <div>
                          <h4 className="text-xs font-bold text-black">
                            {tech.system}
                          </h4>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 6. Why Choose Forge Table/Grid */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <span className="text-xs font-bold uppercase tracking-widest text-teal-600">Market Differentiation</span>
          <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-black sm:text-4xl">
            Why Choose Forge?
          </h2>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {WHY_CHOOSE_FORGE.map((why, idx) => {
            const backgroundColors = "bg-gradient-to-br from-white via-teal-50/70 to-teal-100/60 border-2 border-teal-400 text-black";
            
            return (
              <div
                key={idx}
                className={`rounded-2xl border p-5 shadow-2xs flex flex-col justify-between ${backgroundColors}`}
              >
                <div>
                  <Award className="h-5 w-5 mb-4 text-teal-600 opacity-85" />
                  <h3 className="font-display font-bold text-black text-sm">
                    {why.title}
                  </h3>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 7. Centered Motto Focus Panel */}
      <section className="mx-auto max-w-4xl px-4 text-center">
        <div className="rounded-3xl bg-gradient-to-br from-white via-teal-50/70 to-teal-100/60 p-8 sm:p-12 border-2 border-teal-400 shadow-xl relative">
          <blockquote className="font-display text-xl sm:text-3xl font-black italic tracking-tight text-black leading-relaxed">
            "Your Vision, Our Expertise; Together we Forge"
          </blockquote>
          <div className="mt-6 flex justify-center gap-1.5">
            <span className="h-1.5 w-6 rounded-full bg-teal-400" />
            <span className="h-1.5 w-1.5 rounded-full bg-black" />
            <span className="h-1.5 w-1.5 rounded-full bg-teal-400" />
          </div>
        </div>
      </section>

      {/* Luxury Contact / Inquiry Modal Overlay */}
      {isContactOpen && (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-4 bg-slate-950/40 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-lg overflow-hidden rounded-3xl border-2 border-teal-400 bg-gradient-to-br from-white via-teal-50/90 to-teal-100/80 backdrop-blur-xl p-8 shadow-2xl animate-scale-up">
            
            {/* Background decorative glow */}
            <div className="absolute -top-12 -left-12 h-32 w-32 rounded-full bg-teal-200/25 blur-2xl" />
            <div className="absolute -bottom-12 -right-12 h-32 w-32 rounded-full bg-teal-300/15 blur-2xl" />

            <button 
              onClick={() => setIsContactOpen(false)}
              className="absolute top-5 right-5 text-slate-400 hover:text-black transition-colors"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="relative text-center space-y-2 mb-6">
              <span className="text-[10px] font-bold uppercase tracking-widest text-teal-600">
                Forge Luxury BPO Solutions
              </span>
              <h3 className="font-display text-2xl font-black text-black">
                Request a Strategic Consultation
              </h3>
              <p className="text-xs text-slate-500 font-semibold max-w-md mx-auto">
                Fill in your company details below and our lead outsourcing strategist will reach out within 2 business hours.
              </p>
            </div>

            {isSubmitted ? (
              <div className="py-12 text-center space-y-4 animate-scale-up">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-teal-50 text-teal-600 border border-teal-300">
                  <CheckCircle2 className="h-8 w-8 stroke-[1.5]" />
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-black text-black">Inquiry Submitted Successfully</p>
                  <p className="text-xs text-slate-500 font-semibold">Thank you. Our luxury specialists are preparing your brief.</p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleContactSubmit} className="relative space-y-4">
                <div>
                  <label className="block text-[10px] font-bold text-black uppercase tracking-wider mb-1">
                    Your Full Name / Company Rep
                  </label>
                  <input
                    type="text"
                    required
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    className="w-full rounded-xl border border-teal-300 bg-white/50 px-3 py-2.5 text-xs font-semibold text-black focus:border-teal-500 focus:outline-hidden focus:ring-3 focus:ring-teal-50 transition-all"
                    placeholder="Farah (Client)"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-black uppercase tracking-wider mb-1">
                    Professional Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                    className="w-full rounded-xl border border-teal-300 bg-white/50 px-3 py-2.5 text-xs font-semibold text-black focus:border-teal-500 focus:outline-hidden focus:ring-3 focus:ring-teal-50 transition-all"
                    placeholder="client@luxuryfirm.com"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-black uppercase tracking-wider mb-1">
                    Consultation Brief / Requirements
                  </label>
                  <textarea
                    required
                    rows={3}
                    value={contactMessage}
                    onChange={(e) => setContactMessage(e.target.value)}
                    className="w-full rounded-xl border border-teal-300 bg-white/50 px-3 py-2.5 text-xs font-semibold text-black focus:border-teal-500 focus:outline-hidden focus:ring-3 focus:ring-teal-50 transition-all"
                    placeholder="Briefly describe your team scaling needs, industry sector, or campaign scope..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-black hover:bg-teal-600 text-white font-display font-bold py-3.5 px-6 rounded-xl tracking-widest text-xs uppercase shadow-md transition-all hover:scale-[1.01] active:scale-[0.99] cursor-pointer mt-2"
                >
                  Submit Brief
                </button>
              </form>
            )}

          </div>
        </div>
      )}

    </div>
  );
}
