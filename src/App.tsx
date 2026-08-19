import React, { useState } from "react";
import Header from "./components/Header";
import LandingPage from "./components/LandingPage";
import { CUSTOM_BG_SRC } from "./assets/bgData";

export default function App() {
  const [isContactOpen, setIsContactOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col relative text-slate-900 font-sans">
      {/* New Ambient Background Image with light blur and clean scaling */}
      <div 
        className="fixed inset-0 -z-20 bg-cover bg-center bg-no-repeat pointer-events-none scale-105 filter blur-[3px]"
        style={{ backgroundImage: `url(${CUSTOM_BG_SRC})` }}
      />
      {/* Light clean overlay for contrast and legibility */}
      <div className="fixed inset-0 -z-10 bg-slate-100/40 backdrop-blur-[2px] pointer-events-none" />

      {/* Dynamic Header */}
      <Header onOpenContact={() => setIsContactOpen(true)} />

      {/* Main Interactive Workspaces */}
      <main className="flex-1 relative z-10">
        <LandingPage isContactOpen={isContactOpen} setIsContactOpen={setIsContactOpen} />
      </main>

      {/* Footer conforming to typography and aesthetic rules */}
      <footer className="border-t border-[#005b94]/20 bg-white/40 backdrop-blur-md py-8 mt-12 relative z-10">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8 space-y-2">
          <p className="font-display text-xs font-bold uppercase tracking-wider text-slate-700">
            Forge Outsourcing Solutions
          </p>
          <p className="text-xs text-slate-600 font-semibold">
            Inquiries:{" "}
            <a 
              href="mailto:info@forge.com" 
              className="text-[#005b94] hover:text-black font-bold underline transition-colors"
            >
              info@forge.com
            </a>
          </p>
          <p className="text-xs text-slate-500 font-medium">
            © 2026 Forge Outsourcing Solutions. All rights are reserved 2026.
          </p>
        </div>
      </footer>
    </div>
  );
}
