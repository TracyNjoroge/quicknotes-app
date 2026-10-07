const noteForm = document.querySelector("#note-form");
const noteInput = document.querySelector("#note-input");
const noteCategory = document.querySelector("#note-category");
const notesList = document.querySelector("#notes-list");

let notes = [];


// Display notes
function render() {
  notesList.textContent = "";

  notes.forEach(note => {
    const listItem = document.createElement("li");
    listItem.classList.add(
      "note-card",
      `category-${note.category}`
    );

    const noteText = document.createElement("p");
    noteText.classList.add("note-text");
    noteText.textContent = note.text;

    const categoryLabel = document.createElement("span");
    categoryLabel.classList.add("category-label");
    categoryLabel.textContent = note.category;

    const date = document.createElement("p");
    date.classList.add("note-date");
    date.textContent = note.createdAt;

    listItem.appendChild(noteText);
    listItem.appendChild(categoryLabel);
    listItem.appendChild(date);

    notesList.appendChild(listItem);
  });
}


// Add a note
noteForm.addEventListener("submit", event => {
  event.preventDefault();

  const text = noteInput.value.trim();
  const category = noteCategory.value;

  const newNote = {
    id: Date.now(),
    text: text,
    category: category,
    createdAt: new Date().toLocaleString()
  };

  notes.push(newNote);

  render();

  noteInput.value = "";
});