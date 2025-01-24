import React, { useState } from "react";
import { db } from "../../firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const SearchTeacher = () => {
    const [queryText, setQueryText] = useState("");
    const [teachers, setTeachers] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSearch = async () => {
        if (!queryText) return; // Prevent empty searches

        setLoading(true);
        try {
            // Firestore query to search teachers by subject
            const q = query(
                collection(db, "users"),
                where("role", "==", "teacher"),
                where("subject", "==", queryText) // Exact match for subject
            );

            const querySnapshot = await getDocs(q);

            const teacherData = querySnapshot.docs.map((doc) => ({
                id: doc.id, // Document ID
                ...doc.data(),
            }));

            setTeachers(teacherData);
        } catch (error) {
            console.error("Error fetching teachers:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={styles.container}>
            {/* Search Input */}
            <div style={styles.searchBox}>
                <input
                    type="text"
                    value={queryText}
                    onChange={(e) => setQueryText(e.target.value)}
                    placeholder="Search by subject"
                    style={styles.input}
                />
                <button onClick={handleSearch} style={styles.button}>
                    Search
                </button>
            </div>

            {/* Loading Indicator */}
            {loading && <p style={styles.loading}>Loading...</p>}

            {/* Search Results */}
            <div style={styles.results}>
                {teachers.length > 0 ? (
                    <ul style={styles.teacherList}>
                        {teachers.map((teacher) => (
                            <li key={teacher.id} style={styles.teacherCard}>
                                <p style={styles.highlight}>Email: <span>{teacher.email}</span></p>
                                <p style={styles.highlight}>Department: <span >{teacher.department}</span></p>
                                <p style={styles.highlight}>Subject: <span >{teacher.subject}</span></p>
                            </li>
                        ))}
                    </ul>
                ) : (
                    !loading && <p style={styles.noResults}>No teachers found for the given subject.</p>
                )}
            </div>

            {/* Back to Dashboard Button */}
            <button onClick={() => navigate("/student/dashboard")} style={styles.dashboardButton}>
                Back to Dashboard
            </button>
        </div>
    );
};

const styles = {
    container: {
        padding: "20px",
        maxWidth: "600px",
        margin: "0 auto",
    },
    searchBox: {
        display: "flex",
        gap: "10px",
        marginBottom: "20px",
    },
    input: {
        flex: 1,
        padding: "10px",
        border: "1px solid #ddd",
        borderRadius: "5px",
        fontSize: "16px",
    },
    button: {
        width: "20%",
        padding: "10px",
        backgroundColor: "#dc7961",
        color: "#fff",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
    },
    results: {
        marginTop: "20px",
    },
    teacherList: {
        listStyleType: "none",
        padding: 0,
    },
    teacherCard: {
        border: "2px solid #fff", // Highlight card border
        padding: "15px",
        borderRadius: "10px",
        marginBottom: "15px",
        backgroundColor: "#121212", // Light background for visibility
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", // Subtle shadow
        transition: "background-color 0.3s ease",
    },
    highlight: {
        fontWeight: "bold",
        color: "#fff", // Darker highlight color
    },
    loading: {
        fontSize: "16px",
        color: "#e67e22", // Orange for loading text
        textAlign: "center",
    },
    noResults: {
        fontSize: "16px",
        color: "#e74c3c", // Red for no results
        textAlign: "center",
    },
    dashboardButton: {
        marginTop: "20px",
        padding: "10px 20px",
        backgroundColor: "#dc7961", // Red for visibility
        color: "#fff",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
        fontSize: "16px",
    },
};

export default SearchTeacher;
