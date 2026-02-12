import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import logo from "@/assets/haloo-connect-logo.png";
import { Phone, Mail, Instagram, Facebook } from "lucide-react";
const Footer = () => {
  const {
    t
  } = useTranslation();
  return <footer className="bg-secondary py-16">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Logo & Description */}
          <div className="lg:col-span-1">
            <img src={logo} alt="Haloo Connect" className="h-10 w-auto brightness-0 invert mb-4" />
            <p className="text-secondary-foreground/70 text-sm mb-4">
              {t("footer.description")}
            </p>

            {/* Social Media Icons */}
            <div className="flex items-center gap-4 mt-4">
              <a href="https://www.instagram.com/haloocomglobal_?igsh=MmlyaTgwNHZzZ3U=" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-secondary-foreground/70 hover:text-secondary-foreground transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="https://www.facebook.com/haloocom/" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-secondary-foreground/70 hover:text-secondary-foreground transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-secondary-foreground font-semibold mb-4">
              {t("footer.quickLinks")}
            </h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-secondary-foreground/70 text-sm hover:text-secondary-foreground transition-colors">
                  {t("footer.home")}
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-secondary-foreground/70 text-sm hover:text-secondary-foreground transition-colors">
                  {t("footer.aboutUs")}
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-secondary-foreground/70 text-sm hover:text-secondary-foreground transition-colors">
                  {t("footer.contactUs")}
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-secondary-foreground/70 text-sm hover:text-secondary-foreground transition-colors">
                  {t("footer.blog")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-secondary-foreground font-semibold mb-4">
              {t("footer.services")}
            </h4>
            <ul className="space-y-2">
              <li>
                <a href="https://haloocom.com/services/halooconnect/" target="_blank" rel="noopener noreferrer" className="text-secondary-foreground/70 text-sm hover:text-secondary-foreground transition-colors">
                  {t("footer.contactCenter")}
                </a>
              </li>
              <li>
                <a href="https://haloocom.com/hexa-ai/" target="_blank" rel="noopener noreferrer" className="text-secondary-foreground/70 text-sm hover:text-secondary-foreground transition-colors">
                  {t("footer.hexaAi")}
                </a>
              </li>
              <li>
                <a href="https://haloocom.com/services/halooxchange/" target="_blank" rel="noopener noreferrer" className="text-secondary-foreground/70 text-sm hover:text-secondary-foreground transition-colors">
                  {t("footer.unifiedComm")}
                </a>
              </li>
              <li>
                <a href="https://haloocom.com/connectplus-crm-dialer/" target="_blank" rel="noopener noreferrer" className="text-secondary-foreground/70 text-sm hover:text-secondary-foreground transition-colors">
                  {t("footer.crmDialer")}
                </a>
              </li>
            </ul>
          </div>

          {/* Our Presence */}
          <div>
            <h4 className="text-secondary-foreground font-semibold mb-4">
              {t("footer.ourPresence")}
            </h4>
            <ul className="space-y-2">
              <li><Link to="/" className="text-secondary-foreground/70 text-sm hover:text-secondary-foreground">{t("footer.singapore")}</Link></li>
              <li><Link to="/uae" className="text-secondary-foreground/70 text-sm hover:text-secondary-foreground">{t("footer.uae")}</Link></li>
              <li><Link to="/india" className="text-secondary-foreground/70 text-sm hover:text-secondary-foreground">{t("footer.india")}</Link></li>
              <li><Link to="/philippines" className="text-secondary-foreground/70 text-sm hover:text-secondary-foreground">Philippines</Link></li>
              <li><Link to="/kenya" className="text-secondary-foreground/70 text-sm hover:text-secondary-foreground">{t("footer.kenya")}</Link></li>
              <li><Link to="/nigeria" className="text-secondary-foreground/70 text-sm hover:text-secondary-foreground">{t("footer.nigeria")}</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-secondary-foreground font-semibold mb-4">
              {t("footer.contact")}
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-secondary-foreground/70 mt-0.5" />
                <div className="text-secondary-foreground/70 text-sm space-y-1">
                  <p>🇸🇬 +65 8376 5007</p>
                  <p>🇦🇪 +971 508293464</p>
                  <p>🇮🇳 +91 95133 91279</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-secondary-foreground/70 mt-0.5" />
                <a href="mailto:enquiry@haloocom.com" className="text-secondary-foreground/70 text-sm hover:text-secondary-foreground">
                  enquiry@haloocom.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-secondary-foreground/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-secondary-foreground/50 text-sm">
            © {new Date().getFullYear()} Haloocom. {t("footer.copyright")}.
          </p>
          <div className="flex items-center gap-6">
            <a href="https://haloocom.com/privacy-policy/" target="_blank" rel="noopener noreferrer" className="text-secondary-foreground/50 text-sm hover:text-secondary-foreground">
              {t("footer.privacyPolicy")}
            </a>
            <a href="https://haloocom.com/terms-and-conditions/" target="_blank" rel="noopener noreferrer" className="text-secondary-foreground/50 text-sm hover:text-secondary-foreground">
              {t("footer.terms")}
            </a>
          </div>
        </div>
      </div>
    </footer>;
};
export default Footer;