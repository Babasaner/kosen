import { Button } from "../../../../components/ui/button";
import { ANCHORS } from "../../../../lib/site";

export const ResidenceIntroductionSection = (): JSX.Element => {
    return (
        <section id="concept" className="flex scroll-mt-24 flex-col lg:flex-row w-full self-stretch items-start lg:items-end justify-between bg-[#e6ded8] gap-12 lg:gap-0 px-5 py-16 sm:px-10 lg:px-20 lg:py-[120px]">
            <div className="flex w-full lg:w-[555px] flex-col items-start">
                <h1 className="mt-[-1px] w-full lg:w-[511.83px] font-headings-h1 text-[40px] leading-[48px] sm:text-[length:var(--headings-h1-font-size)] font-[number:var(--headings-h1-font-weight)] sm:leading-[var(--headings-h1-line-height)] tracking-[var(--headings-h1-letter-spacing)] text-[#2e2c2a] [font-style:var(--headings-h1-font-style)]">
                    Bien plus qu&apos;une
                    <br />
                    résidence.
                </h1>
                <p className="flex self-stretch items-center [font-family:'Lora',Helvetica] text-[75px] leading-[75px] sm:text-[74.9px] font-normal italic sm:leading-[74.9px] tracking-[-1.5px] sm:tracking-[-2.62px] text-[#ac937e] mt-2 lg:mt-0">
                    Un nouveau fragment de ville.
                </p>
            </div>
            <div className="flex w-full lg:w-[338px] flex-col items-start gap-6">
                <p className="mt-[-1px] flex self-stretch items-center font-body-regular text-[14px] leading-[22px] sm:text-[length:var(--body-regular-font-size)] font-[number:var(--body-regular-font-weight)] sm:leading-[var(--body-regular-line-height)] tracking-[var(--body-regular-letter-spacing)] text-[#2e2c2a] [font-style:var(--body-regular-font-style)]">
                    KŌSEN imagine un micro-quartier résidentiel de haut standing organisé
                    autour de la lumière, de la végétation et d&apos;une architecture
                    adaptée à Dakar.
                </p>
                <a className="w-full lg:w-fit" href={ANCHORS.planDeMasse}>
                <Button
                    type="button"
                    className="h-auto w-full lg:w-auto gap-2.5 rounded-none bg-[#2e2c2a] px-6 py-4 font-button-small text-[length:var(--button-small-font-size)] font-[number:var(--button-small-font-weight)] leading-[var(--button-small-line-height)] tracking-[var(--button-small-letter-spacing)] text-[#eee9e5] hover:bg-[#3b3936] transition-colors [font-style:var(--button-small-font-style)]"
                >
                     COMPRENDRE LA VISION
                </Button>
                </a>
            </div>
        </section>
    );
};
