import React, { useEffect, useState } from "react";
import { getFirestore, collection, query, where, getDocs } from "firebase/firestore";
import { useAuth } from "../../context/AuthContext";

const TeacherViewMessages = () => {
    const [messages, setMessages] = useState([]);
    const { currentUser } = useAuth(); // Get the logged-in teacher
    const db = getFirestore();

    useEffect(() => {
        const fetchMessages = async () => {
            if (currentUser) {
                console.log("CurrentUser Email: ", currentUser.email);
                try {
                    const messagesRef = collection(db, "messages");
                    const q = query(messagesRef, where("receiverEmail", "==", currentUser.email));
                    const querySnapshot = await getDocs(q);

                    const fetchedMessages = querySnapshot.docs.map((doc) => ({
                        id: doc.id,
                        ...doc.data(),
                    }));

                    setMessages(fetchedMessages);
                } catch (error) {
                    console.error("Error fetching messages:", error);
                }
            }
        };

        fetchMessages();
    }, [currentUser, db]);

    return (
        <div style={styles.container}>
            <h3 style={styles.title}>Messages</h3>
            {messages.length > 0 ? (
                messages.map((message) => (
                    <div key={message.id} style={styles.messageCard}>
                        <p style={styles.messageContent}>{message.content}</p>
                        <small style={styles.senderInfo}>From: {message.senderEmail}</small>
                    </div>
                ))
            ) : (
                <p style={styles.empty}>No messages found.</p>
            )}
        </div>
    );
};

const styles = {
    container: {
        padding: "20px",
    },
    title: {
        fontSize: "20px",
        fontWeight: "bold",
        marginBottom: "10px",
    },
    messageCard: {
        border: "1px solid #ddd",
        padding: "10px",
        borderRadius: "5px",
        marginBottom: "10px",
        backgroundColor: "#f9f9f9",
    },
    messageContent: {
        color: "#333", // Darker color for the message content text
        fontSize: "16px",
    },
    senderInfo: {
        color: "#555", // Slightly lighter color for the sender info text
        fontSize: "14px",
    },
    empty: {
        color: "#666",
    },
};

export default TeacherViewMessages;
