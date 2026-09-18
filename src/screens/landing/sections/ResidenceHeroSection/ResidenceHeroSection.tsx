import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "../../../../components/ui/button";
import {
    ANCHORS,
    navigationItems,
    smoothScrollTo,
} from "../../../../lib/site";

export const ResidenceHeroSection = (): JSX.Element => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 60);
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <>
            {/* ===== HEADER FIXED STICKY ===== */}
            <header
                className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-500 ease-in-out ${scrolled
                    ? "bg-[#2e2c2a]/96 backdrop-blur-md shadow-[0_2px_24px_rgba(0,0,0,0.25)]"
                    : "bg-transparent"
                    }`}
            >
                <div className="mx-auto flex min-h-[80px] w-full max-w-[1920px] items-center justify-between px-5 py-4 sm:px-10 lg:px-20">
                    <Button
                        variant="ghost"
                        className="h-auto shrink-0 rounded-none p-0 hover:bg-transparent"
                        aria-label="Accueil"
                        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                    >
                        {/* Logo toujours blanc — le header devient sombre au scroll donc ça reste lisible */}
                        <img
                            src="/img/logo-white.png"
                            alt="Logo KŌSEN"
                            className="block h-[28px] w-auto sm:h-[34px] object-contain"
                        />
                    </Button>

                    {/* Navigation Desktop */}
                    <div className="hidden lg:flex items-center gap-8">
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
                                            className="font-caption-bold text-[length:var(--caption-bold-font-size)] font-[number:var(--caption-bold-font-weight)] leading-[var(--caption-bold-line-height)] tracking-[var(--caption-bold-letter-spacing)] text-white [font-style:var(--caption-bold-font-style)] hover:text-[#ac937e] transition-colors duration-200"
                                        >
                                            {item.label}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </nav>
                        <Button
                            variant="ghost"
                            className="h-auto shrink-0 rounded-none p-0 font-caption-bold text-center text-[length:var(--caption-bold-font-size)] font-[number:var(--caption-bold-font-weight)] leading-[var(--caption-bold-line-height)] tracking-[var(--caption-bold-letter-spacing)] text-white [font-style:var(--caption-bold-font-style)] hover:bg-transparent hover:text-[#ac937e] transition-colors"
                        >
                            FR / EN
                        </Button>
                    </div>

                    <div className="flex items-center gap-4">
                        <Button
                            variant="outline"
                            className="hidden sm:flex h-auto shrink-0 rounded-none border-[#ac937e] bg-transparent px-4 py-3 sm:px-6 sm:py-4 font-button-small text-[10px] sm:text-[length:var(--button-small-font-size)] font-[number:var(--button-small-font-weight)] leading-[var(--button-small-line-height)] tracking-[var(--button-small-letter-spacing)] text-white [font-style:var(--button-small-font-style)] hover:border-[#ac937e] hover:bg-[#ac937e]/20 hover:text-white transition-all"
                        >
                            <a href={ANCHORS.diaspora}>
                                PARLER À UN CONSEILLER
                            </a>
                        </Button>

                        {/* Burger (Mobile & Tablet) */}
                        <button
                            className="lg:hidden flex items-center justify-center p-2"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            aria-label={isMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
                            aria-expanded={isMenuOpen}
                        >
                            <img src="/img/Landing/Link.svg" alt="Menu" className="h-[56px] w-[46px] sm:h-8 sm:w-8" />
                        </button>
                    </div>
                </div>

                {/* Mobile Menu — slide down */}
                <AnimatePresence>
                    {isMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="overflow-hidden bg-[#2e2c2a] lg:hidden"
                        >
                            <nav aria-label="Navigation mobile" className="px-5 py-6">
                                <ul className="flex flex-col items-start gap-5">
                                    {navigationItems.map((item) => (
                                        <li key={item.label}>
                                            <a
                                                href={item.href}
                                                onClick={() => setIsMenuOpen(false)}
                                                className="font-caption-bold text-[15px] font-[number:var(--caption-bold-font-weight)] tracking-[2px] text-white hover:text-[#ac937e] transition-colors"
                                            >
                                                {item.label}
                                            </a>
                                        </li>
                                    ))}
                                    <li className="w-full pt-2 border-t border-white/10">
                                        <Button
                                            asChild
                                            variant="outline"
                                            className="h-auto w-full mt-2 rounded-none border-[#ac937e] bg-transparent px-6 py-4 font-button-small text-[12px] font-[number:var(--button-small-font-weight)] tracking-[var(--button-small-letter-spacing)] text-white hover:bg-white/10"
                                        >
                                            <a
                                                href={ANCHORS.diaspora}
                                                onClick={() => setIsMenuOpen(false)}
                                            >
                                                PARLER À UN CONSEILLER
                                            </a>
                                        </Button>
                                    </li>
                                </ul>
                            </nav>
                        </motion.div>
                    )}
                </AnimatePresence>
            </header>

            {/* ===== HERO SECTION ===== */}
            <section
                className="relative flex min-h-[100vh] w-full flex-col overflow-hidden text-white bg-cover bg-center bg-no-repeat"
                style={{
                    backgroundImage:
                        "linear-gradient(0deg, rgba(46,44,42,0.72) 0%, rgba(46,44,42,0.5) 100%), url('/img/kosen-hero.jpg')",
                }}
                aria-labelledby="residence-hero-title"
            >
                {/* Spacer pour le header fixe */}
                <div className="h-[80px] shrink-0" aria-hidden="true" />

                {/* Contenu centré verticalement */}
                <div className="mx-auto flex w-full flex-1 items-end mb-10 lg:mb-0 lg:items-center px-5 sm:px-10 lg:px-20">
                    <div className="flex w-full max-w-[490px] flex-col items-start gap-8">

                        {/* Titre — slide up reveal */}
                        <div className="overflow-hidden">
                            <motion.h1
                                id="residence-hero-title"
                                initial={{ y: "100%", opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
                                className="font-display-display-medium text-[36px] leading-[44px] sm:text-[length:var(--display-display-medium-font-size)] font-[number:var(--display-display-medium-font-weight)] sm:leading-[var(--display-display-medium-line-height)] tracking-[var(--display-display-medium-letter-spacing)] text-white [font-style:var(--display-display-medium-font-style)]"
                            >
                                Une Oasis De Lumière Au Cœur De Dakar Plateau
                            </motion.h1>
                        </div>


                        {/* Sous-titre */}
                        <div className="overflow-hidden">
                            <motion.p
                                initial={{ y: "80%", opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
                                className="max-w-[325px] lg:max-w-[490px] font-body-regular text-[14px] sm:text-[length:var(--body-regular-font-size)] font-[number:var(--body-regular-font-weight)] leading-[var(--body-regular-line-height)] tracking-[var(--body-regular-letter-spacing)] text-white/85 [font-style:var(--body-regular-font-style)]"
                            >
                                Architecture, nature et patrimoine réunis dans un micro-quartier
                                résidentiel d&apos;exception.
                            </motion.p>
                        </div>

                        {/* CTA */}
                        <motion.div
                            initial={{ opacity: 0, y: 24 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, ease: "easeOut", delay: 0.85 }}
                            className="flex flex-wrap gap-4 w-full lg:w-fit"
                        >
                            <Button className="h-auto  w-full rounded-none bg-[#2e2c2a]  px-7 py-4 font-button-small text-[length:var(--button-small-font-size)] font-[number:var(--button-small-font-weight)] leading-[var(--button-small-line-height)] tracking-[var(--button-small-letter-spacing)] text-white [font-style:var(--button-small-font-style)] hover:bg-[#8f7865] hover:border-[#8f7865] transition-colors duration-300">
                                <a href="#concept">  EXPLORER KŌSEN</a>
                            </Button>

                        </motion.div>
                    </div>
                </div>


            </section>
        </>
    );
};
