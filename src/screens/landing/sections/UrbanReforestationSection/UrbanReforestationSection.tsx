import { assetUrl } from "../../../../lib/site";

const titleLines = ["100.000 arbres", "plantés par", "immeuble construit"];

const description =
    "Un engagement inscrit dans la dynamique de la Grande Muraille Verte, pour lutter contre la désertification et le changement climatique. Il s'agit d'un engagement de plantation, distinct d'un résultat déjà réalisé.";

export const UrbanReforestationSection = (): JSX.Element => {
    return (
        <section
            id="engagement-arbres"
            className="flex w-full flex-col items-center px-5 py-10 sm:px-10 sm:py-20 lg:px-20 lg:py-[120px]"
            style={{
                background: `linear-gradient(0deg, #00000099 0%, #00000099 100%), url('${assetUrl("img/greenspace.jpg")}') 50% 50% / cover no-repeat`,
            }}
            aria-labelledby="urban-reforestation-title"
        >
            <div className="flex w-full flex-col items-center gap-6 sm:gap-10">
                <h2
                    id="urban-reforestation-title"
                    className="m-0 max-w-[1266px] uppercase [font-family:'ADAM.CG_PRO-Regular',Helvetica] text-center text-[64px] font-normal leading-[72px] tracking-[0] text-[#e6ded8] sm:text-[52px] sm:leading-[64px] lg:text-[100px] lg:leading-[120px]"
                >
                    {titleLines.map((line, index) => (
                        <span key={line}>
                            {line}
                            {index < titleLines.length - 1 && <br />}
                        </span>
                    ))}
                </h2>
                <p className="m-0 flex max-w-[720px] items-center justify-center font-body-regular text-center text-[16px] font-[number:var(--body-regular-font-weight)] leading-[20px] tracking-[var(--body-regular-letter-spacing)] text-white [font-style:var(--body-regular-font-style)] sm:text-[length:var(--body-regular-font-size)] sm:leading-[var(--body-regular-line-height)]">
                    {description}
                </p>
                <p className="m-0 font-caption-regular text-[length:var(--caption-regular-font-size)] font-[number:var(--caption-regular-font-weight)] leading-[var(--caption-regular-line-height)] tracking-[var(--caption-regular-letter-spacing)] text-[#e6ded8] opacity-[0.8] [font-style:var(--caption-regular-font-style)]">
                    DAKAR PLATEAU, SÉNÉGAL
                </p>
            </div>
        </section>
    );
};
