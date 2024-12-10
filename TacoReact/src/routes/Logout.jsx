import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Logout() {
    const apiHost = import.meta.env.VITE_API_HOST;
    const apiUrl = `${apiHost}/api/users/logout`;
    const [status, setStatus] = useState("Logging out...");
    const navigate = useNavigate();

    useEffect(() => {
        async function logout() {
            try {
                const response = await fetch(apiUrl, {
                    method: "POST",
                    credentials: "include", // Include cookies for session handling
                });

                if (!response.ok) {
                    throw new Error("Failed to log out. Please try again.");
                }
                setStatus("Logged out successfully.");
                setTimeout(() => {
                    navigate("/"); // Redirect to the homepage after logout
                }, 2000);
            } catch (error) {
                console.error("An error occurred while logging you out. Please try again.", error);
            }
        }

        logout();
    }, [apiUrl, navigate]);

    return (
        <>
            <h1>Logout</h1>
            <p>{status}</p>
        </>
    );
}
