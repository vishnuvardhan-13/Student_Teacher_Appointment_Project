import React, { useEffect, useState } from "react";
import { db } from "../../firebase";
import { collection, query, where, getDocs, deleteDoc, doc } from "firebase/firestore";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const ViewAppointments = () => {
    const { currentUser } = useAuth();
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    // Fetch appointments for the logged-in student
    useEffect(() => {
        const fetchAppointments = async () => {
            setLoading(true);
            try {
                const q = query(
                    collection(db, "appointments"),
                    where("studentEmail", "==", currentUser.email)
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

        fetchAppointments();
    }, [currentUser]);

    // Handle appointment cancellation
    const handleCancel = async (id) => {
        try {
            await deleteDoc(doc(db, "appointments", id));
            setAppointments((prev) => prev.filter((appointment) => appointment.id !== id));
        } catch (error) {
            console.error("Error canceling appointment:", error);
        }
    };

    if (loading) {
        return <p>Loading appointments...</p>;
    }

    return (
        <div style={styles.container}>
            <h3 style={styles.title}>Your Appointments</h3>
            {appointments.length > 0 ? (
                appointments.map((appointment) => (
                    <div key={appointment.id} style={styles.card}>
                        <p>Date: {appointment.date}</p>
                        <p>Time: {appointment.time}</p>
                        <p>With: {appointment.teacherEmail}</p>
                        <button
                            onClick={() => handleCancel(appointment.id)}
                            style={styles.cancelButton}
                        >
                            Cancel
                        </button>
                    </div>
                ))
            ) : (
                <p style={styles.message}>No appointments found.</p>
            )}
            {/* Back to Dashboard Button */}
            <button onClick={() => navigate("/student/dashboard")} style={styles.dashboardButton}>
                Back to Dashboard
            </button>
        </div>
    );
};

const styles = {
    dashboardButton: {
        marginTop: "20px",
        padding: "10px 20px",
        backgroundColor: "#e74c3c", // Red for visibility
        color: "#fff",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
        fontSize: "16px",
    },
    container: {
        padding: "20px",
    },
    title: {
        fontSize: "20px",
        fontWeight: "bold",
        marginBottom: "10px",
    },
    card: {
        border: "1px solid #ddd",
        padding: "10px",
        borderRadius: "5px",
        marginBottom: "10px",
    },
    cancelButton: {
        backgroundColor: "#e74c3c",
        color: "#fff",
        border: "none",
        padding: "5px 10px",
        borderRadius: "5px",
        cursor: "pointer",
    },
    message: {
        color: "#666",
    },
};

export default ViewAppointments;
