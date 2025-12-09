import { Link } from "react-router-dom";
import logo from "@/assets/haloo-connect-logo.png";
import { Phone, Mail, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-secondary py-16">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Logo & Description */}
          <div className="lg:col-span-1">
            <img src={logo} alt="Haloo Connect" className="h-10 w-auto brightness-0 invert mb-4" />
            <p className="text-secondary-foreground/70 text-sm mb-4">
              AI-powered telecom solutions for your business. From advanced Contact Center software to seamless Business Communication apps.
            </p>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="text-secondary-foreground font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-secondary-foreground/70 text-sm hover:text-secondary-foreground transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-secondary-foreground/70 text-sm hover:text-secondary-foreground transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-secondary-foreground/70 text-sm hover:text-secondary-foreground transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <a href="https://haloocom.com/blog/" target="_blank" rel="noopener noreferrer" className="text-secondary-foreground/70 text-sm hover:text-secondary-foreground transition-colors">
                  Blog
                </a>
              </li>
            </ul>
          </div>
          
          {/* Services */}
          <div>
            <h4 className="text-secondary-foreground font-semibold mb-4">Services</h4>
            <ul className="space-y-2">
              <li>
                <a href="https://haloocom.com/services/halooconnect/" target="_blank" rel="noopener noreferrer" className="text-secondary-foreground/70 text-sm hover:text-secondary-foreground transition-colors">
                  Contact Center
                </a>
              </li>
              <li>
                <a href="https://haloocom.com/hexa-ai/" target="_blank" rel="noopener noreferrer" className="text-secondary-foreground/70 text-sm hover:text-secondary-foreground transition-colors">
                  Hexa AI
                </a>
              </li>
              <li>
                <a href="https://haloocom.com/services/halooxchange/" target="_blank" rel="noopener noreferrer" className="text-secondary-foreground/70 text-sm hover:text-secondary-foreground transition-colors">
                  Unified Communications
                </a>
              </li>
              <li>
                <a href="https://haloocom.com/connectplus-crm-dialer/" target="_blank" rel="noopener noreferrer" className="text-secondary-foreground/70 text-sm hover:text-secondary-foreground transition-colors">
                  CRM Dialer
                </a>
              </li>
            </ul>
          </div>
          
          {/* Contact Info */}
          <div>
            <h4 className="text-secondary-foreground font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-secondary-foreground/70 mt-0.5" />
                <div className="text-secondary-foreground/70 text-sm">
                  <p>+91-9886620544</p>
                  <p>+91-9972732222</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-secondary-foreground/70 mt-0.5" />
                <a href="mailto:enquiry@haloocom.com" className="text-secondary-foreground/70 text-sm hover:text-secondary-foreground transition-colors">
                  enquiry@haloocom.com
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-secondary-foreground/70 mt-0.5" />
                <span className="text-secondary-foreground/70 text-sm">Bangalore, India</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-secondary-foreground/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-secondary-foreground/50 text-sm">
            © {new Date().getFullYear()} Haloocom. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a href="https://haloocom.com/privacy-policy/" target="_blank" rel="noopener noreferrer" className="text-secondary-foreground/50 text-sm hover:text-secondary-foreground transition-colors">
              Privacy Policy
            </a>
            <a href="https://haloocom.com/terms-and-conditions/" target="_blank" rel="noopener noreferrer" className="text-secondary-foreground/50 text-sm hover:text-secondary-foreground transition-colors">
              Terms & Conditions
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
