import React, { useEffect, useState } from "react";
import { db } from "../../firebase";
import { collection, query, where, getDocs, updateDoc, doc, deleteDoc } from "firebase/firestore";
import { useAuth } from "../../context/AuthContext";
import TeacherViewAppointments from "./ViewAppointments";
import TeacherViewMessages from "./ViewMessages";

const TeacherDashboard = () => {
    const { currentUser } = useAuth();
    const [selectedView, setSelectedView] = useState("appointments"); // Default to appointments
    const [appointments, setAppointments] = useState([]);
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch appointments
    useEffect(() => {
        const fetchAppointments = async () => {
            setLoading(true);
            try {
                const q = query(
                    collection(db, "appointments"),
                    where("teacherId", "==", currentUser.uid)
                );
                const querySnapshot = await getDocs(q);
                const data = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setAppointments(data);
            } catch (error) {
                console.error("Error fetching appointments:", error);
            } finally {
                setLoading(false);
            }
        };

        if (selectedView === "appointments") {
            fetchAppointments();
        }
    }, [currentUser, selectedView]);

    // Fetch messages
    useEffect(() => {
        const fetchMessages = async () => {
            setLoading(true);
            try {
                const q = query(
                    collection(db, "messages"),
                    where("receiverId", "==", currentUser.uid)
                );
                const querySnapshot = await getDocs(q);
                const data = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setMessages(data);
            } catch (error) {
                console.error("Error fetching messages:", error);
            } finally {
                setLoading(false);
            }
        };

        if (selectedView === "messages") {
            fetchMessages();
        }
    }, [currentUser, selectedView]);

    const handleApprove = async (id) => {
        try {
            const appointmentDocRef = doc(db, "appointments", id);
            await updateDoc(appointmentDocRef, { status: "approved" });
            setAppointments((prev) =>
                prev.map((appointment) =>
                    appointment.id === id ? { ...appointment, status: "approved" } : appointment
                )
            );
        } catch (error) {
            console.error("Error approving appointment:", error);
        }
    };

    const handleCancel = async (id) => {
        try {
            const appointmentDocRef = doc(db, "appointments", id);
            await deleteDoc(appointmentDocRef);
            setAppointments((prev) => prev.filter((appointment) => appointment.id !== id));
        } catch (error) {
            console.error("Error canceling appointment:", error);
        }
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <div style={styles.dashboard}>
            <h2 style={styles.title}>Teacher Dashboard</h2>
            <div style={styles.nav}>
                <button
                    onClick={() => setSelectedView("appointments")}
                    style={{
                        ...styles.button,
                        backgroundColor: selectedView === "appointments" ? "#dc7961" : "black",
                    }}
                >
                    View Appointments
                </button>
                <button
                    onClick={() => setSelectedView("messages")}
                    style={{
                        ...styles.button,
                        backgroundColor: selectedView === "messages" ? "#dc7961" : "black",
                    }}
                >
                    View Messages
                </button>
            </div>
            <div style={styles.content}>
                {selectedView === "appointments" ? (
                    <TeacherViewAppointments
                        appointments={appointments}
                        onApprove={handleApprove}
                        onCancel={handleCancel}
                    />
                ) : (
                    <TeacherViewMessages messages={messages} />
                )}
            </div>
        </div>
    );
};

const styles = {
    dashboard: {
        padding: "20px",
    },
    title: {
        fontSize: "24px",
        fontWeight: "bold",
        marginBottom: "20px",
    },
    nav: {
        display: "flex",
        gap: "10px",
        marginBottom: "20px",
    },
    button: {
        padding: "10px 20px",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
        fontSize: "16px",
    },
    content: {
        marginTop: "20px",
        backgroundColor: "black",
    },
};

export default TeacherDashboard;
