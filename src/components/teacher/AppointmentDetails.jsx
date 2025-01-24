import React from "react";

const TeacherAppointmentDetails = ({ appointment, onBack }) => {
    if (!appointment) {
        return <p style={styles.message}>No appointment selected.</p>;
    }

    return (
        <div style={styles.container}>
            <h3 style={styles.title}>Appointment Details</h3>
            <p><strong>Title:</strong> {appointment.title}</p>
            <p><strong>Date:</strong> {appointment.date}</p>
            <p><strong>Time:</strong> {appointment.time}</p>
            <p><strong>With:</strong> {appointment.student}</p>
            <p><strong>Notes:</strong> {appointment.notes || "No additional notes."}</p>
            <button onClick={onBack} style={styles.button}>Back</button>
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

export default TeacherAppointmentDetails;
