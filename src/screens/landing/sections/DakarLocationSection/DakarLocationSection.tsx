import { type CSSProperties, useState } from "react";
import { Button } from "../../../../components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

const mapLocations = [
    {
        id: "KŌSEN",
        label: "KŌSEN",
        top: "46.3%",
        left: "51.1%",
        color: "bg-[#2e2c2a]",
        highlighted: true,
    },
    {
        id: "PORT",
        label: "Port",
        top: "38.2%",
        left: "60%",
        color: "bg-[#ac937e]",
    },
    {
        id: "GRAND THÉÂTRE",
        label: "Grand Théâtre national",
        top: "56.4%",
        left: "63.5%",
        color: "bg-[#ac937e]",
    },
    {
        id: "MUSÉE DES CIVILISATIONS NOIRES",
        label: "Musée des Civilisations noires",
        top: "58.7%",
        left: "12.1%",
        color: "bg-[#ac937e]",
        markerAfter: true,
    },
    {
        id: "AVENUE FAIDHERBE",
        label: "Avenue Faidherbe",
        top: "39.9%",
        left: "28.7%",
        color: "bg-[#ac937e]",
    },
    {
        id: "GARE FERROVIAIRE - TER",
        label: "Gare - TER",
        top: "48%",
        left: "66%",
        color: "bg-[#ac937e]",
    },
    {
        id: "PLATEAU",
        label: "Dakar Plateau",
        top: "65%",
        left: "40%",
        color: "bg-[#ac937e]",
    },
    {
        id: "FERRIES ÎLE DE GORÉE",
        label: "Ferries",
        top: "70%",
        left: "75%",
        color: "bg-[#ac937e]",
    }
];

const nearbyPlaces = [
    "BRT",
    "GARE FERROVIAIRE - TER",
    "PORT",
    "PLATEAU",
    "GRAND THÉÂTRE",
    "ÉCOLE ALOYS KOBES",
    "VOIE EXPRESS AUTOROUTE A1",
    "MUSÉE DES CIVILISATIONS NOIRES",
    "AVENUE FAIDHERBE",
    "FERRIES ÎLE DE GORÉE",
];

export const DakarLocationSection = (): JSX.Element => {
    const [selectedPlace, setSelectedPlace] = useState<string | null>(null);

    return (
        <section
            id="dakar"
            className="flex w-full flex-col items-center justify-center bg-[#c2c8ca] gap-2.5 pr-0 lg:pr-20"
            aria-labelledby="dakar-location-heading"
        >
            <div className="flex w-full flex-col items-center justify-between gap-10 lg:flex-row lg:gap-12">
                <figure className="relative w-full shrink-0 overflow-hidden bg-white lg:w-[55%]">
                    <img
                        className="block h-auto w-full object-cover"
                        alt="Map of Dakar showing KŌSEN and nearby landmarks"
                        src="/img/map.png"
                    />
                    <figcaption className="sr-only">
                        Carte de Dakar indiquant KŌSEN, le Port, le Grand Théâtre national,
                        le Musée des Civilisations noires et l&apos;avenue Faidherbe.
                    </figcaption>
                    <ul className="m-0 list-none p-0">
                        <AnimatePresence>
                            {mapLocations.map((location) => {
                                const isActive = selectedPlace === location.id;
                                
                                return (
                                    <motion.li
                                        key={location.id}
                                        initial={false}
                                        animate={{ scale: isActive ? 1.1 : 1, zIndex: isActive ? 10 : 1 }}
                                        className="absolute flex h-5 items-center gap-2 whitespace-nowrap"
                                        style={
                                            {
                                                top: location.top,
                                                left: location.left,
                                            } as CSSProperties
                                        }
                                    >
                                        {location.markerAfter ? (
                                            <>
                                                <span className={`mt-[-1px] font-body-bold text-[10px] sm:text-[length:var(--body-bold-font-size)] font-[number:var(--body-bold-font-weight)] leading-[var(--body-bold-line-height)] tracking-[var(--body-bold-letter-spacing)] text-[#2e2c2a] transition-opacity duration-300 ${selectedPlace && !isActive && !location.highlighted ? "opacity-30" : "opacity-100"}`}>
                                                    {location.label}
                                                </span>
                                                <motion.span
                                                    animate={isActive ? { scale: [1, 1.5, 1], boxShadow: ["0px 0px 0px 0px rgba(46,44,42,0)", "0px 0px 0px 10px rgba(46,44,42,0.2)", "0px 0px 0px 0px rgba(46,44,42,0)"] } : {}}
                                                    transition={isActive ? { repeat: Infinity, duration: 1.5 } : {}}
                                                    className={`h-2 w-2 sm:h-3 sm:w-3 shrink-0 rounded-full ${location.color} ${location.highlighted || isActive ? "shadow-[0px_0px_0px_4px_#2e2c2a33]" : ""}`}
                                                    aria-hidden="true"
                                                />
                                            </>
                                        ) : (
                                            <>
                                                <motion.span
                                                    animate={isActive ? { scale: [1, 1.5, 1], boxShadow: ["0px 0px 0px 0px rgba(46,44,42,0)", "0px 0px 0px 10px rgba(46,44,42,0.2)", "0px 0px 0px 0px rgba(46,44,42,0)"] } : {}}
                                                    transition={isActive ? { repeat: Infinity, duration: 1.5 } : {}}
                                                    className={`h-2 w-2 sm:h-3 sm:w-3 shrink-0 rounded-full ${location.color} ${location.highlighted || isActive ? "shadow-[0px_0px_0px_4px_#2e2c2a33]" : ""}`}
                                                    aria-hidden="true"
                                                />
                                                <span className={`mt-[-1px] font-body-bold text-[10px] sm:text-[length:var(--body-bold-font-size)] font-[number:var(--body-bold-font-weight)] leading-[var(--body-bold-line-height)] tracking-[var(--body-bold-letter-spacing)] text-[#2e2c2a] transition-opacity duration-300 ${selectedPlace && !isActive && !location.highlighted ? "opacity-30" : "opacity-100"}`}>
                                                    {location.label}
                                                </span>
                                            </>
                                        )}
                                    </motion.li>
                                );
                            })}
                        </AnimatePresence>
                    </ul>
                </figure>
                <div className="flex w-full max-w-[518px] flex-col items-start gap-6 px-6 pb-8 lg:px-0 lg:pb-0 pt-8 lg:pt-0">
                    <h2
                        id="dakar-location-heading"
                        className="font-headings-h1 text-[32px] sm:text-[length:var(--headings-h1-font-size)] font-[number:var(--headings-h1-font-weight)] leading-[40px] sm:leading-[var(--headings-h1-line-height)] tracking-[var(--headings-h1-letter-spacing)] text-[#2e2c2a] [font-style:var(--headings-h1-font-style)]"
                    >
                        Au cœur de la ville, connecté à l&apos;avenir
                    </h2>
                    <p className="font-body-regular text-[14px] sm:text-[length:var(--body-regular-font-size)] font-[number:var(--body-regular-font-weight)] leading-[22px] sm:leading-[var(--body-regular-line-height)] tracking-[var(--body-regular-letter-spacing)] text-[#2e2c2a] [font-style:var(--body-regular-font-style)]">
                        Une position stratégique à proximité de la gare ferroviaire, du
                        port, du Grand Théâtre national, du Musée des Civilisations noires
                        et de l&apos;avenue Faidherbe.
                    </p>
                    <div
                        className="flex w-full flex-wrap items-center gap-2"
                        aria-label="Lieux à proximité"
                    >
                        {nearbyPlaces.map((place) => {
                            const isSelected = selectedPlace === place;

                            return (
                                <Button
                                    key={place}
                                    type="button"
                                    variant="outline"
                                    aria-pressed={isSelected}
                                    onClick={() => setSelectedPlace(isSelected ? null : place)}
                                    className={`h-auto rounded-none border-[#2e2c2a] px-[11px] py-[11px] text-[10px] sm:font-caption-regular sm:text-[length:var(--caption-regular-font-size)] font-[number:var(--caption-regular-font-weight)] leading-[var(--caption-regular-line-height)] tracking-[var(--caption-regular-letter-spacing)] transition-colors duration-300 [font-style:var(--caption-regular-font-style)] ${isSelected
                                        ? "bg-[#2e2c2a] text-white hover:bg-[#2e2c2a] hover:text-white"
                                        : "bg-transparent text-[#2e2c2a] hover:bg-[#2e2c2a] hover:text-white"
                                        }`}
                                >
                                    {place}
                                </Button>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
};
