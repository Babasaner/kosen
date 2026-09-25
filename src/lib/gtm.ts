/**
 * Google Tag Manager bootstrap.
 *
 * The container ID comes from VITE_GTM_ID at build time, so the same sources
 * can be built for staging and production. When the variable is missing, no
 * third-party script is loaded at all.
 *
 * Consent Mode v2: the default state is pushed to dataLayer BEFORE the
 * container script is injected, so no tag can fire before the visitor answers
 * the cookie banner.
 */
const GTM_ID = import.meta.env.VITE_GTM_ID?.trim();

export const initGtm = (): void => {
    if (!GTM_ID || GTM_ID.startsWith("GTM-XXXX")) {
        return;
    }

    const dataLayer = (window as Window & { dataLayer?: unknown[] }).dataLayer ?? [];
    (window as Window & { dataLayer?: unknown[] }).dataLayer = dataLayer;

    dataLayer.push({
        event: "consent_default",
        ad_storage: "denied",
        analytics_storage: "denied",
        ad_user_data: "denied",
        ad_personalization: "denied",
        functionality_storage: "granted",
        security_storage: "granted",
    });

    const gtmUrl = `https://www.googletagmanager.com/gtm.js?id=${encodeURIComponent(GTM_ID)}`;
    const firstScript = document.getElementById("gtm-loader");

    if (firstScript) {
        return;
    }

    const script = document.createElement("script");
    script.id = "gtm-loader";
    script.async = true;
    script.src = gtmUrl;
    document.head.appendChild(script);

    if (!document.getElementById("gtm-noscript-frame")) {
        const noScript = document.createElement("noscript");
        const iframe = document.createElement("iframe");
        iframe.id = "gtm-noscript-frame";
        iframe.src = `https://www.googletagmanager.com/ns.html?id=${encodeURIComponent(GTM_ID)}`;
        iframe.style.display = "none";
        iframe.style.visibility = "hidden";
        noScript.appendChild(iframe);
        document.body.insertBefore(noScript, document.body.firstChild);
    }
};
