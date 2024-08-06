import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./assets/index.css"; // Your Tailwind CSS
import "aos/dist/aos.css"; // Import AOS styles
import AOS from "aos"; // Import AOS

// Initialize AOS
AOS.init({
	duration: 1000, // Duration of the animation in milliseconds
	once: true, // Animation should happen only once
});

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
);
