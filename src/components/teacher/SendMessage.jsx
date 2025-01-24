import React, { useState } from "react";

const TeacherSendMessage = ({ student, onSend }) => {
    const [message, setMessage] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (message.trim() === "") {
            alert("Message cannot be empty.");
            return;
        }
        onSend({ student, message });
        setMessage("");
    };

    return (
        <form onSubmit={handleSubmit} style={styles.form}>
            <h3 style={styles.title}>Send Message</h3>
            <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder={`Write a message to ${student}`}
                style={styles.textarea}
            />
            <button type="submit" style={styles.button}>Send</button>
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
    },
    textarea: {
        width: "100%",
        height: "100px",
        padding: "10px",
        border: "1px solid #ddd",
        borderRadius: "5px",
        resize: "none",
    },
    button: {
        padding: "10px",
        backgroundColor: "#2ecc71",
        color: "#fff",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
    },
};

export default TeacherSendMessage;
