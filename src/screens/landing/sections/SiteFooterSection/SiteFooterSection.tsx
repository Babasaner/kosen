import { Button } from "../../../../components/ui/button";

const footerColumns = [
    {
        title: "Contact",
        links: ["Contact", "WhatsApp", "Réseaux sociaux", "Newsletter"],
    },
    {
        title: "Investir",
        links: ["VEFA", "Diaspora", "Financement", "Gestion locative"],
    },
    {
        title: "Résidences",
        links: ["KŌSEN One", "KŌSEN Two", "KŌMOREBI One", "KŌMOREBI Two"],
    },
    {
        title: "Le projet",
        links: ["Vision", "Plan de masse", "Localisation", "Éco-responsable"],
    },
];

const legalLinks = [
    "Mentions légales",
    "Politique de confidentialité",
    "Préférences cookies",
];

const headingClassName =
    "font-headings-h4 text-[#585655] text-[length:var(--headings-h4-font-size)] font-[number:var(--headings-h4-font-weight)] tracking-[var(--headings-h4-letter-spacing)] leading-[var(--headings-h4-line-height)] [font-style:var(--headings-h4-font-style)]";

const linkClassName =
    "h-auto justify-start p-0 font-body-regular text-[#e6ded8] text-[length:var(--body-regular-font-size)] font-[number:var(--body-regular-font-weight)] tracking-[var(--body-regular-letter-spacing)] leading-[var(--body-regular-line-height)] [font-style:var(--body-regular-font-style)] hover:bg-transparent hover:text-[#e6ded8]";

const mutedTextClassName =
    "h-auto p-0 font-body-regular text-[#585655] text-[length:var(--body-regular-font-size)] font-[number:var(--body-regular-font-weight)] tracking-[var(--body-regular-letter-spacing)] leading-[var(--body-regular-line-height)] [font-style:var(--body-regular-font-style)] hover:bg-transparent hover:text-[#585655]";

export const SiteFooterSection = (): JSX.Element => {
    return (
        <footer className="flex w-full max-h-[550px] flex-col items-center gap-10 overflow-hidden bg-[#2e2c2a]  px-6 pt-[120px] sm:px-10 lg:px-20">
            <nav
                aria-label="Navigation de pied de page"
                className="grid w-full max-w-[845px] grid-cols-2 gap-x-6 gap-y-8 md:grid-cols-4"
            >
                {footerColumns.map((column) => (
                    <section
                        key={column.title}
                        className="flex min-w-0 flex-col items-start"
                    >
                        <h2 className={headingClassName}>{column.title}</h2>
                        <ul className="mt-0 flex flex-col items-start gap-2">
                            {column.links.map((link) => (
                                <li key={link}>
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        className={linkClassName}
                                    >
                                        {link}
                                    </Button>
                                </li>
                            ))}
                        </ul>
                    </section>
                ))}
            </nav>
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
            <div className="w-full shrink-0">
                <img
                    className="h-full w-full object-contain"
                    alt="Typo gres"
                    src="/img/Typo_gres 1.png"
                />
            </div>
        </footer>
    );
};
