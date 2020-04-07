const booksContainer = document.querySelector('ul')
const currentUser = { id: 1, username: "pouros" };

fetch (booksUrl)
.then(response => response.json())
.then(booksArray => renderBooks(booksArray))

function renderBooks(booksArray) {
    booksArray.forEach(book => {
        const bookLi = document.createElement('li')
        bookLi.innerText =  book.title
        booksContainer.append(bookLi)
        bookLi.style.cursor = "pointer";
        bookLi.addEventListener('click', () => renderInfo(book))
    });
}

function renderInfo(book) {
    const showPanel = document.querySelector("#show-panel")
    const bookImg = document.createElement('img')
    bookImg.src = book.img_url;

    const bookDescription = document.createElement('p');
    bookDescription.innerText = book.description;
    const ul = document.createElement("ul");

    book.users.forEach( user => {
        const userLi = document.createElement("li");
        userLi.innerText = user.username;
        ul.append(userLi)
    })

    const likeButton = document.createElement("button");
    likeButton.innerText = "Like Book";

    likeButton.addEventListener('click', () => {
        book.users.push(currentUser)
        const li = document.createElement("li");
        li.innerText = currentUser.username;
        ul.append(li);
    });

    fetch(`${booksUrl}/${book.id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        },
        body: JSON.stringify(book)
    });
    
    [...showPanel.children].forEach( child => child.remove())
    showPanel.append(bookImg, bookDescription, ul, likeButton )
}