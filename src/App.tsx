import React from "react";
import Header from "./components/Header";
import LandingPage from "./components/LandingPage";
import ambientBg from "./assets/images/office_blur_bg_1786528322990.jpg";

export default function App() {
  return (
    <div className="min-h-screen flex flex-col relative text-slate-900 font-sans">
      {/* Universal Ambient Background Image */}
      <div 
        className="fixed inset-0 -z-20 bg-cover bg-center bg-no-repeat pointer-events-none"
        style={{ backgroundImage: `url(${ambientBg})` }}
      />
      {/* Enhanced backdrop blur and contrast overlay so all text stands out crystal clear */}
      <div className="fixed inset-0 -z-10 bg-white/40 backdrop-blur-[16px] pointer-events-none" />

      {/* Dynamic Header */}
      <Header />

      {/* Main Interactive Workspaces */}
      <main className="flex-1 relative z-10">
        <LandingPage />
      </main>

      {/* Footer conforming to typography and aesthetic rules */}
      <footer className="border-t border-teal-500/20 bg-white/40 backdrop-blur-md py-8 mt-12 relative z-10">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8 space-y-2">
          <p className="font-display text-xs font-bold uppercase tracking-wider text-slate-600">
            Forge Outsourcing Solutions
          </p>
          <p className="text-xs text-slate-500 font-medium">
            © 2026 Forge Outsourcing Solutions. All rights are reserved 2026.
          </p>
        </div>
      </footer>
    </div>
  );
}
