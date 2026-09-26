import { motion } from "framer-motion";
import { RESIDENCES, assetUrl } from "../../../../lib/site";

/**
 * Single "residences" block placed right below the hero.
 * It merges the masterplan (ecosystem) intro and the three residence
 * vignettes, which used to show the same residences twice. The 3D view of the
 * district is kept as a plain image and the list is no longer clickable:
 * every exit point now goes to the form.
 */
export const NeighborhoodMasterplanSection = (): JSX.Element => {
    return (
        <section
            id="residences"
            className="flex w-full scroll-mt-24 flex-col bg-[#e6ded8] px-5 sm:px-10 lg:px-20"
            aria-labelledby="residences-title"
        >
            <header className="flex w-full flex-col items-start gap-[22px] py-10 sm:py-12 lg:max-w-[589px] lg:py-16">
                <p className="font-caption-bold text-[length:var(--caption-bold-font-size)] font-[number:var(--caption-bold-font-weight)] leading-[var(--caption-bold-line-height)] tracking-[var(--caption-bold-letter-spacing)] text-[#ac937e] [font-style:var(--caption-bold-font-style)]">
                    NOS RÉSIDENCES
                </p>
                <h2
                    id="residences-title"
                    className="font-headings-h1 text-[length:var(--headings-h1-font-size)] font-[number:var(--headings-h1-font-weight)] leading-[var(--headings-h1-line-height)] tracking-[var(--headings-h1-letter-spacing)] text-[#2e2c2a] [font-style:var(--headings-h1-font-style)]"
                >
                    Un écosystème pensé comme un quartier vivant
                </h2>
            </header>

            {/* Vue 3D du quartier, en image */}
            <figure className="w-full overflow-hidden bg-[#2e2c2a]">
                <img
                    className="block h-auto w-full object-cover"
                    alt="Vue d'ensemble du micro-quartier KŌSEN à Dakar Plateau"
                    src={assetUrl("img/Photo-densemble-web.jpg")}
                    loading="eager"
                    width={1280}
                    height={720}
                />
            </figure>

            {/* Trois vignettes : statut de livraison et prix */}
            <ul className="flex w-full flex-col lg:flex-row">
                {RESIDENCES.map((residence, index) => (
                    <motion.li
                        key={residence.id}
                        className="relative flex min-h-[400px] flex-1 flex-col items-start justify-end overflow-hidden lg:min-h-[900px]"
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 0.5, delay: index * 0.08, ease: "easeOut" }}
                    >
                        <div
                            className="absolute inset-0 bg-[#43413f] bg-cover bg-center"
                            style={{ backgroundImage: `url('${assetUrl(residence.image)}')` }}
                            role="img"
                            aria-label={`Résidence ${residence.name}`}
                        />

                        <div
                            className="absolute inset-0"
                            style={{
                                background:
                                    "linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, #000000 100%)",
                            }}
                            aria-hidden="true"
                        />

                        <div className="relative z-10 flex w-full flex-col items-start gap-3 p-6 sm:p-8 lg:p-10">
                            <h3 className="font-headings-h1 w-fit text-[length:var(--headings-h1-font-size)] font-[number:var(--headings-h1-font-weight)] leading-[var(--headings-h1-line-height)] tracking-[var(--headings-h1-letter-spacing)] text-[#ac937e] [font-style:var(--headings-h1-font-style)]">
                                {residence.name}
                            </h3>

                            <p className="font-caption-bold w-fit text-[length:var(--caption-bold-font-size)] font-[number:var(--caption-bold-font-weight)] leading-[var(--caption-bold-line-height)] tracking-[var(--caption-bold-letter-spacing)] text-[#e6ded8] [font-style:var(--caption-bold-font-style)]">
                                {residence.status}
                            </p>

                            <p className="font-headings-h4 w-fit whitespace-wrap text-[length:var(--headings-h4-font-size)] font-[number:var(--headings-h4-font-weight)] leading-[var(--headings-h4-line-height)] tracking-[var(--headings-h4-letter-spacing)] text-[#e6ded8] [font-style:var(--headings-h4-font-style)]">
                                {residence.price}
                            </p>
                        </div>
                    </motion.li>
                ))}
            </ul>
        </section>
    );
};
