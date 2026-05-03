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
            relative flex flex-col items-center justify-center p-[24px] rounded-[36px]
            bg-[var(--color-parchment-50)] border-[4px] border-white
            shadow-[0px_2px_12px_rgba(15,15,15,0.1)]
            w-full max-w-[476px] min-h-[316px]
            ${className}
        `}>
            {imageSrc ? (
                <div className="relative w-full aspect-[4/3] rounded-[24px] overflow-hidden">
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
                <div className="flex flex-col items-center justify-center w-full aspect-[4/3] bg-[var(--color-neutral-200)] rounded-[24px] border-2 border-dashed border-[var(--color-neutral-400)]">
                    <p className="text-b3-medium text-[var(--color-neutral-500)]">Pilih Gambar</p>
                </div>
            )}

            {/* Slot untuk elemen tambahan (misal: tombol Close atau Status) */}
            {children && (
                <div className="w-full mt-[12px]">
                    {children}
                </div>
            )}
        </div>
    );
};

export default ImageContainer;
