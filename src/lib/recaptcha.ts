// Google reCAPTCHA v3 utility

declare global {
  interface Window {
    grecaptcha: {
      ready: (callback: () => void) => void;
      execute: (siteKey: string, options: { action: string }) => Promise<string>;
    };
  }
}

// Site key is public and can be exposed in frontend
const RECAPTCHA_SITE_KEY = "6LcVIFYrAAAAABBRQP8q4SdC_JMNO8pNaQxmhkP9";

let isScriptLoaded = false;

export const loadRecaptchaScript = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (isScriptLoaded && window.grecaptcha) {
      resolve();
      return;
    }

    const existingScript = document.querySelector(`script[src*="recaptcha"]`);
    if (existingScript) {
      isScriptLoaded = true;
      if (window.grecaptcha) {
        resolve();
      } else {
        // Wait for script to load
        existingScript.addEventListener("load", () => resolve());
        existingScript.addEventListener("error", () => reject(new Error("Failed to load reCAPTCHA")));
      }
      return;
    }

    const script = document.createElement("script");
    script.src = `https://www.google.com/recaptcha/api.js?render=${RECAPTCHA_SITE_KEY}`;
    script.async = true;
    script.defer = true;
    
    script.onload = () => {
      isScriptLoaded = true;
      resolve();
    };
    
    script.onerror = () => {
      reject(new Error("Failed to load reCAPTCHA script"));
    };

    document.head.appendChild(script);
  });
};

export const executeRecaptcha = async (action: string): Promise<string | null> => {
  try {
    await loadRecaptchaScript();
    
    return new Promise((resolve) => {
      window.grecaptcha.ready(async () => {
        try {
          const token = await window.grecaptcha.execute(RECAPTCHA_SITE_KEY, { action });
          resolve(token);
        } catch (error) {
          console.error("reCAPTCHA execution error:", error);
          resolve(null);
        }
      });
    });
  } catch (error) {
    console.error("reCAPTCHA load error:", error);
    return null;
  }
};
