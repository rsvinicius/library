const myLibrary = [];
const mainElement = document.querySelector('.books__list');
const booksSource = "/assets/books.json"
const dialog = document.querySelector("dialog");
const showButton = document.querySelector("dialog + button");
const dialogCloseButton = document.querySelector(".modal button");
const form = document.querySelector("form");

class Book {
    constructor(title, author, pages, status) {
        this.title = title,
            this.author = author,
            this.pages = pages,
            this.status = status;
    }
}

async function initializeLibrary() {
    await getBooksFromSource();
}

async function getBooksFromSource() {
    let result = await fetch(booksSource);
    books = await result.json()
    books.forEach(book => addBookToLibrary(new Book(book.title, book.author, book.pages, book.status)))
}

function addBookToLibrary(book) {
    myLibrary.push(book);
    renderBookCard(book);
}

function renderBookCard(book) {
    const htmlContent = `
    <li class="books__card card">
    <button class="close-btn delete-book" aria-label="Close">×</button>
    <p class="card__title"><b>Title:</b> ${book.title}</p>
    <p class="card__author"><b>Author:</b> ${book.author}</p>
    <p class="card__pages"><b>Pages:</b> ${book.pages}</p>
    <div class="card__status">
        <p><b>Status:</b></p>
        <select>
            <option value="Not Read" ${book.status === 'Not Read' ? 'selected' : ''}>Not Read</option>
            <option value="Reading" ${book.status === 'Reading' ? 'selected' : ''}>Reading</option>
            <option value="Read" ${book.status === 'Read' ? 'selected' : ''}>Read</option>
        </select>
    </div>
</li>
    `
    mainElement.innerHTML += htmlContent

    attachDeleteEventListeners();
}

function addNewBook(event) {
    event.preventDefault();

    let formData = new FormData(event.target);
    let title = formData.get('title');
    let author = formData.get('author');
    let pages = formData.get('pages');
    let status = formData.get('status');

    addBookToLibrary(new Book(title, author, pages, status));

    dialog.close();
}

function removeBookFromLibraryByTitle(title) {
    let bookIndex = myLibrary.findIndex(book => {
        return book.title === title
    });

    if (bookIndex !== -1) {
        myLibrary.splice(bookIndex, 1);
        console.log(`Removed "${title}" from myLibrary.`);
    } else {
        console.log(`Book "${title}" not found in myLibrary.`);
    }
}

function deleteBook(btn) {
    const card = btn.closest('.books__card');
    const titleElement = card.querySelector('.card__title');
    const title = titleElement.textContent.replace('Title:', '').trim();

    card.remove(); // Remove the book card from the DOM

    removeBookFromLibraryByTitle(title); // Remove the book from the library array
}

function attachDeleteEventListeners() {
    const cardsDeleteButtons = document.querySelectorAll(".delete-book");

    cardsDeleteButtons.forEach(button => {
        button.addEventListener('click', () => deleteBook(button)); 
    });
}

initializeLibrary();

showButton.addEventListener("click", () => {
    dialog.showModal();
});

dialogCloseButton.addEventListener("click", () => {
    dialog.close();
});

form.addEventListener("submit", addNewBook);