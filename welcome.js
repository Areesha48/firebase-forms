// Import Firebase SDKs
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getAuth, signOut } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";

// Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyAuOWZ9V0qlGZuHbT_KSYNfQ8uK06L2J4M",
  authDomain: "ndapp-d34f3.firebaseapp.com",
  projectId: "ndapp-d34f3",
  storageBucket: "ndapp-d34f3.firebasestorage.app",
  messagingSenderId: "833099690553",
  appId: "1:833099690553:web:0f46c5fe8eb2de05a293e8",
  measurementId: "G-PDKRT6DXRQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Logout Function
function logout() {
    console.log("Logout function called");
    signOut(auth)
        .then(() => {
            console.log("Sign-out successful");
            alert("You have been logged out.");
            sessionStorage.removeItem("user"); // Clear user data from session storage
            window.location.href = "./login.html"; // Redirect to login page
        })
        .catch((error) => {
            console.error("Error logging out:", error);
            alert("Error logging out. Please try again.");
        });
}

// Attach the logout function to the button
const logoutButton = document.getElementById("logoutButton");
if (logoutButton) {
    logoutButton.addEventListener("click", logout);
} else {
    console.error("Logout button not found in DOM.");
}


 const welcomeTextElement = document.getElementById("welcomeText");

// // The text to animate
 const welcomeMessage = "Welcome to our website";

// // Array of colors for each letter
 const colors = [
     "red", "blue", "green", "orange", "purple", "pink", "yellow", "cyan",
     "magenta", "lime", "teal", "gold", "coral", "indigo", "violet"
 ];

// // Function to animate the text
 function animateText() {
    let index = 0;
    let interval = setInterval(() => {
        if (index < welcomeMessage.length) {
//             // Create a span for each letter
           const span = document.createElement("span");
            span.textContent = welcomeMessage[index];
            
//             // Apply a random color from the colors array
             span.style.color = colors[index % colors.length];
            
             // Append the span to the welcome text element
             welcomeTextElement.appendChild(span);
            index++;
        } else {
            clearInterval(interval); // Stop the animation when complete
        }
     }, 300); // Delay between each letter
 }

// // Start the animation
 animateText();



