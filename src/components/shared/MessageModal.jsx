import React, { useState } from "react";

const MessageModal = ({ isOpen, onClose, onSend }) => {
    const [message, setMessage] = useState("");

    if (!isOpen) return null;

    const handleSend = () => {
        onSend(message);
        setMessage("");
        onClose();
    };

    return (
        <div style={styles.modal}>
            <div style={styles.modalContent}>
                <h2>Send Message</h2>
                <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type your message..."
                    style={styles.textarea}
                />
                <div style={styles.actions}>
                    <button onClick={handleSend} style={styles.button}>Send</button>
                    <button onClick={onClose} style={styles.button}>Cancel</button>
                </div>
            </div>
        </div>
    );
};

const styles = {
    modal: {
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        background: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    modalContent: {
        background: "#fff",
        padding: "20px",
        borderRadius: "5px",
        width: "90%",
        maxWidth: "500px",
    },
    textarea: {
        width: "100%",
        height: "100px",
        margin: "10px 0",
    },
    actions: {
        display: "flex",
        justifyContent: "space-between",
    },
    button: {
        padding: "5px 10px",
        backgroundColor: "#3498db",
        color: "#fff",
        border: "none",
        borderRadius: "3px",
        cursor: "pointer",
    },
};

export default MessageModal;
