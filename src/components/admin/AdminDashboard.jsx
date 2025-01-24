import React from "react";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
    return (
        <div style={styles.container}>
            <h2 style={styles.title}>Welcome, Admin!</h2>
            <div style={styles.cardContainer}>
                <div style={styles.card}>
                    <h3 style={styles.cardTitle}>Add Teacher</h3>
                    <p style={styles.cardText}>Register new teachers to the system.</p>
                    <Link to="/admin/add-teacher" style={styles.button}>
                        Go to Add Teacher
                    </Link>
                </div>

                <div style={styles.card}>
                    <h3 style={styles.cardTitle}>Delete Teacher</h3>
                    <p style={styles.cardText}>Remove teachers from the system.</p>
                    <Link to="/admin/delete-teacher" style={styles.button}>
                        Go to Delete Teacher
                    </Link>
                </div>

                <div style={styles.card}>
                    <h3 style={styles.cardTitle}>View All Appointments</h3>
                    <p style={styles.cardText}>Check all scheduled appointments.</p>
                    <Link to="/admin/appointments" style={styles.button}>
                        View Appointments
                    </Link>
                </div>

                <div style={styles.card}>
                    <h3 style={styles.cardTitle}>View All Messages</h3>
                    <p style={styles.cardText}>Read messages from teachers and students.</p>
                    <Link to="/admin/messages" style={styles.button}>
                        View Messages
                    </Link>
                </div>
            </div>
        </div>
    );
};

const styles = {
    container: {
        padding: "20px",
        maxWidth: "800px",
        margin: "0 auto",
    },
    title: {
        fontSize: "24px",
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: "20px",
    },
    cardContainer: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
        gap: "20px",
    },
    card: {
        border: "1px solid #ddd",
        borderRadius: "5px",
        padding: "20px",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        textAlign: "center",
        backgroundColor: "black",
    },
    cardTitle: {
        fontSize: "18px",
        fontWeight: "bold",
        color: "#fff", // Darker color for the title
    },
    cardText: {
        fontSize: "14px",
        color: "#555", // Darker color for the description
        marginBottom: "15px",
    },
    button: {
        marginTop: "10px",
        display: "inline-block",
        padding: "10px 15px",
        backgroundColor: "#dc7961",
        color: "black",
        textDecoration: "none",
        borderRadius: "5px",
        cursor: "pointer",
    },
};

export default AdminDashboard;
