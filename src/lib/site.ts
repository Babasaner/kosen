export const CONTACT = {
    phoneDisplay: "+221 78 797 89 89",
    phoneTel: "tel:+221787978989",
    whatsappNumber: "221787978989",
    email: "contact@kosen.sn",
} as const;

export const ANCHORS = {
    concept: "#concept",
    residences: "#residences",
    investisseurs: "#investisseurs",
    dakar: "#dakar",
    diaspora: "#diaspora",
    planDeMasse: "#plan-de-masse",
    ecoResponsable: "#eco-responsable",
} as const;

export const RESIDENCE_LINKS = {
    kosenOne: "https://kosen-project.com/projets/kosen-one/",
    kosenTwo: "https://kosen-project.com/projets/kosen-two/",
    komorebiOne: "https://kosen-project.com/projets/komorebi-one/",
} as const;

export const BROCHURE_URL = "#"; // TODO: remplacer par le lien réel du PDF

export const navigationItems = [
    { label: "LE PROJET", href: ANCHORS.concept },
    { label: "RÉSIDENCES", href: ANCHORS.residences },
    { label: "INVESTIR", href: ANCHORS.investisseurs },
    { label: "VIVRE À DAKAR", href: ANCHORS.dakar },
    { label: "DIASPORA", href: ANCHORS.diaspora },
    { label: "GESTION", href: ANCHORS.investisseurs },
] as const;

export const smoothScrollTo = (href: string): void => {
    const target = document.querySelector(href);
    if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
};