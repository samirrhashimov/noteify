
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

function goToLogin() {
    window.location.href = "login.html";
}

function register() {
    const email = document.getElementById("emailInput").value;
    const password = document.getElementById("passwordInput").value;
    const confirmPassword = document.getElementById("confirmPasswordInput").value;
    const errorMessage = document.getElementById("error-message");

    errorMessage.textContent = "";

    if (!email || !password || !confirmPassword) {
        errorMessage.textContent = "Tüm alanları doldurun!";
        return;
    }

    if (password !== confirmPassword) {
        errorMessage.textContent = "Şifreler uyuşmuyor!";
        return;
    }

    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            alert("Kayıt başarılı! Giriş yapabilirsiniz.");
            window.location.href = "login.html";
        })
        .catch((error) => {
            errorMessage.textContent = error.message;
        });
}
<script src=script.js></script>
