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
function showMessage(message, isError = false) {
    const messageDiv = document.getElementById("message");
    messageDiv.textContent = message;
    messageDiv.className = `message ${isError ? 'error-message' : 'success-message'}`;
    messageDiv.style.display = 'block';
}

function register() {
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    if (!email || !password) {
        showMessage("Please fill in all fields.", true);
        return;
    }

    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            return user.sendEmailVerification()
                .then(() => {
                    showMessage("Registration successful! Please verify your email address.");
                    setTimeout(() => {
                        window.location.href = "verify.html";
                    }, 2000);
                });
        })
        .catch(error => {
            showMessage("Hata: " + error.message, true);
        });
}
//mail verification 
user.sendEmailVerification()
    .then(() => {
        alert("Email verification link has been sent. Please check your email.");
    })
    .catch(error => {
        console.error("Email verification error:", error.message);
    });

firebase.auth().signOut();
window.location.replace("login.html");


function goToLogin() {
    window.location.href = "login.html";
}