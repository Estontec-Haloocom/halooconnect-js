// Google Ads Conversion Tracking Utility

declare global {
  interface Window {
    gtag: (...args: unknown[]) => void;
  }
}

export const trackLeadConversion = (formSource: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    // Google Ads conversion event
    window.gtag('event', 'conversion', {
      'send_to': 'AW-17370447750/lead_form_submission',
      'event_category': 'Lead',
      'event_label': formSource,
    });
    
    // Also track as a custom event for analytics
    window.gtag('event', 'generate_lead', {
      'event_category': 'Lead Generation',
      'event_label': formSource,
      'value': 1,
    });
  }
};
