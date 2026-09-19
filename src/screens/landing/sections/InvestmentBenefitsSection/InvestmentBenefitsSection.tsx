import { useRef } from "react";
import type { MouseEvent as ReactMouseEvent, PointerEvent as ReactPointerEvent } from "react";
import { Button } from "../../../../components/ui/button";
import { Link } from "lucide-react";

const investmentSteps = [
    {
        number: "01",
        title: "Choix du bien",
        description: "Sélection selon votre projet.",
        lineSrc: "/img/line.svg",
        width: "xl:w-[187px]",
    },
    {
        number: "02",
        title: "Réservation",
        description: "Formalisation de votre intérêt.",
        lineSrc: "/img/line.svg",
        width: "xl:w-[201px]",
    },
    {
        number: "03",
        title: "Signature encadrée",
        description: "Un parcours documenté.",
        lineSrc: "/img/line.svg",
        width: "xl:w-[198px]",
    },
    {
        number: "04",
        title: "Paiements",
        description: "Selon l’avancement convenu.",
        lineSrc: "/img/line.svg",
        width: "xl:w-[196px]",
    },
    {
        number: "05",
        title: "Construction",
        description: "Suivi du projet.",
        lineSrc: "/img/line.svg",
        width: "xl:w-36",
    },
    {
        number: "06",
        title: "Remise des clés",
        description: "Accès à votre propriété.",
        lineSrc: "/img/line.svg",
        width: "xl:w-[161px]",
    },
];

const actionButtons = [
    {
        label: "ÉTUDIER MON PROJET",
        className:
            "bg-[#2e2c2a] text-[#eee9e5] hover:bg-[#2e2c2a] hover:text-[#eee9e5]",
            Link: "#diaspora",
    },
    {
        label: "DEMANDER LES DISPONIBILITÉS",
        className:
            "bg-[#ac937e] text-[#eee9e5] hover:bg-[#ac937e] hover:text-[#eee9e5]",
            Link: "#diaspora",
    },
];

export const InvestmentBenefitsSection = (): JSX.Element => {
    const stepsRef = useRef<HTMLOListElement | null>(null);
    const dragState = useRef({
        active: false,
        startX: 0,
        startScroll: 0,
        moved: false,
    });

    const handlePointerDown = (e: ReactPointerEvent<HTMLOListElement>): void => {
        if (e.pointerType !== "mouse") return;
        const el = stepsRef.current;
        if (!el) return;
        try {
            e.currentTarget.setPointerCapture(e.pointerId);
        } catch {
            // ignore capture errors
        }
        e.preventDefault();
        dragState.current = {
            active: true,
            startX: e.clientX,
            startScroll: el.scrollLeft,
            moved: false,
        };
    };

    const handlePointerMove = (e: ReactPointerEvent<HTMLOListElement>): void => {
        const { active, startX, startScroll } = dragState.current;
        const el = stepsRef.current;
        if (!active || !el) return;
        const dx = e.clientX - startX;
        if (Math.abs(dx) > 5) dragState.current.moved = true;
        el.scrollLeft = startScroll - dx;
    };

    const handlePointerUp = (): void => {
        dragState.current.active = false;
    };

    const handleStepsClick = (e: ReactMouseEvent<HTMLOListElement>): void => {
        if (dragState.current.moved) {
            e.preventDefault();
            e.stopPropagation();
        }
    };

    return (
        <section id="investisseurs" className="flex scroll-mt-24 w-full flex-col items-start gap-2.5 bg-[#e6ded8] px-5 py-16 sm:px-8 lg:px-20 lg:py-[120px]">
            <div className="flex w-full flex-col items-start justify-center gap-10">
                <header className="flex w-full flex-col gap-8 lg:flex-row lg:items-end lg:justify-between lg:gap-10">
                    <div className="flex max-w-[574.68px] flex-col items-start gap-6">
                        <p className="h-3.5 font-caption-regular text-[length:var(--caption-regular-font-size)] font-[number:var(--caption-regular-font-weight)] leading-[var(--caption-regular-line-height)] tracking-[var(--caption-regular-letter-spacing)] text-[#ac937e] [font-style:var(--caption-regular-font-style)]">
                            INVESTIR · VEFA
                        </p>
                        <h2 className="font-headings-h1 text-[length:var(--headings-h1-font-size)] font-[number:var(--headings-h1-font-weight)] leading-[var(--headings-h1-line-height)] tracking-[var(--headings-h1-letter-spacing)] text-[#2e2c2a] [font-style:var(--headings-h1-font-style)]">
                            Investir à mesure que le projet prend forme
                        </h2>
                    </div>
                    <p className="max-w-[516px] font-body-regular text-[length:var(--body-regular-font-size)] font-[number:var(--body-regular-font-weight)] leading-[var(--body-regular-line-height)] tracking-[var(--body-regular-letter-spacing)] text-[#2e2c2a] [font-style:var(--body-regular-font-style)]">
                        La VEFA permet d’acquérir un bien sur plan et d’échelonner les
                        paiements selon l’avancement du projet, jusqu’à la remise des clés.
                    </p>
                </header>
                <ol
                    ref={stepsRef}
                    onPointerDown={handlePointerDown}
                    onPointerMove={handlePointerMove}
                    onPointerUp={handlePointerUp}
                    onPointerLeave={handlePointerUp}
                    onClickCapture={handleStepsClick}
                    className="flex w-full cursor-grab select-none snap-x snap-mandatory items-stretch gap-10 overflow-x-auto active:cursor-grabbing [overscroll-behavior-x:contain] [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden [&_img]:pointer-events-none xl:cursor-auto xl:select-auto xl:items-start xl:justify-between xl:gap-x-6 xl:gap-y-10 xl:overflow-visible"
                >
                    {investmentSteps.map((step) => (
                        <li
                            className={`flex w-[75%] max-w-[320px] flex-none snap-start flex-col items-start gap-[25px] sm:w-[47%] sm:max-w-[380px] lg:w-[31%] ${step.width} xl:flex-none`}
                            key={step.number}
                        >
                            <span
                                aria-hidden="true"
                                className="h-3 w-3 rounded-[5.5px] bg-[#ac937e]"
                            />
                            <img className="h-px w-fit lg:w-full object-left translate-y-4 sm:translate-y-5 lg:translate-y-5 xl:translate-y-6  " alt="Line" src={step.lineSrc} />
                            <div className="flex w-full flex-col items-start gap-2">
                                <span className="h-3.5 font-caption-regular text-[length:var(--caption-regular-font-size)] font-[number:var(--caption-regular-font-weight)] leading-[var(--caption-regular-line-height)] tracking-[var(--caption-regular-letter-spacing)] text-[#2e2c2a] [font-style:var(--caption-regular-font-style)]">
                                    {step.number}
                                </span>
                                <h3 className="font-headings-h4 text-[length:var(--headings-h4-font-size)] font-[number:var(--headings-h4-font-weight)] leading-[var(--headings-h4-line-height)] tracking-[var(--headings-h4-letter-spacing)] text-[#2e2c2a] [font-style:var(--headings-h4-font-style)]">
                                    {step.title}
                                </h3>
                                <p className="font-body-regular text-[length:var(--body-regular-font-size)] font-[number:var(--body-regular-font-weight)] leading-[var(--body-regular-line-height)] tracking-[var(--body-regular-letter-spacing)] text-[#2e2c2a] opacity-[0.66] [font-style:var(--body-regular-font-style)]">
                                    {step.description}
                                </p>
                            </div>
                        </li>
                    ))}
                </ol>
                <aside className="w-full border-t border-[#2e2c2a] py-4">
                    <p className="font-body-regular text-[length:var(--body-regular-font-size)] font-[number:var(--body-regular-font-weight)] leading-[var(--body-regular-line-height)] tracking-[var(--body-regular-letter-spacing)] text-[#2e2c2a] [font-style:var(--body-regular-font-style)]">
                        Les modalités exactes dépendent du programme et du contrat. Demandez
                        une étude personnalisée.
                    </p>
                </aside>
                <div className="flex flex-col w-full lg:w-fit items-start gap-4 sm:flex-row sm:gap-6">
                    {actionButtons.map((action) => (
                       
                        <a className="w-full lg:w-fit" href={action.Link} key={action.Link}>
                        <Button
                            className={`h-auto w-full lg:w-fit rounded-none border-0 px-6 py-4 font-button-small text-[length:var(--button-small-font-size)] font-[number:var(--button-small-font-weight)] leading-[var(--button-small-line-height)] tracking-[var(--button-small-letter-spacing)] shadow-none [font-style:var(--button-small-font-style)] ${action.className}`}
                            key={action.label}
                            type="button"
                        >
                            
                            {action.label}
                        </Button>
                        </a>
                    ))}
                </div>
            </div>
        </section>
    );
};
