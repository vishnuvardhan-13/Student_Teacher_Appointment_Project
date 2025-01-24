import React from "react";

const LoadingSpinner = () => {
    return (
        <div style={styles.spinner}>
            <div style={styles.loader}></div>
        </div>
    );
};

const styles = {
    spinner: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
    },
    loader: {
        border: "8px solid #f3f3f3",
        borderTop: "8px solid #3498db",
        borderRadius: "50%",
        width: "50px",
        height: "50px",
        animation: "spin 1s linear infinite",
    },
    "@keyframes spin": {
        "0%": { transform: "rotate(0deg)" },
        "100%": { transform: "rotate(360deg)" },
    },
};

export default LoadingSpinner;
