import { motion } from "framer-motion";
import { Button } from "../../../../components/ui/button";

const showcaseProperties = [
    {
        name: "KOSEN One",
        price: "À PARTIR DE 299.000.000 FCFA",
        imageUrl: "/img/kosen-one.jpg",
        link: "https://kosen-project.com/projets/kosen-one/"
    },
    {
        name: "KOSEN TWO",
        price: "À PARTIR DE 299.000.000 FCFA",
        imageUrl: "/img/kosen-two.jpg",
        link: "https://kosen-project.com/projets/kosen-two/"
    },
    {
        name: "KOMOREBI ONE",
        price: "À PARTIR DE 269.000.000 FCFA",
        imageUrl: "/img/komorebione.png", // L'extension corrigée en .png
        link: "https://kosen-project.com/projets/komorebi-one/"
    },
];

export const KomorebiShowcaseSection = (): JSX.Element => {
    return (
        <section
            id="residences"
            className="flex h-[900px] w-full self-stretch overflow-hidden bg-[#2e2c2a] flex-col lg:flex-row"
            aria-label="Nos résidences"
        >
            {showcaseProperties.map((property) => (
                <motion.article
                    key={property.name}
                    className="relative flex min-w-0 flex-1 flex-col items-start justify-end overflow-hidden p-10 group"
                    initial="initial"
                    whileHover="hover"
                >
                    {/* Image de fond avec effet de zoom au survol (Framer Motion) */}
                    <motion.div
                        className="absolute inset-0 z-0 bg-[#43413f] bg-cover bg-center"
                        style={{
                            backgroundImage: `url('${property.imageUrl}')`
                        }}
                        variants={{
                            initial: { scale: 1 },
                            hover: { scale: 1.05 }
                        }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                    />

                    {/* Voile assombri (gradient) exact du design pour la lisibilité du texte */}
                    <div
                        className="absolute inset-0 z-10"
                        style={{ background: "linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, #000000 100%)" }}
                    />

                    <div className="relative z-20 flex flex-col items-start gap-6">
                        <h2 className="font-headings-h1 w-fit text-[length:var(--headings-h1-font-size)] font-[number:var(--headings-h1-font-weight)] leading-[var(--headings-h1-line-height)] tracking-[var(--headings-h1-letter-spacing)] text-[#ac937e] [font-style:var(--headings-h1-font-style)]">
                            {property.name}
                        </h2>
                        <p className="font-headings-h4 w-fit whitespace-wrap text-[length:var(--headings-h4-font-size)] font-[number:var(--headings-h4-font-weight)] leading-[var(--headings-h4-line-height)] tracking-[var(--headings-h4-letter-spacing)] text-[#e6ded8] [font-style:var(--headings-h4-font-style)]">
                            {property.price}
                        </p>
                        <Button
                            type="button"
                            variant="outline"
                            className="h-auto rounded-none border-[#ac937e] bg-transparent px-6 py-4 font-button-default text-[length:var(--button-default-font-size)] font-[number:var(--button-default-font-weight)] leading-[var(--button-default-line-height)] tracking-[var(--button-default-letter-spacing)] text-[#eee9e5] shadow-none hover:border-[#ac937e] hover:bg-[#ac937e]/15 hover:text-[#eee9e5] transition-colors duration-300 [font-style:var(--button-default-font-style)]"
                        >
                            <a href={property.link} target="_blank" rel="noopener noreferrer">
                                DÉCOUVRIR
                            </a>
                        </Button>
                    </div>
                </motion.article>
            ))}
        </section>
    );
};
