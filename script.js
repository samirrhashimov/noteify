// 🔥 Firebase Authentication ile giriş kontrolü
firebase.auth().onAuthStateChanged(user => {
    if (user) {
        console.log("Giriş yapan:", user.displayName);
        loadNotes(); // Kullanıcı giriş yaptıysa notları yükle
    } else {
        console.log("Giriş yapan kullanıcı yok.");
        document.getElementById("notesList").innerHTML = "<p>Lütfen giriş yapın.</p>";
    }
});

// 📌 Google ile giriş yap
function googleLogin() {
    let provider = new firebase.auth.GoogleAuthProvider();
    
    firebase.auth().signInWithPopup(provider)
        .then(result => {
            let user = result.user;
            console.log("Giriş başarılı:", user.displayName);
            alert("Hoş geldin, " + user.displayName);
        })
        .catch(error => {
            console.error("Giriş hatası:", error);
        });
}

// 📌 Çıkış yap
function logout() {
    firebase.auth().signOut().then(() => {
        alert("Çıkış yapıldı!");
    }).catch(error => {
        console.error("Çıkış hatası:", error);
    });
}

// 📌 Not ekleme fonksiyonu
function addNote() {
    let noteContent = document.getElementById("noteInput").value;
    let user = firebase.auth().currentUser;

    if (user && noteContent.trim() !== "") {
        firebase.firestore().collection("notlar").add({
            uid: user.uid,
            content: noteContent,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        }).then(() => {
            console.log("Not kaydedildi!");
            document.getElementById("noteInput").value = ""; 
        }).catch(error => {
            console.error("Not kaydetme hatası:", error);
        });
    } else {
        alert("Not eklemek için giriş yapmalısınız!");
    }
}

// 📌 Notları yükleme fonksiyonu (Gerçek Zamanlı)
function loadNotes() {
    let user = firebase.auth().currentUser;
    let notesList = document.getElementById("notesList");

    if (!user) {
        console.log("Giriş yapmış kullanıcı yok.");
        return;
    }

    firebase.firestore().collection("notlar")
        .where("uid", "==", user.uid)
        .orderBy("timestamp", "desc")
        .onSnapshot(snapshot => {  
            notesList.innerHTML = ""; // Eski notları temizle

            if (snapshot.empty) {
                notesList.innerHTML = "<p>Henüz not yok.</p>";
                return;
            }

            snapshot.docs.forEach(doc => {
                let note = doc.data();
                let noteItem = document.createElement("div");
                noteItem.classList.add("note-container");

                let formattedDate = note.timestamp ? new Date(note.timestamp.toDate()).toLocaleString() : "Tarih yok";

                noteItem.innerHTML = `
                    <p>${note.content}</p>
                    <small>${formattedDate}</small> 
                    <button onclick="deleteNote('${doc.id}')">Sil</button>
                    <button onclick="editNote('${doc.id}', '${JSON.stringify(note.content)}')">Düzenle</button>
                `;
                notesList.appendChild(noteItem);
            });
        });
}

// 📌 Not silme fonksiyonu
function deleteNote(noteId) {
    firebase.firestore().collection("notlar").doc(noteId).delete()
        .then(() => {
            console.log("Not silindi!");
        })
        .catch(error => {
            console.error("Not silme hatası:", error);
        });
}

// 📌 Sayfa yüklendiğinde notları yükle
document.addEventListener("DOMContentLoaded", () => {
    let user = firebase.auth().currentUser;
    if (user) {
        loadNotes();
    }
});

//edit note
let currentNoteId = null; // Düzenlenecek notun ID'si

function editNote(noteId, currentContent) {
    document.getElementById("editNoteContainer").style.display = "block";
    document.getElementById("editNoteInput").value = JSON.parse(currentContent) || '';
    currentNoteId = noteId;
}

function saveEdit() {
    let newContent = document.getElementById("editNoteInput").value;
    if (newContent.trim() !== "") {
        // Firebase veritabanında güncelleme yap
        firebase.firestore().collection("notlar").doc(currentNoteId).update({
            content: newContent
        }).then(() => {
            console.log("Not güncellendi!");
            loadNotes(); // Notları tekrar yükle
            cancelEdit(); // Düzenleme alanını kapat
        }).catch(error => {
            console.error("Not güncelleme hatası:", error);
        });
    }
}

function cancelEdit() {
    // Düzenleme alanını gizle
    document.getElementById("editNoteContainer").style.display = "none";
}