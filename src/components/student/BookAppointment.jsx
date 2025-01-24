import React, { useState } from "react";
import { db } from "../../firebase";
import { collection, query, where, getDocs, addDoc } from "firebase/firestore";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const BookAppointment = () => {
    const { currentUser } = useAuth();
    const navigate = useNavigate();
    const [department, setDepartment] = useState("");
    const [teachers, setTeachers] = useState([]);
    const [selectedTeacher, setSelectedTeacher] = useState(null);
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [success, setSuccess] = useState(false);

    // Fetch teachers by department
    const handleSearchTeachers = async () => {
        if (!department) return;

        try {
            const q = query(
                collection(db, "users"),
                where("role", "==", "teacher"),
                where("department", "==", department)
            );
            const querySnapshot = await getDocs(q);

            const teacherData = querySnapshot.docs.map((doc) => ({
                id: doc.id, // Auto-ID of the document
                ...doc.data(),
            }));

            setTeachers(teacherData);
        } catch (error) {
            console.error("Error fetching teachers:", error);
        }
    };

    // Handle booking an appointment
    const handleBook = async (e) => {
        e.preventDefault();
        if (!selectedTeacher) {
            alert("Please select a teacher to book an appointment.");
            return;
        }

        try {
            await addDoc(collection(db, "appointments"), {
                studentEmail: currentUser.email, // Authenticated student's email
                teacherEmail: selectedTeacher.email, // Selected teacher's email
                date,
                time,
                status: "pending",
            });

            setSuccess(true);

            // Redirect to student dashboard after 2 seconds
            setTimeout(() => {
                navigate("/student/dashboard");
            }, 2000);
        } catch (error) {
            console.error("Error booking appointment:", error);
        }
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.title}>Book Appointment</h2>

            {/* Search Teachers */}
            <div style={styles.searchSection}>
                <input
                    type="text"
                    placeholder="Enter Department"
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    style={styles.input}
                />
                <button onClick={handleSearchTeachers} style={styles.searchButton}>
                    Search Teachers
                </button>
            </div>

            {/* Display Teacher Results */}
            <div style={styles.resultsSection}>
                {teachers.length > 0 ? (
                    <div>
                        <h3>Available Teachers:</h3>
                        <ul  style={styles.highlight}>
                            {teachers.map((teacher) => (
                                <li
                                    key={teacher.id}
                                    style={{
                                        ...styles.teacherItem,
                                        backgroundColor: selectedTeacher?.id === teacher.id ? "#dff0d8" : "#f4f4f4",
                                    }}
                                    onClick={() => setSelectedTeacher(teacher)}
                                >
                                    <strong>{teacher.name}</strong> <br />
                                    Email: {teacher.email} <br />
                                    Subject: {teacher.subject}
                                </li>
                            ))}
                        </ul>
                    </div>
                ) : (
                    <p>No teachers found for this department.</p>
                )}
            </div>

            {/* Book Appointment Form */}
            {selectedTeacher && (
                <form onSubmit={handleBook} style={styles.form}>
                    <h3>Selected Teacher: {selectedTeacher.name}</h3>
                    <p>Email: {selectedTeacher.email}</p>
                    <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        required
                        style={styles.input}
                    />
                    <input
                        type="time"
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        required
                        style={styles.input}
                    />
                    <button type="submit" style={styles.button}>
                        Book Appointment
                    </button>
                    {success && (
                        <p style={styles.successMessage}>
                            Appointment booked successfully! Redirecting to dashboard...
                        </p>
                    )}
                </form>
            )}
            {/* Back to Dashboard Button */}
            <button onClick={() => navigate("/student/dashboard")} style={styles.dashboardButton}>
                Back to Dashboard
            </button>
        </div>
    );
};

const styles = {
    highlight: {
        backgroundColor: "#121212",
        fontWeight: "bold",
        color: "#2c3e50", // Darker highlight color
        listStyleType: "none",
        padding: 0,
    },
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
        // maxWidth: "600px",
        width:"97%",
        margin: "0 auto",
        padding: "20px",
        border: "1px solid #ddd",
        borderRadius: "5px",
        backgroundColor: "#121212",
    },
    title: {
        fontSize: "24px",
        fontWeight: "bold",
        marginBottom: "20px",
        textAlign: "center",
    },
    searchSection: {
        display: "flex",
        gap: "10px",
        marginBottom: "20px",
    },
    input: {
        flex: "1",
        padding: "10px",
        border: "1px solid #ddd",
        borderRadius: "5px",
    },
    searchButton: {
        padding: "10px",
        backgroundColor: "#dc7961",
        color: "#fff",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
    },
    resultsSection: {
        marginBottom: "20px",
    },
    teacherList: {
        listStyleType: "none",
        padding: 0,
    },
    teacherItem: {
        padding: "10px",
        border: "1px solid #ddd",
        borderRadius: "5px",
        cursor: "pointer",
        marginBottom: "10px",
    },
    form: {
        display: "flex",
        flexDirection: "column",
        gap: "15px",
    },
    button: {
        padding: "10px",
        backgroundColor: "#2ecc71",
        color: "#fff",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
    },
    successMessage: {
        color: "#2ecc71",
        fontWeight: "bold",
        textAlign: "center",
        marginTop: "10px",
    },
};

export default BookAppointment;
