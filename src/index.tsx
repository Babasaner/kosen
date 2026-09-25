import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { initGtm } from "./lib/gtm";
import { Landing } from "./screens/landing/Landing";
import "./tailwind.css";

initGtm();

createRoot(document.getElementById("app") as HTMLElement).render(
    <StrictMode>
        <Landing />
    </StrictMode>,
);
