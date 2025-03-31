
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

// Email/Password Login
function login() {
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            if (!user.emailVerified) {
                alert("Please verify your email first! Check your inbox for the verification link.");
                firebase.auth().signOut();
                return;
            }
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
        .then((userCredential) => {
            const user = userCredential.user;
            return user.sendEmailVerification()
                .then(() => {
                    alert("Registration successful! Please check your email for verification.");
                    window.location.replace("verify.html");
                });
        })
        .catch(error => {
            alert("Error: " + error.message);
        });
}

function goToRegister() {
    window.location.href = "register.html";
}
