interface Note {
  id: number;
  content: string;
}

let notes: Note[] = [];

// Bước 1: Khởi tạo dữ liệu ban đầu nếu Local Storage trống
if (!localStorage.getItem("notes")) {
  localStorage.setItem("notes", JSON.stringify([]));
}

// Bước 2: Lấy danh sách các ghi chú từ Local Storage
function getNotes(): string[] {
  const noteString = localStorage.getItem("notes") || "[]";
  return JSON.parse(noteString);
}

// Bước 3: Lưu danh sách các ghi chú vào Local Storage
function saveNotes(notes: string[]): void {
  localStorage.setItem("notes", JSON.stringify(notes));
}

// Bước 4: Render danh sách các ghi chú lên giao diện
const renderNotes = (): void => {
  const notes = getNotes();
  const Area = document.querySelector(".area");

  if (Area) {
    // Tạo một chuỗi HTML để chứa các ghi chú
    let notesHTML = "";

    // Duyệt qua danh sách ghi chú và thêm chúng vào chuỗi HTML
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

    // Gán chuỗi HTML vào Area
    Area.innerHTML = notesHTML;

    // Đặt sự kiện cho nút  "Delete" ở mỗi ghi chú
    notes.forEach((note, index) => {
      

      const deleteButton = document.getElementById(
        `delete-note-${note}`
      ) as HTMLElement;
      deleteButton.addEventListener("click", () => {
        deleteNote(index);
      });
    });
  }
};

// Bước 5: Sự kiện khi nút "Add" được nhấn
const addButton = document.getElementById("add-note");
addButton?.addEventListener("click", () => {
  const noteInput = document.getElementById("note-input") as HTMLInputElement;
  const noteText = noteInput.value.trim();

  if (noteText === "") {
    // Nếu ô input trống, hiển thị thông báo lỗi
    const errorMessage = document.getElementById(
      "error-message"
    ) as HTMLParagraphElement;
    errorMessage.textContent = "Vui lòng nhập nội dung ghi chú.";
    return; // Dừng sự kiện không thêm ghi chú
  }

  // Nếu ô input hợp lệ, xóa thông báo lỗi (nếu có) và thực hiện thêm ghi chú mới
  const errorMessage = document.getElementById(
    "error-message"
  ) as HTMLParagraphElement;
  errorMessage.textContent = "";

  addNote(noteText);
  renderNotes();
  noteInput.value = "";
});

// Bước 6: Gọi hàm renderNotes() để hiển thị danh sách ghi chú ban đầu
renderNotes();
// Bước 7: Thêm ghi chú mới
const addNote = (newNote: string): void => {
  const notes = getNotes();
  notes.push(newNote);
  saveNotes(notes);
};

// Bước 8: Xóa ghi chú
const deleteNote = (noteIndex: number): void => {
  const notes = getNotes();
  if (noteIndex >= 0 && noteIndex < notes.length) {
    notes.splice(noteIndex, 1);
    saveNotes(notes);
    renderNotes();
  }
};

