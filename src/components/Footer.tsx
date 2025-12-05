import logo from "@/assets/haloo-connect-logo.png";

const Footer = () => {
  return (
    <footer className="bg-secondary py-12">
      <div className="container">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <img src={logo} alt="Haloo Connect" className="h-8 w-auto brightness-0 invert" />
          </div>
          
          <div className="flex items-center gap-8 text-secondary-foreground/70 text-sm">
            <a href="https://www.haloocom.com" target="_blank" rel="noopener noreferrer" className="hover:text-secondary-foreground transition-colors">
              www.haloocom.com
            </a>
          </div>
          
          <p className="text-secondary-foreground/50 text-sm">
            © {new Date().getFullYear()} Haloocom. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
