import { useState } from "react";
import type { FormEvent } from "react";
import { Button } from "../../../../components/ui/button";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "../../../../components/ui/card";
import { Checkbox } from "../../../../components/ui/checkbox";
import { Input } from "../../../../components/ui/input";
import { Label } from "../../../../components/ui/label";
import {
    RadioGroup,
    RadioGroupItem,
} from "../../../../components/ui/radio-group";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../../../../components/ui/select";
import { SearchableSelect } from "../../../../components/ui/searchable-select";
import { CONTACT } from "../../../../lib/site";

const investmentBenefits = [
    {
        number: "01",
        description: "Produit immobilier de standard international",
    },
    {
        number: "02",
        description: "Financement structuré",
    },
    {
        number: "03",
        description: "Accompagnement notarial",
    },
    {
        number: "04",
        description: "Gestion locative dédiée",
    },
];

const contactChannels = [
    { value: "email", label: "E-mail" },
    { value: "telephone", label: "Téléphone" },
    { value: "whatsapp", label: "WhatsApp" },
];

const countries = [
    { value: "afghanistan", label: "Afghanistan", dialCode: "+93" },
    { value: "afrique-du-sud", label: "Afrique du Sud", dialCode: "+27" },
    { value: "albanie", label: "Albanie", dialCode: "+355" },
    { value: "algerie", label: "Algérie", dialCode: "+213" },
    { value: "allemagne", label: "Allemagne", dialCode: "+49" },
    { value: "andorre", label: "Andorre", dialCode: "+376" },
    { value: "angola", label: "Angola", dialCode: "+244" },
    { value: "antigua-et-barbuda", label: "Antigua-et-Barbuda", dialCode: "+1" },
    { value: "arabie-saoudite", label: "Arabie saoudite", dialCode: "+966" },
    { value: "argentine", label: "Argentine", dialCode: "+54" },
    { value: "armenie", label: "Arménie", dialCode: "+374" },
    { value: "australie", label: "Australie", dialCode: "+61" },
    { value: "autriche", label: "Autriche", dialCode: "+43" },
    { value: "azerbaidjan", label: "Azerbaïdjan", dialCode: "+994" },
    { value: "bahamas", label: "Bahamas", dialCode: "+1" },
    { value: "bahrein", label: "Bahreïn", dialCode: "+973" },
    { value: "bangladesh", label: "Bangladesh", dialCode: "+880" },
    { value: "barbade", label: "Barbade", dialCode: "+1" },
    { value: "belgique", label: "Belgique", dialCode: "+32" },
    { value: "belize", label: "Belize", dialCode: "+501" },
    { value: "benin", label: "Bénin", dialCode: "+229" },
    { value: "bhoutan", label: "Bhoutan", dialCode: "+975" },
    { value: "bielorussie", label: "Biélorussie", dialCode: "+375" },
    { value: "birmanie", label: "Birmanie (Myanmar)", dialCode: "+95" },
    { value: "bolivie", label: "Bolivie", dialCode: "+591" },
    { value: "bosnie-herzegovine", label: "Bosnie-Herzégovine", dialCode: "+387" },
    { value: "botswana", label: "Botswana", dialCode: "+267" },
    { value: "bresil", label: "Brésil", dialCode: "+55" },
    { value: "brunei", label: "Brunei", dialCode: "+673" },
    { value: "bulgarie", label: "Bulgarie", dialCode: "+359" },
    { value: "burkina-faso", label: "Burkina Faso", dialCode: "+226" },
    { value: "burundi", label: "Burundi", dialCode: "+257" },
    { value: "cambodge", label: "Cambodge", dialCode: "+855" },
    { value: "cameroun", label: "Cameroun", dialCode: "+237" },
    { value: "canada", label: "Canada", dialCode: "+1" },
    { value: "cap-vert", label: "Cap-Vert", dialCode: "+238" },
    { value: "chili", label: "Chili", dialCode: "+56" },
    { value: "chine", label: "Chine", dialCode: "+86" },
    { value: "chypre", label: "Chypre", dialCode: "+357" },
    { value: "colombie", label: "Colombie", dialCode: "+57" },
    { value: "comores", label: "Comores", dialCode: "+269" },
    { value: "congo", label: "Congo (République du)", dialCode: "+242" },
    { value: "congo-rdc", label: "Congo (République démocratique)", dialCode: "+243" },
    { value: "coree-du-nord", label: "Corée du Nord", dialCode: "+850" },
    { value: "coree-du-sud", label: "Corée du Sud", dialCode: "+82" },
    { value: "costa-rica", label: "Costa Rica", dialCode: "+506" },
    { value: "cote-d-ivoire", label: "Côte d'Ivoire", dialCode: "+225" },
    { value: "croatie", label: "Croatie", dialCode: "+385" },
    { value: "cuba", label: "Cuba", dialCode: "+53" },
    { value: "danemark", label: "Danemark", dialCode: "+45" },
    { value: "djibouti", label: "Djibouti", dialCode: "+253" },
    { value: "dominique", label: "Dominique", dialCode: "+1" },
    { value: "egypte", label: "Égypte", dialCode: "+20" },
    { value: "emirats-arabes-unis", label: "Émirats arabes unis", dialCode: "+971" },
    { value: "equateur", label: "Équateur", dialCode: "+593" },
    { value: "erythree", label: "Érythrée", dialCode: "+291" },
    { value: "espagne", label: "Espagne", dialCode: "+34" },
    { value: "estonie", label: "Estonie", dialCode: "+372" },
    { value: "eswatini", label: "Eswatini", dialCode: "+268" },
    { value: "etats-unis", label: "États-Unis", dialCode: "+1" },
    { value: "ethiopie", label: "Éthiopie", dialCode: "+251" },
    { value: "fidji", label: "Fidji", dialCode: "+679" },
    { value: "finlande", label: "Finlande", dialCode: "+358" },
    { value: "france", label: "France", dialCode: "+33" },
    { value: "gabon", label: "Gabon", dialCode: "+241" },
    { value: "gambie", label: "Gambie", dialCode: "+220" },
    { value: "georgie", label: "Géorgie", dialCode: "+995" },
    { value: "ghana", label: "Ghana", dialCode: "+233" },
    { value: "grece", label: "Grèce", dialCode: "+30" },
    { value: "grenade", label: "Grenade", dialCode: "+1" },
    { value: "guatemala", label: "Guatemala", dialCode: "+502" },
    { value: "guinee", label: "Guinée", dialCode: "+224" },
    { value: "guinee-bissau", label: "Guinée-Bissau", dialCode: "+245" },
    { value: "guinee-equatoriale", label: "Guinée équatoriale", dialCode: "+240" },
    { value: "guyana", label: "Guyana", dialCode: "+592" },
    { value: "haiti", label: "Haïti", dialCode: "+509" },
    { value: "honduras", label: "Honduras", dialCode: "+504" },
    { value: "hongrie", label: "Hongrie", dialCode: "+36" },
    { value: "inde", label: "Inde", dialCode: "+91" },
    { value: "indonesie", label: "Indonésie", dialCode: "+62" },
    { value: "irak", label: "Irak", dialCode: "+964" },
    { value: "iran", label: "Iran", dialCode: "+98" },
    { value: "irlande", label: "Irlande", dialCode: "+353" },
    { value: "islande", label: "Islande", dialCode: "+354" },
    { value: "israel", label: "Israël", dialCode: "+972" },
    { value: "italie", label: "Italie", dialCode: "+39" },
    { value: "jamaique", label: "Jamaïque", dialCode: "+1" },
    { value: "japon", label: "Japon", dialCode: "+81" },
    { value: "jordanie", label: "Jordanie", dialCode: "+962" },
    { value: "kazakhstan", label: "Kazakhstan", dialCode: "+7" },
    { value: "kenya", label: "Kenya", dialCode: "+254" },
    { value: "kirghizistan", label: "Kirghizistan", dialCode: "+996" },
    { value: "kiribati", label: "Kiribati", dialCode: "+686" },
    { value: "kosovo", label: "Kosovo", dialCode: "+383" },
    { value: "koweit", label: "Koweït", dialCode: "+965" },
    { value: "laos", label: "Laos", dialCode: "+856" },
    { value: "lesotho", label: "Lesotho", dialCode: "+266" },
    { value: "lettonie", label: "Lettonie", dialCode: "+371" },
    { value: "liban", label: "Liban", dialCode: "+961" },
    { value: "liberia", label: "Libéria", dialCode: "+231" },
    { value: "libye", label: "Libye", dialCode: "+218" },
    { value: "liechtenstein", label: "Liechtenstein", dialCode: "+423" },
    { value: "lituanie", label: "Lituanie", dialCode: "+370" },
    { value: "luxembourg", label: "Luxembourg", dialCode: "+352" },
    { value: "macedoine-du-nord", label: "Macédoine du Nord", dialCode: "+389" },
    { value: "madagascar", label: "Madagascar", dialCode: "+261" },
    { value: "malaisie", label: "Malaisie", dialCode: "+60" },
    { value: "malawi", label: "Malawi", dialCode: "+265" },
    { value: "maldives", label: "Maldives", dialCode: "+960" },
    { value: "mali", label: "Mali", dialCode: "+223" },
    { value: "malte", label: "Malte", dialCode: "+356" },
    { value: "iles-marshall", label: "Îles Marshall", dialCode: "+692" },
    { value: "maroc", label: "Maroc", dialCode: "+212" },
    { value: "maurice", label: "Maurice", dialCode: "+230" },
    { value: "mauritanie", label: "Mauritanie", dialCode: "+222" },
    { value: "mexique", label: "Mexique", dialCode: "+52" },
    { value: "micronesie", label: "Micronésie", dialCode: "+691" },
    { value: "moldavie", label: "Moldavie", dialCode: "+373" },
    { value: "monaco", label: "Monaco", dialCode: "+377" },
    { value: "mongolie", label: "Mongolie", dialCode: "+976" },
    { value: "montenegro", label: "Monténégro", dialCode: "+382" },
    { value: "mozambique", label: "Mozambique", dialCode: "+258" },
    { value: "namibie", label: "Namibie", dialCode: "+264" },
    { value: "nauru", label: "Nauru", dialCode: "+674" },
    { value: "nepal", label: "Népal", dialCode: "+977" },
    { value: "nicaragua", label: "Nicaragua", dialCode: "+505" },
    { value: "niger", label: "Niger", dialCode: "+227" },
    { value: "nigeria", label: "Nigeria", dialCode: "+234" },
    { value: "norvege", label: "Norvège", dialCode: "+47" },
    { value: "nouvelle-zelande", label: "Nouvelle-Zélande", dialCode: "+64" },
    { value: "oman", label: "Oman", dialCode: "+968" },
    { value: "ouganda", label: "Ouganda", dialCode: "+256" },
    { value: "ouzbekistan", label: "Ouzbékistan", dialCode: "+998" },
    { value: "pakistan", label: "Pakistan", dialCode: "+92" },
    { value: "palaos", label: "Palaos", dialCode: "+680" },
    { value: "palestine", label: "Palestine", dialCode: "+970" },
    { value: "panama", label: "Panama", dialCode: "+507" },
    { value: "papouasie-nouvelle-guinee", label: "Papouasie-Nouvelle-Guinée", dialCode: "+675" },
    { value: "paraguay", label: "Paraguay", dialCode: "+595" },
    { value: "pays-bas", label: "Pays-Bas", dialCode: "+31" },
    { value: "perou", label: "Pérou", dialCode: "+51" },
    { value: "philippines", label: "Philippines", dialCode: "+63" },
    { value: "pologne", label: "Pologne", dialCode: "+48" },
    { value: "portugal", label: "Portugal", dialCode: "+351" },
    { value: "qatar", label: "Qatar", dialCode: "+974" },
    { value: "republique-centrafricaine", label: "République centrafricaine", dialCode: "+236" },
    { value: "republique-dominicaine", label: "République dominicaine", dialCode: "+1" },
    { value: "republique-tcheque", label: "République tchèque", dialCode: "+420" },
    { value: "roumanie", label: "Roumanie", dialCode: "+40" },
    { value: "royaume-uni", label: "Royaume-Uni", dialCode: "+44" },
    { value: "russie", label: "Russie", dialCode: "+7" },
    { value: "rwanda", label: "Rwanda", dialCode: "+250" },
    { value: "saint-kitts-et-nevis", label: "Saint-Kitts-et-Nevis", dialCode: "+1" },
    { value: "saint-marin", label: "Saint-Marin", dialCode: "+378" },
    { value: "saint-vincent-grenadines", label: "Saint-Vincent-et-les-Grenadines", dialCode: "+1" },
    { value: "sainte-lucie", label: "Sainte-Lucie", dialCode: "+1" },
    { value: "salvador", label: "Salvador", dialCode: "+503" },
    { value: "samoa", label: "Samoa", dialCode: "+685" },
    { value: "sao-tome-et-principe", label: "Sao Tomé-et-Principe", dialCode: "+239" },
    { value: "senegal", label: "Sénégal", dialCode: "+221" },
    { value: "serbie", label: "Serbie", dialCode: "+381" },
    { value: "seychelles", label: "Seychelles", dialCode: "+248" },
    { value: "sierra-leone", label: "Sierra Leone", dialCode: "+232" },
    { value: "singapour", label: "Singapour", dialCode: "+65" },
    { value: "slovaquie", label: "Slovaquie", dialCode: "+421" },
    { value: "slovenie", label: "Slovénie", dialCode: "+386" },
    { value: "somalie", label: "Somalie", dialCode: "+252" },
    { value: "soudan", label: "Soudan", dialCode: "+249" },
    { value: "soudan-du-sud", label: "Soudan du Sud", dialCode: "+211" },
    { value: "sri-lanka", label: "Sri Lanka", dialCode: "+94" },
    { value: "suede", label: "Suède", dialCode: "+46" },
    { value: "suisse", label: "Suisse", dialCode: "+41" },
    { value: "suriname", label: "Suriname", dialCode: "+597" },
    { value: "syrie", label: "Syrie", dialCode: "+963" },
    { value: "tadjikistan", label: "Tadjikistan", dialCode: "+992" },
    { value: "tanzanie", label: "Tanzanie", dialCode: "+255" },
    { value: "tchad", label: "Tchad", dialCode: "+235" },
    { value: "thailande", label: "Thaïlande", dialCode: "+66" },
    { value: "timor-oriental", label: "Timor oriental", dialCode: "+670" },
    { value: "togo", label: "Togo", dialCode: "+228" },
    { value: "tonga", label: "Tonga", dialCode: "+676" },
    { value: "trinite-et-tobago", label: "Trinité-et-Tobago", dialCode: "+1" },
    { value: "tunisie", label: "Tunisie", dialCode: "+216" },
    { value: "turkmenistan", label: "Turkménistan", dialCode: "+993" },
    { value: "turquie", label: "Turquie", dialCode: "+90" },
    { value: "tuvalu", label: "Tuvalu", dialCode: "+688" },
    { value: "ukraine", label: "Ukraine", dialCode: "+380" },
    { value: "uruguay", label: "Uruguay", dialCode: "+598" },
    { value: "vanuatu", label: "Vanuatu", dialCode: "+678" },
    { value: "vatican", label: "Vatican", dialCode: "+39" },
    { value: "venezuela", label: "Venezuela", dialCode: "+58" },
    { value: "vietnam", label: "Vietnam", dialCode: "+84" },
    { value: "yemen", label: "Yémen", dialCode: "+967" },
    { value: "zambie", label: "Zambie", dialCode: "+260" },
    { value: "zimbabwe", label: "Zimbabwe", dialCode: "+263" },
    { value: "autre", label: "Autre pays", dialCode: "" },
];

const projectOptions = [
    { value: "kosen-one", label: "KŌSEN One" },
    { value: "kosen-two", label: "KŌSEN Two" },
    { value: "komorebi-one", label: "KŌMOREBI One" },
    { value: "business-center", label: "KŌSEN Business Center" },
    { value: "micro-quartier", label: "Le micro-quartier KŌSEN" },
    { value: "indecis", label: "Autres" },
];

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const InvestmentInquirySection = (): JSX.Element => {
    const [country, setCountry] = useState("");
    const [language, setLanguage] = useState("francais");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [property, setProperty] = useState("");
    const [contactChannel, setContactChannel] = useState("email");
    const [consent, setConsent] = useState(false);
    const [error, setError] = useState("");
    const [dialog, setDialog] = useState<"review" | "success" | null>(null);

    const dialCode = countries.find((item) => item.value === country)?.dialCode ?? "";
    const countryLabel = countries.find((item) => item.value === country)?.label ?? country;
    const propertyLabel =
        projectOptions.find((item) => item.value === property)?.label ?? property;
    const languageLabel =
        { francais: "Français", anglais: "Anglais", wolof: "Wolof", arabe: "Arabe" }[language] ?? language;
    const contactChannelLabel =
        contactChannels.find((channel) => channel.value === contactChannel)?.label ?? contactChannel;

    const handlePhoneChange = (value: string): void => {
        const hasInternationalPrefix = value.trim().startsWith("+");
        const digits = value.replace(/\D/g, "");
        const matchingCountry = countries
            .filter((item) => item.dialCode && digits.startsWith(item.dialCode.replace("+", "")))
            .sort((first, second) => second.dialCode.length - first.dialCode.length)[0];

        if (matchingCountry && (hasInternationalPrefix || !country)) {
            setCountry(matchingCountry.value);
            setPhone(digits.slice(matchingCountry.dialCode.replace("+", "").length));
            return;
        }

        setPhone(digits);
    };

    const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
        event.preventDefault();
        setError("");
        if (!country) {
            setError("Merci de sélectionner votre pays de résidence pour obtenir le bon indicatif.");
            return;
        }
        if (!EMAIL_PATTERN.test(email)) {
            setError("Merci de renseigner un e-mail valide pour être recontacté.");
            return;
        }
        const phoneDigits = phone.replace(/\D/g, "");
        if (phoneDigits.length < 4) {
            setError("Merci d'indiquer un numéro de téléphone pour que l'on puisse vous joindre.");
            return;
        }
        if (!property) {
            setError("Merci de choisir le bien qui vous intéresse.");
            return;
        }
        if (!consent) {
            setError("Merci d'accepter d'être recontacté par KŌSEN.");
            return;
        }
        setDialog("review");
    };

    const handleConfirm = (): void => {
        setCountry("");
        setLanguage("francais");
        setEmail("");
        setPhone("");
        setProperty("");
        setContactChannel("email");
        setConsent(false);
        setError("");
        setDialog("success");
    };

    const openWhatsApp = (): void => {
        const message = encodeURIComponent(
            "Bonjour KŌSEN, j'aimerais échanger à propos d'un projet immobilier à Dakar."
        );
        window.open(`https://wa.me/${CONTACT.whatsappNumber}?text=${message}`, "_blank", "noopener,noreferrer");
    };

    return (
        <section id="diaspora" className="w-full scroll-mt-24 bg-white px-5 py-10 lg:py-0 sm:px-10   lg:px-20 ">
            <div className="mx-auto grid w-full grid-cols-1 gap-10 lg:grid-cols-[minmax(0,520px)_minmax(0,1fr)_minmax(0,518.64px)] lg:gap-0">
                <div className="flex flex-col items-start justify-center gap-6 lg:col-start-1 lg:row-start-1 lg:self-center">
                    <p className="font-caption-regular text-center md:text-left text-[length:var(--caption-regular-font-size)] font-[number:var(--caption-regular-font-weight)] leading-[var(--caption-regular-line-height)] tracking-[var(--caption-regular-letter-spacing)] text-[#ac937e] [font-style:var(--caption-regular-font-style)]">
                        DIASPORA
                    </p>

                    <h2 className="font-headings-h1 text-[length:var(--headings-h1-font-size)] font-[number:var(--headings-h1-font-weight)] leading-[var(--headings-h1-line-height)] tracking-[var(--headings-h1-letter-spacing)] text-[#2e2c2a] [font-style:var(--headings-h1-font-style)]">
                        Investissez à Dakar, où que vous soyez
                    </h2>

                    <p className="font-body-regular text-[length:var(--body-regular-font-size)] font-[number:var(--body-regular-font-weight)] leading-[var(--body-regular-line-height)] tracking-[var(--body-regular-letter-spacing)] text-[#2e2c2a] [font-style:var(--body-regular-font-style)]">
                        Vous souhaitez investir à Dakar, vous constituer un patrimoine,
                        préparer votre retour. KŌSEN a structuré un dispositif complet,
                        conforme aux standards des grandes places financières européennes.
                    </p>

                    <dl className="grid w-full grid-cols-2 border-t border-[#2e2c2a2e]">
                        {investmentBenefits.map((benefit, index) => (
                            <div
                                key={benefit.number}
                                className={`min-h-[90px] border-b border-[#2e2c2a2e] py-[25px] font-body-bold text-[length:var(--body-bold-font-size)] font-[number:var(--body-bold-font-weight)] leading-[var(--body-bold-line-height)] tracking-[var(--body-bold-letter-spacing)] text-[#2e2c2a] [font-style:var(--body-bold-font-style)] ${index % 2 === 0
                                    ? "border-r border-[#2e2c2a2e] pr-[18px]"
                                    : "pl-[18px]"
                                    }`}
                            >
                                <dt>{benefit.number}</dt>
                                <dd>{benefit.description}</dd>
                            </div>
                        ))}
                    </dl>
                </div>
                <img
                    className="order-2 h-auto w-full object-cover lg:col-start-3 lg:row-start-1 lg:order-none lg:h-[879px] lg:w-[599px] lg:max-w-none"
                    alt="Photo d'ensemble Kōsen"
                    src="/img/4b036e24d3230745fddd0ec50f95690afc0a1c4a.png"
                />

                <Card className="order-3 w-full rounded-none  bg-[#e6ded8] shadow-none lg:col-start-3 lg:row-start-1 lg:order-none lg:self-center">
                    <CardHeader className="p-8 pb-0">
                        <CardTitle className="font-headings-h4 text-[length:var(--headings-h4-font-size)] font-[number:var(--headings-h4-font-weight)] leading-[var(--headings-h4-line-height)] tracking-[var(--headings-h4-letter-spacing)] text-[#2e2c2a] [font-style:var(--headings-h4-font-style)]">
                            Parler à un conseiller diaspora
                        </CardTitle>
                    </CardHeader>

                    <CardContent className="p-8 pt-6">
                        <form
                            className="flex flex-col"
                            onSubmit={handleSubmit}
                            noValidate
                        >
                            <div className="space-y-4">
                                <div className="flex flex-col gap-2">
                                    <Label
                                        htmlFor="country"
                                        className="font-caption-regular text-[length:var(--caption-regular-font-size)] font-[number:var(--caption-regular-font-weight)] leading-[var(--caption-regular-line-height)] tracking-[var(--caption-regular-letter-spacing)] text-[#2e2c2a] [font-style:var(--caption-regular-font-style)]"
                                    >
                                        PAYS DE RÉSIDENCE
                                    </Label>

                                    <SearchableSelect
                                        id="country"
                                        value={country}
                                        placeholder="Recherchez votre pays"
                                        searchPlaceholder="Rechercher un pays…"
                                        emptyText="Aucun pays trouvé."
                                        options={countries}
                                        triggerClassName="font-body-regular text-[length:var(--body-regular-font-size)] font-[number:var(--body-regular-font-weight)] leading-[var(--body-regular-line-height)] tracking-[var(--body-regular-letter-spacing)] text-[#6d6b6a] [font-style:var(--body-regular-font-style)]"
                                        onValueChange={(value) => {
                                            setCountry(value);
                                            setPhone("");
                                        }}
                                    />
                                </div>

                                <div className="flex flex-col gap-2">
                                    <Label
                                        htmlFor="language"
                                        className="font-caption-regular text-[length:var(--caption-regular-font-size)] font-[number:var(--caption-regular-font-weight)] leading-[var(--caption-regular-line-height)] tracking-[var(--caption-regular-letter-spacing)] text-[#2e2c2a] [font-style:var(--caption-regular-font-style)]"
                                    >
                                        LANGUE PRÉFÉRÉE
                                    </Label>

                                    <Select value={language} onValueChange={setLanguage}>
                                        <SelectTrigger
                                            id="language"
                                            className="h-11 rounded-none border-0 border-b border-[#ac937e] bg-transparent px-0 font-body-regular text-[length:var(--body-regular-font-size)] font-[number:var(--body-regular-font-weight)] leading-[var(--body-regular-line-height)] tracking-[var(--body-regular-letter-spacing)] text-[#6d6b6a] shadow-none focus:ring-0 [font-style:var(--body-regular-font-style)]"
                                        >
                                            <SelectValue />
                                        </SelectTrigger>

                                        <SelectContent>
                                            <SelectItem value="francais">
                                                Français
                                            </SelectItem>
                                            <SelectItem value="anglais">
                                                Anglais
                                            </SelectItem>
                                            <SelectItem value="wolof">
                                                Wolof
                                            </SelectItem>
                                            <SelectItem value="arabe">
                                                Arabe
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="flex flex-col gap-2">
                                    <Label
                                        htmlFor="email"
                                        className="font-caption-regular text-[length:var(--caption-regular-font-size)] font-[number:var(--caption-regular-font-weight)] leading-[var(--caption-regular-line-height)] tracking-[var(--caption-regular-letter-spacing)] text-[#2e2c2a] [font-style:var(--caption-regular-font-style)]"
                                    >
                                        E-MAIL *
                                    </Label>

                                    <Input
                                        id="email"
                                        type="email"
                                        value={email}
                                        onChange={(event) => setEmail(event.target.value)}
                                        className="h-11 rounded-none border-0 border-b border-[#ac937e] bg-transparent px-0 shadow-none focus-visible:ring-0"
                                    />
                                </div>

                                <div className="flex flex-col gap-2">
                                    <Label
                                        htmlFor="phone"
                                        className="font-caption-regular text-[length:var(--caption-regular-font-size)] font-[number:var(--caption-regular-font-weight)] leading-[var(--caption-regular-line-height)] tracking-[var(--caption-regular-letter-spacing)] text-[#2e2c2a] [font-style:var(--caption-regular-font-style)]"
                                    >
                                        TÉLÉPHONE / WHATSAPP *
                                    </Label>

                                    <div className="flex items-center gap-2 border-b border-[#ac937e]">
                                        {dialCode && (
                                            <span className="shrink-0 font-body-regular text-[length:var(--body-regular-font-size)] font-[number:var(--body-regular-font-weight)] leading-[var(--body-regular-line-height)] tracking-[var(--body-regular-letter-spacing)] text-[#6d6b6a] [font-style:var(--body-regular-font-style)]">
                                                {dialCode}
                                            </span>
                                        )}
                                        <Input
                                            id="phone"
                                            type="tel"
                                            inputMode="tel"
                                            value={phone}
                                            onChange={(event) => handlePhoneChange(event.target.value)}
                                            placeholder={
                                                dialCode
                                                    ? "Votre numéro de téléphone"
                                                    : "Ex : 78 797 89 89"
                                            }
                                            className="h-11 flex-1 rounded-none border-0 bg-transparent px-0 shadow-none focus-visible:ring-0"
                                        />
                                    </div>
                                    <span className="[font-family:'Gelion-Regular',Helvetica] text-[11.4px] font-normal leading-[17px] text-[#6d6b6a]">
                                        L&apos;indicatif s&apos;ajoute automatiquement selon votre pays de résidence.
                                    </span>
                                </div>

                                <div className="flex flex-col gap-2">
                                    <Label
                                        htmlFor="property"
                                        className="font-caption-regular text-[length:var(--caption-regular-font-size)] font-[number:var(--caption-regular-font-weight)] leading-[var(--caption-regular-line-height)] tracking-[var(--caption-regular-letter-spacing)] text-[#2e2c2a] [font-style:var(--caption-regular-font-style)]"
                                    >
                                        BIEN RECHERCHÉ
                                    </Label>

                                    <Select value={property} onValueChange={setProperty}>
                                        <SelectTrigger
                                            id="property"
                                            className="h-11 rounded-none border-0 border-b border-[#ac937e] bg-transparent px-0 font-body-regular text-[length:var(--body-regular-font-size)] font-[number:var(--body-regular-font-weight)] leading-[var(--body-regular-line-height)] tracking-[var(--body-regular-letter-spacing)] text-[#6d6b6a] shadow-none focus:ring-0 [font-style:var(--body-regular-font-style)]"
                                        >
                                            <SelectValue placeholder="Choisissez votre projet" />
                                        </SelectTrigger>

                                        <SelectContent>
                                            {projectOptions.map((item) => (
                                                <SelectItem key={item.value} value={item.value}>
                                                    {item.label}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            <fieldset className="mt-4">
                                <legend className="[font-family:'Gelion-Regular',Helvetica] text-[12.8px] font-normal leading-[19.2px] text-[#2e2c2a]">
                                    Canal de contact préféré
                                </legend>

                                <RadioGroup
                                    value={contactChannel}
                                    onValueChange={setContactChannel}
                                    className="mt-2 flex flex-wrap gap-x-4 gap-y-2"
                                >
                                    {contactChannels.map((channel) => (
                                        <div
                                            key={channel.value}
                                            className="flex items-center gap-2"
                                        >
                                            <RadioGroupItem
                                                value={channel.value}
                                                id={channel.value}
                                                className="h-[13px] w-[13px] border-[#2e2c2a] text-[#2e2c2a]"
                                            />

                                            <Label
                                                htmlFor={channel.value}
                                                className="[font-family:'Gelion-Regular',Helvetica] text-[14.4px] font-normal leading-[21.6px] text-black"
                                            >
                                                {channel.label}
                                            </Label>
                                        </div>
                                    ))}
                                </RadioGroup>
                            </fieldset>

                            <div className="mt-4 flex items-start gap-3">
                                <Checkbox
                                    id="consent"
                                    checked={consent}
                                    onCheckedChange={(checked) => setConsent(checked === true)}
                                    className="mt-0.5 h-4 w-4 rounded-none border-[#2e2c2a] data-[state=checked]:bg-[#2e2c2a]"
                                />

                                <Label
                                    htmlFor="consent"
                                    className="[font-family:'Gelion-Regular',Helvetica] text-[13.1px] font-normal leading-[19.7px] text-[#2e2c2a]"
                                >
                                    J&apos;accepte que KŌSEN me recontacte au sujet de ma demande.
                                </Label>
                            </div>

                            <div className="mt-6 flex flex-col gap-3">
                                <Button
                                    type="submit"
                                    className="h-11 w-full rounded-none bg-[#2e2c2a] px-6 font-button-default text-[length:var(--button-default-font-size)] font-[number:var(--button-default-font-weight)] leading-[var(--button-default-line-height)] tracking-[var(--button-default-letter-spacing)] text-white hover:bg-[#2e2c2a] [font-style:var(--button-default-font-style)]"
                                >
                                    ÉTUDIER MON PROJET
                                </Button>

                                <Button
                                    type="button"
                                    onClick={openWhatsApp}
                                    variant="outline"
                                    className="h-11 w-full rounded-none border-[#2e2c2a] bg-transparent px-6 font-button-default text-[length:var(--button-default-font-size)] font-[number:var(--button-default-font-weight)] leading-[var(--button-default-line-height)] tracking-[var(--button-default-letter-spacing)] text-[#2e2c2a] hover:bg-transparent hover:text-[#2e2c2a] [font-style:var(--button-default-font-style)]"
                                >
                                    ÉCHANGER SUR WHATSAPP
                                </Button>
                            </div>

                            {error && (
                                <p
                                    role="alert"
                                    className="mt-4 [font-family:'Gelion-Regular',Helvetica] text-[12.2px] font-normal leading-[18.2px] text-[#a9442f]"
                                >
                                    {error}
                                </p>
                            )}

                            <p className="mt-4 [font-family:'Gelion-Regular',Helvetica] text-[12.2px] font-normal leading-[18.2px] text-[#2e2c2a]">
                                Sans engagement. Vos informations restent confidentielles.
                            </p>
                        </form>
                    </CardContent>
                </Card>
            </div>
            {dialog && (
                <div
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-[#2e2c2acc] px-5 py-8"
                    role="presentation"
                    onMouseDown={(event) => {
                        if (event.target === event.currentTarget) {
                            setDialog(null);
                        }
                    }}
                >
                    <div
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="inquiry-dialog-title"
                        className="w-full max-w-[520px] border border-[#ac937e] bg-[#e6ded8] p-6 text-[#2e2c2a] shadow-2xl sm:p-8"
                    >
                        {dialog === "review" ? (
                            <>
                                <p className="font-caption-regular text-[12px] tracking-[0.08em] text-[#ac937e]">
                                    DERNIÈRE VÉRIFICATION
                                </p>
                                <h3 id="inquiry-dialog-title" className="mt-2 font-headings-h4 text-2xl leading-tight">
                                    Votre demande est prête
                                </h3>
                                <p className="mt-3 font-body-regular text-sm leading-6">
                                    Vérifiez vos informations avant de les transmettre à notre équipe.
                                </p>
                                <dl className="mt-6 divide-y divide-[#2e2c2a2e] border-y border-[#2e2c2a2e] text-sm">
                                    <div className="flex justify-between gap-4 py-3"><dt className="text-[#6d6b6a]">Pays</dt><dd className="text-right font-medium">{countryLabel}</dd></div>
                                    <div className="flex justify-between gap-4 py-3"><dt className="text-[#6d6b6a]">E-mail</dt><dd className="break-all text-right font-medium">{email}</dd></div>
                                    <div className="flex justify-between gap-4 py-3"><dt className="text-[#6d6b6a]">Téléphone</dt><dd className="text-right font-medium">{dialCode} {phone}</dd></div>
                                    <div className="flex justify-between gap-4 py-3"><dt className="text-[#6d6b6a]">Projet</dt><dd className="text-right font-medium">{propertyLabel}</dd></div>
                                    <div className="flex justify-between gap-4 py-3"><dt className="text-[#6d6b6a]">Contact par</dt><dd className="text-right font-medium">{contactChannelLabel}</dd></div>
                                    <div className="flex justify-between gap-4 py-3"><dt className="text-[#6d6b6a]">Langue</dt><dd className="text-right font-medium">{languageLabel}</dd></div>
                                </dl>
                                <div className="mt-6 flex flex-col gap-3 sm:flex-row-reverse">
                                    <Button
                                        type="button"
                                        onClick={handleConfirm}
                                        className="h-11 flex-1 rounded-none bg-[#2e2c2a] font-button-default text-white hover:bg-[#2e2c2a]"
                                    >
                                        ENVOYER MA DEMANDE
                                    </Button>
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={() => setDialog(null)}
                                        className="h-11 flex-1 rounded-none border-[#2e2c2a] bg-transparent text-[#2e2c2a] hover:bg-transparent hover:text-[#2e2c2a]"
                                    >
                                        MODIFIER
                                    </Button>
                                </div>
                            </>
                        ) : (
                            <>
                                <p className="font-caption-regular text-[12px] tracking-[0.08em] text-[#ac937e]">DEMANDE TRANSMISE</p>
                                <h3 id="inquiry-dialog-title" className="mt-2 font-headings-h4 text-2xl leading-tight">Merci pour votre intérêt pour KŌSEN</h3>
                                <p className="mt-4 font-body-regular text-sm leading-6">
                                    Merci pour la confiance que vous accordez à KŌSEN. Votre projet immobilier à Dakar mérite une attention particulière : notre équipe vous contactera prochainement pour vous présenter les opportunités les plus adaptées à vos ambitions.
                                </p>
                                <Button
                                    type="button"
                                    onClick={() => setDialog(null)}
                                    className="mt-6 h-11 w-full rounded-none bg-[#2e2c2a] font-button-default text-white hover:bg-[#2e2c2a]"
                                >
                                    FERMER
                                </Button>
                            </>
                        )}
                    </div>
                </div>
            )}
        </section>
    );
};