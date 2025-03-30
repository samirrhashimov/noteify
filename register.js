// Google Login Function
window.googleLogin = function() {
    let provider = new firebase.auth.GoogleAuthProvider();
    
    firebase.auth().signInWithPopup(provider)
        .then(() => {
            window.location.href = "index.html";
        })
        .catch(error => {
            const errorMessage = document.getElementById("errorMessage");
            if (errorMessage) {
                errorMessage.textContent = "Error: " + error.message;
            }
        });
}

function goToLogin() {
    window.location.href = "login.html";
}

function register() {
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;
    const errorMessage = document.getElementById("errorMessage");

    // Reset error message
    errorMessage.textContent = "";

    // Check for empty fields
    if (!email || !password || !confirmPassword) {
        errorMessage.textContent = "Tüm alanları doldurun!";
        return;
    }

    // Check if passwords match
    if (password !== confirmPassword) {
        errorMessage.textContent = "Şifreler eşleşmiyor!";
        return;
    }

    // Only proceed with Firebase registration if validation passes
    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(() => {
            alert("Kayıt başarılı! Giriş yapabilirsiniz.");
            window.location.href = "login.html";
        })
        .catch(error => {
            switch (error.code) {
                case 'auth/weak-password':
                    errorMessage.textContent = "Şifre en az 6 karakter olmalıdır";
                    break;
                case 'auth/email-already-in-use':
                    errorMessage.textContent = "Bu email zaten kayıtlı";
                    break;
                case 'auth/invalid-email':
                    errorMessage.textContent = "Geçerli bir email adresi girin";
                    break;
                default:
                    errorMessage.textContent = error.message;
            }
        });
}