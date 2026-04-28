import { createContext, useCallback, useContext, useEffect, useState } from "react";
import React from "react";

export type NotificationKind = "success" | "error" | "info" | "warning";

export interface Notification {
    id: number;
    message: string;
    kind: NotificationKind;
}

interface NotificationContextType {
    notifications: Notification[];
    notify: {
        success: (message: string) => void;
        error: (message: string) => void;
        info: (message: string) => void;
        warning: (message: string) => void;
    };
    dismiss: (id: number) => void;
}

const NotificationContext = createContext<NotificationContextType | null>(null);

export const AUTO_DISMISS_MS = 3500;

export const NotificationProvider = ({ children }: { children: React.ReactNode }) => {
    const [notifications, setNotifications] = useState<Notification[]>([]);

    const dismiss = useCallback((id: number) => {
        setNotifications((current) => current.filter((n) => n.id !== id));
    }, []);

    const push = useCallback(
        (message: string, kind: NotificationKind) => {
            const id = Date.now() + Math.random();
            setNotifications((current) => [...current, { id, message, kind }]);
            setTimeout(() => dismiss(id), AUTO_DISMISS_MS);
        },
        [dismiss]
    );

    const notify = {
        success: (message: string) => push(message, "success"),
        error: (message: string) => push(message, "error"),
        info: (message: string) => push(message, "info"),
        warning: (message: string) => push(message, "warning"),
    };

    // Dev-only: exposes notify on window so toasts can be fired from the browser console.
    useEffect(() => {
        if (import.meta.env.DEV) {
            (window as unknown as { __notify: typeof notify }).__notify = notify;
        }
    });

    return (
        <NotificationContext.Provider value={{ notifications, notify, dismiss }}>
            {children}
        </NotificationContext.Provider>
    );
};

export const useNotification = () => {
    const context = useContext(NotificationContext);
    if (!context) {
        throw new Error("useNotification must be used within a NotificationProvider");
    }
    return context;
};
