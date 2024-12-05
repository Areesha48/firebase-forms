
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";

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
const auth = getAuth();
const db = getFirestore(app);

// Check Firestore Rules Debug
// console.log("Firestore initialized. Please ensure Firestore rules are correct:");
// console.log(`
// rules_version = '2';
// service cloud.firestore {
//   match /databases/{database}/documents {
//     match /{document=**} {
//       allow read, write: if true; // Open for testing. Restrict for production
//     }
//   }
// }
// `);

// Signup Function
function signup() {
  const firstName = document.getElementById("firstname-input").value.trim();
  const email = document.getElementById("email-input").value.trim();
  const password = document.getElementById("password").value.trim();
  const repeatPassword = document.getElementById("repeat-password-input").value.trim();
  const errorMessage = document.getElementById("error-message");

  errorMessage.textContent = ""; // Clear previous errors

  if (!firstName) {
    errorMessage.textContent = "First name is required.";
    return;
  }
  if (!email) {
    errorMessage.textContent = "Email is required.";
    return;
  }
  if (!password || !repeatPassword) {
    errorMessage.textContent = "Both password fields are required.";
    return;
  }
  if (password !== repeatPassword) {
    errorMessage.textContent = "Passwords do not match.";
    return;
  }
  if (password.length < 6) {
    errorMessage.textContent = "Password must be at least 6 characters long.";
    return;
  }

  createUserWithEmailAndPassword(auth, email, password)
    .then(async (userCredential) => {
      const user = userCredential.user;

      // Save user details to Firestore
      await setDoc(doc(db, "users", user.uid), {
        firstName: firstName,
        email: email,
        createdAt: new Date().toISOString(),
      }).then(() => {
        console.log("User data saved to Firestore");
      });

      console.log("User signed up:", user);
      alert(`Sign up successful! Welcome, ${user.email}`);
      sessionStorage.setItem("user", JSON.stringify(user)); // Store user in sessionStorage
      window.location.href = "./login.html"; // Redirect to login page
    })
    .catch((error) => {
      console.error("Error signing up:", error);
      errorMessage.textContent = `Error: ${error.message}`;
    });
}

document.getElementById("signupButton")?.addEventListener("click", signup);

// Sign-in Function
function signin() {
  const email = document.getElementById("email-input").value.trim();
  const password = document.getElementById("password").value.trim();
  const errorMessageElement = document.getElementById("error-message");

  errorMessageElement.textContent = ""; // Clear previous errors

  if (!email || !password) {
    errorMessageElement.textContent = "Email and password are required.";
    return;
  }

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log("Signed in successfully:", user);
      alert("Logged in successfully!");
      sessionStorage.setItem("user", JSON.stringify(user)); // Store user in sessionStorage
      
      window.location.href = "./welcome.html"; // Redirect to homepage
    })
    .catch((error) => {
      console.error("Sign-in error:", error);
      errorMessageElement.textContent = error.message;
    });
}

document.getElementById("loginButton")?.addEventListener("click", signin);

// Google Sign-In
const provider = new GoogleAuthProvider();

function signinWithGoogle() {
  signInWithPopup(auth, provider)
    .then(async (result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const user = result.user;

      // Save user details to Firestore
      await setDoc(doc(db, "users", user.uid), {
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        createdAt: new Date().toISOString(),
      }).then(() => {
        console.log("Google user data saved to Firestore");
      });

      console.log("Google sign-in success:", user);
      sessionStorage.setItem("user", JSON.stringify(user)); 
      alert(`Welcome, ${user.displayName}`);
      window.location.href = "./welcome.html"; // Redirect to welcome page
    })
    .catch((error) => {
      console.error("Google sign-in error:", error);
      alert(`Error: ${error.message}`);
    });
}

document.getElementById("googleLoginButton")?.addEventListener("click", signinWithGoogle);

// Redirect to Signup Page
document.getElementById("signupLink")?.addEventListener("click", function () {
  window.location.href = "./index.html";
});
   


// Logout Function
function logout() {
  signOut(auth)
    .then(() => {
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
document.getElementById("logoutButton")?.addEventListener("click", logout);
