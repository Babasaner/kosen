/**
 * Deployment self-check for the lead API.
 *
 * Answers the only question that matters when a hosting deployment fails to
 * send: is the mail provider configured, well formed, and accepting a call from
 * here?
 *
 * It NEVER returns a secret. Only names, booleans and the provider's own error
 * text are exposed, and the live Brevo call requires LEAD_DIAGNOSTICS=true so
 * it stays off in production.
 */

const readEnv = (name) => {
    const value = process.env[name];
    return typeof value === "string" ? value.trim() : "";
};

const brevoEndpoint = "https://api.brevo.com/v3/smtp/email";

const emailLooksValid = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value);

const check = () => {
    const apiKey = readEnv("BREVO_API_KEY");
    const recipientEmail = readEnv("BREVO_RECIPIENT_EMAIL");
    const senderEmail = readEnv("BREVO_SENDER_EMAIL");
    const senderName = readEnv("BREVO_SENDER_NAME");

    return {
        variables: {
            BREVO_API_KEY: {
                present: apiKey.length > 0,
                length: apiKey.length,
                looksLikeBrevoKey: /^xkeysib-/.test(apiKey),
            },
            BREVO_RECIPIENT_EMAIL: {
                present: recipientEmail.length > 0,
                looksLikeEmail: emailLooksValid(recipientEmail),
            },
            BREVO_SENDER_EMAIL: {
                present: senderEmail.length > 0,
                looksLikeEmail: emailLooksValid(senderEmail),
            },
            BREVO_SENDER_NAME: { present: senderName.length > 0 },
        },
        allPresent:
            apiKey.length > 0 &&
            recipientEmail.length > 0 &&
            senderEmail.length > 0,
    };
};

/** Sends a probe email to the real recipient, so the provider's verdict is known. */
const probeBrevo = async () => {
    const apiKey = readEnv("BREVO_API_KEY");
    const recipientEmail = readEnv("BREVO_RECIPIENT_EMAIL");
    const senderEmail = readEnv("BREVO_SENDER_EMAIL");
    const senderName = readEnv("BREVO_SENDER_NAME") || "KŌSEN";

    if (!apiKey || !recipientEmail || !senderEmail) {
        return { attempted: false, reason: "variables manquantes" };
    }

    const startedAt = Date.now();

    try {
        const response = await fetch(brevoEndpoint, {
            method: "POST",
            headers: {
                accept: "application/json",
                "api-key": apiKey,
                "content-type": "application/json",
            },
            body: JSON.stringify({
                sender: { email: senderEmail, name: senderName },
                to: [{ email: recipientEmail, name: "Ali" }],
                subject: "Test de configuration — formulaire KŌSEN",
                textContent:
                    "Ceci est un test automatique envoyé pour vérifier que le formulaire " +
                    "de la page KŌSEN est correctement configuré sur cet hébergement. " +
                    "Vous pouvez ignorer ce message.",
            }),
            signal: AbortSignal.timeout(10_000),
        });

        const detail = (await response.text()).slice(0, 500);

        return {
            attempted: true,
            status: response.status,
            ok: response.ok,
            durationMs: Date.now() - startedAt,
            detail,
        };
    } catch (error) {
        return {
            attempted: true,
            ok: false,
            durationMs: Date.now() - startedAt,
            detail: error instanceof Error ? error.message : String(error),
        };
    }
};

export const handleHealthCheck = async ({ wantsProbe }) => {
    const configuration = check();
    const payload = { ok: configuration.allPresent, ...configuration };

    if (wantsProbe) {
        if (readEnv("LEAD_DIAGNOSTICS") !== "true") {
            return {
                status: 403,
                payload: {
                    ...payload,
                    probe: {
                        attempted: false,
                        reason:
                            "Le test en direct est désactivé. Définissez LEAD_DIAGNOSTICS=true, " +
                            "puis redéployez pour l'activer.",
                    },
                },
            };
        }

        payload.probe = await probeBrevo();
    }

    return { status: 200, payload };
};
