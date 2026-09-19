export const CONTACT = {
    phoneDisplay: "+221 78 797 89 89",
    phoneTel: "tel:+221787978989",
    whatsappNumber: "221787978989",
    email: "info@kosen-project.com",
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
    kosenOne: "#plan-de-masse",
    kosenTwo: "#plan-de-masse",
    komorebiOne: "#plan-de-masse",
} as const;

export const BROCHURE_URL = "#"; // TODO: remplacer par le lien réel du PDF

export const navigationItems = [
    { label: "LE CONCEPT", href: ANCHORS.concept },
    { label: "RÉSIDENCES", href: ANCHORS.residences },
    { label: "INVESTIR", href: ANCHORS.investisseurs },
    
  
    
] as const;

export const smoothScrollTo = (href: string): void => { 
    const target = document.querySelector(href);
    if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
};