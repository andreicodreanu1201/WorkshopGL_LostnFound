

import React, { useState } from "react";
import LogoutModal from "../components/LogoutModal";

const DemoLogout: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div
            style={{
                minHeight: "100vh",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                padding: "2rem",
                fontFamily: "sans-serif",
                textAlign: "center",
            }}
        >
            <h1>Logout Modal demo</h1>
            <p>Click the button to open the logout confirmation dialog.</p>

            <button
                type="button"
                onClick={() => setIsOpen(true)}
                style={{
                    padding: "0.6rem 1.1rem",
                    fontSize: "0.95rem",
                    background: "#1f2937",
                    color: "#fff",
                    border: "none",
                    borderRadius: "6px",
                    cursor: "pointer",
                }}
            >
                Log out
            </button>

            <LogoutModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
        </div>
    );
};

export default DemoLogout;