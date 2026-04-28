import React from "react";
import { AUTO_DISMISS_MS, useNotification } from "../context/NotificationContext";
import type { NotificationKind } from "../context/NotificationContext";
import "./Notification.css";

const ICONS: Record<NotificationKind, React.ReactNode> = {
    success: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="5 13 9 17 19 7" />
        </svg>
    ),
    error: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <line x1="6" y1="6" x2="18" y2="18" />
            <line x1="18" y1="6" x2="6" y2="18" />
        </svg>
    ),
    info: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="11" x2="12" y2="16" />
            <line x1="12" y1="8" x2="12" y2="8" />
        </svg>
    ),
    warning: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
            <line x1="12" y1="9" x2="12" y2="13" />
            <line x1="12" y1="17" x2="12" y2="17" />
        </svg>
    ),
};

const NotificationContainer: React.FC = () => {
    const { notifications, dismiss } = useNotification();

    if (notifications.length === 0) {
        return null;
    }

    return (
        <div className="notification-container" role="region" aria-live="polite">
            {notifications.map((n) => (
                <div
                    key={n.id}
                    className={`notification notification--${n.kind}`}
                    role="status"
                >
                    <div
                        className="notification__progress"
                        style={{ animationDuration: `${AUTO_DISMISS_MS}ms` }}
                    />
                    <span className="notification__icon" aria-hidden="true">
                        {ICONS[n.kind]}
                    </span>
                    <span className="notification__message">{n.message}</span>
                    <button
                        className="notification__close"
                        onClick={() => dismiss(n.id)}
                        aria-label="Close notification"
                    >
                        ×
                    </button>
                </div>
            ))}
        </div>
    );
};

export default NotificationContainer;
