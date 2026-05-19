import React from "react";

export type AnswerCardState = "placeholder" | "default" | "true";

export interface AnswerCardProps {
    /** Status kartu: placeholder (kosong), default (isi), atau true (benar). Default: "default" */
    state?: AnswerCardState;
    /** Teks jawaban. */
    children?: React.ReactNode;
    /** Event handler saat kartu diklik. */
    onClick?: () => void;
    disabled?: boolean;
    /** Tambahan class Tailwind. */
    className?: string;
}

/**
 * **AnswerCard** — Komponen kartu jawaban untuk permainan mencocokkan kata.
 * 
 * Implementasi dari Figma node `20309-5230`:
 * - `state="placeholder"`: Bingkai putus-putus untuk area drop.
 * - `state="default"`: Kartu jawaban standar (Parchment 100).
 * - `state="true"`: Kartu jawaban saat benar (Teal 200).
 * 
 * @example
 * <AnswerCard state="default">Apple</AnswerCard>
 * <AnswerCard state="true">Bus</AnswerCard>
 * <AnswerCard state="placeholder" />
 */
export const AnswerCard: React.FC<AnswerCardProps> = ({
    state = "default",
    children,
    onClick,
    disabled = false,
    className = "",
}) => {
    const content = (
        <span className={`
            min-w-0 whitespace-nowrap text-center text-b3-extrabold uppercase tracking-wide sm:text-b2-extrabold
            ${state === "default" ? "text-text-strong" : ""}
            ${state === "true" ? "text-(--color-teal-500)" : ""}
            ${state === "placeholder" ? "invisible" : ""}
        `}>
            {children}
        </span>
    );
    const classes = `
        flex items-center justify-center px-[18px] h-[62px] rounded-[20px] border-0
        transition-all duration-200 min-w-[140px] select-none
        ${state === "placeholder" ? "bg-white/30 border-2 border-dashed border-white shadow-[0px_2px_12px_rgba(15,15,15,0.1)]" : ""}
        ${state === "default" ? "bg-[var(--color-parchment-100)] shadow-[inset_0px_-5px_0px_1px_var(--color-parchment-300)] cursor-grab active:cursor-grabbing" : ""}
        ${state === "true" ? "bg-[var(--color-teal-200)] border-2 border-[var(--color-teal-500)] shadow-[inset_0px_-5px_0px_1px_var(--color-teal-500)]" : ""}
        ${disabled ? "pointer-events-none opacity-60" : ""}
        ${className}
    `;

    if (onClick) {
        return (
            <button
                type="button"
                onClick={onClick}
                disabled={disabled}
                className={`${classes} appearance-none`}
            >
                {content}
            </button>
        );
    }

    return (
        <div className={classes}>
            {content}
        </div>
    );
};

export default AnswerCard;
