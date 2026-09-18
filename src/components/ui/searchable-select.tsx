import { useEffect, useMemo, useRef, useState } from "react";
import type { KeyboardEvent as ReactKeyboardEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { cn } from "../../lib/utils";

export interface SearchableSelectOption {
    value: string;
    label: string;
}

interface SearchableSelectProps {
    id?: string;
    value: string;
    placeholder?: string;
    searchPlaceholder?: string;
    emptyText?: string;
    options: SearchableSelectOption[];
    triggerClassName?: string;
    onValueChange: (value: string) => void;
}

const normalize = (text: string): string =>
    text
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase();

export const SearchableSelect = ({
    id,
    value,
    placeholder,
    searchPlaceholder = "Rechercher…",
    emptyText = "Aucun résultat",
    options,
    triggerClassName,
    onValueChange,
}: SearchableSelectProps): JSX.Element => {
    const [open, setOpen] = useState(false);
    const [query, setQuery] = useState("");
    const [highlightedIndex, setHighlightedIndex] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const listRef = useRef<HTMLUListElement>(null);

    const selected = options.find((option) => option.value === value);

    const filteredOptions = useMemo(() => {
        const q = normalize(query);
        return options.filter((option) => normalize(option.label).includes(q));
    }, [options, query]);

    useEffect(() => {
        const handlePointerDown = (event: MouseEvent): void => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setOpen(false);
            }
        };
        const handleKeyDown = (event: KeyboardEvent): void => {
            if (event.key === "Escape") {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handlePointerDown);
        document.addEventListener("keydown", handleKeyDown);
        return () => {
            document.removeEventListener("mousedown", handlePointerDown);
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, []);

    useEffect(() => {
        if (open) {
            setQuery("");
            setHighlightedIndex(0);
            window.requestAnimationFrame(() => inputRef.current?.focus());
        }
    }, [open]);

    useEffect(() => {
        const highlighted = listRef.current?.children[highlightedIndex] as HTMLElement | undefined;
        highlighted?.scrollIntoView({ block: "nearest" });
    }, [highlightedIndex]);

    const handleKeyDown = (event: ReactKeyboardEvent<HTMLDivElement>): void => {
        if (!open) {
            return;
        }
        if (event.key === "ArrowDown") {
            event.preventDefault();
            setHighlightedIndex((index) => Math.min(index + 1, filteredOptions.length - 1));
        } else if (event.key === "ArrowUp") {
            event.preventDefault();
            setHighlightedIndex((index) => Math.max(index - 1, 0));
        } else if (event.key === "Enter" && filteredOptions[highlightedIndex]) {
            event.preventDefault();
            onValueChange(filteredOptions[highlightedIndex].value);
            setOpen(false);
        }
    };

    return (
        <div ref={containerRef} className="relative" onKeyDown={handleKeyDown}>
            <button
                type="button"
                id={id}
                onClick={() => setOpen((isOpen) => !isOpen)}
                aria-haspopup="listbox"
                aria-expanded={open}
                className={cn(
                    "flex h-11 w-full items-center justify-between gap-2 rounded-none border-0 border-b border-[#ac937e] bg-transparent px-0 shadow-none focus:outline-none focus-visible:ring-0",
                    triggerClassName
                )}
            >
                <span className={cn("truncate", selected ? "text-[#2e2c2a]" : "text-[#6d6b6a]")}>
                    {selected ? selected.label : placeholder}
                </span>
                <ChevronDown
                    className={cn(
                        "h-4 w-4 shrink-0 opacity-60 transition-transform duration-200",
                        open && "rotate-180"
                    )}
                />
            </button>

            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ opacity: 0, y: -6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        transition={{ duration: 0.15, ease: "easeOut" }}
                        className="absolute left-0 right-0 z-50 mt-1 border border-[#ac937e] bg-white shadow-xl"
                    >
                        <div className="border-b border-[#2e2c2a2e] px-3">
                            <input
                                ref={inputRef}
                                value={query}
                                onChange={(event) => {
                                    setQuery(event.target.value);
                                    setHighlightedIndex(0);
                                }}
                                placeholder={searchPlaceholder}
                                aria-label={searchPlaceholder}
                                className="h-10 w-full bg-transparent text-sm text-[#2e2c2a] outline-none placeholder:text-[#6d6b6a]"
                            />
                        </div>

                        {filteredOptions.length > 0 ? (
                            <ul ref={listRef} role="listbox" className="max-h-56 overflow-y-auto p-1">
                                {filteredOptions.map((option, index) => (
                                    <li key={option.value}>
                                        <button
                                            type="button"
                                            role="option"
                                            aria-selected={option.value === value}
                                            onClick={() => {
                                                onValueChange(option.value);
                                                setOpen(false);
                                            }}
                                            onMouseEnter={() => setHighlightedIndex(index)}
                                            className={cn(
                                                "flex w-full items-center justify-between px-3 py-2 text-left text-sm transition-colors",
                                                highlightedIndex === index && "bg-[#e6ded8]",
                                                option.value === value
                                                    ? "text-[#ac937e]"
                                                    : "text-[#2e2c2a]"
                                            )}
                                        >
                                            {option.label}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="px-3 py-4 text-sm text-[#6d6b6a]">{emptyText}</p>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};