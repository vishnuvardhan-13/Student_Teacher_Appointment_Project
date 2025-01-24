import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../../firebase";

const Register = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("student"); // Default to student
    const [subject, setSubject] = useState("");
    const [department, setDepartment] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            // Create user in Firebase Authentication
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            console.log("User created in Authentication:", user);

            // Prepare user data
            const userData = {
                email,
                role,
                createdAt: new Date(),
            };

            // Add subject and department if role is teacher
            if (role === "teacher") {
                userData.subject = subject;
                userData.department = department;
            }

            // Save user details in Firestore
            await setDoc(doc(db, "users", user.uid), userData);
            console.log("User data saved to Firestore successfully.");

            // Redirect to login or dashboard
            navigate("/login");
        } catch (err) {
            console.error("Error during registration:", err.message);
            setError(err.message);
        }
    };

    return (
        <div style={styles.container}>
            <form onSubmit={handleSubmit} style={styles.form}>
                <h2 style={styles.title}>Register</h2>
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
                <select value={role} onChange={(e) => setRole(e.target.value)} style={styles.input}>
                    <option value="student">Student</option>
                    <option value="teacher">Teacher</option>
                    <option value="admin">Admin</option>
                </select>

                {role === "teacher" && (
                    <>
                        <input
                            type="text"
                            placeholder="Subject"
                            value={subject}
                            onChange={(e) => setSubject(e.target.value)}
                            style={styles.input}
                            required
                        />
                        <input
                            type="text"
                            placeholder="Department"
                            value={department}
                            onChange={(e) => setDepartment(e.target.value)}
                            style={styles.input}
                            required
                        />
                    </>
                )}

                <button type="submit" style={styles.button}>Register</button>
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
        padding: "0 20px", // Add some padding for smaller screens
    },
    form: {
        width: "100%",
        maxWidth: "400px", // Set a max width for larger screens
        padding: "8% ",
        border: "1px solid #ddd",
        borderRadius: "10px",
        backgroundColor: "#3f3f3f",
        boxShadow: "0 4x 6px rgba(186, 158, 246, 0.1)",
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


export default Register;
