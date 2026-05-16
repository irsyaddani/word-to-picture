import React, { useId } from "react";

export interface StarProps {
    /** Apakah bintang dalam keadaan aktif (berwarna kuning) atau tidak aktif (berwarna abu-abu). */
    active?: boolean;
    /** Ukuran tinggi bintang dalam pixel. Lebar akan menyesuaikan secara proporsional. Default: 36. */
    size?: number;
    /** Label aksesibilitas untuk pembaca layar. */
    "aria-label"?: string;
    /** Tambahan class Tailwind untuk styling eksternal. */
    className?: string;
}

/**
 * **Star** — Komponen bintang yang digunakan untuk rating atau progres permainan.
 * 
 * Implementasi desain terbaru dari Figma (node 20499:4122).
 * Mendukung status aktif/tidak aktif dan ukuran yang fleksibel.
 * 
 * @example
 * <Star active size={48} />
 * <Star active={false} size={32} />
 */
export const Star: React.FC<StarProps> = ({
    active = false,
    size = 36,
    "aria-label": ariaLabel = active ? "Bintang aktif" : "Bintang tidak aktif",
    className,
}) => {
    const id = useId();
    const filterId = `filter-${id}`;
    const gradientId = `gradient-${id}`;

    // Ratio desain baru: 55px (lebar) / 54px (tinggi) termasuk shadow
    const width = (55 / 54) * size;

    // Token warna berdasarkan variant Active
    const colors = active
        ? {
            base: "#FEC700",
            inner1: "#FFD70D",
            inner2: "#FFE941",
            gradient: ["#FEC700", "#FFE941"],
        }
        : {
            base: "#BBBEC4",
            inner1: "#D0D3D9",
            inner2: "#E1E4EB",
            gradient: ["#BBBEC4", "#E1E4EB"],
        };

    return (
        <svg
            width={width}
            height={size}
            viewBox="0 0 55 54"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            role="img"
            aria-label={ariaLabel}
            className={className}
        >
            {/* Outline Putih 1 */}
            <path
                d="M36.2253 42.0156C35.6842 42.0156 35.1623 41.8841 34.6747 41.6246L27.4026 37.7568C27.382 37.7459 27.3596 37.7403 27.3358 37.7403C27.3123 37.7403 27.29 37.7459 27.2691 37.757L19.997 41.6249C19.516 41.8808 18.9796 42.0161 18.4464 42.0161C17.4632 42.0161 16.5325 41.5759 15.8929 40.8081C15.2628 40.0518 14.9964 39.0543 15.163 38.072L16.5517 29.8799C16.5595 29.8326 16.5442 29.7848 16.5105 29.751L10.6271 23.9497C9.71243 23.0475 9.38925 21.7236 9.78408 20.4947C10.1789 19.2659 11.2094 18.3866 12.4737 18.2008L20.6045 17.0054C20.6509 16.9987 20.6915 16.9691 20.7124 16.9262L24.3486 9.4728C24.9137 8.31411 26.0585 7.59419 27.3358 7.59419C28.6132 7.59419 29.7579 8.31411 30.3234 9.4728L33.9593 16.9265C33.9802 16.9693 34.0205 16.999 34.0675 17.0057L42.1977 18.2008C43.4623 18.3866 44.4928 19.2659 44.8873 20.4947C45.2821 21.7238 44.959 23.0478 44.0445 23.9497L38.1609 29.7513C38.1272 29.7845 38.1119 29.8326 38.1197 29.8799L39.5084 38.072C39.675 39.0546 39.4089 40.0518 38.7788 40.8081C38.1391 41.5753 37.2082 42.0156 36.2253 42.0156Z"
                fill="white"
            />
            {/* Outline Putih 2 */}
            <path
                d="M37.1583 42.0406C36.7747 42.0406 36.4031 41.9477 36.0539 41.7639L28.1531 37.6102C27.9526 37.5049 27.727 37.4491 27.5003 37.4491C27.2737 37.4491 27.0481 37.5049 26.8476 37.6102L18.9471 41.7639C18.5975 41.9477 18.2259 42.0406 17.8427 42.0406C17.143 42.0406 16.4796 41.7296 16.0219 41.1868C15.5677 40.6485 15.3843 39.9652 15.5044 39.263L17.0131 30.4655C17.0913 30.0103 16.9407 29.5461 16.61 29.2237L10.2179 22.9932C9.56646 22.3582 9.33638 21.4265 9.61752 20.561C9.89866 19.6958 10.6324 19.0772 11.5328 18.9464L20.366 17.663C20.8227 17.5965 21.2179 17.3097 21.4222 16.8955L25.3726 8.89127C25.7751 8.07559 26.5901 7.56879 27.5 7.56879C28.4099 7.56879 29.225 8.07559 29.6278 8.89127L33.5782 16.8958C33.7825 17.3096 34.1774 17.5968 34.6344 17.6633L43.4675 18.9467C44.368 19.0775 45.1017 19.6962 45.3828 20.5613C45.664 21.4265 45.4339 22.3585 44.7824 22.9936L38.3903 29.224C38.0597 29.5464 37.9094 30.0107 37.9872 30.4658L39.496 39.2633C39.6164 39.9655 39.4326 40.6488 38.9785 41.1871C38.5214 41.7296 37.8577 42.0406 37.1583 42.0406Z"
                fill="white"
            />
            {/* Body Bintang dengan Shadow */}
            <g filter={`url(#${filterId})`}>
                <path
                    d="M28.9837 11.0462L32.4459 18.0612C32.6868 18.5495 33.1527 18.8879 33.6914 18.9661L41.4328 20.0911C42.7896 20.2884 43.3316 21.9559 42.3496 22.9128L36.7478 28.3731C36.358 28.7532 36.1799 29.3007 36.2721 29.8374L37.5944 37.5476C37.8262 38.8989 36.4078 39.9295 35.194 39.2914L28.2697 35.6511C27.7877 35.3978 27.212 35.3978 26.73 35.6511L19.8059 39.2914C18.5922 39.9295 17.1738 38.8989 17.4055 37.5476L18.7278 29.8374C18.8198 29.3007 18.6419 28.7532 18.2522 28.3731L12.6504 22.9128C11.6684 21.9556 12.2103 20.2881 13.5671 20.0911L21.3086 18.9661C21.8475 18.8879 22.3132 18.5493 22.5541 18.0612L26.0162 11.0462C26.6237 9.81673 28.3768 9.81673 28.9837 11.0462Z"
                    fill={colors.base}
                />
            </g>
            {/* Layer Highlight 1 */}
            <path
                d="M35.9874 19.3001C35.7432 26.578 29.7655 32.4016 22.4298 32.4016C21.0249 32.4016 19.6689 32.1876 18.3947 31.7912L18.7289 29.8377C18.8209 29.3002 18.6433 28.7541 18.2536 28.3726L12.6507 22.9131C11.6698 21.9557 12.2115 20.2873 13.5674 20.0901L21.31 18.9656C21.8475 18.8885 22.3146 18.5501 22.5544 18.0618L26.0177 11.0452C26.6237 9.81568 28.378 9.81568 28.984 11.0452L32.4451 18.0618C32.6871 18.5501 33.1519 18.8885 33.6917 18.9656L35.9874 19.3001Z"
                fill={colors.inner1}
            />
            {/* Layer Highlight 2 */}
            <path
                d="M35.7838 19.2702C33.5091 22.0802 30.0331 23.8751 26.1369 23.8751C22.406 23.8751 19.0582 22.228 16.7837 19.6235L21.3094 18.9661C21.8469 18.889 22.314 18.5506 22.5538 18.0623L26.0171 11.0456C26.6231 9.81618 28.3774 9.81618 28.9834 11.0456L32.4445 18.0623C32.6865 18.5506 33.1514 18.889 33.6911 18.9661L35.7838 19.2702Z"
                fill={colors.inner2}
            />
            {/* Layer Gradasi Atas */}
            <path
                d="M29.1226 33.5851C28.5826 33.3012 27.9746 33.1509 27.3642 33.1509C26.7537 33.1509 26.1455 33.3012 25.6055 33.5851L19.5252 36.7816L20.6865 30.0114C20.897 28.7852 20.4904 27.5347 19.5996 26.6663L14.6806 21.8713L21.4784 20.8836C22.7096 20.7046 23.7733 19.9317 24.3238 18.8163L27.3639 12.6562L30.404 18.8163C30.9545 19.932 32.0183 20.7048 33.2494 20.8836L40.0475 21.8713L35.1288 26.6663C34.2377 27.5347 33.8314 28.7852 34.0419 30.0114L35.2031 36.7816L29.1226 33.5851Z"
                fill={`url(#${gradientId})`}
            />
            <defs>
                <filter id={filterId} x="0" y="0" width="55" height="53.6589" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                    <feOffset dy="2" />
                    <feGaussianBlur stdDeviation="6" />
                    <feComposite in2="hardAlpha" operator="out" />
                    <feColorMatrix type="matrix" values="0 0 0 0 0.0588235 0 0 0 0 0.0588235 0 0 0 0 0.0588235 0 0 0 0.1 0" />
                    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow" />
                    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape" />
                </filter>
                <linearGradient id={gradientId} x1="27.364" y1="12.6562" x2="27.364" y2="36.7816" gradientUnits="userSpaceOnUse">
                    <stop stopColor={colors.gradient[0]} />
                    <stop offset="1" stopColor={colors.gradient[1]} />
                </linearGradient>
            </defs>
        </svg>
    );
};

export default Star;
