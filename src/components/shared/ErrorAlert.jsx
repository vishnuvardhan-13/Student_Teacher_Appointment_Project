import React from "react";

const ErrorAlert = ({ message, type }) => {
    const alertStyle = type === "error" ? styles.error : styles.success;

    return <div style={{ ...styles.alert, ...alertStyle }}>{message}</div>;
};

const styles = {
    alert: {
        padding: "10px",
        margin: "10px 0",
        borderRadius: "5px",
        textAlign: "center",
        fontWeight: "500",
    },
    error: {
        backgroundColor: "#f8d7da",
        color: "#721c24",
        border: "1px solid #f5c6cb",
    },
    success: {
        backgroundColor: "#d4edda",
        color: "#155724",
        border: "1px solid #c3e6cb",
    },
};

export default ErrorAlert;
