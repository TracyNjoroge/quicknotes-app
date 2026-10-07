const noteForm = document.querySelector("#note-form");
const noteInput = document.querySelector("#note-input");
const noteCategory = document.querySelector("#note-category");
const notesList = document.querySelector("#notes-list");const noteCount = document.querySelector("#note-count");
const errorMessage = document.querySelector("#error-message");

let notes = [];

// Update note count
function updateCount() {
  if (notes.length === 0) {
    noteCount.textContent = "You have no notes yet.";
  } else if (notes.length === 1) {
    noteCount.textContent = "You have 1 note.";
  } else {
    noteCount.textContent = `You have ${notes.length} notes.`;
  }
}


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

    const deleteButton = document.createElement("button");
    deleteButton.classList.add("delete-btn");
    deleteButton.textContent = "Delete";

    deleteButton.addEventListener("click", () => {
      notes = notes.filter(existingNote => existingNote.id !== note.id);

      render();
    });

    listItem.appendChild(noteText);
    listItem.appendChild(categoryLabel);
    listItem.appendChild(date);
    listItem.appendChild(deleteButton);

    notesList.appendChild(listItem);
  });

  updateCount();
}


// Add a note
noteForm.addEventListener("submit", event => {
  event.preventDefault();

  const text = noteInput.value.trim();
  const category = noteCategory.value;

  // Validate empty note
  if (text === "") {
    errorMessage.textContent = "Please type a note first.";
    return;
  }

  // Validate character limit
  if (text.length > 200) {
    errorMessage.textContent =
      "Notes must be 200 characters or fewer.";
    return;
  }

  // Clear error after valid note
  errorMessage.textContent = "";

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


// Display initial count
updateCount();