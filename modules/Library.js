import { library } from '../scripts/index.js';
import Book from './book.js';
import {
  titleInput,
  authorInput,
  bookList,
  form,
  showingBooksSection,
} from './elements.js';
import { hide } from './utils.js';

export default class Library {
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

  createLocalStorage = () => {
    if (!localStorage.getItem('books')) {
      localStorage.setItem('books', JSON.stringify([]));
    } else {
      this.books = this.getBooks();
    }
  };

  updateStorage = () => {
    localStorage.setItem('books', JSON.stringify(this.books));
  };

  templateBook = (obj) => {
    const div = document.createElement('div');
    div.classList.add('book');

    const insideBook = `
     <p><i class="fa-solid fa-address-book"></i> <span style="margin-left: 0.2rem;">${obj.title}</span> - <span>${obj.authorName}</span></p>
             <button class="btn" style="padding:0;"  type="submit" ><i id="delete_book" data-id='${obj.id}' class="fa-solid fa-trash"></i></button>`;

    div.innerHTML = insideBook;

    bookList.append(div);
  };

  displayBooks = () => {
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
  };
}
