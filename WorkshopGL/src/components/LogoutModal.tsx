import React, { useState } from "react";
import { useNavigate } from "react-router";
import { authApi } from "../api/endpoints";
import { useAuth } from "../context/AuthContext";
// import { useNotification } from "../context/NotificationContext";
import Modal from "./Modal";
import "./LogoutModal.css";

interface LogoutModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const LogoutModal: React.FC<LogoutModalProps> = ({ isOpen, onClose }) => {
    const navigate = useNavigate();
    const { logout } = useAuth();
    // const { notify } = useNotification();

    const [isPending, setIsPending] = useState(false);

    const handleConfirm = async () => {
        setIsPending(true);
        try {
            await authApi.logout();
            // notify.success("Logged out successfully");
        } catch {
            // notify.error("Logout failed on the server, but you've been signed out locally.");
            console.warn("authApi.logout() failed; clearing client session anyway.");
        } finally {
            logout();
            setIsPending(false);
            onClose();
            navigate("/login");
        }
    };

    const logoutIcon = (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
            <polyline points="16 17 21 12 16 7" />
            <line x1="21" y1="12" x2="9" y2="12" />
        </svg>
    );

    return (
        <Modal
            isOpen={isOpen}
            onClose={isPending ? () => undefined : onClose}
            title="Log out?"
            icon={<span className="logout-modal__icon-wrap">{logoutIcon}</span>}
            footer={
                <>
                    <button
                        type="button"
                        className="logout-modal__btn logout-modal__btn--secondary"
                        onClick={onClose}
                        disabled={isPending}
                    >
                        Cancel
                    </button>
                    <button
                        type="button"
                        className="logout-modal__btn logout-modal__btn--danger"
                        onClick={handleConfirm}
                        disabled={isPending}
                    >
                        {isPending ? "Logging out..." : "Log out"}
                    </button>
                </>
            }
        >
            <p>Are you sure you want to log out? You'll need to sign in again to access your account.</p>
        </Modal>
    );
};

export default LogoutModal;
