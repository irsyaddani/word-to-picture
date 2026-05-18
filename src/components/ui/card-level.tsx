import React from "react";
import Image from "next/image";
import Link from "next/link";

import { Star } from "./star";

export interface CardLevelProps {
    /** Nomor level yang ditampilkan. */
    level: number;
    /** Status level aktif (terbuka) atau terkunci. Default: false */
    active?: boolean;
    /** Jumlah bintang yang sudah diraih (0-3). Hanya muncul jika active=true. */
    stars?: number;
    /** Pesan kunci yang ditampilkan jika active=false. */
    unlockMessage?: string;
    /** Link tujuan saat kartu aktif dipilih. */
    href?: string;
    /** Event handler saat kartu diklik. */
    onClick?: () => void;
    /** Tambahan class Tailwind. */
    className?: string;
}

export const CardLevel: React.FC<CardLevelProps> = ({
    level,
    active = false,
    stars = 0,
    unlockMessage = `Reach level ${level} to unlock`,
    href,
    onClick,
    className = "",
}) => {
    const isInteractive = active && (href || onClick);
    const card = (
        <div
            onClick={active && !href ? onClick : undefined}
            aria-disabled={active ? undefined : true}
            className={`
                relative flex flex-col items-center gap-3 p-4 pb- rounded-[36px]
                transition-all duration-200 w-fit select-none
                ${active
                    ? `bg-parchment-50 ${isInteractive ? "cursor-pointer active:scale-95" : "cursor-default"} shadow-[0px_2px_12px_rgba(15,15,15,0.1),inset_0px_-6px_0px_1px_var(--color-parchment-base)]`
                    : "bg-[#FAFAFA] cursor-not-allowed shadow-[0px_2px_12px_rgba(15,15,15,0.1),inset_0px_-6px_0px_1px_rgba(225,228,235,1)] opacity-90"
                }
                ${className}
            `}
        >
            {/* Thumbnail Frame (20309:5200 / 5208) */}
            <div className={`
                relative w-55 h-60 rounded-3xl overflow-hidden flex items-center justify-center
                ${active ? "bg-orange-100" : "bg-[#E1E4EB]"}
            `}>
                <Image
                    src={active ? "/card-level-active-thumb.png" : "/card-level-inactive-thumb.png"}
                    alt={`Level ${level} thumbnail`}
                    fill
                    className="object-cover p-4"
                />
            </div>

            {/* Content Frame (20309:5201 / 5218) */}
            <div className="flex flex-col items-center w-full text-center">
                <h3 className={`text-h5-extrabold ${active ? "text-text-strong" : "text-text-sub"}`}>
                    Level {level}
                </h3>

                {active ? (
                    <div className="flex items-center -space-x-3">
                        {[1, 2, 3].map((s) => (
                            <Star key={s} active={s <= stars} size={48} />
                        ))}
                    </div>
                ) : (
                    <p className="text-b2-extrabold text-text-sub px-2">
                        {unlockMessage}
                    </p>
                )}
            </div>
        </div>
    );

    if (active && href) {
        return (
            <Link
                href={href}
                className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2"
            >
                {card}
            </Link>
        );
    }

    return card;
};

export default CardLevel;
