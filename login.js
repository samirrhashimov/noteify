// Google Login Function
window.googleLogin = function() {
    let provider = new firebase.auth.GoogleAuthProvider();

    firebase.auth().signInWithPopup(provider)
        .then(() => {
            window.location.href = "index.html";
        })
        .catch(error => {
            alert("Error: " + error.message); //This alert needs to be replaced with inline message.
        });
}

// Email/Password Login
function showMessage(message, isError = false) {
    const messageDiv = document.getElementById("message");
    messageDiv.textContent = message;
    messageDiv.className = `message ${isError ? 'error-message' : 'success-message'}`;
    messageDiv.style.display = 'block';
}

function login() {
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    if (!email || !password) {
        showMessage("Lütfen tüm alanları doldurun.", true);
        return;
    }

    firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            if (!user.emailVerified) {
                firebase.auth().signOut();
                showMessage("Lütfen giriş yapmadan önce e-postanızı doğrulayın. Doğrulama bağlantısı için gelen kutunuzu kontrol edin.", true);
                return;
            }
            showMessage("Giriş başarılı! Yönlendiriliyorsunuz...");
            setTimeout(() => {
                window.location.href = "index.html";
            }, 1500);
        })
        .catch(error => {
            showMessage("Hata: " + error.message, true);
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
    showMessage("Hata: " + error.message, true); // Bu artık sayfa içinde yazı olarak görünecek
});