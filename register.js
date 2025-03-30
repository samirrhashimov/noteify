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
    window.location.href = "login.html"; // Giriş sayfasına yönlendir
}
function register() {
    const email = document.getElementById("emailInput").value;
    const password = document.getElementById("passwordInput").value;
    const confirmPassword = document.getElementById("confirmPasswordInput").value;
    const errorMessage = document.getElementById("error-message"); // Hata mesajı için bir div eklemelisin

    // Önce hata mesajını temizle
    errorMessage.textContent = "";

    // Boş alan kontrolü
    if (!email || !password || !confirmPassword) {
        errorMessage.textContent = "Tüm alanları doldurun!";
        return;
    }

    // Şifre doğrulama
    if (password !== confirmPassword) {
        errorMessage.textContent = "Şifreler uyuşmuyor!";
        return;
    }

    // Firebase ile kayıt ol
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            alert("Kayıt başarılı! Giriş yapabilirsiniz.");
            window.location.href = "login.html"; // Kullanıcıyı giriş sayfasına yönlendir
        })
        .catch((error) => {
            errorMessage.textContent = error.message; // Firebase hatasını göster
        });
}