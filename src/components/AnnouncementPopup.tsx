import { useState, useEffect } from 'react';
import { X, Sparkles } from 'lucide-react';

const AnnouncementPopup = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show popup after a short delay for better UX
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={handleClose}
      />
      
      {/* Popup Content */}
      <div className="relative bg-gradient-to-br from-primary/10 via-background to-primary/5 border border-primary/20 rounded-2xl p-8 max-w-md w-full shadow-2xl animate-in fade-in zoom-in duration-300">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
          aria-label="Close announcement"
        >
          <X className="h-5 w-5" />
        </button>
        
        {/* Content */}
        <div className="text-center">
          {/* Icon */}
          <div className="mx-auto w-16 h-16 bg-gradient-to-br from-primary to-primary/50 rounded-full flex items-center justify-center mb-6">
            <Sparkles className="h-8 w-8 text-white" />
          </div>
          
          {/* Title */}
          <h2 className="text-2xl font-bold font-display text-gold-gradient gold-glow-text mb-4">
            Exciting News!
          </h2>
          
          {/* Message */}
          <p className="text-muted-foreground font-body mb-6 leading-relaxed">
            Registrations for <span className="font-semibold text-foreground">CITE HACKATHON 2026</span> are now officially open!
          </p>
          <p className="text-muted-foreground font-body mb-8 text-sm">
            Don't miss this opportunity to showcase your innovation and compete with the best minds.
          </p>
          
          {/* CTA Button */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="https://forms.gle/L3JMW72HJaQfBiU58"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold inline-flex items-center justify-center px-6 py-3"
              onClick={handleClose}
            >
              Register Now
            </a>
            <button
              onClick={handleClose}
              className="px-6 py-3 border border-border rounded-lg hover:bg-muted/50 transition-colors font-body"
            >
              Maybe Later
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnnouncementPopup;
