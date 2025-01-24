import React, { useEffect, useState } from "react";
import { db } from "../../firebase"; // Ensure the correct path to your Firebase config
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";

const DeleteTeacher = () => {
    const [teachers, setTeachers] = useState([]);

    const fetchTeachers = async () => {
        const querySnapshot = await getDocs(collection(db, "users"));
        const teacherList = [];
        querySnapshot.forEach((doc) => {
            if (doc.data().role === "teacher") {
                teacherList.push({ id: doc.id, ...doc.data() });
            }
        });
        setTeachers(teacherList);
    };

    const handleDelete = async (id) => {
        try {
            await deleteDoc(doc(db, "users", id));
            setTeachers(teachers.filter((teacher) => teacher.id !== id));
        } catch (error) {
            alert("Error deleting teacher: " + error.message);
        }
    };

    useEffect(() => {
        fetchTeachers();
    }, []);

    return (
        <div style={styles.container}>
            <h3 style={styles.title}>Delete Teachers</h3>
            {teachers.map((teacher) => (
                <div key={teacher.id} style={styles.card}>
                    <h4>{teacher.name}</h4>
                    <p>Email: {teacher.email}</p>
                    <p>Department: {teacher.department}</p>
                    <p>Subject: {teacher.subject}</p>
                    <button
                        onClick={() => handleDelete(teacher.id)}
                        style={styles.deleteButton}
                    >
                        Delete
                    </button>
                </div>
            ))}
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
    deleteButton: {
        padding: "10px",
        backgroundColor: "#e74c3c",
        color: "#fff",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
    },
};

export default DeleteTeacher;
