import React, { useEffect, useId, useRef } from "react";
import { createPortal } from "react-dom";
import "./Modal.css";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
    footer?: React.ReactNode;
    icon?: React.ReactNode;
    closeOnBackdrop?: boolean;
    closeOnEscape?: boolean;
}

const Modal: React.FC<ModalProps> = ({
    isOpen,
    onClose,
    title,
    children,
    footer,
    icon,
    closeOnBackdrop = true,
    closeOnEscape = true,
}) => {
    const titleId = useId();
    const dialogRef = useRef<HTMLDivElement>(null);
    const previouslyFocusedRef = useRef<HTMLElement | null>(null);

    useEffect(() => {
        if (!isOpen || !closeOnEscape) return;

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                onClose();
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [isOpen, closeOnEscape, onClose]);

    useEffect(() => {
        if (!isOpen) return;

        previouslyFocusedRef.current = document.activeElement as HTMLElement | null;
        dialogRef.current?.focus();

        return () => {
            previouslyFocusedRef.current?.focus();
        };
    }, [isOpen]);

    useEffect(() => {
        if (!isOpen) return;

        const originalOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";

        return () => {
            document.body.style.overflow = originalOverflow;
        };
    }, [isOpen]);

    if (!isOpen) {
        return null;
    }

    const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (closeOnBackdrop && e.target === e.currentTarget) {
            onClose();
        }
    };

    return createPortal(
        <div
            className="modal-backdrop"
            onClick={handleBackdropClick}
            role="presentation"
        >
            <div
                ref={dialogRef}
                className="modal"
                role="dialog"
                aria-modal="true"
                aria-labelledby={titleId}
                tabIndex={-1}
            >
                <div className="modal__header">
                    <div className="modal__heading">
                        {icon ? (
                            <span className="modal__icon" aria-hidden="true">
                                {icon}
                            </span>
                        ) : null}
                        <h2 id={titleId} className="modal__title">
                            {title}
                        </h2>
                    </div>
                    <button
                        type="button"
                        className="modal__close"
                        onClick={onClose}
                        aria-label="Close"
                    >
                        ×
                    </button>
                </div>
                <div className="modal__body">{children}</div>
                {footer ? <div className="modal__footer">{footer}</div> : null}
            </div>
        </div>,
        document.body
    );
};

export default Modal;
