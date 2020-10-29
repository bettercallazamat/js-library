let bookList = document.getElementById("book-list");


let myLibrary = []

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

function addBookToLibrary(book) {
    myLibrary.push(book);
}

book1 = new Book("Title1", "Author1", 32, true);
book2 = new Book("Title2", "Author2", 32, false);

addBookToLibrary(book1);
addBookToLibrary(book2);

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


displayLibrary(myLibrary);


