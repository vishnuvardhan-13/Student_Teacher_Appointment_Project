import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { getFirestore, doc, getDoc } from "firebase/firestore"; // Firestore imports

const Navbar = () => {
    const { currentUser, logout } = useAuth();
    const navigate = useNavigate();
    const [role, setRole] = useState(""); // State to store the role
    const db = getFirestore();

    useEffect(() => {
        // Fetch the role from Firestore if the user is logged in
        const fetchRole = async () => {
            if (currentUser) {
                try {
                    const userDoc = await getDoc(doc(db, "users", currentUser.uid));
                    if (userDoc.exists()) {
                        const userData = userDoc.data();
                        setRole(userData.role); // Assuming 'role' field exists in the user document
                    } else {
                        console.error("User document does not exist!");
                    }
                } catch (error) {
                    console.error("Error fetching user role:", error);
                }
            }
        };

        fetchRole();
    }, [currentUser, db]);

    const handleLogout = async () => {
        try {
            await logout();
            navigate("/login");
        } catch {
            alert("Failed to log out.");
        }
    };

    // Construct the dynamic dashboard route
    const getDashboardRoute = () => {
        if (!role) return "/dashboard"; // Default fallback
        return `/${role}/dashboard`; // Example: /student/dashboard, /teacher/dashboard, /admin/dashboard
    };

    return (
        <nav style={styles.navbar}>
            <h1 style={styles.title}>Intershala.</h1>
            <ul style={styles.navList}>
                {!currentUser && (
                    <>
                        <li><Link to="/login" style={styles.navLink}>Login</Link></li>
                        <li><Link to="/register" style={styles.navLink}>Register</Link></li>
                    </>
                )}
                {currentUser && (
                    <>
                        <li>
                            <Link to={getDashboardRoute()} style={styles.navLink}>
                                Dashboard
                            </Link>
                        </li>
                        <li>
                            <button onClick={handleLogout} style={styles.navButton}>
                                Logout
                            </button>
                        </li>
                    </>
                )}
            </ul>
        </nav>
    );
};

const styles = {
    navbar: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "10px 20px",
        backgroundColor: "#121212",
        color: "#fff",
        width: "100%", // Ensure it takes full width
        position: "relative", // Optional
        left: 0, // Optional
        boxSizing: "border-box", // Optional: to include padding in width
    },
    title: {
        fontSize: "24px",
        fontWeight: "bold",
    },
    navList: {
        listStyle: "none",
        display: "flex",
        gap: "15px",
    },
    navLink: {
        color: "#fff",
        textDecoration: "none",
        fontWeight: "500",
    },
    navButton: {
        backgroundColor: "#e74c3c",
        border: "none",
        color: "#fff",
        padding: "5px 10px",
        cursor: "pointer",
        borderRadius: "3px",
    },
};

export default Navbar;
