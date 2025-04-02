// 🔥 Firebase Authentication ile giriş kontrolü
// Auth State Observer
document.addEventListener('DOMContentLoaded', () => {
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            console.log("Giriş yapan:", user.displayName);
            loadNotes(); // Kullanıcı giriş yaptıysa notları yükle
        } else {
            console.log("Giriş yapan kullanıcı yok.");
            const notesList = document.getElementById("notesList");
            if (notesList) {
                notesList.innerHTML = "<p>Lütfen giriş yapın.</p>";
            }
        }
    });
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
            let noteContainer = document.getElementById("noteContainer");
            noteContainer.classList.remove("show");
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

                // Convert line breaks to <br> tags for display
                const displayContent = note.content.replace(/\n/g, '<br>');
                noteItem.innerHTML = `
<small>${formattedDate}</small>
   <p>${displayContent}</p>
                    <button onclick="deleteNote('${doc.id}')"style= background-color:red ;>Sil</button>
                    <button onclick="editNote('${doc.id}')">Düzenle</button>

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


//edit note
let currentNoteId = null; // Düzenlenecek notun ID'si

function editNote(noteId, currentContent) {
    // Get the note content directly from Firestore to avoid escaping issues
    firebase.firestore().collection("notlar").doc(noteId).get()
        .then(doc => {
            if (doc.exists) {
                const noteData = doc.data();
                document.getElementById("editNoteContainer").style.display = "block";
                document.getElementById("editNoteInput").value = noteData.content || '';
                currentNoteId = noteId;
            }
        })
        .catch(error => {
            console.error("Not getirme hatası:", error);
        });
}

function saveEdit() {
    let newContent = document.getElementById("editNoteInput").value;
    if (newContent.trim() !== "") {
        // Normalize line breaks before saving
        newContent = newContent.replace(/\r\n/g, '\n').trim();

        firebase.firestore().collection("notlar").doc(currentNoteId).update({
            content: newContent,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        }).then(() => {
            console.log("Not güncellendi!");
            loadNotes();
            cancelEdit();
        }).catch(error => {
            console.error("Not güncelleme hatası:", error);
        });
    }
}

function cancelEdit() {
    // Düzenleme alanını gizle
    document.getElementById("editNoteContainer").style.display = "none";
}
function toggleNoteInput() {
    let noteContainer = document.getElementById("noteContainer");
    noteContainer.classList.toggle("show");
}
//+ button iptal zone
function cancelNote() {
    let noteContainer = document.getElementById("noteContainer");
    noteContainer.classList.remove("show");
    document.getElementById("noteInput").value = "";
}

// Authentication state observer
firebase.auth().onAuthStateChanged(user => {
    // Normalize the current path by removing .html and leading/trailing slashes
    const currentPath = window.location.pathname
        .replace(/\.html$/, '')
        .replace(/^\/+|\/+$/g, '')
        || 'index'; // Default to 'index' if path is empty

    // Define auth pages without .html extension
    const authPages = ['login', 'register', 'reset', 'verify'];
    const isAuthPage = authPages.includes(currentPath);

    if (user) {
        // User is signed in
        if (!user.emailVerified) {
            // If email not verified
            if (currentPath !== 'verify' && !isAuthPage) {
                // Redirect to verify page if not already there and not on auth pages
                firebase.auth().signOut();
                window.location.replace("verify.html");
                return;
            }
        } else {
            // Email is verified
            if (isAuthPage) {
                // Redirect to index if trying to access auth pages
                window.location.replace("index.html");
                return;
            }
        }
    } else {
        // No user is signed in
        if (!isAuthPage) {
            // Redirect to login if trying to access protected pages
            window.location.replace("login.html");
            return;
        }
    }
});

// Logout function from edited snippet
function logout() {
    firebase.auth().signOut().then(() => {
        window.location.href = "login.html";
    }).catch((error) => {
        console.error("Logout error:", error);
    });
}

// Note container toggle function from edited snippet
function toggleNoteInput() {
    let noteContainer = document.getElementById("noteContainer");
    noteContainer.classList.toggle("show");
}

function cancelNote() {
    let noteContainer = document.getElementById("noteContainer");
    noteContainer.classList.remove("show");
    document.getElementById("noteInput").value = "";
}

// Add click-outside listeners for both note containers
document.addEventListener('DOMContentLoaded', () => {
    const noteContainer = document.getElementById("noteContainer");
    const editNoteContainer = document.getElementById("editNoteContainer");
    
    // Click outside for add note
    document.addEventListener("click", function(e) {
        if (noteContainer.classList.contains("show") && 
            !noteContainer.contains(e.target) && 
            e.target.id !== "addNoteButton") {
            cancelNote();
        }
    });
    
    // Click outside for edit note
    document.addEventListener("click", function(e) {
        if (editNoteContainer.style.display === "block" && 
            !editNoteContainer.contains(e.target) && 
            !e.target.closest('button[onclick^="editNote"]')) {
            cancelEdit();
        }
    });
    const menuBtn = document.getElementById("menu-btn");
    const menu = document.getElementById("menu");
    
    menuBtn.addEventListener("click", function(e) {
        e.stopPropagation();
        menu.classList.toggle("show");
    });

    // Close menu when clicking outside
    document.addEventListener("click", function(e) {
        if (!menu.contains(e.target) && !menuBtn.contains(e.target)) {
            menu.classList.remove("show");
        }
    });
});

//logout text button
document.addEventListener('DOMContentLoaded', () => {
    const logoutText = document.getElementById("logout-text");
    if (logoutText) {
        logoutText.addEventListener("click", function() {
            firebase.auth().signOut().then(() => {
                alert("Başarıyla çıkış yapıldı!");
                window.location.href = "login.html";
            }).catch((error) => {
                console.error("Çıkış yapılırken hata oluştu:", error);
            });
        });
    }
});

//search 🔍 
document.addEventListener('DOMContentLoaded', () => {
    const searchButton = document.getElementById("searchButton");
    const searchBox = document.getElementById("searchBox");
    
    if (searchButton && searchBox) {
        searchButton.addEventListener("click", function(e) {
            e.stopPropagation(); // Prevent event from bubbling up
            searchBox.style.display = searchBox.style.display === "block" ? "none" : "block";
        });

        // Close search box when clicking outside
        document.addEventListener("click", function(e) {
            if (!searchBox.contains(e.target) && !searchButton.contains(e.target)) {
                searchBox.style.display = "none";
            }
        });
    }
});

//Note search functionality
document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById("searchInput");
    if (searchInput) {
        searchInput.addEventListener("keyup", function() {
            const searchText = this.value.toLowerCase();
            const notes = document.querySelectorAll(".note-container");

            notes.forEach(note => {
                const noteText = note.textContent.toLowerCase();
                note.style.display = noteText.includes(searchText) ? "block" : "none";
            });
        });
    }
});