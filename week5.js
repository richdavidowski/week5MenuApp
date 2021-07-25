// 1.	Create a menu app as seen in this week’s video. 
// What you create is up to you as long as it meets the following requirements.
// 
//
// a.	Use at least one array.
// b.	Use at least two classes.
// c.	Your menu should have the options to create, view, and delete elements.


class Book {
    constructor(title, author) {
        this.title = title;
        this.author = author;
    }

    describe() {
        return `${this.title} was written by ${this.author}.`
    }
}

class Genre {
    constructor(genre) {
        this.genre = genre;
        this.books = [];
    }

    addBook(book) {
        if (book instanceof Book) {
            this.books.push(book);
        } else {
            throw new Error(`${book} is not a real book.`)
        }
    }

    describe() {
        return `${this.genre} has ${this.books.length} books.`
    }
}


class Menu {
    constructor(){
        this.genres = [];
        this.selectedGenre = null;
    }

    start() {
        let selection = this.showMainMenu();

        while (selection != 0) {
            switch (selection) {
                case `1`: 
                    this.createGenre();
                    break;
                case `2`:
                    this.viewGenre();
                    break;
                case `3`:
                    this.removeGenre();
                    break;
                case `4`: 
                    this.viewAllGenres();
                    break;
                default:
                    selection = 0;
            }

            selection = this.showMainMenu();
        }

        alert(`Maybe later?`);
    }

    showMainMenu() {
        return prompt(`
            0) Exit
            1) New Genre
            2) View Genre
            3) Delete Genre
            4) View All Genres
        `);
    }

    viewGenreOptions(genreInfo) {
        return prompt(`
            0) Return
            1) Add New Book
            2) Remove Existing Book

            ${genreInfo}
        `);
    }

    viewAllGenres() {
        let genreString = ``;
        for (let i = 0; i < this.genres.length; i++) {
            genreString += i + `) ` + this.genres[i].genre + `\n`;
        }
        alert(genreString);
    }

    createGenre() {
        let genre = prompt(`What is the new genre?`);
        this.genres.push(new Genre(genre));
    }

    viewGenre() {
        let index = prompt(`Enter the index of genre:`);
        if (index > -1 && index < this.genres.length) {
            this.selectedGenre = this.genres[index];
            let description = `Genre: ` + this.selectedGenre.genre + `\n`;
        
        for (let i = 0; i < this.selectedGenre.books.length; i++) {
            description += i + `) ` + this.selectedGenre.books[i].title + ` by ` + this.selectedGenre.books[i].author + `\n`;
        }

        let selection = this.viewGenreOptions(description);
        switch (selection) {
            case `1`:
                this.newBook();
                break;
            case `2`:
                this.removeBook();
            }
        }
    }

    removeGenre() {
        let index = prompt(`Which genre would you like to remove? Please enter the index.`);
        if(index > -1 && index < this.genres.length) {
            this.genres.splice(index, 1);
        }
    }

    newBook() {
        let title = prompt(`What is the title of the book?`);
        let author = prompt(`Who wrote this book?`);
        this.selectedGenre.books.push(new Book(title, author));
    }

    removeBook() {
        let index = prompt(`Which book would you like to remove? Please enter the index:`)
        if (index > -1 && index < this.selectedGenre.books.length) {
            this.selectedGenre.books.splice(index, 1);
        }
    }
}

let menu = new Menu ();
menu.start();
