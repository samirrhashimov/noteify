function login() {
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    firebase.auth().signInWithEmailAndPassword(email, password)
        .then(user => {
            alert("Giriş başarılı!");
            window.location.href = "index.html"; 
        })
        .catch(error => {
            alert("Hata: " + error.message);
        });
}

function register() {
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(user => {
            alert("Kayıt başarılı! Şimdi giriş yapabilirsiniz.");
        })
        .catch(error => {
            alert("Hata: " + error.message);
        });
}