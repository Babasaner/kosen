import { Button } from "../../../../components/ui/button";


const legalLinks = [
    "Mentions légales",
    "Politique de confidentialité",
    "Préférences cookies",
];


const mutedTextClassName =
    "h-auto p-0 font-body-regular text-[#585655] text-[length:var(--body-regular-font-size)] font-[number:var(--body-regular-font-weight)] tracking-[var(--body-regular-letter-spacing)] leading-[var(--body-regular-line-height)] [font-style:var(--body-regular-font-style)] hover:bg-transparent hover:text-[#585655]";

export const SiteFooterSection = (): JSX.Element => {
    return (
        <footer className="flex w-full  flex-col items-center gap-10 overflow-hidden bg-[#2e2c2a]  px-6 pt-[120px] pb-[80px] l sm:px-10 lg:px-20">


            <div className="w-full shrink-0">
                <img
                    className="h-full w-full "
                    alt="Kosen"
                    src="/img/footer-bg.svg"
                />
            </div>
            <div className="flex w-full max-w-[845px] flex-col gap-5 text-[#585655] md:flex-row md:items-center md:justify-between">
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                    <span className="font-body-regular text-[length:var(--body-regular-font-size)] font-[number:var(--body-regular-font-weight)] tracking-[var(--body-regular-letter-spacing)] leading-[var(--body-regular-line-height)] [font-style:var(--body-regular-font-style)]">
                        © 2026 KŌSEN
                    </span>
                    <Button type="button" variant="ghost" className={mutedTextClassName}>
                        FR / EN
                    </Button>
                </div>
                <nav aria-label="Informations légales">
                    <ul className="flex flex-wrap items-center gap-x-5 gap-y-2">
                        {legalLinks.map((link) => (
                            <li key={link}>
                                <Button
                                    type="button"
                                    variant="ghost"
                                    className={mutedTextClassName}
                                >
                                    {link}
                                </Button>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
        </footer>
    );
};