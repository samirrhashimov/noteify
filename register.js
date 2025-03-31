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