import { useEffect, useState } from "react";
import { StickyActions } from "../../components/StickyActions";
import { applyConsentState, applyDefaultConsent } from "../../lib/analytics";
import { ClimateCertificationSection } from "./sections/ClimateCertificationSection/ClimateCertificationSection";
import { DakarLocationSection } from "./sections/DakarLocationSection/DakarLocationSection";
import { InvestmentBenefitsSection } from "./sections/InvestmentBenefitsSection/InvestmentBenefitsSection";
import { InvestmentInquirySection } from "./sections/InvestmentInquirySection/InvestmentInquirySection";
import { NeighborhoodMasterplanSection } from "./sections/NeighborhoodMasterplanSection/NeighborhoodMasterplanSection";
import { PropertyDevelopmentCtaSection } from "./sections/PropertyDevelopmentCtaSection/PropertyDevelopmentCtaSection";
import { ResidenceHeroSection } from "./sections/ResidenceHeroSection/ResidenceHeroSection";
import { ResidenceIntroductionSection } from "./sections/ResidenceIntroductionSection/ResidenceIntroductionSection";
import { ResidencePortfolioSection } from "./sections/ResidencePortfolioSection";
import { SiteFooterSection } from "./sections/SiteFooterSection/SiteFooterSection";
import { UrbanReforestationSection } from "./sections/UrbanReforestationSection/UrbanReforestationSection";
import { FadeIn } from "../../components/animations/FadeIn";

const CONSENT_STORAGE_KEY = "kosen-cookie-consent";

type ConsentMode = "accepted" | "rejected" | "custom";

export const Landing = (): JSX.Element => {
    const [cookieConsent, setCookieConsent] = useState<ConsentMode | null>(null);
    const [showCookiePreferences, setShowCookiePreferences] = useState(false);
    const [analyticsConsent, setAnalyticsConsent] = useState(false);
    const [adConsent, setAdConsent] = useState(false);

    useEffect(() => {
        const storedConsent = localStorage.getItem(CONSENT_STORAGE_KEY);

        if (storedConsent === "accepted" || storedConsent === "rejected") {
            const granted = storedConsent === "accepted";
            setCookieConsent(storedConsent);
            setAnalyticsConsent(granted);
            setAdConsent(granted);
            applyConsentState(granted, granted);
            return;
        }

        if (storedConsent === "custom") {
            setCookieConsent("custom");
            setAnalyticsConsent(true);
            setAdConsent(false);
            applyConsentState(true, false);
            return;
        }

        // First visit: everything denied until the visitor makes a choice.
        applyDefaultConsent();
    }, []);

    useEffect(() => {
        const handleOpenPreferences = (): void => {
            setCookieConsent(null);
            setShowCookiePreferences(true);
        };

        window.addEventListener("kosen:open-cookie-preferences", handleOpenPreferences);
        return () => window.removeEventListener("kosen:open-cookie-preferences", handleOpenPreferences);
    }, []);

    const saveConsent = (mode: ConsentMode): void => {
        localStorage.setItem(CONSENT_STORAGE_KEY, mode);
        setCookieConsent(mode);
        setShowCookiePreferences(false);

        if (mode === "accepted") {
            setAnalyticsConsent(true);
            setAdConsent(true);
            applyConsentState(true, true);
            return;
        }

        if (mode === "rejected") {
            setAnalyticsConsent(false);
            setAdConsent(false);
            applyConsentState(false, false);
            return;
        }

        setAnalyticsConsent(analyticsConsent);
        setAdConsent(adConsent);
        applyConsentState(analyticsConsent, adConsent);
    };

    return (
        <div className="min-h-screen bg-[#1a1a1a] flex flex-col items-center w-full">
            {cookieConsent === null && (
                <div
                    role="region"
                    aria-label="Gestion des cookies"
                    className="fixed inset-x-0 bottom-0 z-[80] w-full border-t border-[#2e2c2a]/10 bg-[#f4efe9] p-4 shadow-[0_-8px_30px_rgba(0,0,0,0.08)]"
                >
                    <div className="mx-auto flex max-w-[1200px] flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                        <p className="max-w-[780px] text-sm leading-6 text-[#2e2c2a]">
                            Nous utilisons des cookies pour améliorer votre expérience, proposer
                            des contenus pertinents et mesurer l&apos;audience. Vous pouvez
                            accepter, refuser ou personnaliser vos préférences.
                        </p>
                        <div className="flex flex-wrap items-center gap-3">
                            <button
                                type="button"
                                onClick={() => saveConsent("accepted")}
                                className="rounded-none border border-[#2e2c2a] bg-[#2e2c2a] px-4 py-2 text-[11px] font-medium uppercase tracking-[0.08em] text-white"
                            >
                                Accepter
                            </button>
                            <button
                                type="button"
                                onClick={() => saveConsent("rejected")}
                                className="rounded-none border border-[#2e2c2a] bg-transparent px-4 py-2 text-[11px] font-medium uppercase tracking-[0.08em] text-[#2e2c2a]"
                            >
                                Refuser
                            </button>
                            <button
                                type="button"
                                onClick={() => setShowCookiePreferences(true)}
                                className="rounded-none border border-[#2e2c2a] bg-transparent px-4 py-2 text-[11px] font-medium uppercase tracking-[0.08em] text-[#2e2c2a]"
                            >
                                Personnaliser
                            </button>
                        </div>
                    </div>
                    {showCookiePreferences && (
                        <div className="mx-auto mt-4 max-w-[1200px] rounded-none border border-[#2e2c2a]/20 bg-white p-4 text-[#2e2c2a]">
                            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                                <div className="flex flex-col gap-2">
                                    <p className="text-sm font-medium uppercase tracking-[0.08em]">
                                        Préférences cookies
                                    </p>
                                    <p className="text-sm text-[#2e2c2a]/80">
                                        Choisissez les catégories de cookies autorisées.
                                    </p>
                                </div>
                                <div className="flex gap-3">
                                    <label className="flex items-center gap-2 text-sm text-[#2e2c2a]">
                                        <input
                                            type="checkbox"
                                            checked={analyticsConsent}
                                            onChange={() => setAnalyticsConsent((value) => !value)}
                                        />
                                        Analytics
                                    </label>
                                    <label className="flex items-center gap-2 text-sm text-[#2e2c2a]">
                                        <input
                                            type="checkbox"
                                            checked={adConsent}
                                            onChange={() => setAdConsent((value) => !value)}
                                        />
                                        Publicité
                                    </label>
                                </div>
                            </div>
                            <div className="mt-4 flex justify-end">
                                <button
                                    type="button"
                                    onClick={() => saveConsent("custom")}
                                    className="rounded-none border border-[#2e2c2a] bg-[#2e2c2a] px-4 py-2 text-[11px] font-medium uppercase tracking-[0.08em] text-white"
                                >
                                    Enregistrer
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            )}

            <main
                className="relative flex w-full max-w-[1920px] bg-white flex-col items-stretch overflow-x-hidden shadow-2xl"
                data-model-id="12107:951"
            >
                {/* 1. Offre explicite */}
                <ResidenceHeroSection />

                {/* 2. Résidences : statut de livraison et prix, juste après le hero */}
                <FadeIn delay={0.1}>
                    <NeighborhoodMasterplanSection />
                </FadeIn>

                {/* 3. Concept */}
                <FadeIn delay={0.1}>
                    <ResidenceIntroductionSection />
                </FadeIn>

                {/* 4. Architecture bioclimatique, condensée en 4 points */}
                <FadeIn delay={0.1}>
                    <ClimateCertificationSection />
                </FadeIn>


                {/* 6. KŌMOREBI, projet en VEFA */}
                <FadeIn delay={0.1}>
                    <ResidencePortfolioSection />
                </FadeIn>



                {/* 7. Engagement 100.000 arbres, avec la localisation */}
                <FadeIn delay={0.1}>
                    <UrbanReforestationSection />
                </FadeIn>
                {/* 5. Demande : formulaire avant le texte sur mobile */}
                <FadeIn delay={0.1}>
                    <InvestmentInquirySection />
                </FadeIn>

                {/* 8. Parcours d'investissement VEFA */}
                <FadeIn delay={0.1}>
                    <InvestmentBenefitsSection />
                </FadeIn>


                {/* 9. Localisation */}
                <FadeIn delay={0.1}>
                    <DakarLocationSection />
                </FadeIn>

                {/* 10. Rappel de l'offre, allégé */}
                <FadeIn delay={0.1}>
                    <PropertyDevelopmentCtaSection />
                </FadeIn>

                <SiteFooterSection />
            </main>

            {/* Actions toujours accessibles, une fois le hero dépassé */}
            <StickyActions hidden={cookieConsent === null} />
        </div>
    );
};
