function resetPassword() {
    var email = document.getElementById("resetEmail").value;
    var resetMessage = document.getElementById("resetMessage");

    if (!email) {
        resetMessage.innerText = "Please enter your email address.";
        return;
    }

    firebase.auth().sendPasswordResetEmail(email)
        .then(() => {
            resetMessage.innerText = "If this email address is registered in the system, a password reset link will be sent.";
            resetMessage.style.color = "green";
        })
        .catch(error => {
            resetMessage.innerText = "Error: " + error.message;
            resetMessage.style.color = "red";
        });
}
//console test
if (typeof firebase === "undefined") {
    console.error("Firebase not loaded!");
} else {
    console.log("Firebase loaded.");
}