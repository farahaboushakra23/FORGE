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
import ambientBg from "../assets/images/landing_background_1080p.jpg";
import ourMissionImg from "../assets/images/our_mission_workspace_1786528733182.jpg";
import logoImg from "../assets/images/forge_logo_custom.png";

interface LandingPageProps {
  isContactOpen?: boolean;
  setIsContactOpen?: (open: boolean) => void;
}

export default function LandingPage({ 
  isContactOpen: controlledContactOpen, 
  setIsContactOpen: setControlledContactOpen 
}: LandingPageProps) {
  const [selectedService, setSelectedService] = useState<ServiceDetail | null>(null);
  const [internalContactOpen, setInternalContactOpen] = useState(false);
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactMessage, setContactMessage] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const isContactOpen = controlledContactOpen !== undefined ? controlledContactOpen : internalContactOpen;
  const setIsContactOpen = setControlledContactOpen || setInternalContactOpen;

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
      <section className="relative flex flex-col justify-between py-16 px-4">
        {/* Central Hero Branding & Content */}
        <div className="relative z-10 mx-auto max-w-5xl flex flex-col items-center justify-center text-center my-auto py-8">
          
          {/* Main Brand Logo */}
          <div className="my-4 flex items-center justify-center">
            <img 
              src={logoImg} 
              alt="Forge Logo" 
              className="h-20 sm:h-28 md:h-36 lg:h-40 w-auto max-w-full object-contain select-none transition-transform hover:scale-[1.02]"
            />
          </div>

          {/* Hero Statement */}
          <div className="mt-6 max-w-4xl space-y-3">
            <p className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-black tracking-tight leading-snug">
              Forge is a System Builder, A People Manager &amp; A Problem Solver
            </p>
          </div>

          {/* Action Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row items-center gap-4 justify-center">
            <button
              onClick={() => setIsContactOpen(true)}
              className="w-full sm:w-auto bg-black hover:bg-teal-600 text-white font-display font-black px-9 py-4.5 tracking-[0.15em] text-sm uppercase shadow-xl transition-all hover:scale-[1.03] active:scale-[0.97] cursor-pointer flex items-center justify-center gap-2 rounded-xl"
            >
              Inquire Now
              <ArrowRight className="h-5 w-5 stroke-[2.5]" />
            </button>
            <button 
              onClick={() => setIsContactOpen(true)}
              className="w-full sm:w-auto bg-white/95 hover:bg-white text-black border-2 border-teal-500 font-display font-black px-9 py-4.5 tracking-[0.15em] text-sm uppercase shadow-lg transition-all hover:scale-[1.03] active:scale-[0.97] cursor-pointer rounded-xl backdrop-blur-md"
            >
              Consult Our Experts
            </button>
          </div>

          {/* Promise Cards placed directly in Hero section replacing previous highlight boxes */}
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6 w-full max-w-5xl">
            {PROMISES.map((promise, idx) => {
              const colors = [
                { bg: "bg-gradient-to-br from-white/90 via-teal-50/90 to-teal-100/80 backdrop-blur-md", border: "border-2 border-teal-400 shadow-lg", text: "text-teal-700", count: "01" },
                { bg: "bg-gradient-to-br from-white/90 via-teal-50/90 to-teal-100/80 backdrop-blur-md", border: "border-2 border-teal-400 shadow-lg", text: "text-teal-700", count: "02" },
                { bg: "bg-gradient-to-br from-white/90 via-teal-50/90 to-teal-100/80 backdrop-blur-md", border: "border-2 border-teal-400 shadow-lg", text: "text-teal-700", count: "03" }
              ][idx % 3];
              
              return (
                <div 
                  key={idx}
                  className={`relative overflow-hidden rounded-2xl border ${colors.border} ${colors.bg} p-6 text-left shadow-xl transition-all hover:-translate-y-1`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className={`text-3xl font-black font-display ${colors.text}`}>
                      {colors.count}
                    </span>
                    <CheckCircle2 className={`h-6 w-6 ${colors.text}`} />
                  </div>
                  <p className="text-base sm:text-lg font-black text-black leading-relaxed">
                    {promise.text}
                  </p>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 2. Our Mission & Corporate Ambience Section */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left: Beautiful Typography of Our Mission */}
            <div className="lg:col-span-6 space-y-6">
              <div className="space-y-2">
                <span className="text-sm font-black uppercase tracking-[0.2em] text-teal-700">Global Infrastructure</span>
                <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-black">
                  Our Mission
                </h2>
                <div className="h-1.5 w-16 bg-teal-500 rounded-full" />
              </div>
              
              <div className="text-black text-base sm:text-lg lg:text-xl leading-relaxed space-y-4 font-bold">
                <p>
                  At <span className="font-black text-black underline decoration-teal-400 decoration-2">Forge</span>, we are dedicated to empowering businesses across the globe through our specialized Business Process Outsourcing (BPO) services.
                </p>
                <p>
                  Our expertise assists partners in scaling their operations, expanding their teams, and enhancing their sales funnels by providing highly skilled professionals with industry-specific backgrounds.
                </p>
                <p className="text-black font-extrabold italic bg-teal-50/50 border-l-4 border-teal-500 p-4 rounded-r-xl shadow-xs">
                  Our talented workforce enables seamless integration with businesses in any sector, ensuring tailored solutions that drive success.
                </p>
              </div>
            </div>

            {/* Right: Space for Images (Our High-End Offices & Ambience) */}
            <div className="lg:col-span-6">
              <div className="relative group">
                {/* Visual shadow glow */}
                <div className="absolute -inset-1.5 bg-gradient-to-r from-teal-500/20 to-teal-600/20 rounded-3xl blur-lg opacity-75 group-hover:opacity-100 transition duration-1000" />
                
                {/* Main Image Frame */}
                <div className="relative overflow-hidden rounded-2xl border-2 border-teal-400 bg-white p-2 shadow-xl">
                  <img 
                    src={ourMissionImg} 
                    alt="Forge Premium Office Ambience" 
                    className="w-full h-auto rounded-xl object-cover aspect-[4/3] transition-transform duration-700 group-hover:scale-[1.01]"
                  />
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. Our Services Interactive Section */}
      <section id="services" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 scroll-mt-24">
        <div className="text-center">
          <h2 className="mt-2 font-display text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-black">
            Our Services
          </h2>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES_DATA.map((service, idx) => {
            const backgroundColors = "bg-gradient-to-br from-white via-teal-50/80 to-teal-100/70 border-2 border-teal-400";
            const iconColors = "text-teal-700";

            return (
              <div
                key={idx}
                className={`group rounded-2xl border p-6 shadow-sm transition-all duration-300 hover:shadow-md ${backgroundColors}`}
              >
                <div className="flex items-center gap-4">
                  <div className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-white border-2 border-teal-400 shadow-xs ${iconColors}`}>
                    {renderIcon(service.iconName, "h-6 w-6 stroke-[2.5]")}
                  </div>
                  <div>
                    <h3 className="font-display font-black text-black text-lg sm:text-xl group-hover:text-teal-700 transition-colors">
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
      <section id="industries" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 scroll-mt-28">
        <div className="text-center">
          <span className="text-sm font-black uppercase tracking-widest text-teal-700">Sectors & Adaptations</span>
          <h2 className="mt-2 font-display text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-black">
            Industries We Serve
          </h2>
          <p className="mt-4 text-black max-w-3xl mx-auto text-base sm:text-lg lg:text-xl font-bold">
            Seamless cross-sector integration. Our workforce holds industry-specific credentials and deep pipeline literacy.
          </p>
        </div>

        {/* Bento grid style with turquoise frame and black text */}
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {INDUSTRIES_DATA.map((ind, idx) => (
            <div
              key={idx}
              className="rounded-2xl border-2 border-teal-400 p-8 shadow-xs hover:shadow-md transition-all duration-300 flex items-center justify-center text-center bg-gradient-to-br from-white via-teal-50/80 to-teal-100/70"
            >
              <h3 className="text-lg sm:text-xl font-black tracking-wider uppercase text-black">
                {ind.name}
              </h3>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Our Approach (Process) & Systems */}
      <section id="tech-systems" className="py-16 scroll-mt-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
            
            {/* Our Approach (PDF content with beautiful turquoise/black design) */}
            <div className="space-y-8">
              <div>
                <span className="text-sm font-black uppercase tracking-widest text-teal-700">Operational Philosophy</span>
                <h2 className="mt-2 font-display text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-black">
                  Our Approach
                </h2>
                <p className="mt-3 text-base sm:text-lg text-black font-bold">
                  We match people, technology, and robust management to deliver outcomes that shape the future.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                {APPROACH_DATA.map((approach, idx) => {
                  const colors = "bg-gradient-to-br from-white via-teal-50/80 to-teal-100/70 border-2 border-teal-400 text-black";
                  return (
                    <div key={idx} className={`rounded-2xl border p-6 ${colors}`}>
                      <h3 className="font-display text-lg sm:text-xl font-black text-black mb-2">
                        {approach.title}
                      </h3>
                      {approach.description && (
                        <p className="text-sm sm:text-base text-black leading-relaxed font-bold">
                          {approach.description}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Technology & Systems (PDF items) */}
            <div className="rounded-3xl border-2 border-teal-400 bg-gradient-to-br from-white via-teal-50/80 to-teal-100/70 backdrop-blur-md p-8 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-100 text-teal-700 border border-teal-400">
                    <Cpu className="h-5 w-5 stroke-[2.2]" />
                  </div>
                  <h3 className="font-display text-2xl font-black text-black">
                    Technology & Systems
                  </h3>
                </div>

                <div className="space-y-5 mt-4">
                  {TECHNOLOGY_DATA.map((tech, idx) => {
                    const icons = [
                      <Sliders className="h-5 w-5" />,
                      <Activity className="h-5 w-5" />,
                      <VolumeX className="h-5 w-5" />,
                      <Lock className="h-5 w-5" />,
                      <Gauge className="h-5 w-5" />
                    ];
                    return (
                      <div key={idx} className="flex gap-4 items-start">
                        <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-teal-100 text-teal-700 font-bold border border-teal-300">
                          {icons[idx % icons.length]}
                        </div>
                        <div>
                          <h4 className="text-base sm:text-lg font-black text-black">
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
          <span className="text-sm font-black uppercase tracking-widest text-teal-700">Market Differentiation</span>
          <h2 className="mt-2 font-display text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-black">
            Why Choose Forge?
          </h2>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {WHY_CHOOSE_FORGE.map((why, idx) => {
            const backgroundColors = "bg-gradient-to-br from-white via-teal-50/80 to-teal-100/70 border-2 border-teal-400 text-black";
            
            return (
              <div
                key={idx}
                className={`rounded-2xl border p-6 shadow-xs flex flex-col justify-between ${backgroundColors}`}
              >
                <div>
                  <Award className="h-6 w-6 mb-4 text-teal-700 stroke-[2.2]" />
                  <h3 className="font-display font-black text-black text-base sm:text-lg">
                    {why.title}
                  </h3>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 7. Centered Motto Focus Panel */}
      <section className="mx-auto max-w-5xl px-4 text-center">
        <div className="rounded-3xl bg-gradient-to-br from-white via-teal-50/90 to-teal-100/80 p-10 sm:p-14 border-2 border-teal-400 shadow-xl relative backdrop-blur-md">
          <blockquote className="font-display text-2xl sm:text-4xl lg:text-5xl font-black italic tracking-tight text-black leading-snug space-y-2">
            <span className="block">"Your Vision, Our Expertise"</span>
            <span className="block">"Together We Forge"</span>
          </blockquote>
          <div className="mt-8 flex justify-center gap-2">
            <span className="h-2 w-8 rounded-full bg-teal-500" />
            <span className="h-2 w-2 rounded-full bg-black" />
            <span className="h-2 w-8 rounded-full bg-teal-500" />
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
              <h3 className="font-display text-2xl font-black text-black">
                Request a Strategic Consultation
              </h3>
              <p className="text-xs text-slate-600 font-semibold max-w-md mx-auto">
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
                  <p className="text-xs text-slate-600 font-semibold">Thank you. Our specialists are preparing your brief.</p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleContactSubmit} className="relative space-y-4">
                <div>
                  <label className="block text-[10px] font-bold text-black uppercase tracking-wider mb-1">
                    Your Full Name / Company Name
                  </label>
                  <input
                    type="text"
                    required
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    className="w-full rounded-xl border border-teal-300 bg-white/50 px-3 py-2.5 text-xs font-semibold text-black focus:border-teal-500 focus:outline-hidden focus:ring-3 focus:ring-teal-50 transition-all"
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
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-black hover:bg-teal-600 text-white font-display font-bold py-3.5 px-6 rounded-xl tracking-widest text-xs uppercase shadow-md transition-all hover:scale-[1.01] active:scale-[0.99] cursor-pointer mt-2"
                >
                  Submit Brief
                </button>

                {/* Direct email info */}
                <div className="pt-3 text-center border-t border-teal-200/60 mt-4">
                  <p className="text-xs text-slate-700 font-medium">
                    Or email us directly at{" "}
                    <a 
                      href="mailto:info@forge.com" 
                      className="font-bold text-teal-800 underline hover:text-black transition-colors"
                    >
                      info@forge.com
                    </a>
                  </p>
                </div>
              </form>
            )}

          </div>
        </div>
      )}

    </div>
  );
}
