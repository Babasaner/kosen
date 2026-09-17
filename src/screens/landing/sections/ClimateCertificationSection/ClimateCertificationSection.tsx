import { useState } from "react";
import { Card, CardContent } from "../../../../components/ui/card";

const climateFeatures = [
    { number: "01", label: "Ventilation naturelle" },
    { number: "02", label: "Lumière naturelle" },
    { number: "03", label: "Jardins & végétalisation" },
    { number: "04", label: "Terrasses protégées" },
];

const partnerImages = [
    {
        src: "/img/acc.png",
        className: "h-[63px] w-full object-contain",
    },
    {
        src: "/img/vinci.png",
        className: "h-[63px] w-full object-contain",
    },
    {
        src: "/img/aars.png",
        className: "h-[63px] w-full object-contain",
    },
    {
        src: "/img/mazars.png",
        className: "h-16 w-full object-contain",
    },
];

const slides = [0, 1, 2, 3];

export const ClimateCertificationSection = (): JSX.Element => {
    const [activeSlide, setActiveSlide] = useState(0);

    return (
        <section className="flex w-full flex-col bg-[#e6ded8] lg:min-h-[900px] lg:flex-row lg:items-center lg:justify-between lg:pl-20">
            <div className="flex w-full flex-col items-start gap-6 px-6 py-16 lg:w-[500px] lg:flex-none lg:px-0 lg:py-0">
                <p className="flex h-3.5 items-center self-stretch font-caption-regular text-[length:var(--caption-regular-font-size)] font-[number:var(--caption-regular-font-weight)] leading-[var(--caption-regular-line-height)] tracking-[var(--caption-regular-letter-spacing)] text-[#ac937e] [font-style:var(--caption-regular-font-style)]">
                    ARCHITECTURE BIOCLIMATIQUE
                </p>
                <h2 className="font-headings-h1 text-[length:var(--headings-h1-font-size)] font-[number:var(--headings-h1-font-weight)] leading-[var(--headings-h1-line-height)] tracking-[var(--headings-h1-letter-spacing)] text-[#2e2c2a] [font-style:var(--headings-h1-font-style)]">
                    CONÇU AVEC LE CLIMAT, PAS CONTRE LUI
                </h2>
                <p className="font-body-regular text-[length:var(--body-regular-font-size)] font-[number:var(--body-regular-font-weight)] leading-[var(--body-regular-line-height)] tracking-[var(--body-regular-letter-spacing)] text-[#2e2c2a] [font-style:var(--body-regular-font-style)]">
                    La lumière, les vents dominants, les terrasses couvertes et la
                    végétation participent au confort quotidien.
                </p>
                <dl className="grid w-full grid-cols-2 border-t border-[#2e2c2a2e]">
                    {climateFeatures.map((feature, index) => (
                        <div
                            key={feature.number}
                            className={`flex min-h-[90px] items-center border-b border-[#2e2c2a2e] py-[25px] ${index % 2 === 0 ? "border-r pr-[18px]" : "pl-[18px]"
                                }`}
                        >
                            <dt className="font-body-bold text-[length:var(--body-bold-font-size)] font-[number:var(--body-bold-font-weight)] leading-[var(--body-bold-line-height)] tracking-[var(--body-bold-letter-spacing)] text-[#2e2c2a] [font-style:var(--body-bold-font-style)]">
                                {feature.number}
                                <br />
                                {feature.label}
                            </dt>
                        </div>
                    ))}
                </dl>
                <div className="flex w-full flex-col items-start gap-4">
                    <h3 className="font-headings-h4 text-[length:var(--headings-h4-font-size)] font-[number:var(--headings-h4-font-weight)] leading-[var(--headings-h4-line-height)] tracking-[var(--headings-h4-letter-spacing)] text-[#2e2c2a] [font-style:var(--headings-h4-font-style)]">
                        Avec nos partenaires
                    </h3>
                    <Card className="w-full rounded-none border-0 bg-transparent shadow-none">
                        <CardContent className="flex flex-col gap-2.5 p-0">
                            <div className="grid grid-cols-4 sm:grid-cols-4 gap-1">
                                {partnerImages.map((image) => (
                                    <img
                                        key={image.src}
                                        className={image.className}
                                        alt="Image"
                                        src={image.src}
                                    />
                                ))}
                            </div>
                            <div className="flex h-16 w-full items-center justify-center bg-white p-5">
                                <p className="w-[350px] [font-family:'Gelion-Bold',Helvetica] text-center text-[22px] font-bold leading-[22px] tracking-[1px] text-[#2e2c2a]">
                                    ETUDE SENGHOR ET SARR NOTAIRES ASSOCIES
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
            <div
                className="flex min-h-[420px] w-full flex-1 items-end justify-end bg-cover bg-center p-6 lg:h-[900px] lg:min-h-0 lg:w-[708px] lg:flex-none lg:p-5"
                style={{
                    backgroundImage: "url(/img/kosen-green-space.jpg)",
                }}
            >
                <div className="flex h-5 items-center gap-2">
                    {slides.map((slide) => (
                        <button
                            key={slide}
                            type="button"
                            aria-label={`Afficher la diapositive ${slide + 1}`}
                            aria-pressed={activeSlide === slide}
                            onClick={() => setActiveSlide(slide)}
                            className={`h-4 w-4 rounded-full transition-colors ${activeSlide === slide ? "bg-[#ac937e]" : "bg-[#e6ded8]"
                                }`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};
