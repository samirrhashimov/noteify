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

    loadNotes();  // Notları tekrar yükle
}

function loadNotes() {
    let notes = JSON.parse(localStorage.getItem("notes")) || [];
    let notesList = document.getElementById("notesList");
    notesList.innerHTML = "";

    notes.forEach(note => {
        let noteItem = document.createElement("div");
        noteItem.innerHTML = `
            <p><strong>${note.date}</strong></p>
            <p>${note.content}</p>
            <button onclick="deleteNote(${note.id})">Sil</button>
            <hr>
        `;
        notesList.appendChild(noteItem);
    });
}

function deleteNote(id) {
    let notes = JSON.parse(localStorage.getItem("notes")) || [];
    let filteredNotes = notes.filter(note => note.id !== id);
    localStorage.setItem("notes", JSON.stringify(filteredNotes));
    loadNotes();
}