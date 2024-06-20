document.addEventListener('DOMContentLoaded', () => {
    displayBooks();

    document.getElementById('book-form').addEventListener('submit', addBook);
    document.getElementById('search').addEventListener('keyup', searchBooks);
});

function addBook(e) {
    e.preventDefault();
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;

    const book = {
        id: Date.now().toString(),
        title: title,
        author: author,
        year: new Date().getFullYear() // Adjust this based on your requirements
    };

    const books = getBooksFromStorage();
    books.push(book);
    localStorage.setItem('books', JSON.stringify(books));

    displayBooks();
    document.getElementById('book-form').reset();
    animateBookAdded();
}

function displayBooks() {
    const books = getBooksFromStorage();
    const bookList = document.getElementById('book-list');

    bookList.innerHTML = '';

    books.forEach(function (book) {
        bookList.innerHTML += `
            <div class="book" data-id="${book.id}">
                <h3>${book.title}</h3>
                <p>${book.author}</p>
                <button onclick="editBook('${book.id}')" class="edit">Edit</button>
                <button onclick="removeBook('${book.id}')" class="remove">Remove</button>
            </div>
        `;
    });
}

function removeBook(id) {
    let books = getBooksFromStorage();
    books = books.filter(book => book.id !== id);
    localStorage.setItem('books', JSON.stringify(books));

    displayBooks();
    animateBookRemoved();
}

function editBook(id) {
    const editedTitle = prompt("Enter new title:");
    const editedAuthor = prompt("Enter new author:");

    let books = getBooksFromStorage();
    books = books.map(book => {
        if (book.id === id) {
            return {
                ...book,
                title: editedTitle,
                author: editedAuthor,
                year: new Date().getFullYear() // Adjust this based on your requirements
            };
        }
        return book;
    });

    localStorage.setItem('books', JSON.stringify(books));
    displayBooks();
}

function animateBookAdded() {
    const bookList = document.getElementById('book-list');
    const lastBook = bookList.lastElementChild;

    lastBook.classList.add('fade-in');

    setTimeout(function () {
        lastBook.classList.remove('fade-in');
    }, 1000);
}

function animateBookRemoved() {
    const bookList = document.getElementById('book-list');
    const removedBook = bookList.lastElementChild;

    removedBook.classList.add('fade-out');

    setTimeout(function () {
        removedBook.remove();
    }, 1000);
}

function searchBooks() {
    const searchText = document.getElementById('search').value.toLowerCase();
    const books = getBooksFromStorage();
    const filteredBooks = books.filter(function (book) {
        return book.title.toLowerCase().includes(searchText) || book.author.toLowerCase().includes(searchText);
    });

    const bookList = document.getElementById('book-list');
    bookList.innerHTML = '';

    filteredBooks.forEach(function (book) {
        bookList.innerHTML += `
            <div class="book" data-id="${book.id}">
                <h3>${book.title}</h3>
                <p>${book.author}</p>
                <button onclick="editBook('${book.id}')" class="edit">Edit</button>
                <button onclick="removeBook('${book.id}')" class="remove">Remove</button>
            </div>
        `;
    });
}

function getBooksFromStorage() {
    return JSON.parse(localStorage.getItem('books')) || [];
}
