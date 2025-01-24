import React, { useEffect, useState } from "react";
import { db } from "../../firebase"; // Ensure the correct path to your Firebase config
import { collection, getDocs } from "firebase/firestore";

const AdminViewAppointments = () => {
    const [appointments, setAppointments] = useState([]);

    const fetchAppointments = async () => {
        const querySnapshot = await getDocs(collection(db, "appointments"));
        const appointmentList = [];
        querySnapshot.forEach((doc) => {
            appointmentList.push({ id: doc.id, ...doc.data() });
        });
        setAppointments(appointmentList);
    };

    useEffect(() => {
        fetchAppointments();
    }, []);

    return (
        <div style={styles.container}>
            <h3 style={styles.title}>All Appointments</h3>
            {appointments.length > 0 ? (
                appointments.map((appointment) => (
                    <div key={appointment.id} style={styles.card}>
                        <p>Teacher: {appointment.teacherEmail}</p>
                        <p>Student: {appointment.studentEmail}</p>
                        <p>Date: {appointment.date}</p>
                        <p>Time: {appointment.time}</p>
                        <p>Status: {appointment.status}</p>
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
        backgroundColor: "black",
        borderRadius: "5px",
        marginBottom: "10px",
    },
    message: {
        color: "#666",
    },
};

export default AdminViewAppointments;
