"use strict";
let notes = [];
if (!localStorage.getItem("notes")) {
    localStorage.setItem("notes", JSON.stringify([]));
}
function getNotes() {
    const noteString = localStorage.getItem("notes") || "[]";
    return JSON.parse(noteString);
}
function saveNotes(notes) {
    localStorage.setItem("notes", JSON.stringify(notes));
}
const renderNotes = () => {
    const notes = getNotes();
    const Area = document.querySelector(".area");
    if (Area) {
        let notesHTML = "";
        notes.forEach((note, index) => {
            notesHTML += `
        <div class="task-card">
          <p>${note}</p>
          <div class="icon">
         
            <i class="fa-solid fa-trash" id="delete-note-${index}"><span  class="tooltiptext">Delete</span></i>
          </div>
        </div>
      `;
        });
        Area.innerHTML = notesHTML;
        notes.forEach((note, index) => {
            const deleteButton = document.getElementById(`delete-note-${note}`);
            deleteButton.addEventListener("click", () => {
                deleteNote(index);
            });
        });
    }
};
const addButton = document.getElementById("add-note");
addButton === null || addButton === void 0 ? void 0 : addButton.addEventListener("click", () => {
    const noteInput = document.getElementById("note-input");
    const noteText = noteInput.value.trim();
    if (noteText === "") {
        const errorMessage = document.getElementById("error-message");
        errorMessage.textContent = "Vui lòng nhập nội dung ghi chú.";
        return;
    }
    const errorMessage = document.getElementById("error-message");
    errorMessage.textContent = "";
    addNote(noteText);
    renderNotes();
    noteInput.value = "";
});
renderNotes();
const addNote = (newNote) => {
    const notes = getNotes();
    notes.push(newNote);
    saveNotes(notes);
};
const deleteNote = (noteIndex) => {
    const notes = getNotes();
    if (noteIndex >= 0 && noteIndex < notes.length) {
        notes.splice(noteIndex, 1);
        saveNotes(notes);
        renderNotes();
    }
};
