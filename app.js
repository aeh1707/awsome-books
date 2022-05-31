outputField = document.querySelector('#outputField');

const books = [
    {
        title: 'Book1',
        author: 'Author1'
    },
    {
        title: 'Book2',
        author: 'Author2'
    }
];

function Add(title, author) {
    return `<article>
                <h2 class="title">${title}</h2>
                <h3 class="author">${author}</h3>
                <button type="submit" class="remove-btn">Remove</button>
                <hr>`;
}
