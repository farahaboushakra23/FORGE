import React from "react";
import logoImg from "../assets/images/logo.png";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-teal-500/20 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Brand identity */}
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/90 overflow-hidden shadow-sm border-2 border-teal-500/40 shrink-0">
            <img 
              src={logoImg} 
              alt="Forge Logo" 
              className="h-full w-full object-contain p-1"
            />
          </div>
          <div>
            <span className="font-forge-brand text-xl sm:text-2xl font-black text-black inline-flex items-center">
              <span>F</span>
              <span className="ml-[0.05em]">O</span>
              <span className="ml-[0.05em] -mr-[0.04em]">R</span>
              <span>G</span>
              <span className="ml-[0.05em]">E</span>
            </span>
          </div>
        </div>

      </div>
    </header>
  );
}
