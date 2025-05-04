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
        showMessage("Lütfen tüm alanları doldurun.", true);
        return;
    }

    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            return user.sendEmailVerification()
                .then(() => {
                    showMessage("Kayıt başarılı! Lütfen e-posta adresinizi doğrulayın.");
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
        alert("E-posta doğrulama bağlantısı gönderildi. Lütfen e-postanızı kontrol edin.");
    })
    .catch(error => {
        console.error("E-posta doğrulama hatası:", error.message);
    });

firebase.auth().signOut(); // Kullanıcıyı otomatik çıkış yap
window.location.replace("login.html"); // Giriş sayfasına yönlendir


function goToLogin() {
    window.location.href = "login.html"; // Giriş sayfasına yönlendir
}