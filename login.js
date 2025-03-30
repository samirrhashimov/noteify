
// Google Login Function
window.googleLogin = function() {
    let provider = new firebase.auth.GoogleAuthProvider();
    
    firebase.auth().signInWithPopup(provider)
        .then(result => {
            let user = result.user;
            console.log("Login successful:", user.displayName);
            window.location.replace("index.html");
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
        .then(() => {
            window.location.replace("index.html");
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

// Auth State Observer
firebase.auth().onAuthStateChanged(user => {
    if (user && window.location.pathname.includes('login.html')) {
        sessionStorage.setItem('redirecting', 'true');
        window.location.replace("index.html");
    }
});
