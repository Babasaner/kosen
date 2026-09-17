import { Button } from "../../../../components/ui/button";

const ctaActions = [
    {
        label: "PARLER À UN CONSEILLER",
        className:
            "border-[#2e2c2a] bg-[#2e2c2a] text-[#eee9e5] hover:bg-[#3b3936] hover:text-[#eee9e5]",
    },
    {
        label: "TÉLÉCHARGER LA BROCHURE",
        className:
            "border-[#e6ded8] bg-transparent text-[#e6ded8] hover:bg-[#e6ded8] hover:text-[#2e2c2a]",
    },
];

export const PropertyDevelopmentCtaSection = (): JSX.Element => {
    return (
        <section
            className="flex min-h-[711.19px] w-full items-center px-5 py-[120px] sm:px-10 lg:px-20"
            style={{ background: "linear-gradient(0deg, rgba(46, 44, 42, 0.8) 0%, rgba(46, 44, 42, 0.8) 100%), url('/img/finalcta.jpg') 50% 50% / cover no-repeat" }}
            aria-labelledby="property-development-cta-title"
        >
            <div className="flex w-full max-w-[1440px] flex-col items-start gap-10">
                <h2
                    id="property-development-cta-title"
                    className="max-w-[896px] font-display-display-large text-[40px] leading-[48px] sm:text-[length:var(--display-display-large-font-size)] font-[number:var(--display-display-large-font-weight)] sm:leading-[var(--display-display-large-line-height)] tracking-[var(--display-display-large-letter-spacing)] text-white [font-style:var(--display-display-large-font-style)]"
                >
                    Construisons Votre Projet Immobilier À Dakar
                </h2>
                <div className="flex w-full sm:w-auto flex-col sm:flex-row flex-wrap items-stretch sm:items-start gap-4 sm:gap-6">
                    {ctaActions.map((action) => (
                        <Button
                            key={action.label}
                            type="button"
                            variant="outline"
                            className={`h-auto w-full sm:w-auto rounded-none border px-6 py-4 font-button-small text-[10px] sm:text-[length:var(--button-small-font-size)] font-[number:var(--button-small-font-weight)] leading-[var(--button-small-line-height)] tracking-[var(--button-small-letter-spacing)] transition-colors [font-style:var(--button-small-font-style)] ${action.className}`}
                        >
                            {action.label}
                        </Button>
                    ))}
                </div>
            </div>
        </section>
    );
};
