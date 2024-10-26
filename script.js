const myLibrary = [];
const mainElement = document.querySelector('.books__list');
const booksSource = "/assets/books.json"

class Book {
    constructor(title, author, pages, isRead) {
        this.title = title,
            this.author = author,
            this.pages = pages,
            this.isRead = isRead;
    }
}

async function getBooksFromSource() {
    let result = await fetch(booksSource);
    books = await result.json()
    books.forEach(addBookToLibrary)
}

function addBookToLibrary(book) {
    myLibrary.push(new Book(book.title, book.author, book.pages, book.isRead))
}

function renderBookCard(book) {
    const checkboxStatus = defineCheckboxStatus(book)
    const htmlContent = `
    <li class="books__card card">
                    <p class="card__title"><b>Title:</b> ${book.title}</p>
                    <p class="card__author"><b>Author:</b> ${book.author}</p>
                    <p class="card__pages"><b>Pages:</b> ${book.pages}</p>
                    <div class="card__status">
                        <p><b>Is book read?</b></p>
                        <label class="switch">
                            <input type="checkbox" ${checkboxStatus}>
                            <span class="slider"></span>
                        </label>
                    </div>
                </li>
    `
    mainElement.innerHTML += htmlContent
}

function defineCheckboxStatus(Book) {
    if (Book.isRead) return 'checked';
    return '';
}


async function initializeLibrary() {
    await getBooksFromSource();
    myLibrary.forEach(renderBookCard);
}

initializeLibrary();