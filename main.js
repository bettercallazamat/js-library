const bookList = document.getElementById('book-list');
const form = document.getElementById('book-form');
const submit = document.getElementById('submit');
const showFormBtn = document.querySelector('.show-form');
const myLibrary = JSON.parse(localStorage.getItem('myLibrary')) || [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

const saveLocalStorage = () => {
  localStorage.setItem('myLibrary', JSON.stringify(myLibrary));
};

const changeReadStatus = (status) => {
  const result = status ? 'You have already read this book!' : "You haven't read this book yet!";
  return result;
};

const displayLibrary = (array) => {
  while (bookList.firstChild) {
    bookList.removeChild(bookList.firstChild);
  }

  const createReadBtn = (book) => {
    const readBtn = document.createElement('button');
    readBtn.textContent = (book.read ? 'Unread' : 'Read');

    readBtn.addEventListener('click', () => {
      book.read = !book.read;
      readBtn.textContent = (book.read ? 'Unread' : 'Read');
      displayLibrary(myLibrary);
      saveLocalStorage();
    });

    return readBtn;
  };

  const createDeleteBtn = (book) => {
    const deleteBtn = document.createElement('button');

    deleteBtn.textContent = 'Delete';

    deleteBtn.addEventListener('click', () => {
      const index = myLibrary.findIndex(item => item.title === book.title);

      myLibrary.splice(index, 1);

      displayLibrary(myLibrary);
      saveLocalStorage();
    });

    return deleteBtn;
  };

  for (let i = 0; i < array.length; i += 1) {
    const bookContainer = document.createElement('li');
    const title = document.createElement('h3');
    const author = document.createElement('p');
    const pages = document.createElement('p');
    const read = document.createElement('p');
    read.classList.add('read-status');

    title.textContent = array[i].title;
    author.textContent = array[i].author;
    pages.textContent = `${array[i].pages} pages`;
    read.textContent = changeReadStatus(array[i].read);
    bookContainer.appendChild(title);
    bookContainer.appendChild(author);
    bookContainer.appendChild(pages);
    bookContainer.appendChild(read);
    bookList.appendChild(bookContainer);

    const readBtn = createReadBtn(array[i]);
    const deleteBtn = createDeleteBtn(array[i]);

    readBtn.classList.add('btn', 'btn-primary', 'btn-style', 'mt-2');
    deleteBtn.classList.add('btn', 'btn-primary', 'btn-style', 'mt-2');

    bookContainer.appendChild(readBtn);
    bookContainer.appendChild(deleteBtn);
  }
};

const addBookToLibrary = () => {
  const title = document.getElementById('title-input').value;
  const author = document.getElementById('author-input').value;
  const pages = document.getElementById('pages-input').value;
  const read = document.getElementById('read-input').checked;

  const book = new Book(title, author, pages, read);
  myLibrary.push(book);
  displayLibrary(myLibrary);
  saveLocalStorage();
  form.reset();
};

submit.addEventListener('click', (e) => {
  e.preventDefault();
  addBookToLibrary();
  form.style.display = 'none';
});

const defaultBooks = () => {
  const dbook1 = new Book('The Winds of Winter', 'GRRM', 1034, true);
  const dbook2 = new Book('A Dream of Spring', 'GRRM', 890, true);
  const dbook3 = new Book('A Clash of Kings', 'GRRM', 1300, false);
  const dbook4 = new Book('A Game of Thrones', 'GRRM', 734, true);

  myLibrary.push(dbook1, dbook2, dbook3, dbook4);
};

const showForm = () => {
  if (form.style.display === 'block') form.style.display = 'none';
  else form.style.display = 'block';
};

if (localStorage.getItem('myLibrary') === null) {
  defaultBooks();
}

displayLibrary(myLibrary);

showFormBtn.onclick = () => showForm();