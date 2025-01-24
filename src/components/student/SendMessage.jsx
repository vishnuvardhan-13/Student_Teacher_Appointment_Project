import React, { useState } from "react";
import { getFirestore, collection, addDoc, serverTimestamp } from "firebase/firestore";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const SendMessage = () => {
    const [receiverEmail, setReceiverEmail] = useState("");
    const [content, setContent] = useState("");
    const { currentUser } = useAuth(); // Get current student's email
    const db = getFirestore();
    const navigate = useNavigate();

    const handleSendMessage = async (e) => {
        e.preventDefault();

        if (!receiverEmail || !content) {
            alert("Please fill in all fields.");
            return;
        }

        try {
            await addDoc(collection(db, "messages"), {
                senderEmail: currentUser.email, // Student's email
                receiverEmail, // Teacher's email
                content, // Message content
                timestamp: serverTimestamp(), // Current timestamp
            });

            alert("Message sent successfully!");
            setReceiverEmail("");
            setContent("");

            // Navigate to the dashboard after successful submission
            navigate("/student/dashboard");

        } catch (error) {
            console.error("Error sending message:", error);
            alert("Failed to send the message. Please try again.");
        }
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.title}>Send a Message</h2>
            <form onSubmit={handleSendMessage} style={styles.form}>
                <div style={styles.formGroup}>
                    <label style={styles.label} htmlFor="receiverEmail">
                        Teacher's Email:
                    </label>
                    <input
                        type="email"
                        id="receiverEmail"
                        value={receiverEmail}
                        onChange={(e) => setReceiverEmail(e.target.value)}
                        style={styles.input}
                        required
                    />
                </div>
                <div style={styles.formGroup}>
                    <label style={styles.label} htmlFor="content">
                        Message:
                    </label>
                    <textarea
                        id="content"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        style={styles.textarea}
                        rows="5"
                        required
                    ></textarea>
                </div>
                <button type="submit" style={styles.button}>
                    Send Message
                </button>
            </form>
        </div>
    );
};

const styles = {
    container: {
        padding: "20px",
        maxWidth: "600px",
        margin: "0 auto",
    },
    title: {
        fontSize: "24px",
        fontWeight: "bold",
        marginBottom: "20px",
        textAlign: "center",
    },
    form: {
        display: "flex",
        flexDirection: "column",
        gap: "15px",
    },
    formGroup: {
        display: "flex",
        flexDirection: "column",
    },
    label: {
        marginBottom: "5px",
        fontWeight: "bold",
    },
    input: {
        padding: "10px",
        border: "1px solid #ddd",
        borderRadius: "5px",
    },
    textarea: {
        padding: "10px",
        border: "1px solid #ddd",
        borderRadius: "5px",
    },
    button: {
        padding: "10px 15px",
        backgroundColor: "#dc7961",
        color: "#fff",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
        fontWeight: "bold",
    },
};

export default SendMessage;
