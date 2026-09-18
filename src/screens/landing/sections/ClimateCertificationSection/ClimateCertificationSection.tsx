import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "../../../../components/ui/card";

const climateFeatures = [
    { number: "01", label: "Ventilation naturelle" },
    { number: "02", label: "Lumière naturelle" },
    { number: "03", label: "Jardins & végétalisation" },
    { number: "04", label: "Terrasses protégées" },
];

const partnerImages = [
    { src: "/img/acc.png", className: "h-[63px] w-full object-contain bg-white" },
    { src: "/img/vinci.png", className: "h-[63px] w-full object-contain bg-white" },
    { src: "/img/aars.png", className: "h-[63px] w-full object-contain bg-[#750805]" },
    { src: "/img/mazars.png", className: "h-16 w-full object-contain bg-white" },
];

// ✅ Images du slideshow — remplace ou ajoute d'autres images ici
const slideImages = [
    { src: "/img/kosen-green-space.jpg", caption: "Espaces verts" },
    { src: "/img/kosen-hero.jpg", caption: "Architecture" },
    { src: "/img/kosen-one.jpg", caption: "KŌSEN One" },
    { src: "/img/greenspace.jpg", caption: "Nature urbaine" },
];

const AUTO_PLAY_DELAY = 4000;

export const ClimateCertificationSection = (): JSX.Element => {
    const [activeSlide, setActiveSlide] = useState(0);

    const goToNext = useCallback(() => {
        setActiveSlide((prev) => (prev + 1) % slideImages.length);
    }, []);

    // Auto-play
    useEffect(() => {
        const timer = setInterval(goToNext, AUTO_PLAY_DELAY);
        return () => clearInterval(timer);
    }, [goToNext]);

    return (
        <section id="eco-responsable" className="flex order-2 lg:order-1  scroll-mt-24 w-full flex-col bg-[#e6ded8] lg:min-h-[900px] lg:flex-row lg:items-center lg:justify-between lg:pl-20">
            {/* ===== COLONNE GAUCHE ===== */}
            <div className="flex w-full  flex-col items-start gap-6 px-6 py-16 lg:w-[500px] lg:flex-none lg:px-0 lg:py-0">
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
                            <div className="grid grid-cols-4 gap-3">
                                {partnerImages.map((image) => (
                                    <img key={image.src} className={image.className} alt="Partenaire" src={image.src} />
                                ))}
                            </div>
                            <div className="flex h-16 w-full items-center justify-center bg-white p-5">
                                <p className="w-[350px] [font-family:'Gelion-Bold',Helvetica] text-center text-[16px] lg:text-[22px] font-bold leading-[22px] tracking-[1px] text-[#2e2c2a]">
                                    ETUDE SENGHOR ET SARR NOTAIRES ASSOCIES
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>

            {/* ===== SLIDESHOW DROIT ===== */}
            <div className="relative flex min-h-[420px] w-full flex-1 overflow-hidden lg:h-[900px] lg:min-h-0 lg:w-[708px] lg:flex-none">
                {/* Images en fade */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={`slide-${activeSlide}`}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.8, ease: "easeInOut" }}
                        className="absolute inset-0 bg-cover bg-center"
                        style={{ backgroundImage: `url(${slideImages[activeSlide].src})` }}
                        aria-label={slideImages[activeSlide].caption}
                        role="img"
                    />
                </AnimatePresence>

                {/* Overlay sombre bas */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />

                {/* Caption slide */}
                <AnimatePresence mode="wait">
                    <motion.span
                        key={`caption-${activeSlide}`}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.4, delay: 0.2 }}
                        className="absolute bottom-14 left-5 font-caption-regular text-[12px] tracking-[2px] text-white/70 uppercase"
                    >
                        {slideImages[activeSlide].caption}
                    </motion.span>
                </AnimatePresence>

                {/* Dots de pagination — cliquables */}
                <div className="absolute bottom-5 right-5 flex items-center gap-2">
                    {slideImages.map((_, index) => (
                        <button
                            key={index}
                            type="button"
                            aria-label={`Afficher la diapositive ${index + 1}`}
                            aria-pressed={activeSlide === index}
                            onClick={() => setActiveSlide(index)}
                            className="relative flex items-center justify-center"
                        >
                            <span
                                className={`block rounded-full transition-all duration-300 ${activeSlide === index
                                    ? "h-5 w-5 bg-[#ac937e]"
                                    : "h-4 w-4 bg-white/100 hover:bg-white/80"
                                    }`}
                            />
                            {/* Barre de progression pour le slide actif */}
                            {activeSlide === index && (
                                <motion.span
                                    key={`progress-${activeSlide}`}
                                    className="absolute inset-0 rounded-full border border-[#ac937e]"
                                    initial={{ scale: 1, opacity: 0.6 }}
                                    animate={{ scale: 2.2, opacity: 0 }}
                                    transition={{ duration: AUTO_PLAY_DELAY / 1000, ease: "linear" }}
                                />
                            )}
                        </button>
                    ))}
                </div>


            </div>
        </section>
    );
};

