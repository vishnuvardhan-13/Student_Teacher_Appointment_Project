import React, { useEffect, useState } from "react";
import { getFirestore, collection, query, where, getDocs, doc, updateDoc } from "firebase/firestore";
import { useAuth } from "../../context/AuthContext";

const TeacherViewAppointments = () => {
    const [appointments, setAppointments] = useState([]);
    const { currentUser } = useAuth(); // Get the logged-in teacher
    const db = getFirestore();

    useEffect(() => {
        const fetchAppointments = async () => {
            if (currentUser) {
                try {
                    const appointmentsRef = collection(db, "appointments");
                    const q = query(appointmentsRef, where("teacherEmail", "==", currentUser.email));
                    const querySnapshot = await getDocs(q);

                    const fetchedAppointments = querySnapshot.docs.map((doc) => ({
                        id: doc.id,
                        ...doc.data(),
                    }));

                    setAppointments(fetchedAppointments);
                } catch (error) {
                    console.error("Error fetching appointments:", error);
                }
            }
        };

        fetchAppointments();
    }, [currentUser, db]);

    const handleApprove = async (appointmentId) => {
        try {
            const appointmentRef = doc(db, "appointments", appointmentId);
            await updateDoc(appointmentRef, { status: "approved" });
            alert("Appointment approved!");
            setAppointments((prev) =>
                prev.map((appointment) =>
                    appointment.id === appointmentId
                        ? { ...appointment, status: "approved" }
                        : appointment
                )
            );
        } catch (error) {
            console.error("Error approving appointment:", error);
        }
    };

    const handleCancel = async (appointmentId) => {
        try {
            const appointmentRef = doc(db, "appointments", appointmentId);
            await updateDoc(appointmentRef, { status: "cancelled" });
            alert("Appointment cancelled!");
            setAppointments((prev) =>
                prev.map((appointment) =>
                    appointment.id === appointmentId
                        ? { ...appointment, status: "cancelled" }
                        : appointment
                )
            );
        } catch (error) {
            console.error("Error cancelling appointment:", error);
        }
    };

    return (
        <div style={styles.container}>
            <h3 style={styles.title}>Your Scheduled Appointments</h3>
            {appointments.length > 0 ? (
                appointments.map((appointment) => (
                    <div key={appointment.id} style={styles.card}>
                        <h4>{appointment.title}</h4>
                        <p>Date: {appointment.date}</p>
                        <p>Time: {appointment.time}</p>
                        <p>With: {appointment.studentEmail}</p>
                        <p>Status: {appointment.status}</p>
                        <div style={styles.actions}>
                            {appointment.status !== "approved" && (
                                <button
                                    onClick={() => handleApprove(appointment.id)}
                                    style={styles.approveButton}
                                >
                                    Approve
                                </button>
                            )}
                            {appointment.status !== "cancelled" && (
                                <button
                                    onClick={() => handleCancel(appointment.id)}
                                    style={styles.cancelButton}
                                >
                                    Cancel
                                </button>
                            )}
                        </div>
                    </div>
                ))
            ) : (
                <p style={styles.message}>No appointments found.</p>
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
    card: {
        border: "1px solid #ddd",
        padding: "10px",
        borderRadius: "5px",
        marginBottom: "10px",
    },
    actions: {
        display: "flex",
        gap: "10px",
        marginTop: "10px",
    },
    approveButton: {
        padding: "5px 10px",
        backgroundColor: "#2ecc71",
        color: "#fff",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
    },
    cancelButton: {
        padding: "5px 10px",
        backgroundColor: "#e74c3c",
        color: "#fff",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
    },
    message: {
        color: "#666",
    },
};

export default TeacherViewAppointments;
