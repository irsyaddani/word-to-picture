import React, { useId } from "react";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface StarProps {
    /** Bintang aktif (kuning) atau tidak aktif (abu-abu). Default: false */
    active?: boolean;
    /**
     * Ukuran bintang dalam pixel.
     * Default: 28 (Sesuai tinggi standar Figma)
     */
    size?: number;
    /** Label aksesibilitas — sangat penting untuk komponen gamifikasi */
    "aria-label"?: string;
    /** Tambahan class Tailwind */
    className?: string;
}

/**
 * **Star Component**
 * 
 * Menggunakan SVG Path eksak dari Figma node 20309:5187.
 * Terdiri dari 4 layer: Body, Shadow Bawah, dan 2 Highlight Atas.
 */
export const Star: React.FC<StarProps> = ({
    active = false,
    size = 28,
    "aria-label": ariaLabel = "Bintang Rating",
    className,
}) => {
    const id = useId(); // Untuk id unik clipPath

    // Dimensi dasar dari Figma
    const VB_W = 30;
    const VB_H = 28;

    // Rasio aspek untuk lebar proporsional
    const width = (VB_W / VB_H) * size;

    // Warna menggunakan CSS Variables dari Design System
    const colors = {
        body: active ? "var(--color-yellow-base)" : "var(--color-neutral-300)",
        shadow: active ? "var(--color-yellow-600)" : "var(--color-neutral-400)",
        highlight: active ? "var(--color-yellow-300)" : "var(--color-neutral-200)",
    };

    return (
        <svg
            width={width}
            height={size}
            viewBox={`0 0 ${VB_W} ${VB_H}`}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            role="img"
            aria-label={ariaLabel}
            className={className}
        >
            {/* Layer 1: Body Utama Bintang */}
            <path
                d="M15.7203 0.671791L19.5382 8.62416L28.2777 9.79945C29.2621 9.93185 29.6561 11.1449 28.9374 11.8308L22.5576 17.921L24.1409 26.5997C24.3193 27.5773 23.2879 28.327 22.4138 27.8552L14.6528 23.6667L6.8919 27.8552C6.01771 28.327 4.98632 27.5773 5.1647 26.5997L6.7481 17.921L0.368201 11.8308C-0.350423 11.1449 0.0435385 9.93185 1.02793 9.79945L9.76745 8.62416L13.5854 0.671791C14.0154 -0.22393 15.2903 -0.22393 15.7203 0.671791H15.7203Z"
                fill={colors.body}
            />

            {/* Layer 2: Shadow Bagian Bawah */}
            <path
                d="M28.9375 11.8304L22.5577 17.9209L24.1409 26.5997C24.3195 27.5769 23.2877 28.3267 22.4137 27.8549L14.6528 23.6666L6.89187 27.8549C6.01782 28.3267 4.98606 27.5769 5.16468 26.5997L6.74781 17.9209L0.368079 11.8304C-0.0480098 11.4335 -0.0913381 10.8595 0.13789 10.4208L7.92605 16.4096L6.57847 23.7952C6.42712 24.6268 7.30458 25.2651 8.04868 24.8635L14.6528 21.2994L21.2574 24.8635C22.001 25.2652 22.8789 24.6269 22.7271 23.7952L21.3795 16.4096L29.1677 10.4208C29.3969 10.8595 29.3535 11.4336 28.9375 11.8304Z"
                fill={colors.shadow}
            />

            {/* Layer 3: Highlight Lonjong (Kiri Atas) */}
            <path
                d="M13.9878 7.20553C14.5564 5.83439 14.508 4.51153 13.8799 4.25084C13.2517 3.99015 12.2816 4.89034 11.7131 6.26148C11.1446 7.63262 11.1929 8.95547 11.8211 9.21616C12.4492 9.47686 13.4193 8.57666 13.9878 7.20553Z"
                fill={colors.highlight}
            />

            {/* Layer 4: Highlight Titik Kecil */}
            <path
                d="M9.67215 11.1624C8.88228 11.3353 8.15179 11.0616 8.03986 10.5509C7.92793 10.0401 8.47738 9.48601 9.26723 9.31269C10.0566 9.13983 10.7871 9.41347 10.899 9.92423C11.011 10.435 10.4615 10.9891 9.67215 11.1624Z"
                fill={colors.highlight}
            />
        </svg>
    );
};

export default Star;