type DataLayerWindow = Window & {
    dataLayer?: Array<Record<string, unknown>>;
    gtag?: (...args: unknown[]) => void;
};

const getDataLayer = (): Array<Record<string, unknown>> => {
    const scope = window as DataLayerWindow;
    scope.dataLayer = scope.dataLayer ?? [];
    return scope.dataLayer;
};

/** Pushes a named event expected by the GTM container. */
export const trackEvent = (event: string, payload: Record<string, unknown> = {}): void => {
    getDataLayer().push({ event, ...payload });
};

export const trackFormSubmit = (payload: {
    bien: string;
    pays: string;
    rappel: boolean;
}): void => {
    trackEvent("formulaire_envoye", payload);
};

export const trackWhatsAppClick = (source: string): void => {
    trackEvent("clic_whatsapp", { source });
};

export const applyConsentState = (analyticsStorage: boolean, adStorage: boolean): void => {
    const consentPreferences = {
        ad_storage: adStorage ? "granted" : "denied",
        analytics_storage: analyticsStorage ? "granted" : "denied",
        personalization_storage: analyticsStorage ? "granted" : "denied",
        functionality_storage: "granted",
        security_storage: "granted",
    };

    getDataLayer().push({ event: "consent_update", ...consentPreferences });

    const gtag = (window as DataLayerWindow).gtag;

    if (typeof gtag === "function") {
        gtag("consent", "update", consentPreferences);
    }
};

export const applyDefaultConsent = (): void => {
    getDataLayer().push({
        event: "consent_default",
        ad_storage: "denied",
        analytics_storage: "denied",
        personalization_storage: "denied",
        functionality_storage: "granted",
        security_storage: "granted",
    });
};
