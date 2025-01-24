import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../firebase"; // Import Firestore instance

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false); // Add loading state
    const { login } = useAuth(); // Only use login from AuthContext
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);
    
        try {
            console.log("Login form submitted successfully");
    
            // Log in the user
            const userCredential = await login(email, password); // Now returns userCredential
            const user = userCredential.user; // Access the user object
            console.log("Logged-in User:", user);
    
            // Fetch the user's role from Firestore
            const usersCollection = collection(db, "users");
            const q = query(usersCollection, where("email", "==", user.email));
            const querySnapshot = await getDocs(q);
    
            if (!querySnapshot.empty) {
                const userDoc = querySnapshot.docs[0]; // Get the first matching document
                const userRole = userDoc.data().role; // Fetch the role field
                console.log("User Role:", userRole);
    
                // Redirect based on role
                if (userRole === "student") {
                    navigate("/student/dashboard");
                } else if (userRole === "teacher") {
                    navigate("/teacher/dashboard");
                } else if (userRole === "admin") {
                    navigate("/admin/dashboard");
                } else {
                    throw new Error("Role is null or undefined");
                }
            } else {
                throw new Error("User document not found in Firestore");
            }
        } catch (err) {
            console.error("Firebase Authentication Error:", err);
            setError("Failed to log in. Please check your credentials.");
        } finally {
            setLoading(false);
        }
    };
    

    const handleRegisterNavigation = () => {
        navigate("/register");
    };

    return (
        <div style={styles.container}>
            <form onSubmit={handleSubmit} style={styles.form}>
                <h2 style={styles.title}>Login</h2>
                {error && <p style={styles.error}>{error}</p>}
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={styles.input}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={styles.input}
                    required
                />
                <button type="submit" style={styles.button} disabled={loading}>
                    {loading ? "Logging in..." : "Login"}
                </button>
                <br />
                <br />
                <button
                    type="button"
                    onClick={handleRegisterNavigation}
                    style={styles.button}
                >
                    Register
                </button>
            </form>
        </div>
    );
};

const styles = {
    container: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#121212",
        padding: "0 20px",
    },
    form: {
        width: "100%",
        maxWidth: "400px",
        padding: "8%",
        border: "1px solid #ddd",
        borderRadius: "10px",
        backgroundColor: "#3f3f3f",
        boxShadow: "0 4px 6px rgba(186, 158, 246, 0.1)",
    },
    title: {
        fontSize: "30px",
        marginBottom: "15px",
        textAlign: "center",
        color: "#fff",
    },
    input: {
        width: "95%",
        padding: "10px",
        marginBottom: "20px",
        border: "1px solid #ddd",
        borderRadius: "5px",
    },
    button: {
        width: "100%",
        padding: "10px",
        backgroundColor: "#dc7961",
        color: "#fff",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
    },
    error: {
        color: "#e74c3c",
        fontSize: "14px",
        textAlign: "center",
        marginBottom: "10px",
    },
};

export default Login;
