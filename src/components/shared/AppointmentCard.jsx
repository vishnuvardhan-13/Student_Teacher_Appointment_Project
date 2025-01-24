import React from "react";

const AppointmentCard = ({ appointment, onCancel }) => {
    return (
        <div style={styles.card}>
            <h3>{appointment.title}</h3>
            <p>Date: {appointment.date}</p>
            <p>Time: {appointment.time}</p>
            <p>With: {appointment.with}</p>
            <button onClick={() => onCancel(appointment.id)} style={styles.cancelButton}>
                Cancel Appointment
            </button>
        </div>
    );
};

const styles = {
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
        cursor: "pointer",
        borderRadius: "3px",
    },
};

export default AppointmentCard;
