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
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    let confirmPassword = document.getElementById("confirmPassword").value;
    let errorMessage = document.getElementById("errorMessage");

    // First check if passwords match
    if (password !== confirmPassword) {
        errorMessage.textContent = "Şifreler uyuşmuyor!";
        return;
    }

    // Clear any existing error message
    errorMessage.textContent = "";

    // Proceed with Firebase registration
    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(() => {
            alert("Registration successful! You can now login.");
            window.location.href = "login.html";
        })
        .catch(error => {
            errorMessage.textContent = "Error: " + error.message;
        });
}