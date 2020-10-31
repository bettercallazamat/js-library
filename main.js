const bookList = document.getElementById('book-list');
const form = document.getElementById('book-form');
const submit = document.getElementById('submit');
const showFormBtn = document.querySelector('.show-form');
const myLibrary = JSON.parse(localStorage.getItem('myLibrary')) || [];

const book = (title, author, pages, read) => {
  const self = { title, author, pages, read };

  const bookMethods = (self) => ({
    printReadStatus: () => {
      const result = self.read ? 'You have already read this book!' : "You haven't read this book yet!";
      return result;
    }
  });

  return Object.assign(self, bookMethods(self));
}

const saveLocalStorage = () => {
  localStorage.setItem('myLibrary', JSON.stringify(myLibrary));
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
    const readBtn = createReadBtn(array[i]);
    const deleteBtn = createDeleteBtn(array[i]);

    read.classList.add('read-status');
    readBtn.classList.add('btn', 'btn-primary', 'btn-style', 'mt-2');
    deleteBtn.classList.add('btn', 'btn-primary', 'btn-style', 'mt-2');

    title.textContent = array[i].title;
    author.textContent = array[i].author;
    pages.textContent = `${array[i].pages} pages`;
    read.textContent = array[i].printReadStatus();
    
    bookContainer.appendChild(title);
    bookContainer.appendChild(author);
    bookContainer.appendChild(pages);
    bookContainer.appendChild(read);
    bookContainer.appendChild(readBtn);
    bookContainer.appendChild(deleteBtn);
    bookList.appendChild(bookContainer);
  }
};

const addBookToLibrary = () => {
  const title = document.getElementById('title-input').value;
  const author = document.getElementById('author-input').value;
  const pages = document.getElementById('pages-input').value;
  const read = document.getElementById('read-input').checked;

  const book = book(title, author, pages, read);
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
  const dbook1 = book('The Winds of Winter', 'GRRM', 1034, true);
  const dbook2 = book('A Dream of Spring', 'GRRM', 890, true);
  const dbook3 = book('A Clash of Kings', 'GRRM', 1300, false);
  const dbook4 = book('A Game of Thrones', 'GRRM', 734, true);

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