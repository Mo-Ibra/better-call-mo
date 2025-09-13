"use client";

const Footer = () => {
  function getCurrentYear() {
    return new Date().getFullYear();
  }

  return (
    <footer className="py-12 relative overflow-hidden text-muted-foreground text-center border-t border-white/10">
      
      {/* animated glow line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent animate-footer-glow" />

      <div className="container max-w-6xl px-4 mx-auto">
        <p className="mb-1">
          &copy; {getCurrentYear()} Better Call Mo. All rights reserved.
        </p>

        <div className="flex justify-center flex-wrap gap-[clamp(1.5rem,3vw,2rem)] mt-2">
          <a
            href="#"
            className="relative text-muted-foreground transition-colors duration-300 hover:text-primary active:text-primary"
          >
            Privacy Policy
          </a>

          <a
            href="#"
            className="relative text-muted-foreground transition-colors duration-300 hover:text-primary active:text-primary"
          >
            Terms of Service
          </a>

          <a
            href="mailto:jeremiah@example.com"
            className="relative text-muted-foreground transition-colors duration-300 hover:text-primary active:text-primary"
          >
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
