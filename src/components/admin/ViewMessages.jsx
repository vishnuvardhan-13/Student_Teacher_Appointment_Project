import React, { useEffect, useState } from "react";
import { getFirestore, collection, getDocs } from "firebase/firestore";

const AdminViewMessages = () => {
    const [messages, setMessages] = useState([]);
    const db = getFirestore();

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const messagesRef = collection(db, "messages");
                const querySnapshot = await getDocs(messagesRef);
                
                const fetchedMessages = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));

                setMessages(fetchedMessages);
            } catch (error) {
                console.error("Error fetching messages:", error);
            }
        };

        fetchMessages();
    }, [db]);

    return (
        <div style={styles.container}>
            <h3 style={styles.title}>All Messages</h3>
            {messages.length > 0 ? (
                messages.map((message) => (
                    <div key={message.id} style={styles.messageCard}>
                        <p style={styles.text}><strong>Message:</strong> {message.content}</p>
                        <p style={styles.text}><strong>From:</strong> {message.senderEmail}</p>
                        <p style={styles.text}><strong>To:</strong> {message.receiverEmail}</p>
                        <small style={styles.text}><strong>Time:</strong> {new Date(message.timestamp.seconds * 1000).toLocaleString()}</small>
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
        padding: "15px",
        borderRadius: "5px",
        marginBottom: "10px",
        backgroundColor: "black",
    },
    text: {
        color: "#fff", 
    },
    empty: {
        color: "#666",
        textAlign: "center",
    },
};

export default AdminViewMessages;
