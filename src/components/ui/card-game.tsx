import React from "react";
import Image from "next/image";
import Link from "next/link";

import { Button } from "./button";

export interface CardGameProps {
    /** Judul kartu permainan. */
    title: string;
    /** Deskripsi singkat permainan. */
    description: string;
    /** Path gambar thumbnail. Default: "/card-game-thumb.png" */
    imageSrc?: string;
    /** Teks pada tombol. Default: "LET'S PLAY" */
    buttonText?: string;
    /** Link tujuan saat tombol diklik. */
    href?: string;
    /** Event handler saat tombol diklik. */
    onButtonClick?: () => void;
    /** Tambahan class Tailwind. */
    className?: string;
}

/**
 * **CardGame** — Komponen kartu untuk menu permainan.
 * 
 * Implementasi dari Figma node `20309-4476`:
 * - Layout vertikal dengan padding 20px.
 * - Judul (H4/Bold) dan deskripsi (B3/Semibold) di bagian atas.
 * - Thumbnail gambar di tengah dengan radius 24px.
 * - Tombol aksi di bagian bawah (Primary Button).
 * 
 * @example
 * <CardGame 
 *   title="Vroom! Ayo Berangkat!" 
 *   description="Kenali berbagai alat transportasi di sekitarmu!" 
 *   onButtonClick={() => console.log("Game started")} 
 * />
 */
export const CardGame: React.FC<CardGameProps> = ({
    title,
    description,
    imageSrc = "/card-game-thumb.png",
    buttonText = "LET'S PLAY",
    href,
    onButtonClick,
    className = "",
}) => {
    return (
        <div className={`
            flex flex-col gap-4 p-5 rounded-[36px] w-77
            bg-parchment-50 
            shadow-[0px_2px_12px_rgba(15,15,15,0.1),inset_0px_-6px_0px_1px_var(--color-parchment-base)]
            ${className}
        `}>
            {/* Header Section (20309:4477) */}
            <div className="flex flex-col gap-2 w-full">
                <h4 className="text-h5-extrabold text-text-strong">
                    {title}
                </h4>
                <p className="text-b3-semibold text-text-sub leading-snug">
                    {description}
                </p>
            </div>

            {/* Thumbnail Image (20309:4480) */}
            <div className="relative w-full h-65.75 rounded-3xl overflow-hidden bg-purple-100 flex items-center justify-center">
                <Image
                    src={imageSrc}
                    alt={title}
                    fill
                    className="object-contain"
                />
            </div>

            {/* Action Button (20309:4481) */}
            {href ? (
                <Button asChild variant="primary" size="md" className="w-full">
                    <Link href={href}>{buttonText}</Link>
                </Button>
            ) : (
                <Button
                    variant="primary"
                    size="md"
                    className="w-full"
                    onClick={onButtonClick}
                >
                    {buttonText}
                </Button>
            )}
        </div>
    );
};

export default CardGame;
