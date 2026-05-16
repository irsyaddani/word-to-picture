import React from "react";
import Image from "next/image";

export interface ImageContainerProps {
    /** Path gambar yang akan ditampilkan. */
    imageSrc?: string;
    /** Teks alternatif untuk gambar. Default: "Game Illustration" */
    alt?: string;
    /** Konten tambahan di dalam kontainer (misal: tombol atau label). */
    children?: React.ReactNode;
    /** Tambahan class Tailwind. */
    className?: string;
}

/**
 * **ImageContainer** — Kontainer berbingkai untuk gambar atau ilustrasi permainan.
 * 
 * Implementasi dari Figma node `20309-8343`:
 * - Background: Parchment 50.
 * - Border: Putih tebal (4px).
 * - Radius: 36px.
 * - Shadow: Efek bayangan halus (shadow/lg).
 * - Layout: Flex column dengan padding 24px.
 * 
 * @example
 * <ImageContainer imageSrc="/images/bus.png" alt="Bus" />
 */
export const ImageContainer: React.FC<ImageContainerProps> = ({
    imageSrc,
    alt = "Game Illustration",
    children,
    className = "",
}) => {
    return (
        <div className={`
            relative flex flex-col items-center justify-center p-6 rounded-[36px]
            bg-parchment-50 border-4 border-white
            shadow-[0px_2px_12px_rgba(15,15,15,0.1)]
            w-full max-w-119 min-h-79
            ${className}
        `}>
            {imageSrc ? (
                <div className="relative w-full aspect-4/3 rounded-3xl overflow-hidden">
                    <Image
                        src={imageSrc}
                        alt={alt}
                        fill
                        className="object-contain"
                        priority
                    />
                </div>
            ) : (
                /* Placeholder jika gambar belum tersedia */
                <div className="flex flex-col items-center justify-center w-full aspect-4/3 bg-(--color-neutral-200) rounded-3xl border-2 border-dashed border-neutral-400">
                    <p className="text-b3-medium text-(--color-neutral-500)">Pilih Gambar</p>
                </div>
            )}

            {/* Slot untuk elemen tambahan (misal: tombol Close atau Status) */}
            {children && (
                <div className="w-full mt-3">
                    {children}
                </div>
            )}
        </div>
    );
};

export default ImageContainer;
