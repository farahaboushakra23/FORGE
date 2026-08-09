import React from "react";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-teal-500/20 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Brand identity */}
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/40 overflow-hidden shadow-xs border border-teal-500/30">
            <img 
              src="https://lh3.googleusercontent.com/d/1jvrl78YfNwVy7m-OLK3wopOkARSb_jVx" 
              alt="Forge Logo" 
              className="h-full w-full object-contain p-1"
              referrerPolicy="no-referrer"
            />
          </div>
          <div>
            <span className="font-display text-sm font-bold tracking-[0.2em] text-black sm:text-base block">
              FORGE
            </span>
          </div>
        </div>

      </div>
    </header>
  );
}
