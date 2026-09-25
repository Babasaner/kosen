export const CONTACT = {
    phoneDisplay: "+221 78 797 89 89",
    phoneTel: "tel:+221787978989",
    whatsappNumber: "221787978989",
    whatsappMessage: "Bonjour KŌSEN, je souhaite recevoir la brochure et les disponibilités de vos appartements à Dakar Plateau.",
    email: "info@kosen-project.com",
} as const;

export const WHATSAPP_URL = `https://wa.me/${CONTACT.whatsappNumber}?text=${encodeURIComponent(
    CONTACT.whatsappMessage,
)}`;

/**
 * Builds a URL relative to the Vite base, so the build folder can be dropped
 * on a subdomain root or in a sub-directory without rewriting any path.
 */
export const assetUrl = (path: string): string => {
    const base = import.meta.env.BASE_URL || "/";
    return `${base}${path.replace(/^\/+/, "")}`;
};

export const ANCHORS = {
    hero: "#top",
    residences: "#residences",
    concept: "#concept",
    bioclimatique: "#eco-responsable",
    diaspora: "#diaspora",
    investisseurs: "#investisseurs",
    dakar: "#dakar",
    arbres: "#engagement-arbres",
} as const;

/**
 * Single source of truth for the residences: the showcase, the form select and
 * the brochure mapping all read from here so prices and statuses never drift.
 */
export const RESIDENCES = [
    {
        id: "kosen-one",
        name: "KŌSEN One",
        status: "Livré, disponible immédiatement",
        statusShort: "LIVRÉ",
        price: "À partir de 299.000.000 FCFA",
        image: "img/kosen-one.jpg",
    },
    {
        id: "kosen-two",
        name: "KŌSEN Two",
        status: "Livré, disponible immédiatement",
        statusShort: "LIVRÉ",
        price: "À partir de 299.000.000 FCFA",
        image: "img/kosen-two.jpg",
    },
    {
        id: "komorebi-one",
        name: "KŌMOREBI One",
        status: "VEFA · Livraison 1er semestre 2028 · 15 % d'apport",
        statusShort: "VEFA",
        price: "À partir de 269.000.000 FCFA",
        image: "img/komorebione.png",
    },
] as const;

export type ResidenceId = (typeof RESIDENCES)[number]["id"];

/**
 * Brochure PDFs, grouped the way the confirmation screen presents them: one
 * entry per brochure family, not one per residence. KŌSEN ships two separate
 * files, KŌMOREBI a single one.
 *
 * The client asked for two clearly visible buttons rather than a silent
 * automatic download, which iOS Safari routinely blocks.
 */
export interface BrochureFile {
    residenceId: ResidenceId;
    label: string;
    file: string;
}

export interface BrochureGroup {
    id: string;
    residenceIds: readonly ResidenceId[];
    label: string;
    files: readonly BrochureFile[];
}

export const BROCHURE_GROUPS = [
    {
        id: "komorebi",
        residenceIds: ["komorebi-one"],
        label: "Brochure KŌMOREBI One",
        files: [
            { residenceId: "komorebi-one", label: "Brochure KŌMOREBI One", file: "Komorebi-One_plans.pdf" },
        ],
    },
    {
        id: "kosen",
        residenceIds: ["kosen-one", "kosen-two"],
        label: "Brochure KŌSEN One & Two",
        files: [
            { residenceId: "kosen-one", label: "Brochure KŌSEN One", file: "Kosen-One.pdf" },
            { residenceId: "kosen-two", label: "Brochure KŌSEN Two", file: "Kosen-Two.pdf" },
        ],
    },
] as const satisfies readonly BrochureGroup[];

export const brochureHref = (file: string): string => assetUrl(`plan/${file}`);

/** The exact PDF of a single residence, used by the in-form contextual link. */
export const brochureForResidence = (residenceId: ResidenceId | ""): BrochureFile | undefined =>
    BROCHURE_GROUPS.flatMap((group) => [...group.files]).find(
        (brochure) => brochure.residenceId === residenceId,
    );

/** Brochure groups for the confirmation screen, the selected residence first. */
export const brochureGroupsForScreen = (residenceId: ResidenceId | ""): BrochureGroup[] => {
    if (!residenceId) return [...BROCHURE_GROUPS];

    return [...BROCHURE_GROUPS].sort(
        (a, b) =>
            Number(b.residenceIds.some((id) => id === residenceId)) -
            Number(a.residenceIds.some((id) => id === residenceId)),
    );
};

export const KOMOREBI_SPECS = [
    { value: "146–430 m²", label: "SURFACES APPROXIMATIVES" },
    { value: "2 à 4", label: "CHAMBRES" },
    { value: "15 % D'APPORT", label: "PAIEMENT ÉCHELONNÉ" },
    { value: "1er SEMESTRE 2028", label: "REMISE DES CLÉS" },
] as const;

export const navigationItems = [
    { label: "RÉSIDENCES", href: ANCHORS.residences },
    { label: "LE CONCEPT", href: ANCHORS.concept },
    { label: "INVESTIR", href: ANCHORS.investisseurs },
] as const;

export const smoothScrollTo = (href: string): void => {
    const target = document.querySelector(href);
    if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
};
