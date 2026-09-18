import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ✅ Mets l'URL de ta vidéo ici (YouTube embed ou chemin local)
const VIDEO_URL = "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&rel=0";
// Pour une vidéo locale (.mp4), remplace VIDEO_URL par le chemin et utilise <video> au lieu de <iframe>

export const VideoShowcaseSection = (): JSX.Element => {
    const [isPlaying, setIsPlaying] = useState(false);
    const sectionRef = useRef<HTMLDivElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);

    // Logique PiP au scroll
    useEffect(() => {
        if (!videoRef.current) return;

        const observer = new IntersectionObserver(
            (entries) => {
                const [entry] = entries;
                if (!entry.isIntersecting && isPlaying && videoRef.current) {
                    // Hors section → PiP
                    if (document.pictureInPictureEnabled && !document.pictureInPictureElement) {
                        videoRef.current.requestPictureInPicture().catch(() => {
                            // PiP non supporté ou refusé par le navigateur
                        });
                    }
                } else if (entry.isIntersecting && document.pictureInPictureElement) {
                    // De retour sur la section → quitter PiP
                    document.exitPictureInPicture().catch(() => {});
                }
            },
            { threshold: 0.2 }
        );

        if (sectionRef.current) observer.observe(sectionRef.current);
        return () => observer.disconnect();
    }, [isPlaying]);

    return (
        <section
            ref={sectionRef}
            id="video-kosen"
            className="relative flex w-full flex-col items-center justify-center overflow-hidden bg-[#2e2c2a]"
            aria-label="Vidéo de présentation KŌSEN"
        >
            {/* ===== Poster / Zone cliquable ===== */}
            <div
                className="relative w-full cursor-pointer"
                style={{ aspectRatio: "16 / 9" }}
                onClick={() => !isPlaying && setIsPlaying(true)}
                role="button"
                tabIndex={0}
                aria-label="Lancer la vidéo de présentation"
                onKeyDown={(e) => e.key === "Enter" && setIsPlaying(true)}
            >
                {/* Image poster */}
                <AnimatePresence>
                    {!isPlaying && (
                        <motion.div
                            initial={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.5 }}
                            className="absolute inset-0"
                        >
                            <img
                                src="/img/video-poster.png"
                                alt="Vidéo KŌSEN"
                                className="h-full w-full object-cover"
                            />
                            {/* Overlay sombre */}
                            <div className="absolute inset-0 bg-black/30" />

                            {/* Bouton Play centré */}
                            <motion.div
                                className="absolute inset-0 flex flex-col items-center justify-center gap-4"
                                whileHover="hover"
                                initial="rest"
                            >
                                <motion.div
                                    variants={{
                                        rest: { scale: 1 },
                                        hover: { scale: 1.1 },
                                    }}
                                    transition={{ duration: 0.3 }}
                                    className="flex h-20 w-20 items-center justify-center rounded-full border-2 border-white bg-black/40 backdrop-blur-sm"
                                >
                                    {/* Icône play SVG */}
                                    <svg
                                        width="32"
                                        height="32"
                                        viewBox="0 0 24 24"
                                        fill="white"
                                        className="ml-1"
                                        aria-hidden="true"
                                    >
                                        <path d="M8 5v14l11-7z" />
                                    </svg>
                                </motion.div>
                                <p className="font-caption-bold text-[13px] tracking-[3px] text-white/80 uppercase">
                                    Voir la vidéo de présentation
                                </p>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Iframe YouTube (ou video tag pour fichier local) */}
                {isPlaying && (
                    <iframe
                        className="absolute inset-0 h-full w-full"
                        src={VIDEO_URL}
                        title="KŌSEN - Vidéo de présentation"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    />
                )}
            </div>

            {/* Caption bas */}
            <div className="flex w-full items-center justify-between px-5 py-4 sm:px-10 lg:px-20">
                <p className="font-caption-regular text-[12px] tracking-[2px] text-white/50 uppercase">
                    KŌSEN — Présentation du projet
                </p>
                {isPlaying && (
                    <button
                        type="button"
                        onClick={() => setIsPlaying(false)}
                        className="font-caption-regular text-[11px] tracking-[1px] text-white/40 hover:text-white/70 transition-colors uppercase"
                    >
                        Fermer ✕
                    </button>
                )}
            </div>
        </section>
    );
};
