let bookList = document.getElementById("book-list");
let form = document.getElementById("book-form");
let submit = document.getElementById("submit");


let myLibrary = []

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

function addBookToLibrary() {
    let title = document.getElementsByName('title-input').value;
    let author = document.getElementsByName('author-input').value;
    let pages = document.getElementsByName('pages-input').value;
    let read = document.getElementsByName('read-input').checked;
    book = new Book(title, author, pages, read);
    myLibrary.push(book);
    form.reset();
    displayLibrary(myLibrary)
}

function displayLibrary(array) {
    for (let i = 0; i < array.length; i++) {
        let bookContainer = document.createElement('div');
        let title = document.createElement('span');
        let author = document.createElement('span');
        let pages = document.createElement('span');
        let read = document.createElement('span');

        title.textContent = array[i].title;
        author.textContent = array[i].author;
        pages.textContent = array[i].pages;
        read.textContent = array[i].read;

        bookContainer.appendChild(title);
        bookContainer.appendChild(author);
        bookContainer.appendChild(pages);
        bookContainer.appendChild(read);
        bookList.appendChild(bookContainer);
    }
}

book1 = new Book("Title1", "Author1", 32, true);
book2 = new Book("Title2", "Author2", 32, false);

addBookToLibrary();
displayLibrary(myLibrary);

submit.onclick = addBookToLibrary()