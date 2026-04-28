import React from "react";

interface LogoutProps {
    isOpen: boolean;
    onClose: () => void;
    onLogout: () => void;
}

const Logout: React.FC<LogoutProps> = ({ isOpen, onClose, onLogout }) => {
    const handleLogout = () => {
        // Here you would typically clear user session/token
        console.log("User logged out");

        onLogout();
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="logout-modal-overlay">
            <div className="logout-modal">
                <h2>Logout</h2>

                <p>Are you sure you want to logout?</p>

                <div className="logout-modal-actions">
                    <button type="button" onClick={onClose}>
                        Cancel
                    </button>

                    <button type="button" onClick={handleLogout}>
                        Logout
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Logout;