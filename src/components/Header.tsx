import React, { useState } from "react";
import logoImg from "../assets/images/forge_logo_custom.png";
import { Menu, X, PhoneCall } from "lucide-react";

interface HeaderProps {
  onOpenContact?: () => void;
}

export default function Header({ onOpenContact }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    setIsMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleContactClick = () => {
    setIsMobileMenuOpen(false);
    if (onOpenContact) {
      onOpenContact();
    } else {
      const contactSection = document.getElementById("contact");
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-teal-500/20 bg-white/90 backdrop-blur-md shadow-xs">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Brand Logo */}
        <div className="flex items-center">
          <a href="#" className="flex items-center" aria-label="Forge Home">
            <img 
              src={logoImg} 
              alt="Forge Logo" 
              className="h-10 sm:h-12 w-auto max-w-[180px] sm:max-w-[240px] object-contain transition-transform hover:scale-105"
            />
          </a>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8">
          <button
            onClick={() => scrollToSection("services")}
            className="text-sm font-extrabold uppercase tracking-wider text-slate-800 hover:text-teal-700 transition-colors cursor-pointer"
          >
            Services
          </button>
          
          <button
            onClick={() => scrollToSection("industries")}
            className="text-sm font-extrabold uppercase tracking-wider text-slate-800 hover:text-teal-700 transition-colors cursor-pointer"
          >
            Industries
          </button>

          <button
            onClick={() => scrollToSection("tech-systems")}
            className="text-sm font-extrabold uppercase tracking-wider text-slate-800 hover:text-teal-700 transition-colors cursor-pointer"
          >
            Tech &amp; Systems
          </button>

          <button
            onClick={handleContactClick}
            className="bg-black hover:bg-teal-600 text-white font-extrabold px-6 py-2.5 rounded-xl text-xs uppercase tracking-widest shadow-md transition-all hover:scale-[1.03] active:scale-[0.98] cursor-pointer flex items-center gap-2"
          >
            <PhoneCall className="h-3.5 w-3.5" />
            Contact Us
          </button>
        </nav>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden items-center">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 rounded-xl border border-teal-300 bg-teal-50 text-slate-900 hover:bg-teal-100 transition-colors cursor-pointer"
            aria-label="Toggle Navigation Menu"
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

      </div>

      {/* Mobile Dropdown Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-b border-teal-500/20 bg-white/95 backdrop-blur-xl px-4 py-6 shadow-xl animate-fade-in">
          <div className="flex flex-col space-y-4">
            <button
              onClick={() => scrollToSection("services")}
              className="text-left py-2 px-3 rounded-lg text-base font-extrabold uppercase tracking-wider text-slate-900 hover:bg-teal-50 hover:text-teal-700 transition-colors"
            >
              Services
            </button>
            
            <button
              onClick={() => scrollToSection("industries")}
              className="text-left py-2 px-3 rounded-lg text-base font-extrabold uppercase tracking-wider text-slate-900 hover:bg-teal-50 hover:text-teal-700 transition-colors"
            >
              Industries
            </button>

            <button
              onClick={() => scrollToSection("tech-systems")}
              className="text-left py-2 px-3 rounded-lg text-base font-extrabold uppercase tracking-wider text-slate-900 hover:bg-teal-50 hover:text-teal-700 transition-colors"
            >
              Tech &amp; Systems
            </button>

            <button
              onClick={handleContactClick}
              className="w-full bg-black hover:bg-teal-600 text-white font-extrabold py-3 px-4 rounded-xl text-xs uppercase tracking-widest shadow-md transition-all flex items-center justify-center gap-2 mt-2 cursor-pointer"
            >
              <PhoneCall className="h-4 w-4" />
              Contact Us
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
