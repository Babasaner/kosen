import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "../../../../components/ui/button";
import {
    ANCHORS,
    assetUrl,
    navigationItems,
    smoothScrollTo,
} from "../../../../lib/site";

export const ResidenceHeroSection = (): JSX.Element => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 60);
        };

        window.addEventListener("scroll", handleScroll, { passive: true });

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const goToForm = (): void => {
        setIsMenuOpen(false);
        smoothScrollTo(ANCHORS.diaspora);
    };

    return (
        <>
            {/* ===== HEADER FIXED STICKY ===== */}
            <header
                className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-500 ease-in-out ${
                    scrolled
                        ? "bg-[#2e2c2a]/96 backdrop-blur-md shadow-[0_2px_24px_rgba(0,0,0,0.25)]"
                        : "bg-transparent"
                }`}
            >
                <div className="relative mx-auto flex min-h-[80px] w-full max-w-[1920px] items-center justify-between px-5 py-4 sm:px-10 lg:px-20">
                    {/* ===== LOGO ===== */}
                    <Button
                        variant="ghost"
                        className="h-auto shrink-0 rounded-none p-0 hover:bg-transparent"
                        aria-label="Accueil"
                        onClick={() =>
                            window.scrollTo({
                                top: 0,
                                behavior: "smooth",
                            })
                        }
                    >
                        <img
                            src={assetUrl("img/logo-white.png")}
                            alt="Logo KŌSEN"
                            className="block h-[28px] w-auto object-contain sm:h-[34px]"
                        />
                    </Button>

                    {/* ===== NAVIGATION DESKTOP ===== */}
                    <div className="hidden items-center gap-8 lg:flex">
                        <nav aria-label="Navigation principale">
                            <ul className="flex items-center gap-8">
                                {navigationItems.map((item) => (
                                    <li key={item.label}>
                                        <a
                                            href={item.href}
                                            onClick={(event) => {
                                                event.preventDefault();
                                                smoothScrollTo(item.href);
                                            }}
                                            className="font-caption-bold text-[length:var(--caption-bold-font-size)] font-[number:var(--caption-bold-font-weight)] leading-[var(--caption-bold-line-height)] tracking-[var(--caption-bold-letter-spacing)] text-white transition-colors duration-200 hover:text-[#ac937e] [font-style:var(--caption-bold-font-style)]"
                                        >
                                            {item.label}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </nav>

                        <Button
                            variant="ghost"
                            className="hidden h-auto shrink-0 rounded-none p-0 text-center font-caption-bold text-[length:var(--caption-bold-font-size)] font-[number:var(--caption-bold-font-weight)] leading-[var(--caption-bold-line-height)] tracking-[var(--caption-bold-letter-spacing)] text-white transition-colors hover:bg-transparent hover:text-[#ac937e] [font-style:var(--caption-bold-font-style)]"
                        >
                            FR / EN
                        </Button>
                    </div>

                    {/* ===== CTA + BURGER ===== */}
                    <div className="flex items-center gap-4">
                        {/* CTA Desktop / Tablet */}
                        <a
                            href={ANCHORS.diaspora}
                            onClick={(event) => {
                                event.preventDefault();
                                goToForm();
                            }}
                        >
                            <Button
                                variant="outline"
                                className="hidden h-auto shrink-0 rounded-none border-[#ac937e] bg-transparent px-4 py-3 font-button-small text-[10px] font-[number:var(--button-small-font-weight)] leading-[var(--button-small-line-height)] tracking-[var(--button-small-letter-spacing)] text-white transition-all hover:border-[#ac937e] hover:bg-[#ac937e]/20 hover:text-white sm:flex sm:px-6 sm:py-4 sm:text-[length:var(--button-small-font-size)] [font-style:var(--button-small-font-style)]"
                            >
                                RECEVOIR LA BROCHURE
                            </Button>
                        </a>

                        {/* ===== BURGER MOBILE & TABLET ===== */}
                        <button
                            type="button"
                            className="relative z-[70] flex items-center justify-center p-2 lg:hidden"
                            onClick={() => {
                                setIsMenuOpen((prev) => !prev);
                            }}
                            aria-label={
                                isMenuOpen
                                    ? "Fermer le menu"
                                    : "Ouvrir le menu"
                            }
                            aria-expanded={isMenuOpen}
                        >
                            <img
                                src={assetUrl("img/Landing/Link.svg")}
                                alt="Menu"
                                className="h-[56px] w-[46px] object-contain sm:h-8 sm:w-8"
                            />
                        </button>
                    </div>
                </div>

                {/* ===================================================== */}
                {/* MENU MOBILE / TABLETTE */}
                {/* ===================================================== */}

                <AnimatePresence>
                    {isMenuOpen && (
                        <motion.div
                            initial={{
                                opacity: 0,
                                height: 0,
                            }}
                            animate={{
                                opacity: 1,
                                height: "auto",
                            }}
                            exit={{
                                opacity: 0,
                                height: 0,
                            }}
                            transition={{
                                duration: 0.3,
                                ease: "easeInOut",
                            }}
                            className="absolute left-0 right-0 top-full z-[60] overflow-hidden bg-[#2e2c2a] shadow-[0_10px_30px_rgba(0,0,0,0.25)] lg:hidden"
                        >
                            <nav
                                aria-label="Navigation mobile"
                                className="px-5 py-6 sm:px-10"
                            >
                                <ul className="flex flex-col items-start gap-5">
                                    {navigationItems.map((item) => (
                                        <li key={item.label}>
                                            <a
                                                href={item.href}
                                                onClick={(event) => {
                                                    event.preventDefault();
                                                    setIsMenuOpen(false);
                                                    smoothScrollTo(item.href);
                                                }}
                                                className="font-caption-bold text-[15px] font-[number:var(--caption-bold-font-weight)] tracking-[2px] text-white transition-colors hover:text-[#ac937e]"
                                            >
                                                {item.label}
                                            </a>
                                        </li>
                                    ))}

                                    {/* ===== CTA MOBILE ===== */}
                                    <li className="w-full border-t border-white/10 pt-2">
                                        <a
                                            href={ANCHORS.diaspora}
                                            onClick={(event) => {
                                                event.preventDefault();
                                                goToForm();
                                            }}
                                            className="block w-full"
                                        >
                                            <Button
                                                variant="outline"
                                                className="mt-2 h-auto w-full rounded-none border-[#ac937e] bg-transparent px-6 py-4 font-button-small text-[12px] font-[number:var(--button-small-font-weight)] tracking-[var(--button-small-letter-spacing)] text-white hover:bg-white/10"
                                            >
                                                RECEVOIR LA BROCHURE
                                            </Button>
                                        </a>
                                    </li>
                                </ul>
                            </nav>
                        </motion.div>
                    )}
                </AnimatePresence>
            </header>

            {/* ========================================================= */}
            {/* HERO SECTION */}
            {/* ========================================================= */}

            <section
                id="top"
                className="relative flex min-h-[100vh] w-full flex-col overflow-hidden bg-cover bg-center bg-no-repeat text-white"
                style={{
                    backgroundImage: `linear-gradient(0deg, rgba(46,44,42,0.72) 0%, rgba(46,44,42,0.5) 100%), url('${assetUrl("img/kosen-hero.jpg")}')`,
                }}
                aria-labelledby="residence-hero-title"
            >
                {/* Spacer pour le header fixe */}
                <div
                    className="h-[80px] shrink-0"
                    aria-hidden="true"
                />

                {/* Contenu centré verticalement */}
                <div className="mx-auto mb-10 flex w-full flex-1 items-end px-5 sm:px-10 lg:mb-0 lg:items-center lg:px-20">
                    <div className="flex w-full max-w-[490px] flex-col items-start gap-8">

                        {/* ===== TITRE ===== */}
                        <div className="overflow-hidden">
                            <motion.h1
                                id="residence-hero-title"
                                initial={{
                                    y: "100%",
                                    opacity: 0,
                                }}
                                animate={{
                                    y: 0,
                                    opacity: 1,
                                }}
                                transition={{
                                    duration: 1,
                                    ease: [0.16, 1, 0.3, 1],
                                    delay: 0.15,
                                }}
                                className="font-display-display-medium text-[36px] leading-[44px] text-white sm:text-[length:var(--display-display-medium-font-size)] sm:leading-[var(--display-display-medium-line-height)] font-[number:var(--display-display-medium-font-weight)] tracking-[var(--display-display-medium-letter-spacing)] [font-style:var(--display-display-medium-font-style)]"
                            >
                                Appartements à vendre à Dakar Plateau
                            </motion.h1>
                        </div>

                        {/* ===== SOUS-TITRE ===== */}
                        <div className="overflow-hidden">
                            <motion.p
                                initial={{
                                    y: "80%",
                                    opacity: 0,
                                }}
                                animate={{
                                    y: 0,
                                    opacity: 1,
                                }}
                                transition={{
                                    duration: 0.9,
                                    ease: [0.16, 1, 0.3, 1],
                                    delay: 0.5,
                                }}
                                className="max-w-[325px] font-body-regular text-[14px] font-[number:var(--body-regular-font-weight)] leading-[var(--body-regular-line-height)] tracking-[var(--body-regular-letter-spacing)] text-white/85 [font-style:var(--body-regular-font-style)] sm:text-[length:var(--body-regular-font-size)] lg:max-w-[490px]"
                            >
                                Une oasis de lumière au cœur de Dakar Plateau. 24
                                appartements de 146 à 430 m², à partir de 269.000.000
                                FCFA, livrés ou en VEFA.
                            </motion.p>
                        </div>

                        {/* ===== CTA ===== */}
                        <motion.div
                            initial={{
                                opacity: 0,
                                y: 24,
                            }}
                            animate={{
                                opacity: 1,
                                y: 0,
                            }}
                            transition={{
                                duration: 0.7,
                                ease: "easeOut",
                                delay: 0.85,
                            }}
                            className="flex w-full flex-wrap gap-4 lg:w-fit"
                        >
                            <a
                                className="w-full lg:w-fit"
                                href={ANCHORS.diaspora}
                                onClick={(event) => {
                                    event.preventDefault();
                                    goToForm();
                                }}
                            >
                                <Button
                                    className="h-auto w-full rounded-none bg-[#2e2c2a] px-7 py-4 font-button-small text-[length:var(--button-small-font-size)] font-[number:var(--button-small-font-weight)] leading-[var(--button-small-line-height)] tracking-[var(--button-small-letter-spacing)] text-white transition-colors duration-300 hover:border-[#8f7865] hover:bg-[#8f7865] [font-style:var(--button-small-font-style)]"
                                >
                                    RECEVOIR LA BROCHURE
                                </Button>
                            </a>
                        </motion.div>
                    </div>
                </div>
            </section>
        </>
    );
};
