import { DivComponent } from "../../common/div-component";
import "./bookDetails.css"

export class BookDetails extends DivComponent {
    constructor(book) {
        super();
        this.book = book;
    }

    render() {
        console.log(this.book?.imageLinks?.large);

        this.el.classList.add("details");
        this.el.classList.add("container");
        this.el.innerHTML = `
            <h1 class="details__title">${this.book?.title}</h1>
            <div class="details__content">
                <img class="details__content_img" src=${this.book?.imageLinks?.large ? this.book?.imageLinks?.large : "static/empty-book.png"} alt='Обложка книги' />
                <div class="details__content_info">
                    <h2>Author: <span>${this.book?.authors ? this.book?.authors : "Information not found"}</span></h2>
                    <h2>Category: <span>${this.book?.categories ? this.book?.categories : "Information not found"}</span></h2>
                    <h2>Published: <span>${this.book?.publishedDate ? this.book?.publishedDate : "Information not found"}</span></h2>
                    <h2>Pages: <span>${this.book?.pageCount ? this.book?.pageCount : "Information not found"}</span></h2>
                    <button>To favorites<img src=static/favorites-yellow.svg alt=Иконка добавления в избранное /></button>
                </div>
            </div>
            <div class="details__decription">
                <h2>Description:</h2>
                <p>${this.book?.description ? this.book?.description : "Information not found"}</p>
            </div>
            <div class="details__tags">
                <h2>Tags:</h2>
                <div>${this.book?.categories ? this.book?.categories : "Information not found"}</div>
            </div>
            
        `;
        return this.el
    }
}