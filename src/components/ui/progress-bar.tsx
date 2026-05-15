import React from "react";

export interface ProgressBarProps {
    /**
     * Nilai progress dari 0 sampai `total`.
     * Sesuai varian Figma: Value=0 s.d. Value=5.
     */
    value: number;
    /**
     * Total jumlah segmen. Default: 5.
     * (Mengikuti desain Figma yang memiliki 5 slot progress)
     */
    total?: number;
    /** Tambahan class Tailwind. */
    className?: string;
    /** Label aksesibilitas. Default: otomatis dari value/total */
    "aria-label"?: string;
}

/**
 * **ProgressBar** — Komponen progress bar tersegmentasi (segmented pill).
 *
 * Implementasi dari Figma node `20479-3006` (Component Set):
 * - Terdiri dari beberapa segmen berbentuk pil berjajar rapat.
 * - Segmen **aktif**: `#8C23DE` (ungu gelap).
 * - Segmen **tidak aktif**: `#E3D5FF` (ungu muda).
 * - Segmen pertama punya `border-radius` kiri penuh, terakhir kanan penuh.
 * - Gap antar segmen: 2px.
 *
 * @example
 * // Progress 3 dari 5 (default)
 * <ProgressBar value={3} />
 *
 * // Progress 2 dari 8 soal
 * <ProgressBar value={2} total={8} />
 */
export const ProgressBar: React.FC<ProgressBarProps> = ({
    value,
    total = 5,
    className = "",
    "aria-label": ariaLabel,
}) => {
    const clamped = Math.min(Math.max(0, value), total);

    return (
        <div
            role="progressbar"
            aria-valuenow={clamped}
            aria-valuemin={0}
            aria-valuemax={total}
            aria-label={ariaLabel ?? `Progress: ${clamped} dari ${total}`}
            className={`flex w-full h-[16px] rounded-[999px] overflow-hidden ${className}`}
            style={{ outline: "1px solid #F1E8FF", outlineOffset: "-1px" }}
        >
            {Array.from({ length: total }).map((_, i) => {
                const isFirst = i === 0;
                const isLast = i === total - 1;
                const isFilled = i < clamped;

                return (
                    <div
                        key={i}
                        className="flex-1 h-full transition-colors duration-300"
                        style={{
                            backgroundColor: isFilled ? "#8C23DE" : "#E3D5FF",
                            borderRadius: isFirst
                                ? "999px 0 0 999px"
                                : isLast
                                    ? "0 999px 999px 0"
                                    : "0",
                        }}
                    />
                );
            })}
        </div>
    );
};

export default ProgressBar;
