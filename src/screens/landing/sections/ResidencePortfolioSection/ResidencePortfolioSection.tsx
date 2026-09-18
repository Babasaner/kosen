import { useState } from "react";
import { Button } from "../../../../components/ui/button";
import { ANCHORS, RESIDENCE_LINKS } from "../../../../lib/site";

const actions = [
    { label: "DÉCOUVRIR KŌMOREBI ONE", href: RESIDENCE_LINKS.komorebiOne },
    { label: "TÉLÉCHARGER LES PLANS", href: ANCHORS.planDeMasse },
];

const residenceDetails = [
    {
        value: "146–430 m²",
        label: "SURFACES APPROXIMATIVES",
    },
    {
        value: "2 à 4",
        label: "CHAMBRES",
    },
    {
        value: "15% D'APPORT",
        label: "PAIEMENT FLEXIBLE ECHELONNÉ",
    },
    {
        value: "REMISE DES CLÉS",
        label: "1ER SEMESTRE 2028",
    },
];

export const ResidencePortfolioSection = (): JSX.Element => {
    const [isPlaying, setIsPlaying] = useState(false);
    return (
        <section
            aria-labelledby="komorebi-title"
            className="flex w-full  flex-col items-center gap-10 bg-[#2e2c2a] px-5 py-10 sm:px-10 sm:py-16 lg:px-20 lg:py-20"
        >
            <header className="flex w-full max-w-[930px] flex-col items-center gap-6 text-center lg:gap-10">
                <p className="font-headings-h1 text-[24px] font-[number:var(--headings-h1-font-weight)] leading-[var(--headings-h1-line-height)] tracking-[var(--headings-h1-letter-spacing)] text-[#ac937e] [font-style:var(--headings-h1-font-style)] sm:text-[length:var(--headings-h1-font-size)]">
                    Le cœur végétal
                </p>
                <h2
                    id="komorebi-title"
                    className="[font-family:'ADAM.CG_PRO-Regular',Helvetica] text-[50px] font-normal leading-none tracking-[0] text-[#e6ded8] sm:text-[90px] lg:text-[180px] lg:leading-[180px]"
                >
                    KOMOREBI
                </h2>
                <p className="[font-family:'Lora',Helvetica] text-[29px] font-normal italic leading-7 tracking-[0] text-[#ac937e] sm:text-[22px] lg:text-[28.8px] lg:leading-[44.6px]">
                    La lumière du soleil filtrant à travers les feuilles.
                </p>
                <nav
                    aria-label="Actions Kōmorebi"
                    className="flex flex-col w-full justify-center  items-stretch gap-3 sm:flex-row sm:items-center sm:gap-6"
                >
                    {actions.map((action) => (
                        <Button
                            asChild
                            key={action.label}
                            type="button"
                            variant="outline"
                            className="h-auto justify-center rounded-none border-[#ac937e] bg-transparent px-6 py-4 font-button-default text-[length:var(--button-default-font-size)] font-[number:var(--button-default-font-weight)] leading-[var(--button-default-line-height)] tracking-[var(--button-default-letter-spacing)] text-white hover:border-[#e6ded8] hover:bg-transparent hover:text-white [font-style:var(--button-default-font-style)]"
                        >
                            <a href={action.href}>{action.label}</a>
                        </Button>
                    ))}
                </nav>
            </header>
            <div className="w-full max-w-[1280px]">
                <div
                    className="flex aspect-video w-full items-center justify-center bg-cover bg-center"
                    style={{
                        backgroundImage:
                            "url(/img/video-poster.png)",
                    }}
                >
                    {isPlaying ? (
                        <iframe
                            title="Vidéo Kōmorebi"
                            className="h-full w-full"
                            src="https://www.youtube.com/embed/W5M7oxgKaPo?autoplay=1"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen
                        />
                    ) : (
                        <Button
                            type="button"
                            aria-label="Lire la vidéo Kōmorebi"
                            onClick={() => setIsPlaying(true)}
                            className="h-12 w-12 rounded-full bg-[#2e2c2a] p-0 hover:bg-[#43413f] sm:h-16 sm:w-16 lg:h-20 lg:w-20"
                        >
                            <img
                                className="h-[21px] w-[18px] sm:h-[28px] sm:w-6 lg:h-[34.64px] lg:w-[30px]"
                                alt=""
                                src="https://c.animaapp.com/EEMUw1qlB3TbilKITU7KZQ/img/polygon-1.svg"
                            />
                        </Button>
                    )}
                </div>
                <dl className="grid grid-cols-2 sm:grid-cols-4">
                    {residenceDetails.map((detail, index) => (
                        <div
                            key={detail.value}
                            className={`flex min-w-0 flex-col gap-2 px-3 py-4 sm:px-5 sm:py-6 lg:px-6 ${index < residenceDetails.length - 1
                                ? "border-r border-[#43413f]"
                                : ""
                                }`}
                        >
                            <dt className="order-2 font-caption-regular text-[10px] font-[number:var(--caption-regular-font-weight)] leading-[var(--caption-regular-line-height)] tracking-[var(--caption-regular-letter-spacing)] text-[#e6ded8] opacity-[0.64] [font-style:var(--caption-regular-font-style)] sm:text-[length:var(--caption-regular-font-size)]">
                                {detail.label}
                            </dt>
                            <dd className="order-1 font-headings-h3 text-[15px] font-[number:var(--headings-h3-font-weight)] leading-5 tracking-[var(--headings-h3-letter-spacing)] text-[#e6ded8] [font-style:var(--headings-h3-font-style)] sm:text-[length:var(--headings-h3-font-size)] sm:leading-[var(--headings-h3-line-height)]">
                                {detail.value}
                            </dd>
                        </div>
                    ))}
                </dl>
            </div>
        </section>
    );
};
