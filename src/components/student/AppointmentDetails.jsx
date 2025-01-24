import React, { useState, useEffect } from "react";
import { db } from "../../firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import { useAuth } from "../../context/AuthContext";

const StudentAppointmentDetails = () => {
    const { currentUser } = useAuth();
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAppointments = async () => {
            setLoading(true);
            try {
                const q = query(
                    collection(db, "appointments"),
                    where("studentId", "==", currentUser.uid)
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

    if (loading) {
        return <p>Loading appointments...</p>;
    }

    return (
        <div style={styles.container}>
            <h2 style={styles.title}>My Appointments</h2>
            {appointments.map((appointment) => (
                <div key={appointment.id}>
                    <p>Teacher: {appointment.teacherId}</p>
                    <p>Date: {appointment.date}</p>
                    <p>Time: {appointment.time}</p>
                </div>
            ))}
        </div>
    );
};

const styles = {
    container: {
        padding: "20px",
        border: "1px solid #ddd",
        borderRadius: "5px",
        maxWidth: "600px",
        margin: "20px auto",
    },
    title: {
        fontSize: "20px",
        fontWeight: "bold",
        marginBottom: "15px",
    },
    message: {
        color: "#666",
        textAlign: "center",
    },
    button: {
        padding: "10px 15px",
        backgroundColor: "#3498db",
        color: "#fff",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
    },
};

export default StudentAppointmentDetails;
