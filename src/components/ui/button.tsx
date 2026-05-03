import React, { ButtonHTMLAttributes } from "react";
export type ButtonVariant =
    | "primary"   // ungu
    | "secondary" // biru
    | "neutral"   // abu
    | "confirm"   // hijau
    | "warning"   // kuning
    | "error";    // merah

export type ButtonSize = "sm" | "md" | "lg" | "xl";

export type ButtonState = "default" | "pressed" | "disabled";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: ButtonVariant;
    size?: ButtonSize;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
    iconOnly?: boolean;
    pressed?: boolean;
    className?: string;
}

const BASE =
    "relative inline-flex shrink-0 items-center justify-center overflow-hidden " +
    "border-2 font-extrabold uppercase " +
    "transition-[transform,box-shadow,filter] duration-100 ease-out " +
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-white/70 " +
    "hover:brightness-110 active:translate-y-px active:brightness-95 " +
    "disabled:pointer-events-none disabled:translate-y-0 disabled:brightness-100";

const VARIANT_MAP: Record<ButtonVariant, { default: string; pressed: string }> = {
    // primary: {
    //     default:
    //         "rounded-[0.875rem] border-2 border-[var(--color-state-feature-darker)] " +
    //         "bg-[var(--color-state-feature-base)] text-white " +
    //         "[text-shadow:1px_1px_0px_rgba(10,10,10,0.2)] " +
    //         "shadow-[0px_2px_8px_rgba(65,70,81,0.2),inset_0px_4px_0px_var(--color-state-feature-light),inset_0px_-5px_0px_1px_var(--color-state-feature-dark)]",
    //     pressed:
    //         "translate-y-1 border-border-[#3c0e67] bg-[#9344e8] " +
    //         "shadow-[0px_0px_4px_rgba(65,70,81,0.2),inset_0px_2px_0px_var(--color-purple-200),inset_0px_2px_1px_var(--color-purple-800)]"
    // },
    primary: {
        default:
            "rounded-[0.875rem] border-2 border-[var(--color-state-feature-darker)] " +
            "bg-[var(--color-state-feature-base)] " +
            "text-white [text-shadow:1px_1px_0px_rgba(10,10,10,0.2)] " +
            "shadow-[0px_2px_8px_rgba(65,70,81,0.2),inset_0px_2px_0px_#e3d5ff,inset_0px_-5px_0px_#751dba] " +
            "active:shadow-[0px_0px_2px_rgba(65,70,81,0.2),inset_0px_2px_0px_#e3d5ff,inset_0px_0px_1px_#751dba]",
        pressed:
            "translate-y-px border-[var(--color-state-feature-darker)] " +
            "bg-[var(--color-state-feature-base)] " +
            "shadow-[0px_0px_2px_rgba(65,70,81,0.2),inset_0px_1px_0px_#e3d5ff,inset_0px_0px_0px_#751dba]",
    },
    secondary: {
        default:
            "rounded-[0.875rem] border-2 border-[var(--color-state-information-darker)] " +
            "bg-[var(--color-state-information-base)] " +
            "text-white [text-shadow:1px_1px_0px_rgba(10,10,10,0.2)] " +
            "shadow-[0px_2px_8px_rgba(65,70,81,0.2),inset_0px_2px_0px_#C0E0FD,inset_0px_-5px_0px_#204CAD] " +
            "active:shadow-[0px_0px_2px_rgba(65,70,81,0.2),inset_0px_2px_0px_#C0E0FD,inset_0px_0px_1px_#204CAD]",
        pressed:
            "translate-y-px border-[var(--color-state-information-darker)] " +
            "bg-[var(--color-state-information-base)] " +
            "shadow-[0px_0px_2px_rgba(65,70,81,0.2),inset_0px_1px_0px_#C0E0FD,inset_0px_0px_0px_#204CAD]",
    },
    neutral: {
        default:
            "rounded-[0.875rem] border-2 border-[var(--color-state-faded-darker)] " +
            "bg-[var(--color-state-faded-dark)] " +
            "text-white [text-shadow:1px_1px_0px_rgba(10,10,10,0.2)] " +
            "shadow-[0px_2px_8px_rgba(65,70,81,0.2),inset_0px_2px_0px_#E1E4EB,inset_0px_-5px_0px_#252B37] " +
            "active:shadow-[0px_0px_2px_rgba(65,70,81,0.2),inset_0px_2px_0px_#E1E4EB,inset_0px_0px_1px_#252B37]",
        pressed:
            "translate-y-px border-[var(--color-state-faded-darker)] " +
            "bg-[var(--color-state-faded-dark)] " +
            "shadow-[0px_0px_2px_rgba(65,70,81,0.2),inset_0px_1px_0px_#E1E4EB,inset_0px_0px_0px_#252B37]",
    },
    confirm: {
        default:
            "rounded-[0.875rem] border-2 border-[var(--color-state-verified-darker)] " +
            "bg-[var(--color-state-verified-base)] " +
            "text-white [text-shadow:1px_1px_0px_rgba(10,10,10,0.2)] " +
            "shadow-[0px_2px_8px_rgba(65,70,81,0.2),inset_0px_2px_0px_#BDDDC5,inset_0px_-5px_0px_#204530] " +
            "active:shadow-[0px_0px_2px_rgba(65,70,81,0.2),inset_0px_2px_0px_#BDDDC5,inset_0px_0px_1px_#204530]",
        pressed:
            "translate-y-px border-[var(--color-state-verified-darker)] " +
            "bg-[var(--color-state-verified-base)] " +
            "shadow-[0px_0px_2px_rgba(65,70,81,0.2),inset_0px_1px_0px_#BDDDC5,inset_0px_0px_0px_#204530]",
    },
    warning: {
        default:
            "rounded-[0.875rem] border-2 border-[var(--color-state-warning-darker)] " +
            "bg-[var(--color-state-warning-base)] " +
            "text-white [text-shadow:1px_1px_0px_rgba(10,10,10,0.2)] " +
            "shadow-[0px_2px_8px_rgba(65,70,81,0.2),inset_0px_2px_0px_#FFF686,inset_0px_-5px_0px_#89500A] " +
            "active:shadow-[0px_0px_2px_rgba(65,70,81,0.2),inset_0px_2px_0px_#FFF686,inset_0px_0px_1px_#89500A]",
        pressed:
            "translate-y-px border-[var(--color-state-warning-darker)] " +
            "bg-[var(--color-state-warning-base)] " +
            "shadow-[0px_0px_2px_rgba(65,70,81,0.2),inset_0px_1px_0px_#FFF686,inset_0px_0px_0px_#89500A]",
    },
    error: {
        default:
            "rounded-[0.875rem] border-2 border-[var(--color-state-error-darker)] " +
            "bg-[var(--color-state-error-base)] " +
            "text-white [text-shadow:1px_1px_0px_rgba(10,10,10,0.2)] " +
            "shadow-[0px_2px_8px_rgba(65,70,81,0.2),inset_0px_2px_0px_#FFC8C9,inset_0px_-5px_0px_#9D171A] " +
            "active:shadow-[0px_0px_2px_rgba(65,70,81,0.2),inset_0px_2px_0px_#FFC8C9,inset_0px_0px_1px_#9D171A]",
        pressed:
            "translate-y-px border-[var(--color-state-error-darker)] " +
            "bg-[var(--color-state-error-base)] " +
            "shadow-[0px_0px_2px_rgba(65,70,81,0.2),inset_0px_1px_0px_#FFC8C9,inset_0px_0px_0px_#9D171A]",
    },
};
const DISABLED = "border-transparent bg-[#fafafa] text-[#e1e4eb] shadow-none [text-shadow:none]";

const SIZE_TEXT: Record<ButtonSize, string> = {
    sm: "rounded-[14px] px-[14px] py-[8px]  gap-[8px] text-[14px] leading-[19.6px]",
    md: "rounded-[14px] px-[10px] py-[12px] gap-[8px] text-[16px] leading-[22.4px]",
    lg: "rounded-[14px] px-[14px] py-[14px] gap-[8px] text-[16px] leading-[22.4px]",
    xl: "rounded-[14px] px-[20px] py-[16px] gap-[8px] text-[18px] leading-[25.2px]",
};

const SIZE_ICON_ONLY: Record<ButtonSize, string> = {
    sm: "rounded-[14px] p-[8px]  w-[36px] h-[36px]",
    md: "rounded-[14px] p-[10px] w-[44px] h-[44px]",
    lg: "rounded-[14px] p-[14px] w-[52px] h-[52px]",
    xl: "rounded-[14px] p-[16px] w-[56px] h-[56px]",
};

const ICON_SIZE: Record<ButtonSize, number> = { sm: 20, md: 20, lg: 24, xl: 24 };

function cx(...classes: Array<string | false | null | undefined>): string {
    return classes.filter(Boolean).join(" ");
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

/**
 * **Button** — komponen tombol gamifikasi utama.
 *
 * Semua varian, ukuran, dan state diambil langsung dari Figma
 * "Buttons" component set (node-id: 20372-1788).
 *
 * @example
 * // Tombol utama ukuran besar dengan ikon kiri
 * <Button variant="primary" size="xl" leftIcon={<StarIcon />}>
 *   Mulai Bermain
 * </Button>
 *
 * @example
 * // Ikon saja (tanpa teks)
 * <Button variant="confirm" size="md" iconOnly leftIcon={<CheckIcon />} aria-label="Konfirmasi" />
 */
export const Button: React.FC<ButtonProps> = ({
    children,
    variant = "secondary",
    size = "xl",
    leftIcon,
    rightIcon,
    iconOnly = false,
    pressed = false,
    disabled = false,
    className,
    ...props
}) => {
    // Tentukan state visual
    const stateClass: string = disabled
        ? DISABLED
        : VARIANT_MAP[variant][pressed ? "pressed" : "default"];

    // Tentukan ukuran
    const sizeClass: string = iconOnly ? SIZE_ICON_ONLY[size] : SIZE_TEXT[size];

    // Ukuran ikon dalam px
    const iconPx = ICON_SIZE[size];

    // Drop-shadow untuk ikon (Figma: 0.83px 0.83px rgba(10,10,10,0.2))
    const iconShadow = disabled
        ? ""
        : "[filter:drop-shadow(1px_1px_0px_rgba(10,10,10,0.2))]";

    return (
        <button
            className={cx(BASE, stateClass, sizeClass, className)}
            disabled={disabled}
            aria-pressed={pressed || undefined}
            aria-disabled={disabled}
            {...props}
        >
            {iconOnly ? (
                // ── Mode ikon saja ──────────────────────────────────────────
                <span
                    className={cx("flex items-center justify-center", iconShadow)}
                    style={{ width: iconPx, height: iconPx }}
                    aria-hidden="true"
                >
                    {leftIcon ?? rightIcon ?? children}
                </span>
            ) : (
                // ── Mode teks (+ ikon opsional kiri/kanan) ──────────────────
                <>
                    {leftIcon && (
                        <span
                            className={cx("flex shrink-0 items-center justify-center", iconShadow)}
                            style={{ width: iconPx, height: iconPx }}
                            aria-hidden="true"
                        >
                            {leftIcon}
                        </span>
                    )}

                    <span className="leading-tight tracking-wide">{children}</span>

                    {rightIcon && (
                        <span
                            className={cx("flex shrink-0 items-center justify-center", iconShadow)}
                            style={{ width: iconPx, height: iconPx }}
                            aria-hidden="true"
                        >
                            {rightIcon}
                        </span>
                    )}
                </>
            )}
        </button>
    );
};

export default Button;
