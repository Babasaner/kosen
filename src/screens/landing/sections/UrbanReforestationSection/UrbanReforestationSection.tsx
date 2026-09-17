import { Button } from "../../../../components/ui/button";

const titleLines = ["100.000 arbres", "plantés par", "immeuble construit"];

const description =
    "Un engagement inscrit dans la dynamique de la Grande Muraille Verte, pour lutter contre la désertification et le changement climatique. Il s'agit d'un engagement de plantation, distinct d'un résultat déjà réalisé.";

export const UrbanReforestationSection = (): JSX.Element => {
    return (
        <section
            className="flex w-full flex-col items-center px-5 py-10 sm:px-10 sm:py-20 lg:px-20 lg:py-[120px]"
            style={{ background: "linear-gradient(0deg, #00000099 0%, #00000099 100%), url('/img/greenspace.jpg') 50% 50% / cover no-repeat" }}
            aria-labelledby="urban-reforestation-title"
        >
            <div className="flex w-full flex-col items-center gap-6 sm:gap-10">
                <h2
                    id="urban-reforestation-title"
                    className="m-0 max-w-[1266px] uppercase [font-family:'ADAM.CG_PRO-Regular',Helvetica] text-center text-[18px] font-normal leading-[20px] tracking-[0] text-[#e6ded8] sm:text-[52px] sm:leading-[64px] lg:text-[100px] lg:leading-[120px]"
                >
                    {titleLines.map((line, index) => (
                        <span key={line}>
                            {line}
                            {index < titleLines.length - 1 && <br />}
                        </span>
                    ))}
                </h2>
                <p className="m-0 flex max-w-[720px] items-center justify-center font-body-regular text-center text-[10px] font-[number:var(--body-regular-font-weight)] leading-[12px] tracking-[var(--body-regular-letter-spacing)] text-white [font-style:var(--body-regular-font-style)] sm:text-[length:var(--body-regular-font-size)] sm:leading-[var(--body-regular-line-height)]">
                    {description}
                </p>
                <Button
                    type="button"
                    variant="outline"
                    className="h-auto rounded-none border-[#ac937e] bg-transparent px-3 py-2 font-button-default text-[8px] font-[number:var(--button-default-font-weight)] leading-[10px] tracking-[var(--button-default-letter-spacing)] text-white shadow-none hover:border-[#ac937e] hover:bg-white/10 hover:text-white focus-visible:ring-[#ac937e] sm:px-6 sm:py-4 sm:text-[length:var(--button-default-font-size)] sm:leading-[var(--button-default-line-height)] [font-style:var(--button-default-font-style)]"
                >
                    COMPRENDRE L&apos;ENGAGEMENT
                </Button>
            </div>
        </section>
    );
};
