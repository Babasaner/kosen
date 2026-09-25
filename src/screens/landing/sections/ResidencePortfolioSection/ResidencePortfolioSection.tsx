import { useState } from "react";
import { Button } from "../../../../components/ui/button";
import { KOMOREBI_SPECS, assetUrl } from "../../../../lib/site";

export const ResidencePortfolioSection = (): JSX.Element => {
    const [isPlaying, setIsPlaying] = useState(false);

    return (
        <section
            aria-labelledby="komorebi-title"
            className="flex w-full flex-col items-center gap-10 bg-[#2e2c2a] px-5 py-10 sm:px-10 sm:py-16 lg:px-20 lg:py-20"
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
            </header>

            <div className="w-full max-w-[1280px]">
                <div
                    className="flex aspect-video w-full items-center justify-center bg-cover bg-center"
                    style={{ backgroundImage: `url('${assetUrl("img/video-poster.png")}')` }}
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
                                src={assetUrl("img/play-icon.svg")}
                            />
                        </Button>
                    )}
                </div>

                <dl className="grid grid-cols-2 sm:grid-cols-4">
                    {KOMOREBI_SPECS.map((spec, index) => (
                        <div
                            key={spec.value}
                            className={`flex min-w-0 flex-col gap-2 px-3 py-4 sm:px-5 sm:py-6 lg:px-6 ${
                                index < KOMOREBI_SPECS.length - 1 ? "border-r border-[#43413f]" : ""
                            }`}
                        >
                            <dt className="order-2 font-caption-regular text-[10px] font-[number:var(--caption-regular-font-weight)] leading-[var(--caption-regular-line-height)] tracking-[var(--caption-regular-letter-spacing)] text-[#e6ded8] opacity-[0.64] [font-style:var(--caption-regular-font-style)] sm:text-[length:var(--caption-regular-font-size)]">
                                {spec.label}
                            </dt>
                            <dd className="order-1 font-headings-h3 text-[15px] font-[number:var(--headings-h3-font-weight)] leading-5 tracking-[var(--headings-h3-letter-spacing)] text-[#e6ded8] [font-style:var(--headings-h3-font-style)] sm:text-[length:var(--headings-h3-font-size)] sm:leading-[var(--headings-h3-line-height)]">
                                {spec.value}
                            </dd>
                        </div>
                    ))}
                </dl>
            </div>
        </section>
    );
};
