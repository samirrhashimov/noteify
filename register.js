// Google Login Function
window.googleLogin = function() {
    let provider = new firebase.auth.GoogleAuthProvider();

    firebase.auth().signInWithPopup(provider)
        .then(() => {
            window.location.href = "index.html";
        })
        .catch(error => {
            showInlineMessage("Hata: " + error.message, true);
        });
}


// Register Function
function showInlineMessage(message, isError = false) {
    const messageDiv = document.getElementById("inline-message");
    messageDiv.textContent = message;
    messageDiv.className = `inline-message ${isError ? 'error' : 'success'}`;
    messageDiv.style.display = 'block';
}

function register() {
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    if (!email || !password) {
        showInlineMessage("Lütfen tüm alanları doldurun.", true);
        return;
    }

    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            return user.sendEmailVerification()
                .then(() => {
                    showInlineMessage("Kayıt başarılı! Lütfen e-posta adresinizi doğrulayın.");
                    setTimeout(() => {
                        window.location.href = "verify.html";
                    }, 2000);
                });
        })
        .catch(error => {
            showInlineMessage("Hata: " + error.message, true);
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