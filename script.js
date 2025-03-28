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

function logout() {
    firebase.auth().signOut().then(() => {
        alert("Çıkış yapıldı!");
    }).catch(error => {
        console.error("Çıkış hatası:", error);
    });
}

// Kullanıcı giriş yaptıysa otomatik tanı
firebase.auth().onAuthStateChanged(user => {
    if (user) {
        console.log("Şu an giriş yapan:", user.displayName);
    } else {
        console.log("Giriş yapan kullanıcı yok.");
    }
});
document.addEventListener("DOMContentLoaded", loadNotes);

function saveNote() {
    let noteInput = document.getElementById("noteInput").value;

    if (noteInput.trim() === "") {
        alert("Boş not kaydedemezsin!");
        return;
    }

    let notes = JSON.parse(localStorage.getItem("notes")) || [];
    let newNote = {
        id: Date.now(), 
        content: noteInput,
        date: new Date().toLocaleString()
    };

    notes.push(newNote);
    localStorage.setItem("notes", JSON.stringify(notes));
    document.getElementById("noteInput").value = "";

    loadNotes();  
}
//load note

function loadNotes() {
    let notes = JSON.parse(localStorage.getItem("notes")) || [];
    let notesList = document.getElementById("notesList");
    notesList.innerHTML = "";

    notes.forEach(note => {
        let noteItem = document.createElement("div");
        noteItem.innerHTML = `
            <p><strong>${note.date}</strong></p>
            <p>${note.content}</p>
            <button onclick="editNote(${note.id})">Düzenle</button>
            <button onclick="deleteNote(${note.id})">Sil</button>
            <hr>
        `;
        notesList.appendChild(noteItem);
    });
}

//delete note 
function deleteNote(id) {
    let notes = JSON.parse(localStorage.getItem("notes")) || [];
    let filteredNotes = notes.filter(note => note.id !== id);
    localStorage.setItem("notes", JSON.stringify(filteredNotes));
    loadNotes();
}
//edit note
function editNote(id) {
    let notes = JSON.parse(localStorage.getItem("notes")) || [];
    let noteToEdit = notes.find(note => note.id === id);

    if (!noteToEdit) return;

    let newContent = prompt("Notu düzenle:", noteToEdit.content);

    if (newContent !== null) {
        noteToEdit.content = newContent;
        localStorage.setItem("notes", JSON.stringify(notes));
        loadNotes();
    }
}