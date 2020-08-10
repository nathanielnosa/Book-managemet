// book class
class Book{
  constructor(title, author, isbn, price){
    this.title = title;
    this.author = author;
    this.isbn = isbn;
    this.price = price;
  }
}

// UI class
class UI{

  // adding book
  addBook(book){
    const tbody = document.querySelector('#book-content');
    const trow = document.createElement('tr');
    trow.innerHTML = `
      <td>${book.title}</td>
      <td>${book.author}</td>
      <td>${book.isbn}</td>
      <td>${book.price}</td>
      <td><a href='#' class='delete fa fa-trash'></a></td>
      `;
    tbody.appendChild(trow);
  }

  showMessage(message, color){
    const div = document.createElement('div');
    div.className = 'alert';
    div.style.background = color;
    div.style.color = 'white';
    div.style.textAlign = 'center';
    div.appendChild(document.createTextNode(message));

    const container = document.querySelector('#content');
    const form = document.querySelector('form');

    container.insertBefore(div, form);

    setTimeout(function(){
      document.querySelector('.alert').remove();
    },2000);
  }

  clearInputs(){
    document.querySelector('#title').value = '';
    document.querySelector('#author').value ='';
    document.querySelector('#isbn').value ='';
    document.querySelector('#price').value ='';
  }

  deleteBook(target){
    if(target.classList.contains('delete')){
        target.parentElement.parentElement.remove(); 
    }
  }
}

// Local Storage
class Storage{
  // get from LS
  static getBookLs(){
    let books;
    if(localStorage.getItem('books') === null){
      books = [];
    }else{
      books = JSON.parse(localStorage.getItem('books'));
    }
    return books; 
  }

  // add book to LS
  static addBookLs(book){
    const books = Storage.getBookLs();
    books.push(book);
    localStorage.setItem('books', JSON.stringify(books));
  }

  // Show book from LS
  static showBookLs(){
    const books = Storage.getBookLs();
    
    books.forEach(function(book){
    //instantiate ui
    const ui = new UI;
    //add book
    ui.addBook(book);
    });

  }

  // remove book from LS
  static removeBookLs(isbn){
    const books = Storage.getBookLs();
    
    books.forEach(function(book, index){
      if(book.target === isbn){
        books.splice(index, 1);
      }
    });
    localStorage.setItem('books', JSON.stringify(books));
  }
}
//DOM laoder for local storage display
document.addEventListener('DOMContentLoaded', Storage.showBookLs);

//Form event listener
document.querySelector('form').addEventListener('submit', function(e){

  // UI values;
  const UItitle = document.querySelector('#title').value,
        UIauthor = document.querySelector('#author').value,
        UIisbn = document.querySelector('#isbn').value,
        UIprice = document.querySelector('#price').value;
  
  // instantiate book
  const book = new Book(UItitle,UIauthor,UIisbn,UIprice);
  //instantiate ui
  const ui = new UI();

  // validate 
  if(UItitle === '' || UIauthor === '' || UIisbn === '' || UIprice === ''){
    // show alert
    ui.showMessage('FILL THE EMPTY FIELDS !','red');
  }else{
    // add book
    ui.addBook(book);
    //add book to LS
    Storage.addBookLs(book);
    // show alert
    ui.showMessage('BOOK ADDED SUCCESSFULLY !','green');
    // clear fileds
    ui.clearInputs();
  }

  e.preventDefault();
});

// event listener for removing book
document.querySelector('#book-content').addEventListener('click', function(e){
  // instantiate ui
  const ui = new UI();
  // delte book
  ui.deleteBook(e.target);
  // delete book from LS
  Storage.removeBookLs(e.target.parentElement.previousElementSibling.previousElementSibling.textContent);
})