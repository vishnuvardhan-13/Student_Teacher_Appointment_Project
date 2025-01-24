import React from "react";
import { useNavigate } from "react-router-dom";

const StudentDashboard = () => {
    const navigate = useNavigate();

    return (
        <div style={styles.container}>
            <h2 style={styles.title}>Welcome, Student!</h2>
            <div style={styles.grid}>
                <div
                    style={styles.card}
                    onClick={() => navigate("/student/search-teacher")}
                >
                    <h3 style={styles.cardTitle}>Search Teachers</h3>
                    <p style={styles.cardDescription}>
                        Find teachers by their subjects and departments.
                    </p>
                </div>

                <div
                    style={styles.card}
                    onClick={() => navigate("/student/book-appointment")}
                >
                    <h3 style={styles.cardTitle}>Book Appointment</h3>
                    <p style={styles.cardDescription}>
                        Schedule a session with a teacher.
                    </p>
                </div>

                <div
                    style={styles.card}
                    onClick={() => navigate("/student/appointments")}
                >
                    <h3 style={styles.cardTitle}>View Appointments</h3>
                    <p style={styles.cardDescription}>
                        Check your upcoming and past appointments.
                    </p>
                </div>

                {/* New Card for Sending Messages */}
                <div
                    style={styles.card}
                    onClick={() => navigate("/student/send-message")}
                >
                    <h3 style={styles.cardTitle}>Send Message</h3>
                    <p style={styles.cardDescription}>
                        Communicate with your teacher by sending a message.
                    </p>
                </div>
            </div>
        </div>
    );
};

const styles = {
    container: {
        padding: "20px",
        maxWidth: "1200px",
        margin: "0 auto",
        textAlign: "center",
    },
    title: {
        fontSize: "28px",
        fontWeight: "bold",
        marginBottom: "20px",
    },
    grid: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
        gap: "20px",
    },
    card: {
        padding: "20px",
        border: "1px solid #ddd",
        borderRadius: "10px",
        backgroundColor: "#121212",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        cursor: "pointer",
        transition: "transform 0.2s, background-color 0.2s",
    },
    cardTitle: {
        fontSize: "20px",
        fontWeight: "bold",
        marginBottom: "10px",
        color: "#fff",
    },
    cardDescription: {
        fontSize: "14px",
        color: "#fff",
    },
    cardHover: {
        backgroundColor: "#3498db",
        color: "#fff",
        transform: "scale(1.05)",
    },
};

export default StudentDashboard;
