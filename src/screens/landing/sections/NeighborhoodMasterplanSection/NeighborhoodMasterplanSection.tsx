import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "../../../../components/ui/button";
import { Card, CardContent } from "../../../../components/ui/card";

type Status = "ACHEVÉ" | "EN COURS" | "PROCHAINEMENT";

interface MasterplanItem {
    key: string;
    label: string;
    status: Status;
    description: string;
    image: string;
    upcoming?: boolean;
}

const masterplanData: MasterplanItem[] = [
    {
        key: "kosen-one",
        label: "KŌSEN One",
        status: "ACHEVÉ",
        description:
            "Une résidence fondatrice du micro-quartier, ouverte sur la ville et les espaces paysagers. Toutes les unités ont été livrées.",
        image: "/img/kosen-one.jpg",
    },
    {
        key: "kosen-two",
        label: "KŌSEN Two",
        status: "ACHEVÉ",
        description:
            "La deuxième phase du projet KŌSEN, en pleine construction. Des appartements premium disponibles sur plan en VEFA.",
        image: "/img/kosen-two.jpg",
    },
    {
        key: "komorebi-one",
        label: "KŌMOREBI One",
        status: "EN COURS",
        description:
            "Un programme résidentiel haut de gamme intégrant des espaces végétalisés et une architecture bioclimatique pensée pour Dakar.",
        image: "/img/komorebione.png",
    },
    {
        key: "business-center",
        label: "KŌSEN BUSINESS CENTER",
        status: "PROCHAINEMENT",
        description:
            "Un espace de bureau et de coworking premium au cœur du micro-quartier KŌSEN. Lancement prévu prochainement.",
        image: "/img/Photo-densemble-web.jpg",
        upcoming: true,
    },
];

const statusColors: Record<Status, string> = {
    "ACHEVÉ": "border-[#ac937e] text-[#ac937e]",
    "EN COURS": "border-[#ac937e] text-[#ac937e]",
    "PROCHAINEMENT": "border-[#ac937e] text-[#ac937e]",
};

export const NeighborhoodMasterplanSection = (): JSX.Element => {
    const [selectedKey, setSelectedKey] = useState(masterplanData[0].key);

    const selected = masterplanData.find((item) => item.key === selectedKey) ?? masterplanData[0];
    const available = masterplanData.filter((item) => !item.upcoming);
    const upcoming = masterplanData.filter((item) => item.upcoming);
    const [isUpcomingOpen, setIsUpcomingOpen] = useState(false);

    return (
        <section className="w-full self-stretch bg-[#e6ded8] px-5 py-16 sm:px-10 lg:px-20 lg:py-[120px]">
            <div className="flex w-full flex-col gap-10">
                <header className="flex items-center">
                    <div className="flex max-w-[589px] flex-col items-start gap-[22px]">
                        <p className="font-caption-bold text-[length:var(--caption-bold-font-size)] font-[number:var(--caption-bold-font-weight)] leading-[var(--caption-bold-line-height)] tracking-[var(--caption-bold-letter-spacing)] text-[#ac937e] [font-style:var(--caption-bold-font-style)]">
                            PLAN DE MASSE
                        </p>
                        <h2 className="font-headings-h1 text-[length:var(--headings-h1-font-size)] font-[number:var(--headings-h1-font-weight)] leading-[var(--headings-h1-line-height)] tracking-[var(--headings-h1-letter-spacing)] text-[#2e2c2a] [font-style:var(--headings-h1-font-style)]">
                            Un écosystème pensé comme un quartier vivant
                        </h2>
                    </div>
                </header>

                <Card className="overflow-hidden rounded-none border-[#ac937e] bg-transparent shadow-none">
                    <CardContent className="grid min-h-[606px] p-0 lg:grid-cols-[307px_minmax(0,1fr)]">

                        {/* ===== SIDEBAR GAUCHE ===== */}
                        <aside className="flex flex-col items-start gap-4 bg-[#e6ded8] p-6">
                            {/* Statut badge */}
                            <AnimatePresence mode="wait">
                                <motion.span
                                    key={`badge-${selectedKey}`}
                                    initial={{ opacity: 0, y: -6 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 6 }}
                                    transition={{ duration: 0.3 }}
                                    className={`inline-flex items-center justify-center border px-4 py-2 font-caption-regular text-[length:var(--caption-regular-font-size)] font-[number:var(--caption-regular-font-weight)] leading-[var(--caption-regular-line-height)] tracking-[var(--caption-regular-letter-spacing)] [font-style:var(--caption-regular-font-style)] ${statusColors[selected.status]}`}
                                >
                                    {selected.status}
                                </motion.span>
                            </AnimatePresence>

                            {/* Titre */}
                            <AnimatePresence mode="wait">
                                <motion.h3
                                    key={`title-${selectedKey}`}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 10 }}
                                    transition={{ duration: 0.3 }}
                                    className="font-headings-h2 text-[length:var(--headings-h2-font-size)] font-[number:var(--headings-h2-font-weight)] leading-[var(--headings-h2-line-height)] tracking-[var(--headings-h2-letter-spacing)] text-[#2e2c2a] [font-style:var(--headings-h2-font-style)]"
                                >
                                    {selected.label}
                                </motion.h3>
                            </AnimatePresence>

                            {/* Description */}
                            <AnimatePresence mode="wait">
                                <motion.p
                                    key={`desc-${selectedKey}`}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.35 }}
                                    className="font-body-regular text-[length:var(--body-regular-font-size)] font-[number:var(--body-regular-font-weight)] leading-[var(--body-regular-line-height)] tracking-[var(--body-regular-letter-spacing)] text-[#2e2c2a] [font-style:var(--body-regular-font-style)]"
                                >
                                    {selected.description}
                                </motion.p>
                            </AnimatePresence>

                            {/* Boutons contextuels selon le statut */}
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={`btns-${selectedKey}`}
                                    initial={{ opacity: 0, y: 8 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="flex w-full flex-col gap-3"
                                >
                                    {selected.status !== "PROCHAINEMENT" ? (
                                        <>
                                            <Button className="h-auto w-full rounded-none bg-[#2e2c2a] px-6 py-4 font-button-small text-[length:var(--button-small-font-size)] font-[number:var(--button-small-font-weight)] leading-[var(--button-small-line-height)] tracking-[var(--button-small-letter-spacing)] text-[#eee9e5] hover:bg-[#2e2c2a]/90 [font-style:var(--button-small-font-style)]">
                                                DÉCOUVRIR
                                            </Button>
                                            {selected.status === "EN COURS" && (
                                                <Button
                                                    variant="outline"
                                                    className="h-auto rounded-none border-[#ac937e] bg-transparent px-6 py-4 font-button-small text-[length:var(--button-small-font-size)] font-[number:var(--button-small-font-weight)] leading-[var(--button-small-line-height)] tracking-[var(--button-small-letter-spacing)] text-[#2e2c2a] hover:bg-[#ac937e]/10 hover:text-[#2e2c2a] [font-style:var(--button-small-font-style)]"
                                                >
                                                    DEMANDER LES DISPONIBILITÉS
                                                </Button>
                                            )}
                                        </>
                                    ) : (
                                        <Button
                                            variant="outline"
                                            className="h-auto rounded-none border-[#9999aa] bg-transparent px-6 py-4 font-button-small text-[length:var(--button-small-font-size)] font-[number:var(--button-small-font-weight)] leading-[var(--button-small-line-height)] tracking-[var(--button-small-letter-spacing)] text-[#2e2c2a] hover:bg-[#9999aa]/10 [font-style:var(--button-small-font-style)]"
                                        >
                                            ÊTRE NOTIFIÉ DU LANCEMENT
                                        </Button>
                                    )}
                                </motion.div>
                            </AnimatePresence>

                            {/* ===== NAVIGATION TABS ===== */}
                            <nav
                                aria-label="Bâtiments du plan de masse"
                                className="mt-auto w-full border-t border-[#eee9e5]"
                            >
                                {/* Items normaux */}
                                {available.map((item) => (
                                    <button
                                        key={item.key}
                                        type="button"
                                        onClick={() => setSelectedKey(item.key)}
                                        aria-pressed={selectedKey === item.key}
                                        className={`relative h-auto w-full text-left border-b border-[#eee9e5] px-0 py-3.5 font-body-regular text-[length:var(--body-regular-font-size)] font-[number:var(--body-regular-font-weight)] leading-[var(--body-regular-line-height)] tracking-[var(--body-regular-letter-spacing)] transition-all duration-200 [font-style:var(--body-regular-font-style)] flex items-center justify-between group ${
                                            selectedKey === item.key
                                                ? "text-[#ac937e] font-bold"
                                                : "text-[#2e2c2a] hover:text-[#ac937e]"
                                        }`}
                                    >
                                        {/* Indicateur actif */}
                                        {selectedKey === item.key && (
                                            <motion.span
                                                layoutId="activeTab"
                                                className="absolute left-0 top-0 bottom-0 w-[3px] bg-[#ac937e]"
                                                style={{ originY: 0.5 }}
                                            />
                                        )}
                                        <span className="pl-4">{item.label}</span>
                                        <span className={`text-[11px] tracking-[1px] transition-opacity ${selectedKey === item.key ? "opacity-100" : "opacity-0 group-hover:opacity-50"}`}>
                                            {item.status}
                                        </span>
                                    </button>
                                ))}

                                {/* Prochaines phases accordion */}
                                <button
                                    type="button"
                                    onClick={() => setIsUpcomingOpen((v) => !v)}
                                    aria-expanded={isUpcomingOpen}
                                    className="h-auto w-full flex justify-between items-center border-b border-[#eee9e5] px-0 py-3.5 font-body-regular text-[length:var(--body-regular-font-size)] font-[number:var(--body-regular-font-weight)] leading-[var(--body-regular-line-height)] tracking-[var(--body-regular-letter-spacing)] text-[#2e2c2a] hover:text-[#ac937e] transition-colors [font-style:var(--body-regular-font-style)]"
                                >
                                    <span>Prochaines phases</span>
                                    <span aria-hidden="true">{isUpcomingOpen ? "−" : "+"}</span>
                                </button>

                                <AnimatePresence>
                                    {isUpcomingOpen && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            className="overflow-hidden"
                                        >
                                            {upcoming.map((item) => (
                                                <button
                                                    key={item.key}
                                                    type="button"
                                                    onClick={() => setSelectedKey(item.key)}
                                                    aria-pressed={selectedKey === item.key}
                                                    className={`relative h-auto w-full text-left border-b border-[#eee9e5] px-0 py-3.5 font-body-regular text-[length:var(--body-regular-font-size)] opacity-70 transition-all flex items-center justify-between pl-4 ${
                                                        selectedKey === item.key
                                                            ? "text-[#ac937e] opacity-100"
                                                            : "text-[#2e2c2a] hover:text-[#ac937e]"
                                                    }`}
                                                >
                                                    {item.label}
                                                    <span className="text-[10px] tracking-[1px] text-[#9999aa]">PROCHAINEMENT</span>
                                                </button>
                                            ))}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </nav>
                        </aside>

                        {/* ===== IMAGE DROITE avec fade entre les changements ===== */}
                        <div className="relative h-[420px] lg:h-auto overflow-hidden">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={`img-${selectedKey}`}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.5, ease: "easeInOut" }}
                                    className="absolute inset-0 bg-cover bg-center"
                                    style={{
                                        backgroundImage: `url('${selected.image}')`,
                                    }}
                                    aria-label={`Image ${selected.label}`}
                                    role="img"
                                />
                            </AnimatePresence>

                            {/* Overlay gradient bas */}
                            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/30 to-transparent pointer-events-none" />

                            {/* Label flottant */}
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={`label-${selectedKey}`}
                                    initial={{ opacity: 0, y: 12 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -6 }}
                                    transition={{ duration: 0.4, delay: 0.15 }}
                                    className="absolute bottom-5 left-5"
                                >
                                    <span className="font-headings-h4 text-white text-[length:var(--headings-h4-font-size)] tracking-[var(--headings-h4-letter-spacing)]">
                                        {selected.label}
                                    </span>
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </section>
    );
};

