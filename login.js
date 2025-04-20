
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
                firebase.auth().signOut(); // Force sign out if email not verified
                alert("Please verify your email before logging in. Check your inbox for the verification link.");
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
                    firebase.auth().signOut(); // Sign out immediately after registration
                    window.location.href = "verify.html";
                });
        })
        .catch(error => {
            alert("Error: " + error.message);
        });
}
