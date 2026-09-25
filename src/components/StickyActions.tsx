import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { ANCHORS, WHATSAPP_URL, smoothScrollTo } from "../lib/site";
import { trackWhatsAppClick } from "../lib/analytics";

interface StickyActionsProps {
    /** Hidden while the cookie banner owns the bottom of the viewport. */
    hidden?: boolean;
}

/**
 * The two actions the client asked to keep, reachable at any scroll position on
 * both mobile and desktop, since most of the traffic comes from mobile.
 */
export const StickyActions = ({ hidden = false }: StickyActionsProps): JSX.Element => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleScroll = (): void => {
            setIsVisible(window.scrollY > window.innerHeight * 0.6);
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        handleScroll();

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToForm = (): void => {
        smoothScrollTo(ANCHORS.diaspora);
    };

    return (
        <div
            className={`fixed inset-x-0 bottom-0 z-[70] w-full border-t border-[#43413f] bg-[#2e2c2a] transition-transform duration-300 ease-out ${
                isVisible && !hidden ? "translate-y-0" : "translate-y-full"
            }`}
        >
            <div className="mx-auto flex w-full max-w-[1920px] items-stretch gap-2 px-4 py-3 sm:gap-3 sm:px-10 lg:px-20">
                <Button
                    asChild
                    className="h-auto flex-1 rounded-none border border-[#ac937e] bg-transparent px-4 py-4 font-button-small text-[length:var(--button-small-font-size)] font-[number:var(--button-small-font-weight)] leading-[var(--button-small-line-height)] tracking-[var(--button-small-letter-spacing)] text-[#e6ded8] hover:border-[#e6ded8] hover:bg-transparent hover:text-white [font-style:var(--button-small-font-style)]"
                >
                    <a
                        href="#diaspora"
                        onClick={(event) => {
                            event.preventDefault();
                            scrollToForm();
                        }}
                    >
                        RECEVOIR LA BROCHURE
                    </a>
                </Button>

                <Button
                    asChild
                    className="h-auto flex-1 rounded-none border-0 bg-[#ac937e] px-4 py-4 font-button-small text-[length:var(--button-small-font-size)] font-[number:var(--button-small-font-weight)] leading-[var(--button-small-line-height)] tracking-[var(--button-small-letter-spacing)] text-[#eee9e5] hover:bg-[#ac937e] hover:text-[#eee9e5] [font-style:var(--button-small-font-style)]"
                >
                    <a
                        href={WHATSAPP_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => trackWhatsAppClick("sticky_bar")}
                    >
                        WHATSAPP
                    </a>
                </Button>
            </div>
        </div>
    );
};
