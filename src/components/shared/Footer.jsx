import React from "react";

const Footer = () => {
    return (
        <footer style={styles.footer}>
            <p>© {new Date().getFullYear()} InterShala. All rights reserved.</p>
        </footer>
    );
};

const styles = {
    footer: {
        textAlign: "center",
        padding: "10px",
        backgroundColor: "#121212",
        color: "#f8f9fa",
        borderTop: "1px solid #e9ecef",
        width: "100%", // Ensure it takes full width
        position: "relative", // Optional
        left: 0, // Optional
        boxSizing: "border-box", // Optional: to include padding in width
    },
};


export default Footer;
