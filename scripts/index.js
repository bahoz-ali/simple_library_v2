/* eslint-disable max-classes-per-file */

import {
  addBookButton,
  authorInput,
  bookList,
  form,
  titleInput,
} from '../modules/elements.js';

// sections
const showingBooksSection = document.querySelector('.showing_books');
const newBookSection = document.querySelector('.book_section');
const contactSection = document.querySelector('.contact_section');

// navigation links
const homeLink = document.querySelector('#home_link');
const addBookLink = document.querySelector('#add_book_link');
const contactLink = document.querySelector('#contact_link');

class Book {
  constructor(id, title, authorName) {
    this.id = id;
    this.title = title;
    this.authorName = authorName;
  }
}

class Library {
  books = [];

  uniqueId = () => {
    const { length } = this.books;
    return length ? length + 1 : 0;
  };

  addBook = (e) => {
    e.preventDefault();

    const id = this.uniqueId();
    const title = titleInput.value.trim() ? titleInput.value.trim() : 'test';
    const author = authorInput.value.trim() ? authorInput.value.trim() : 'test';

    const newBook = new Book(id, title, author);

    this.books.push(newBook);

    this.updateStorage();

    this.displayBooks();

    form.reset();
  };

  // eslint-disable-next-line
  deleteBook = (id) => {
    if (this.books) {
      this.books = this.books.filter((b) => b.id !== id);

      this.updateStorage();
      this.displayBooks();
    }
  };

  getBooks = () => {
    try {
      return JSON.parse(localStorage.getItem('books'));
    } catch (error) {
      return localStorage.getItem('books');
    }
  };

  createLocalStorage() {
    if (!localStorage.getItem('books')) {
      localStorage.setItem('books', JSON.stringify([]));
    } else {
      this.books = this.getBooks();
    }
  }

  updateStorage() {
    localStorage.setItem('books', JSON.stringify(this.books));
  }

  templateBook = (obj) => {
    const div = document.createElement('div');
    div.classList.add('book');

    const insideBook = `
     <p><i class="fa-solid fa-address-book"></i> <span style="margin-left: 0.2rem;">${obj.title}</span> - <span>${obj.authorName}</span></p>
             <button class="btn" id="delete_book" type="submit" onClick="library.deleteBook(${obj.id})" data-id='${obj.id}'><i class="fa-solid fa-trash"></i></button>`;

    div.innerHTML = insideBook;

    bookList.append(div);
  };

  displayBooks() {
    // clean the book list before.
    bookList.innerHTML = '';

    if (this.books.length === 0) {
      hide(showingBooksSection);
    }

    if (this.books || this.books.length !== 0) {
      this.books.forEach((book) => {
        this.templateBook(book);
      });
    }
  }
}

function show(name, display = 'block') {
  name.style.display = display;
}

function hide(name) {
  name.style.display = 'none';
}

const library = new Library();

homeLink.addEventListener('click', () => {
  if (library.books.length) {
    show(showingBooksSection);
  }

  hide(newBookSection);
  hide(contactSection);
  library.displayBooks();
});

addBookLink.addEventListener('click', () => {
  show(newBookSection, 'flex');
  hide(showingBooksSection);
  hide(contactSection);
});

contactLink.addEventListener('click', () => {
  show(contactSection, 'flex');
  hide(showingBooksSection);
  hide(newBookSection);
});

document.addEventListener('DOMContentLoaded', () => {
  library.createLocalStorage();
  library.displayBooks();
  addBookButton.addEventListener('click', library.addBook);

  if (library.books.length) {
    show(showingBooksSection);
  }
});
