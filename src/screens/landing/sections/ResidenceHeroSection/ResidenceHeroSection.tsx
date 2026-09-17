import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "../../../../components/ui/button";

const navigationItems = [
    { label: "LE CONCEPT", href: "#concept" },
    { label: "RÉSIDENCES", href: "#residences" },
    { label: "VIVRE À DAKAR", href: "#dakar" },
    { label: "INVESTISSEURS", href: "#investisseurs" },
];

export const ResidenceHeroSection = (): JSX.Element => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <section
            className="relative flex min-h-[900px] w-full flex-col overflow-hidden text-white bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: "linear-gradient(0deg, rgba(46,44,42,0.7) 0%, rgba(46,44,42,0.7) 100%), url('/img/kosen-hero.jpg')" }}
            aria-labelledby="residence-hero-title"
        >
            <header className="w-full bg-transparent backdrop-blur-[2px] backdrop-brightness-[100%] [-webkit-backdrop-filter:blur(2px)_brightness(100%)] relative z-50">
                <div className="mx-auto flex min-h-[88px] w-full max-w-[1440px] items-center justify-between px-5 py-[19px] sm:px-10 lg:px-20">
                    <Button
                        variant="ghost"
                        className="h-auto shrink-0 rounded-none p-0 hover:bg-transparent"
                        aria-label="Accueil"
                        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    >
                        <img
                            src="/img/logo-white.png"
                            alt="Logo KŌSEN"
                            className="block h-[30px] w-auto sm:h-[37px] object-contain"
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
                                            className="font-caption-bold text-[length:var(--caption-bold-font-size)] font-[number:var(--caption-bold-font-weight)] leading-[var(--caption-bold-line-height)] tracking-[var(--caption-bold-letter-spacing)] text-white [font-style:var(--caption-bold-font-style)] hover:text-gray-300 transition-colors"
                                        >
                                            {item.label}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </nav>
                        <Button
                            variant="ghost"
                            className="h-auto shrink-0 rounded-none p-0 font-caption-bold text-center text-[length:var(--caption-bold-font-size)] font-[number:var(--caption-bold-font-weight)] leading-[var(--caption-bold-line-height)] tracking-[var(--caption-bold-letter-spacing)] text-white [font-style:var(--caption-bold-font-style)] hover:bg-transparent hover:text-white"
                        >
                            FR / EN
                        </Button>
                    </div>

                    <div className="flex items-center gap-4 lg:gap-0">
                        <Button
                            variant="outline"
                            className="hidden sm:flex h-auto shrink-0 rounded-none border-[#ac937e] bg-transparent px-4 py-3 sm:px-6 sm:py-4 font-button-small text-[10px] sm:text-[length:var(--button-small-font-size)] font-[number:var(--button-small-font-weight)] leading-[var(--button-small-line-height)] tracking-[var(--button-small-letter-spacing)] text-white [font-style:var(--button-small-font-style)] hover:border-[#ac937e] hover:bg-transparent hover:text-white"
                        >
                            PARLER À UN CONSEILLER
                        </Button>

                        {/* Burger Menu Button (Mobile & Tablet) */}
                        <button
                            className="lg:hidden flex items-center justify-center p-2"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            aria-label="Ouvrir le menu"
                        >
                            <img src="/img/Landing/Link.svg" alt="Menu" className="h-6 w-6 sm:h-8 sm:w-8" />
                        </button>
                    </div>
                </div>
            </header>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="absolute top-[88px] left-0 w-full bg-[#2e2c2a] z-40 lg:hidden flex flex-col items-center py-8 shadow-xl"
                    >
                        <nav aria-label="Navigation mobile">
                            <ul className="flex flex-col items-center gap-6">
                                {navigationItems.map((item) => (
                                    <li key={item.label}>
                                        <a
                                            href={item.href}
                                            onClick={() => setIsMenuOpen(false)}
                                            className="font-caption-bold text-[14px] font-[number:var(--caption-bold-font-weight)] tracking-[var(--caption-bold-letter-spacing)] text-white hover:text-[#ac937e] transition-colors"
                                        >
                                            {item.label}
                                        </a>
                                    </li>
                                ))}
                                <li>
                                    <Button
                                        variant="outline"
                                        className="h-auto mt-4 rounded-none border-[#ac937e] bg-transparent px-6 py-4 font-button-small text-[12px] font-[number:var(--button-small-font-weight)] tracking-[var(--button-small-letter-spacing)] text-white hover:bg-white/10"
                                    >
                                        PARLER À UN CONSEILLER
                                    </Button>
                                </li>
                            </ul>
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="mx-auto flex w-full max-w-[1440px] flex-1 px-5 pt-[80px] sm:pt-[136px] sm:px-10 lg:px-20">
                <div className="flex w-full max-w-[489px] flex-col items-start gap-6">
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        id="residence-hero-title"
                        className="font-display-display-medium text-[36px] leading-[44px] sm:text-[length:var(--display-display-medium-font-size)] font-[number:var(--display-display-medium-font-weight)] sm:leading-[var(--display-display-medium-line-height)] tracking-[var(--display-display-medium-letter-spacing)] text-white [font-style:var(--display-display-medium-font-style)]"
                    >
                        Une Oasis De Lumière Au Cœur De Dakar Plateau
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                        className="max-w-[337px] font-body-regular text-[14px] sm:text-[length:var(--body-regular-font-size)] font-[number:var(--body-regular-font-weight)] leading-[var(--body-regular-line-height)] tracking-[var(--body-regular-letter-spacing)] text-white [font-style:var(--body-regular-font-style)]"
                    >
                        Architecture, nature et patrimoine réunis dans un micro-quartier
                        résidentiel d&apos;exception.
                    </motion.p>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                    >
                        <Button className="h-auto rounded-none bg-[#2E2C2A] px-6 py-4 font-button-small text-[length:var(--button-small-font-size)] font-[number:var(--button-small-font-weight)] leading-[var(--button-small-line-height)] tracking-[var(--button-small-letter-spacing)] text-white [font-style:var(--button-small-font-style)] hover:bg-[#8f7865] transition-colors">
                            EXPLORER KŌSEN
                        </Button>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};
