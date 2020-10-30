let bookList = document.getElementById("book-list");
let form = document.getElementById("book-form");
let submit = document.getElementById("submit");
let readStatus = document.getElementsByClassName("read-status");
let showFormBtn = document.querySelector(".show-form");

let myLibrary = [];
let id = 0;

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.id = id;
    id++;
}

function addBookToLibrary() {
    let title = document.getElementById("title-input").value;
    let author = document.getElementById("author-input").value;
    let pages = document.getElementById("pages-input").value;
    let read = document.getElementById("read-input").checked;

    book = new Book(title, author, pages, read);
    myLibrary.push(book);
    displayLibrary(myLibrary)
    form.reset();
}

function displayLibrary(array) {
    while (bookList.firstChild) {
        bookList.removeChild(bookList.firstChild)
    }


    for (let i = 0; i < array.length; i++) {
        let bookContainer = document.createElement('li');
        let title = document.createElement('h3');
        let author = document.createElement('p');
        let pages = document.createElement('p');
        let read = document.createElement('p');
        read.classList.add("read-status");

        title.textContent = array[i].title;
        author.textContent = array[i].author;
        pages.textContent = array[i].pages + " pages";
        if (array[i].read) {
            read.textContent = "You have already read this book!";
        } else {
            read.textContent = "You haven't read this book yet!";
        }
        bookContainer.appendChild(title);
        bookContainer.appendChild(author);
        bookContainer.appendChild(pages);
        bookContainer.appendChild(read);
        bookList.appendChild(bookContainer);

        let readBtn = createReadBtn(array[i]);
        let deleteBtn = createDeleteBtn(array[i]);

        readBtn.classList.add('btn');
        readBtn.classList.add('btn-primary');
        deleteBtn.classList.add('btn');
        deleteBtn.classList.add('btn-primary');

        bookContainer.appendChild(readBtn);
        bookContainer.appendChild(deleteBtn);
    }

}

function showForm() {
    if (form.style.display === "block")
        form.style.display = "none";
    else
        form.style.display = "block";
}

function defaultBooks() {
    let dbook1 = new Book("The Winds of Winter", "GRRM", 1034, true);
    let dbook2 = new Book("A Dream of Spring", "GRRM", 890, true);
    let dbook3 = new Book("A Clash of Kings", "GRRM", 1300, false);
    let dbook4 = new Book("A Game of Thrones", "GRRM", 734, true);

    myLibrary.push(dbook1, dbook2, dbook3, dbook4);
    displayLibrary(myLibrary)
}


submit.addEventListener('click', (e) => {
    e.preventDefault();
    addBookToLibrary();
    form.style.display = "none";
})

defaultBooks();


function createReadBtn(book) {
    let readBtn = document.createElement('button');
    readBtn.textContent = (book.read ? 'Unread' : 'Read');

    readBtn.addEventListener('click', () => {
        book.read = !book.read;
        readBtn.textContent = (book.read ? 'Unread' : 'Read');
        displayLibrary(myLibrary)
    })

    return readBtn;
}

function createDeleteBtn(book) {
    let deleteBtn = document.createElement('button');

    deleteBtn.textContent = "Delete";

    deleteBtn.addEventListener('click', () => {    
        let index = myLibrary.findIndex(item => item.title === book.title)

        myLibrary.splice(index, 1)

        displayLibrary(myLibrary)
    })

    return deleteBtn;
}

showFormBtn.onclick = () => showForm();