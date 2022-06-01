// book class
class Book {
  constructor(title, author) {
    this.title = title;
    this.author = author;
  }
}

// interface class
class Bookinterface {
  static bookDetails() {
    const books = Store.getBook();
    books.forEach((booklist) => Bookinterface.addbook(booklist));
  }

  static addbook(booklist) {
    const outputField = document.getElementById('outputField');
    const bookContWrapper = document.createElement('div');
    const bookListCont = document.createElement('div');
    const listWrapper = document.createElement('div');
    const bookName = document.createElement('h2');
    const bookAuthor = document.createElement('h2');
    const byText = document.createElement('h2');
    bookListCont.classList.add('book-list-style');
    bookAuthor.classList.add('list-cont-style');
    bookName.classList.add('list-cont-style');
    const removeBtn = document.createElement('button');
    bookContWrapper.classList.add('book-cont-wrap');
    removeBtn.innerText = 'Remove';
    removeBtn.classList.add('delete');
    listWrapper.classList.add('list-wrapper');
    bookName.innerHTML = `${booklist.title}`;
    bookAuthor.innerHTML = `${booklist.author}`;
    byText.innerHTML = 'By';
    byText.classList.add('list-cont-style');
    bookContWrapper.append(bookName, byText, bookAuthor);
    listWrapper.append(bookContWrapper, bookListCont);
    outputField.append(listWrapper);
    bookListCont.append(removeBtn);
  }

  static deleteBook(el) {
    if (el.classList.contains('delete')) {
      el.parentElement.parentElement.remove();
    }
  }

  static clearInput() {
    document.getElementById('bookTitle').value = '';
    document.getElementById('bookAuthor').value = '';
  }
}

// displaying book details

document.addEventListener('DOMContentLoaded', Bookinterface.bookDetails);
// adding book
document.querySelector('#bookForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const title = document.getElementById('bookTitle').value;
  const author = document.getElementById('bookAuthor').value;
  const book = new Book(title, author);

  // Adding book to user interface
  Bookinterface.addbook(book);

  // add book to store
  Store.addBook(book);

  Bookinterface.clearInput();
});

// Removing Book

document.querySelector('#outputField').addEventListener('click', (e) => {
  // remove book for interface
  Bookinterface.deleteBook(e.target);

  //    remove book for storage
  Store.removeBook(e.target.parentElement.parentElement.firstChild.firstChild.textContent);
});

// storage class
class Store {
  static getBook() {
    let books;
    if (localStorage.getItem('books') === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem('books'));
    }
    return books;
  }

  static addBook(book) {
    const books = Store.getBook();
    books.push(book);
    localStorage.setItem('books', JSON.stringify(books));
  }

  static removeBook(title) {
    const books = Store.getBook();
    books.forEach((book, index) => {
      if (book.title === title) {
        books.splice(index, 1);
      }
    });

    localStorage.setItem('books', JSON.stringify(books));
  }
}
