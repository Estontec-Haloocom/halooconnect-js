"use client";

import Link from "next/link";
import { useTranslation } from "react-i18next";
import logo from "@/assets/haloo-connect-logo.png";
import { Phone, Mail, Instagram, Facebook } from "lucide-react";

const FooterNext = () => {
  const { t } = useTranslation();

  return (
    <footer className="bg-secondary py-16">
      <div className="container">
        <div className="mb-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-1">
            <img
              src={logo.src}
              alt="Haloo Connect"
              className="mb-4 h-10 w-auto brightness-0 invert"
            />
            <p className="mb-4 text-sm text-secondary-foreground/70">
              {t("footer.description")}
            </p>

            <div className="mt-4 flex items-center gap-4">
              <a
                href="https://www.instagram.com/haloocomglobal_?igsh=MmlyaTgwNHZzZ3U="
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="text-secondary-foreground/70 transition-colors hover:text-secondary-foreground"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="https://www.facebook.com/haloocom/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="text-secondary-foreground/70 transition-colors hover:text-secondary-foreground"
              >
                <Facebook className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="mb-4 font-semibold text-secondary-foreground">
              {t("footer.quickLinks")}
            </h4>
            <ul className="space-y-2">
              <li><Link href="/" className="text-sm text-secondary-foreground/70 transition-colors hover:text-secondary-foreground">{t("footer.home")}</Link></li>
              <li><Link href="/about" className="text-sm text-secondary-foreground/70 transition-colors hover:text-secondary-foreground">{t("footer.aboutUs")}</Link></li>
              <li><Link href="/contact" className="text-sm text-secondary-foreground/70 transition-colors hover:text-secondary-foreground">{t("footer.contactUs")}</Link></li>
              <li><Link href="/blog" className="text-sm text-secondary-foreground/70 transition-colors hover:text-secondary-foreground">{t("footer.blog")}</Link></li>
              <li><Link href="/analysis" className="text-sm text-secondary-foreground/70 transition-colors hover:text-secondary-foreground">AI Readiness Analyzer</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 font-semibold text-secondary-foreground">
              {t("footer.services")}
            </h4>
            <ul className="space-y-2">
              <li><a href="https://haloocom.com/services/halooconnect/" target="_blank" rel="noopener noreferrer" className="text-sm text-secondary-foreground/70 transition-colors hover:text-secondary-foreground">{t("footer.contactCenter")}</a></li>
              <li><a href="https://haloocom.com/hexa-ai/" target="_blank" rel="noopener noreferrer" className="text-sm text-secondary-foreground/70 transition-colors hover:text-secondary-foreground">{t("footer.hexaAi")}</a></li>
              <li><a href="https://haloocom.com/services/halooxchange/" target="_blank" rel="noopener noreferrer" className="text-sm text-secondary-foreground/70 transition-colors hover:text-secondary-foreground">{t("footer.unifiedComm")}</a></li>
              <li><a href="https://haloocom.com/connectplus-crm-dialer/" target="_blank" rel="noopener noreferrer" className="text-sm text-secondary-foreground/70 transition-colors hover:text-secondary-foreground">{t("footer.crmDialer")}</a></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 font-semibold text-secondary-foreground">
              {t("footer.ourPresence")}
            </h4>
            <ul className="space-y-2">
              <li><Link href="/singapore" className="text-sm text-secondary-foreground/70 hover:text-secondary-foreground">{t("footer.singapore")}</Link></li>
              <li><Link href="/uae" className="text-sm text-secondary-foreground/70 hover:text-secondary-foreground">{t("footer.uae")}</Link></li>
              <li><Link href="/malaysia" className="text-sm text-secondary-foreground/70 hover:text-secondary-foreground">Malaysia</Link></li>
              <li><Link href="/philippines" className="text-sm text-secondary-foreground/70 hover:text-secondary-foreground">Philippines</Link></li>
              <li><Link href="/contact" className="text-sm text-secondary-foreground/70 hover:text-secondary-foreground">Talk to Sales</Link></li>
              <li><Link href="/analysis" className="text-sm text-secondary-foreground/70 hover:text-secondary-foreground">AI Audit Tool</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 font-semibold text-secondary-foreground">
              {t("footer.contact")}
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <Phone className="mt-0.5 h-4 w-4 text-secondary-foreground/70" />
                <div className="space-y-1 text-sm text-secondary-foreground/70">
                  <p>SG +65 8376 5007</p>
                  <p>AE +971 508293464</p>
                  <p>IN +91 95133 91279</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="mt-0.5 h-4 w-4 text-secondary-foreground/70" />
                <a href="mailto:enquiry@haloocom.com" className="text-sm text-secondary-foreground/70 hover:text-secondary-foreground">enquiry@haloocom.com</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-secondary-foreground/10 pt-8 md:flex-row">
          <p className="text-sm text-secondary-foreground/50">
            {"\u00A9"} {new Date().getFullYear()} Haloo Connect. {t("footer.copyright")}.
          </p>
          <div className="flex items-center gap-6">
            <a href="https://haloocom.com/privacy-policy/" target="_blank" rel="noopener noreferrer" className="text-sm text-secondary-foreground/50 hover:text-secondary-foreground">{t("footer.privacyPolicy")}</a>
            <a href="https://haloocom.com/terms-and-conditions/" target="_blank" rel="noopener noreferrer" className="text-sm text-secondary-foreground/50 hover:text-secondary-foreground">{t("footer.terms")}</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterNext;
