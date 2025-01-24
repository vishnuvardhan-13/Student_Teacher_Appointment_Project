import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import "./App.css";

// Shared Components
import Navbar from "./components/shared/Navbar";
import Footer from "./components/shared/Footer";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";

// Student Components
import StudentDashboard from "./components/student/StudentDashboard";
import SearchTeacher from "./components/student/SearchTeacher";
import BookAppointment from "./components/student/BookAppointment";
import StudentViewAppointments from "./components/student/ViewAppointments";
import SendMessage from "./components/student/SendMessage";

// Teacher Components
import TeacherDashboard from "./components/teacher/TeacherDashboard";
import TeacherViewAppointments from "./components/teacher/ViewAppointments";

// Admin Components
import AdminDashboard from "./components/admin/AdminDashboard";
import AddTeacher from "./components/admin/AddTeacher";
import DeleteTeacher from "./components/admin/DeleteTeacher";
import AdminViewAppointments from "./components/admin/ViewAppointments";
import AdminViewMessages from "./components/admin/ViewMessages";

const App = () => {
    const { currentUser, role, resetInactivityTimer, logout } = useAuth(); // Destructure resetInactivityTimer and logout
    console.log("Current User:", currentUser);
    console.log("User Role:", role);

    // Monitor user activity and reset the inactivity timer
    useEffect(() => {
        const handleActivity = () => {
            resetInactivityTimer(); // Reset the timer on activity
        };

        // Add event listeners for user activity
        window.addEventListener("mousemove", handleActivity);
        window.addEventListener("keydown", handleActivity);

        // Cleanup event listeners on component unmount
        return () => {
            window.removeEventListener("mousemove", handleActivity);
            window.removeEventListener("keydown", handleActivity);
        };
    }, [resetInactivityTimer]);

    // Render role-specific routes
    const renderRoutes = () => {
        if (role === "student") {
            return [
                <Route key="student-dashboard" path="/student/dashboard" element={<StudentDashboard />} />,
                <Route key="search-teacher" path="/student/search-teacher" element={<SearchTeacher />} />,
                <Route key="book-appointment" path="/student/book-appointment" element={<BookAppointment />} />,
                <Route key="view-appointments" path="/student/appointments" element={<StudentViewAppointments />} />,
                <Route key="send-message" path="/student/send-message" element={<SendMessage />} />,
            ];
        } else if (role === "teacher") {
            return [
                <Route key="teacher-dashboard" path="/teacher/dashboard" element={<TeacherDashboard />} />,
                <Route key="view-appointments" path="/teacher/appointments" element={<TeacherViewAppointments />} />,
            ];
        } else if (role === "admin") {
            return [
                <Route key="admin-dashboard" path="/admin/dashboard" element={<AdminDashboard />} />,
                <Route key="add-teacher" path="/admin/add-teacher" element={<AddTeacher />} />,
                <Route key="delete-teacher" path="/admin/delete-teacher" element={<DeleteTeacher />} />,
                <Route key="view-appointments" path="/admin/appointments" element={<AdminViewAppointments />} />,
                <Route key="view-messages" path="/admin/messages" element={<AdminViewMessages />} />,
            ];
        } else {
            return <Route path="*" element={<Navigate to="/login" />} />;
        }
    };

    return (
        <div className="Intershala">
            <Navbar />
            <div>
                <Routes>
                    {/* Public Routes */}
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />

                    {/* Role-Specific Routes */}
                    {currentUser && renderRoutes()}

                    {/* Fallback for unauthenticated users */}
                    {!currentUser && <Route path="*" element={<Navigate to="/login" />} />}
                </Routes>
            </div>
            <Footer />
        </div>
    );
};

export default App;
