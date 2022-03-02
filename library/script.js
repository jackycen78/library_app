/* Data Structures */

class Book {

    constructor(title, author, pages, readStatus, dateFinished=null){
        this.title = title 
        this.author = author
        this.pages = pages
        this.readStatus = readStatus
        this.dateFinished = dateFinished
    }

    markRead(){
        this.readStatus = 'Read'
    }

    markInProgress(){
        this.readStatus = 'In Progress'
    }

    markNotRead(){
        this.readStatus = 'Not Read'
    }

    /* Getter Methods */

    getTitle(){
        return this.title
    }

    getAuthor(){
        return this.author
    }

    getPages(){
        return this.pages
    }

    getReadStatus(){
        return this.readStatus
    }

    getDateFinished(){
        return this.dateFinished
    }

    getInfo(){
        let info = this.title + ' written by ' + this.author + ', is ' + this.pages + ' pages long. '
        
        if (this.readStatus == 'Read'){
            info += 'I have already read it, finishing it on ' + this.dateFinished + '.'
        }
        else if (this.readStatus == 'In Progress'){
            info += 'I am in the progress of reading it.'
        }

        else if (this.readStatus == 'Not Started'){
            info += 'I am interested in this book, but have not started.'
        }
        return info
    }
}

class Library {

    constructor(){
        this.books = []
        this.stats = {
            'Read': 0,
            'In Progress': 0,
            'Not Read': 0,
            'Pages Finished': 0,
        }
    }

    addBook(book) {
        this.books.push(book)
        createBookCard(book)
        this.updateProgress()
    }

    getBook(bookTitle){
        for (let i = 0; i < this.books.length; i++){
            if (this.books[i].getTitle() == bookTitle){
                return this.books[i]
            }
        }
    }

    deleteBook(bookTitle){
        for (let i = 0; i < this.books.length; i++){
            if (this.books[i].getTitle() == bookTitle){
                this.books.splice(i, 1)
                }
        }
        this.updateProgress()
     }
    
    updateProgress(){
        this.stats = {
            'Read': 0,
            'In Progress': 0,
            'Not Read': 0,
            'Pages Finished': 0,
         }

        for (let i = 0; i < this.books.length; i++){
            this.stats[this.books[i].getReadStatus()] += 1
            if(this.books[i].getReadStatus() == 'Read'){
                 this.stats['Pages Finished'] += this.books[i].getPages()
            }
        }

        const counter = document.getElementById('statsCounter')
        counter.innerHTML = 'Read: ' + this.showBooksRead() + ', ' +
                            'In Progress: ' + this.showBooksInProgress() + ', ' +
                            'Not Read: ' + this.showBooksNotRead() + ', ' +
                            'Pages Finished: ' + this.showPagesFinished()
     }

    showBooksInfo(){
        for (let i = 0; i < this.books.length; i++){
            console.log(this.books[i].getInfo())
        }
    }

    showBooksRead(){
        return this.stats['Read']
    }

    showBooksInProgress(){
        return this.stats['In Progress']
    }

    showBooksNotRead(){
        return this.stats['Not Read']
    }

    showPagesFinished(){
        return this.stats['Pages Finished']
    }
}

const bookList = document.getElementById('bookList')


/* TESTING */

book1 = new Book('Holes', 'Louis Sachar', 251, 'Read', 'Nov 11, 2021')
book2 = new Book('To Kill a Mockingbird', 'Harper Lee', 342, 'In Progress')
book3 = new Book('The Great Gatsby', 'F. Scott Fitzgerald', 152, 'Not Read')
book4 = new Book('The Catcher in the Rye', 'J.D. Salinger', 277, 'Read')
book5 = new Book('The Alchemist', 'Paulo Coelho', 163, 'Read')
book6 = new Book('Catch-22', 'Joesph Heller', 453, 'Read')
book7 = new Book('Anne of Green Gables', 'L.M. Montgomery', 282, 'Read')
book8 = new Book('Nineteen Eighty-Four', 'George Orwell', 328, 'Not Read')
book9 = new Book('Pride and Prejudice', 'Jane Austen', 364, 'Not Read')
book10 = new Book('Of Mice and Men', 'John Steinback', 107, 'Not Read')
book11 = new Book('Moby-Dick', 'Herman Melville', 635, 'Not Read')
book12 = new Book('Animal Farm', 'George Orwell', 112, 'Not Read')

myLibrary = new Library()
myLibrary.addBook(book1)
myLibrary.addBook(book2)
myLibrary.addBook(book3)
myLibrary.addBook(book4)
myLibrary.addBook(book5)
myLibrary.addBook(book6)
myLibrary.addBook(book7)
myLibrary.addBook(book8)
myLibrary.addBook(book9)
myLibrary.addBook(book10)
myLibrary.addBook(book11)
myLibrary.addBook(book12)

/* Add book modal */

const title = document.getElementById('titleInput')
const author = document.getElementById('authorInput')
const pages = document.getElementById('pagesInput')
const modal = document.getElementById("addBookModal");
const addBookBtn = document.getElementById("addBookBtn");
const closeBtn = document.getElementsByClassName("close")[0];
const titleError = document.getElementById('titleError')
const authorError = document.getElementById('authorError')
const pagesError = document.getElementById('pagesError')
const statusError = document.getElementById('statusError')

addBookBtn.onclick = function() {
  modal.style.display = "block";
}

closeBtn.onclick = function() {
  resetInputs()
}

window.onclick = function(e) {
  if (e.target == modal) {
    resetInputs()
  }
}

function resetInputs(){
    modal.style.display = "none";
    title.value = ''
    author.value = ''
    pages.value = ''
    titleError.style.color= 'none';
    authorError.style.color='none';
    pagesError.style.color='none';
    statusError.style.color='none';
}

/* Add a book */

addbookbtn2 = document.getElementById('addBookBtn2')
addbookbtn2.addEventListener('click', addBook)

function addBook(){
    let bookStatus = document.querySelector('input[name="status"]:checked')
    let error = false

    if (title.value.length == 0){
        titleError.style.display='inline-block'
        error = true
    }
    else{
        titleError.style.display='none'
    }

    if (author.value.length == 0){
        authorError.style.display='inline-block'
        error = true
    }

    else{
        authorError.style.display='none'
    }

    if (pages.value.length == 0 || !(Number.isInteger(+pages.value))){
        pagesError.style.display='inline-block'
        error = true
    }
    else{
        pagesError.style.display='none'
    }

    if (!bookStatus){
        statusError.style.display='inline-block'
    }
    else{
        statusError.style.display='none'
    }

    if (!error) {
        book = new Book(title.value, author.value, parseInt(pages.value), bookStatus.value)
        myLibrary.addBook(book)
        resetInputs()
        bookStatus.checked = false
        console.log(book)
    }
}


/* Create book card */

function createBookCard(book){

    let bookCard = document.createElement('div')
    bookCard.classList.add('bookCard')

    upperContent = document.createElement('div')
    upperContent.classList.add('upperContent')

    let textContent = document.createElement('div')
    textContent.classList.add('textContent')

    let title = document.createElement('div')
    title.innerHTML = book.getTitle()
    title.classList.add('title')
    textContent.appendChild(title)

    let author = document.createElement('div')
    author.innerHTML = book.getAuthor()
    author.classList.add('author')
    textContent.appendChild(author)

    let pages = document.createElement('div')
    pages.innerHTML = book.getPages() + ' Pages'
    pages.classList.add('pages')
    textContent.appendChild(pages)

    upperContent.append(textContent)

    let deleteButton = document.createElement('button')
    deleteButton.innerHTML = '&times;'
    deleteButton.classList.add('deleteButton')
    upperContent.appendChild(deleteButton)

    bookCard.append(upperContent)

    let statusContainer = document.createElement('div')
    statusContainer.classList.add('statusContainer')

    let notRead = document.createElement('button')
    notRead.innerHTML = 'Not Read'
    notRead.classList.add('statusButtonChild', 'notRead')
    statusContainer.appendChild(notRead)

    let inProgress = document.createElement('button')
    inProgress.innerHTML = 'In Progress'
    inProgress.classList.add('statusButtonChild', 'inProgress')
    statusContainer.appendChild(inProgress)

    let read = document.createElement('button')
    read.innerHTML = 'Read'
    read.classList.add('statusButtonChild', 'read')
    statusContainer.appendChild(read)

    bookCard.appendChild(statusContainer)

    if (book.getReadStatus() == 'Not Read'){
        notRead.classList.remove('notRead')
        notRead.classList.add('notReadHighlighted')
    }
    else if (book.getReadStatus() == 'In Progress'){
        inProgress.classList.remove('inProgress')
        inProgress.classList.add('inProgressHighlighted')
    }
    else if (book.getReadStatus() == 'Read'){
        read.classList.remove('read')
        read.classList.add('readHighlighted')
    }

    notRead.addEventListener('click', highlightNotRead)
    inProgress.addEventListener('click', highlightInProgress)
    read.addEventListener('click', highlightRead)
    deleteButton.addEventListener('click', deleteBookCard)

    bookList.appendChild(bookCard)
}


/* Delete book card */

function deleteBookCard(e){
    myLibrary.deleteBook(e.path[1].querySelector('.title').innerHTML)
    myLibrary.updateProgress()
    e.path[2].remove() /* Book Card*/
}

/* Change read status of book*/

function highlightNotRead(e){
    let bookName = e.path[2].querySelector('.title').innerHTML
    myLibrary.getBook(bookName).markNotRead()
    myLibrary.updateProgress()

    let notRead = e.path[0]
    notRead.classList.remove('notRead')
    notRead.classList.add('notReadHighlighted')

    let inProgress = e.path[1].querySelector('.inProgressHighlighted')
    let read = e.path[1].querySelector('.readHighlighted')
    if (inProgress){
        inProgress.classList.remove('inProgressHighlighted')
        inProgress.classList.add('inProgress')
    }
    
    if (read){
        read.classList.remove('readHighlighted')
        read.classList.add('read')
    }
   
}

function highlightInProgress(e){
    let bookName = e.path[2].querySelector('.title').innerHTML
    myLibrary.getBook(bookName).markInProgress()
    myLibrary.updateProgress()

    let inProgress = e.path[0]
    inProgress.classList.remove('inProgress')
    inProgress.classList.add('inProgressHighlighted')

    let notRead = e.path[1].querySelector('.notReadHighlighted')
    let read = e.path[1].querySelector('.readHighlighted')

    if (notRead){
        notRead.classList.remove('notReadHighlighted')
        notRead.classList.add('notRead')
    }
    if (read){
        read.classList.remove('readHighlighted')
        read.classList.add('read')
    }

}

function highlightRead(e){
    let bookName = e.path[2].querySelector('.title').innerHTML
    myLibrary.getBook(bookName).markRead()
    myLibrary.updateProgress()

    let read = e.path[0]
    read.classList.remove('Read')
    read.classList.add('readHighlighted')

   
    let inProgress = e.path[1].querySelector('.inProgressHighlighted')
    let notRead = e.path[1].querySelector('.notReadHighlighted')

    if (inProgress){
        inProgress.classList.remove('inProgressHighlighted')
        inProgress.classList.add('inProgress')
    }
    if (notRead){
        notRead.classList.remove('notReadHighlighted')
        notRead.classList.add('notRead')
    }
   
}
