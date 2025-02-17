const d = document;

const myLibrary = [];

const initBooks = [
  {
    title: "Catch-22",
    author: "Joseph Heller",
    pages: "459",
    read: true,
  },
  {
    title: "Portnoy's Complaint",
    author: "Philip Roth",
    pages: "289",
    read: true,
  },
  {
    title: "Catcher in the Rye",
    author: "JD Salinger",
    pages: "167",
    read: false,
  },
  {
    title: "Grapes of Wrath",
    author: "John Steinbeck",
    pages: "637",
    read: true,
  },
];

class Book {
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.info = () =>
      `${this.title} by ${this.author}, ${this.pages} pages, ${
        !this.read ? "not read yet." : "read."
      }`;
  }
}

// INIT TABLE WITH EXISTING BOOKS
initBooks.forEach((book, i) => {
  addBookToLibrary(book);
  const currentBook = myLibrary[i];
  const table = d.getElementById("library-table");
  const row = table.insertRow();
  const currBookVals = Object.values(currentBook);

  cycleThruBooks(currBookVals, currentBook, table, row);
});

// ADD NEW BOOK TO LIBRARY
function addBookToLibrary({ title, author, pages, read }) {
  const newBook = new Book(title, author, pages, JSON.parse(read));

  myLibrary.push(newBook);

  return newBook;
}

// CYCLE THRU LIBRARY, HYDRATE TABLE
function cycleThruBooks(currBookVals, currentBook, table, row) {
  currBookVals.forEach((bookVal) => {
    if (typeof bookVal !== "function" && typeof bookVal !== "number") {
      const td = d.createElement("td");

      td.innerText = bookVal;
      row.appendChild(td);

      if (typeof bookVal === "boolean") {
        td.innerText = "";
        row.appendChild(td).appendChild(createReadToggle(currentBook));
        row
          .insertCell()
          .appendChild(createRemoveButton(currentBook, table, row));
      }
    }
  });
}

// REMOVE BOOK BUTTON
function createRemoveButton(book, table, row) {
  const removeButton = d.createElement("button");

  removeButton.innerText = "Remove Book";
  removeButton.onclick = () => {
    const newArr = myLibrary.filter(
      (item) => !Object.keys(book).every((key) => book[key] === item[key])
    );

    table.deleteRow(row.rowIndex);
    myLibrary.splice(0, myLibrary.length, ...newArr);
  };

  return removeButton;
}

// READ TOGGLE
function createReadToggle(currentBook) {
  const readToggle = d.createElement("button");

  readToggle.innerText = currentBook.read;
  readToggle.onclick = () =>
    (readToggle.innerText = currentBook.read = !currentBook.read);

  return readToggle;
}

// ADD NEW BOOK
function onSubmit(e) {
  e.preventDefault();

  const formData = new FormData(d.getElementById("book-form"));
  const newBook = addBookToLibrary({ ...Object.fromEntries(formData) });
  const newBookVals = Object.values(newBook);
  const table = d.getElementById("library-table");
  const row = table.insertRow();

  cycleThruBooks(newBookVals, newBook, table, row);
  dialog.close();
}

// MODAL
const dialog = d.querySelector("dialog");
const closeModal = () => dialog.close();
const showModal = () => dialog.showModal();
