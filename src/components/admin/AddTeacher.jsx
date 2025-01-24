import React, { useState } from "react";
import { db } from "../../firebase"; // Ensure the correct path to your Firebase config
import { collection, addDoc } from "firebase/firestore";

const AddTeacher = () => {
    const [email, setEmail] = useState("");
    const [department, setDepartment] = useState("");
    const [subject, setSubject] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await addDoc(collection(db, "users"), {
                email,
                department,
                subject,
                role: "teacher", // Adding a "role" field to differentiate users
            });

            setMessage("Teacher Added Successfully!");
            setEmail("");
            setDepartment("");
            setSubject("");
        } catch (error) {
            setMessage("Error adding teacher: " + error.message);
        }
    };

    return (
        <form onSubmit={handleSubmit} style={styles.form}>
            <h3 style={styles.title}>Add Teacher</h3>
            {message && <p style={styles.message}>{message}</p>}
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
            <input
                type="text"
                placeholder="Subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                style={styles.input}
                required
            />
            <button type="submit" style={styles.button}>
                Add Teacher
            </button>
        </form>
    );
};

const styles = {
    form: {
        display: "flex",
        flexDirection: "column",
        gap: "15px",
        maxWidth: "400px",
        margin: "0 auto",
    },
    title: {
        fontSize: "20px",
        fontWeight: "bold",
        marginBottom: "10px",
    },
    message: {
        color: "green",
        fontWeight: "bold",
    },
    input: {
        padding: "10px",
        border: "1px solid #ddd",
        borderRadius: "5px",
    },
    button: {
        padding: "10px",
        backgroundColor: "#dc7961",
        color: "black",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
    },
};

export default AddTeacher;
