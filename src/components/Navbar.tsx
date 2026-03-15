import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Problem", href: "#problem" },
  { label: "Guidelines", href: "#guidelines" },
  { label: "Timeline", href: "#timeline" },
  { label: "Coordinators", href: "#coordinators" },
  { label: "Gallery", href: "#gallery" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-black/80 backdrop-blur-xl border-b border-gray-800/30" : "bg-black"}`}>
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2">
          <img src="/spotlight.png" alt="Spotlight" className="h-14 w-auto" />
          <img src="/CITE LOGO.png" alt="CITE Hackathon 2026" className="h-8 w-auto" />
          <img src="/kprcas.png" alt="KPRCAS" className="h-16 w-auto" />
        </a>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((l) => (
            <a key={l.label} href={l.href} className="text-sm font-body text-muted-foreground hover:text-accent transition-colors">
              {l.label}
            </a>
          ))}
          <a href="#register" className="btn-gold !px-5 !py-2 text-sm">Register</a>
        </div>

        {/* Mobile toggle */}
        <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden text-foreground">
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-black/95 backdrop-blur-xl border-t border-gray-800/30 px-4 pb-6">
          <div className="flex items-center gap-2 mb-6">
            <img src="/CITE LOGO.png" alt="CITE Hackathon 2026" className="h-8 w-auto" />
            <img src="/spotlight.png" alt="Spotlight" className="h-8 w-auto" />
          </div>
          {navLinks.map((l) => (
            <a key={l.label} href={l.href} onClick={() => setMobileOpen(false)} className="block py-3 text-sm font-body text-muted-foreground hover:text-accent transition-colors border-b border-border/10">
              {l.label}
            </a>
          ))}
          <a href="#register" onClick={() => setMobileOpen(false)} className="btn-gold !py-2 text-sm mt-4 inline-block">Register</a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
