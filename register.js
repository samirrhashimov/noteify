
// Google Login Function
window.googleLogin = function() {
    let provider = new firebase.auth.GoogleAuthProvider();
    
    firebase.auth().signInWithPopup(provider)
        .then(() => {
            window.location.href = "index.html";
        })
        .catch(error => {
            const errorMessage = document.getElementById("errorMessage");
            if (errorMessage) {
                errorMessage.textContent = "Error: " + error.message;
            }
        });
}

function goToLogin() {
    window.location.href = "login.html";
}

let isRegistering = false;

function register() {
    if (isRegistering) return; // Prevent multiple submissions

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;
    const errorMessage = document.getElementById("errorMessage");

    // Reset error message
    errorMessage.textContent = "";
    errorMessage.style.color = "red";

    // Check for empty fields
    if (!email || !password || !confirmPassword) {
        errorMessage.textContent = "All fields are required!";
        return;
    }

    // Validate password match
    if (password !== confirmPassword) {
        errorMessage.textContent = "Passwords do not match!";
        return;
    }

    isRegistering = true;

    // Proceed with Firebase registration
    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(() => {
            alert("Registration successful!");
            window.location.href = "login.html";
        })
        .catch(error => {
            switch (error.code) {
                case 'auth/weak-password':
                    errorMessage.textContent = "Password should be at least 6 characters";
                    break;
                case 'auth/email-already-in-use':
                    errorMessage.textContent = "This email is already registered";
                    break;
                case 'auth/invalid-email':
                    errorMessage.textContent = "Please enter a valid email address";
                    break;
                default:
                    errorMessage.textContent = error.message;
            }
        })
        .finally(() => {
            isRegistering = false;
        });
}
