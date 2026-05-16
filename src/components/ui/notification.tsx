import React from "react";

export type NotificationType = "success" | "warning" | "error" | "info";

export interface NotificationProps {
    /** Tipe notifikasi: success, warning, error, atau info. Default: "info" */
    type?: NotificationType;
    /** Pesan yang ditampilkan. */
    message: string;
    /** Tambahan class Tailwind. */
    className?: string;
}

/**
 * **Notification** — Komponen notifikasi status permainan.
 * 
 * Implementasi dari Figma node `20309-5221`:
 * - Success: Latar Hijau (#41885C)
 * - Warning: Latar Kuning (#FEC700)
 * - Error: Latar Merah (#E22025)
 * - Info: Latar Biru (#328BF3)
 * 
 * @example
 * <Notification type="success" message="You solved it perfectly!" />
 */
export const Notification: React.FC<NotificationProps> = ({
    type = "info",
    message,
    className = "",
}) => {
    return (
        <div className={`
            flex flex-col items-center justify-center px-5 py-4 rounded-[20px]
            shadow-[0px_2px_12px_rgba(15,15,15,0.1)] transition-all duration-300 w-fit max-w-100
            ${type === "success" ? "bg-(--color-teal-500)" : ""}
            ${type === "warning" ? "bg-yellow-500" : ""}
            ${type === "error" ? "bg-red-500" : ""}
            ${type === "info" ? "bg-blue-500" : ""}
            ${className}
        `}>
            <p className="text-b1-extrabold text-white text-center leading-snug">
                {message}
            </p>
        </div>
    );
};

export default Notification;
