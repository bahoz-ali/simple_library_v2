/* eslint-disable max-classes-per-file */
import Library from '../modules/Library.js';
import { show, hide } from '../modules/utils.js';
import { DateTime } from '../node_modules/luxon/src/luxon.js';
const dt = DateTime.now();

import {
  addBookButton,
  showingBooksSection,
  addBookLink,
  contactLink,
  homeLink,
  contactSection,
  newBookSection,
  footerTime,
  time,
} from '../modules/elements.js';

export const library = new Library();

export const showHome = () => {
  if (library.books.length) {
    show(showingBooksSection);
  }

  hide(newBookSection);
  hide(contactSection);
  library.displayBooks();
};

export const showBookForm = () => {
  show(newBookSection, 'flex');
  hide(showingBooksSection);
  hide(contactSection);
};

export const showContact = () => {
  show(contactSection, 'flex');
  hide(showingBooksSection);
  hide(newBookSection);
};

homeLink.addEventListener('click', showHome);
addBookLink.addEventListener('click', showBookForm);
contactLink.addEventListener('click', showContact);

addBookButton.addEventListener('click', library.addBook);
document.addEventListener('click', function (e) {
  if (e.target && e.target.id == 'delete_book') {
    library.deleteBook(Number(e.target.dataset.id));
  }
});

document.addEventListener('DOMContentLoaded', () => {
  library.createLocalStorage();
  library.displayBooks();

  if (library.books.length) {
    show(showingBooksSection);
  }

  footerTime.innerHTML = dt.year;
});

// update the time every second.
setInterval(() => {
  const now = DateTime.now();
  const currentTime = now.toLocaleString(DateTime.DATETIME_MED_WITH_SECONDS);
  time.innerHTML = currentTime;
}, 1000);
