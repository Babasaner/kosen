import { ClimateCertificationSection } from "./sections/ClimateCertificationSection/ClimateCertificationSection";
import { DakarLocationSection } from "./sections/DakarLocationSection/DakarLocationSection";
import { InvestmentBenefitsSection } from "./sections/InvestmentBenefitsSection/InvestmentBenefitsSection";
import { InvestmentInquirySection } from "./sections/InvestmentInquirySection/InvestmentInquirySection";
import { KomorebiShowcaseSection } from "./sections/KomorebiShowcaseSection/KomorebiShowcaseSection";
import { NeighborhoodMasterplanSection } from "./sections/NeighborhoodMasterplanSection/NeighborhoodMasterplanSection";
import { PropertyDevelopmentCtaSection } from "./sections/PropertyDevelopmentCtaSection/PropertyDevelopmentCtaSection";
import { ResidenceHeroSection } from "./sections/ResidenceHeroSection/ResidenceHeroSection";
import { ResidenceIntroductionSection } from "./sections/ResidenceIntroductionSection/ResidenceIntroductionSection";
import { ResidencePortfolioSection } from "./sections/ResidencePortfolioSection";
import { SiteFooterSection } from "./sections/SiteFooterSection/SiteFooterSection";
import { UrbanReforestationSection } from "./sections/UrbanReforestationSection/UrbanReforestationSection";
import { FadeIn } from "../../components/animations/FadeIn";

export const Landing = (): JSX.Element => {
    return (
        <div className="min-h-screen bg-[#1a1a1a] flex flex-col items-center w-full">
            <main
                className="relative flex w-full max-w-[1920px] bg-white flex-col items-stretch overflow-x-hidden shadow-2xl"
                data-model-id="12107:951"
            >
            <ResidenceHeroSection />
            
            <FadeIn delay={0.1}>
                <ResidenceIntroductionSection />
            </FadeIn>
            
            <FadeIn delay={0.1}>
                <NeighborhoodMasterplanSection />
            </FadeIn>
            
            <FadeIn delay={0.1}>
                <KomorebiShowcaseSection />
            </FadeIn>
            
            <FadeIn delay={0.1}>
                <ResidencePortfolioSection />
            </FadeIn>
            
            <FadeIn delay={0.1}>
                <ClimateCertificationSection />
            </FadeIn>
            
            <FadeIn delay={0.1}>
                <UrbanReforestationSection />
            </FadeIn>
            
            <FadeIn delay={0.1}>
                <InvestmentBenefitsSection />
            </FadeIn>
            
            <FadeIn delay={0.1}>
                <InvestmentInquirySection />
            </FadeIn>
            
            <FadeIn delay={0.1}>
                <DakarLocationSection />
            </FadeIn>
            
            <FadeIn delay={0.1}>
                <PropertyDevelopmentCtaSection />
            </FadeIn>
            
            <SiteFooterSection />
            </main>
        </div>
    );
};
