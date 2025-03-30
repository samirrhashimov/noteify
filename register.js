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
//password validator
function register() {
    let password = document.getElementById("password").value;
    let confirmPassword = document.getElementById("confirmPassword").value;
    let errorMessage = document.getElementById("errorMessage");

    if (password !== confirmPassword) {
        errorMessage.textContent = "Şifreler uyuşmuyor!";
        return false; // Formun gönderilmesini engeller
    }

    return true; // Formun gönderilmesine izin verir
}