let bookList = [];

function displayBooks() {
  const outputFiled = document.getElementById('outputField');
  outputFiled.innerHTML = '';

  bookList.forEach((book) => {
    const outputField = document.getElementById('outputField');
    const bookListDiv = document.createElement('div');
    const bookName = document.createElement('h2');
    const bookAuthor = document.createElement('h3');
    const removeBtn = document.createElement('button');
    removeBtn.innerText = 'Remove';
    removeBtn.classList.add('delete');

    bookName.innerHTML = `${book.bookTitle}`;
    bookAuthor.innerHTML = `${book.bookAuthor}`;

    outputField.append(bookListDiv);
    bookListDiv.append(bookName, bookAuthor, removeBtn);

    removeBtn.addEventListener('click', () => {
      bookList = bookList.filter((t) => t !== book);
      localStorage.setItem('bookList', JSON.stringify(bookList));
      displayBooks();
    });
  });
}

window.addEventListener('load', () => {
  bookList = JSON.parse(localStorage.getItem('bookList')) || [];
  const inputform = document.getElementById('bookForm');

  inputform.addEventListener('submit', (e) => {
    e.preventDefault();

    const book = {
      bookTitle: e.target.elements.bookTitle.value,
      bookAuthor: e.target.elements.bookAuthor.value,
    };

    bookList.push(book);
    localStorage.setItem('bookList', JSON.stringify(bookList));
    e.target.reset();

    displayBooks();
  });

  displayBooks();
});
