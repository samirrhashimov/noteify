// Google Login Function
window.googleLogin = function() {
    let provider = new firebase.auth.GoogleAuthProvider();
    
    firebase.auth().signInWithPopup(provider)
        .then(() => {
            window.location.href = "index.html";
        })
        .catch(error => {
            alert("Error: " + error.message);
        });
}


// Register Function
function register() {
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(() => {
            alert("Registration successful! You can now login.");
        })
        .catch(error => {
            alert("Error: " + error.message);
        });
}
function goToLogin() {
    window.location.href = "login.html"; // Giriş sayfasına yönlendir
}
function register() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;
    const errorMessage = document.getElementById("errorMessage");

    // Clear any previous error message
    errorMessage.textContent = "";

    // Check if fields are empty
    if (!email || !password || !confirmPassword) {
        errorMessage.textContent = "Please fill in all fields";
        return;
    }

    // Check if passwords match
    if (password !== confirmPassword) {
        errorMessage.textContent = "Passwords do not match!";
        return;
    }

    // Proceed with Firebase registration
    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(() => {
            alert("Registration successful! You can now login.");
            window.location.href = "login.html";
        })
        .catch(error => {
            // Handle specific Firebase Auth errors
            switch (error.code) {
                case 'auth/weak-password':
                    errorMessage.textContent = "Password is too weak. It should be at least 6 characters.";
                    break;
                case 'auth/email-already-in-use':
                    errorMessage.textContent = "This email is already registered.";
                    break;
                case 'auth/invalid-email':
                    errorMessage.textContent = "Please enter a valid email address.";
                    break;
                default:
                    errorMessage.textContent = error.message;
            }
        });
}