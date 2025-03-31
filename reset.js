function resetPassword() {
    var email = document.getElementById("resetEmail").value;
    var resetMessage = document.getElementById("resetMessage");

    if (!email) {
        resetMessage.innerText = "Lütfen e-posta adresinizi girin.";
        return;
    }

    firebase.auth().sendPasswordResetEmail(email)
        .then(() => {
            resetMessage.innerText = "Eğer bu e-posta adresi sistemde kayıtlıysa, şifre sıfırlama bağlantısı gönderildi.";
            resetMessage.style.color = "green";
        })
        .catch(error => {
            resetMessage.innerText = "Hata: " + error.message;
            resetMessage.style.color = "red";
        });
}
//console test
if (typeof firebase === "undefined") {
    console.error("Firebase not loaded! Lütfen Firebase dosyalarının yüklendiğinden emin olun.");
} else {
    console.log("Firebase başarıyla yüklendi.");
}