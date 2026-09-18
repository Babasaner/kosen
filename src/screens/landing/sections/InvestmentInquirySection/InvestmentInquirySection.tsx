import { useState } from "react";
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

export const InvestmentInquirySection = (): JSX.Element => {
    const [contactChannel, setContactChannel] = useState("email");

    return (
        <section className="w-full bg-white px-5 py-10 lg:py-0 sm:px-10   lg:px-20 ">
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
                            onSubmit={(event) => event.preventDefault()}
                        >
                            <div className="space-y-4">
                                <div className="flex flex-col gap-2">
                                    <Label
                                        htmlFor="country"
                                        className="font-caption-regular text-[length:var(--caption-regular-font-size)] font-[number:var(--caption-regular-font-weight)] leading-[var(--caption-regular-line-height)] tracking-[var(--caption-regular-letter-spacing)] text-[#2e2c2a] [font-style:var(--caption-regular-font-style)]"
                                    >
                                        PAYS DE RÉSIDENCE
                                    </Label>

                                    <Input
                                        id="country"
                                        className="h-11 rounded-none border-0 border-b border-[#ac937e] bg-transparent px-0 shadow-none focus-visible:ring-0"
                                    />
                                </div>

                                <div className="flex flex-col gap-2">
                                    <Label
                                        htmlFor="language"
                                        className="font-caption-regular text-[length:var(--caption-regular-font-size)] font-[number:var(--caption-regular-font-weight)] leading-[var(--caption-regular-line-height)] tracking-[var(--caption-regular-letter-spacing)] text-[#2e2c2a] [font-style:var(--caption-regular-font-style)]"
                                    >
                                        LANGUE PRÉFÉRÉE
                                    </Label>

                                    <Select defaultValue="francais-english">
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
                                        className="h-11 rounded-none border-0 border-b border-[#ac937e] bg-transparent px-0 shadow-none focus-visible:ring-0"
                                    />
                                </div>

                                <div className="flex flex-col gap-2">
                                    <Label
                                        htmlFor="property"
                                        className="font-caption-regular text-[length:var(--caption-regular-font-size)] font-[number:var(--caption-regular-font-weight)] leading-[var(--caption-regular-line-height)] tracking-[var(--caption-regular-letter-spacing)] text-[#2e2c2a] [font-style:var(--caption-regular-font-style)]"
                                    >
                                        BIEN RECHERCHÉ
                                    </Label>

                                    <Select defaultValue="komorebi-one-kosen-two">
                                        <SelectTrigger
                                            id="property"
                                            className="h-11 rounded-none border-0 border-b border-[#ac937e] bg-transparent px-0 font-body-regular text-[length:var(--body-regular-font-size)] font-[number:var(--body-regular-font-weight)] leading-[var(--body-regular-line-height)] tracking-[var(--body-regular-letter-spacing)] text-[#6d6b6a] shadow-none focus:ring-0 [font-style:var(--body-regular-font-style)]"
                                        >
                                            <SelectValue />
                                        </SelectTrigger>

                                        <SelectContent>
                                            <SelectItem value="komorebi-one-kosen-two">
                                                KŌMOREBI One, KŌSEN Two…
                                            </SelectItem>
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
                                    variant="outline"
                                    className="h-11 w-full rounded-none border-[#2e2c2a] bg-transparent px-6 font-button-default text-[length:var(--button-default-font-size)] font-[number:var(--button-default-font-weight)] leading-[var(--button-default-line-height)] tracking-[var(--button-default-letter-spacing)] text-[#2e2c2a] hover:bg-transparent hover:text-[#2e2c2a] [font-style:var(--button-default-font-style)]"
                                >
                                    ÉCHANGER SUR WHATSAPP
                                </Button>
                            </div>

                            <p className="mt-4 [font-family:'Gelion-Regular',Helvetica] text-[12.2px] font-normal leading-[18.2px] text-[#2e2c2a]">
                                Sans engagement. Vos informations restent confidentielles.
                            </p>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </section>
    );
};
