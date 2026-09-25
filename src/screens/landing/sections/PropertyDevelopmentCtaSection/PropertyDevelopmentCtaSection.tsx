import { assetUrl } from "../../../../lib/site";

const propertyDevelopmentCta = "Construisons Votre Projet Immobilier À Dakar.";

export const PropertyDevelopmentCtaSection = (): JSX.Element => {
    return (
        <section
            className="flex w-full items-center px-5 py-[72px] sm:px-10 lg:px-20 lg:py-[96px]"
            style={{
                background: `linear-gradient(0deg, rgba(46, 44, 42, 0.8) 0%, rgba(46, 44, 42, 0.8) 100%), url('${assetUrl("img/finalcta.jpg")}') 50% 50% / cover no-repeat`,
            }}
            aria-labelledby="property-development-cta-title"
        >
            <div className="flex w-full max-w-[1440px] flex-col items-start gap-6">
                <h2
                    id="property-development-cta-title"
                    className="w-fit lg:max-w-[896px] font-display-display-large text-[32px] leading-[40px] sm:text-[length:var(--display-display-large-font-size)] sm:leading-[var(--display-display-large-line-height)] font-[number:var(--display-display-large-font-weight)] tracking-[var(--display-display-large-letter-spacing)] text-white [font-style:var(--display-display-large-font-style)]"
                >
                    {propertyDevelopmentCta}
                </h2>
            </div>
        </section>
    );
};
