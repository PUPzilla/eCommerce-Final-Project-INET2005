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
                    credentials: "include",
                });
                console.log("Request Headers:", response.headers);
                console.log("Request Status:", response.status);
                if (!response.ok) {
                    throw new Error("Failed to log out. Network fetch request failed.");
                }
                setStatus("Logged out successfully.");
                setTimeout(() => {
                    navigate("/"); // Redirect to the homepage after logout
                }, 200);
            } catch (error) {
                console.error("An error occurred while logging you out. Please try again.", error);
                setStatus(error.message);
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
