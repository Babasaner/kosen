import { useState } from "react";
import { Button } from "../../../../components/ui/button";
import { Card, CardContent } from "../../../../components/ui/card";

const masterplanItems = [
    "KŌSEN One",
    "KŌSEN Two",
    "KŌMOREBI One",
    "KOSEN BUSINESS CENTER",
];

export const NeighborhoodMasterplanSection = (): JSX.Element => {
    const [selectedItem, setSelectedItem] = useState(masterplanItems[0]);
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
                        <aside className="flex flex-col items-start gap-4 bg-[#e6ded8] p-6">
                            <span className="inline-flex items-center justify-center border border-[#ac937e] px-4 py-2 font-caption-regular text-[length:var(--caption-regular-font-size)] font-[number:var(--caption-regular-font-weight)] leading-[var(--caption-regular-line-height)] tracking-[var(--caption-regular-letter-spacing)] text-[#ac937e] [font-style:var(--caption-regular-font-style)]">
                                ACHEVÉ
                            </span>
                            <h3 className="font-headings-h2 text-[length:var(--headings-h2-font-size)] font-[number:var(--headings-h2-font-weight)] leading-[var(--headings-h2-line-height)] tracking-[var(--headings-h2-letter-spacing)] text-[#2e2c2a] [font-style:var(--headings-h2-font-style)]">
                                KOSEN One
                            </h3>
                            <p className="font-body-regular text-[length:var(--body-regular-font-size)] font-[number:var(--body-regular-font-weight)] leading-[var(--body-regular-line-height)] tracking-[var(--body-regular-letter-spacing)] text-[#2e2c2a] [font-style:var(--body-regular-font-style)]">
                                Une résidence fondatrice du micro-quartier, ouverte sur la ville
                                et les espaces paysagers.
                            </p>
                            <Button className="h-auto w-full rounded-none bg-[#2e2c2a] px-6 py-4 font-button-small text-[length:var(--button-small-font-size)] font-[number:var(--button-small-font-weight)] leading-[var(--button-small-line-height)] tracking-[var(--button-small-letter-spacing)] text-[#eee9e5] hover:bg-[#2e2c2a]/90 [font-style:var(--button-small-font-style)]">
                                DÉCOUVRIR
                            </Button>
                            <Button
                                variant="outline"
                                className="h-auto rounded-none border-[#ac937e] bg-transparent px-6 py-4 font-button-small text-[length:var(--button-small-font-size)] font-[number:var(--button-small-font-weight)] leading-[var(--button-small-line-height)] tracking-[var(--button-small-letter-spacing)] text-[#2e2c2a] hover:bg-[#ac937e]/10 hover:text-[#2e2c2a] [font-style:var(--button-small-font-style)]"
                            >
                                DEMANDER LES DISPONIBILITÉS
                            </Button>
                            <nav
                                aria-label="Bâtiments du plan de masse"
                                className="mt-auto w-full border-t border-[#eee9e5]"
                            >
                                {masterplanItems.map((item) => (
                                    <Button
                                        key={item}
                                        variant="ghost"
                                        onClick={() => setSelectedItem(item)}
                                        aria-pressed={selectedItem === item}
                                        className="h-auto w-full justify-start rounded-none border-b border-[#eee9e5] px-0 py-3.5 font-body-regular text-[length:var(--body-regular-font-size)] font-[number:var(--body-regular-font-weight)] leading-[var(--body-regular-line-height)] tracking-[var(--body-regular-letter-spacing)] text-[#2e2c2a] hover:bg-transparent hover:text-[#2e2c2a] [font-style:var(--body-regular-font-style)]"
                                    >
                                        {item}
                                    </Button>
                                ))}

                                <Button
                                    variant="ghost"
                                    onClick={() => setIsUpcomingOpen((isOpen) => !isOpen)}
                                    aria-expanded={isUpcomingOpen}
                                    className="h-auto w-full justify-between rounded-none border-b border-[#eee9e5] px-0 py-3.5 font-body-regular text-[length:var(--body-regular-font-size)] font-[number:var(--body-regular-font-weight)] leading-[var(--body-regular-line-height)] tracking-[var(--body-regular-letter-spacing)] text-[#2e2c2a] hover:bg-transparent hover:text-[#2e2c2a] [font-style:var(--body-regular-font-style)]"
                                >
                                    <span>Prochaines phases</span>
                                    <span aria-hidden="true">{isUpcomingOpen ? "−" : "+"}</span>
                                </Button>
                            </nav>
                        </aside>
                        <div className="h-[606px] w-full object-cover bg-[#43413f]" aria-label="Image" role="img" style={{ backgroundImage: "url('/img/Photo-densemble-web.jpg')", backgroundPosition: "center", backgroundSize: "cover", backgroundRepeat: "no-repeat" }} />
                    </CardContent>
                </Card>
            </div>
        </section>
    );
};
