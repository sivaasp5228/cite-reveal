import { Mail, MapPin, PhoneCallIcon } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-border/50 py-12 px-4">
      <div className="max-w-6xl mx-auto grid sm:grid-cols-3 gap-8 text-sm font-body">
        <div>
          <h4 className="font-display font-bold text-accent text-lg mb-3">CITE Hackathon 2026</h4>
          <p className="text-muted-foreground leading-relaxed">
            Organised by the CENTER FOR INNOVATION AND TALENT EMPOWERMENT, KPRCAS.
          </p>
        </div>
        <div>
          <h4 className="font-display font-bold text-foreground mb-3">Contact</h4>
          <div className="space-y-2 text-muted-foreground">
            <p className="flex items-center gap-2"><Mail size={14} className="text-accent" /> cite@kprcas.ac.in</p>
            <p className="flex items-center gap-2"><MapPin size={14} className="text-accent" /> AF112, KPRCAS</p>
            <p className="flex items-center gap-2"><PhoneCallIcon size={14} className="text-accent" /> +91 9677400123</p>
          </div>
        </div>
        <div>
          <h4 className="font-display font-bold text-foreground mb-3">Follow Us</h4>
          <div className="flex gap-3">
            {["LinkedIn", "Instagram"].map((s) => (
              <a key={s} href="#" className="px-3 py-1.5 glass-card text-muted-foreground hover:text-accent transition-colors text-xs">
                {s}
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className="max-w-6xl mx-auto mt-8 pt-6 border-t border-border/30 text-center text-xs text-muted-foreground font-body">
        © 2026 CITE Hackathon. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
