import { DivComponent } from "../../common/div-component";
import "./bookDetails.css"

export class BookDetails extends DivComponent {
    constructor(state, appState) {
        super();
        this.parentState = state;
        this.appState = appState;
    }

    #addToFavorites() {
        this.appState.favorites.push(this.parentState.book);
    }

    #deleteFromFavorites() {
        this.appState.favorites = this.appState.favorites.filter(item => item.id !== this.parentState.book.id);
    }

    render() {
        if (this.parentState.loading) {
            const wrapper = document.createElement("div");
            wrapper.classList.add("details__loading");
            wrapper.innerHTML = "<div>Loading...</div>"
            this.el.append(wrapper)
            return this.el
        }

        const existFavorites = this.appState.favorites.find(item => item.id === this.parentState.book.id);

        this.el.classList.add("details", "container");
        this.el.innerHTML = `
            <h1 class="details__title">${this.parentState.book?.volumeInfo.title}</h1>
            <div class="details__content">
                <img class="details__content_img" src=${this.parentState.book?.volumeInfo.imageLinks?.thumbnail
                ? this.parentState.book?.volumeInfo.imageLinks.thumbnail
                : "static/empty-book.png"} alt='Обложка книги' />
                <div class="details__content_info">
                    <h2>Author: <span>${this.parentState.book?.volumeInfo.authors ? this.parentState.book?.volumeInfo.authors : "Information not found"}</span></h2>
                    <h2>Category: <span>${this.parentState.book?.volumeInfo.categories ? this.parentState.book?.volumeInfo.categories : "Information not found"}</span></h2>
                    <h2>Published: <span>${this.parentState.book?.volumeInfo.publishedDate ? this.parentState.book?.volumeInfo.publishedDate : "Information not found"}</span></h2>
                    <h2>Pages: <span>${this.parentState.book?.volumeInfo.pageCount ? this.parentState.book?.volumeInfo.pageCount : "Information not found"}</span></h2>
                    <button class="details__button-add ${existFavorites ? "details__button-add_active" : "details__button-add_inactive"}">
                    ${existFavorites ?
                "In favorites<img src=static/favorites.svg alt=Иконка добавления в избранное />"
                :
                "To favorites<img src=static/favorites-yellow.svg alt=Иконка добавления в избранное />"
            }
                    </button>
                </div>
            </div>
            <div class="details__decription">
                <h2>Description:</h2>
                <p>${this.parentState.book?.volumeInfo.description ? this.parentState.book?.volumeInfo.description : "Information not found"}</p>
            </div>
            <div class="details__tags">
                <h2>Tags:</h2>
                <div>${this.parentState.book?.volumeInfo.categories ? this.parentState.book?.volumeInfo.categories : "Information not found"}</div>
            </div>
            
        `;

        if (existFavorites) {
            this.el
                .querySelector("button")
                .addEventListener("click", this.#deleteFromFavorites.bind(this));
        } else {
            this.el
                .querySelector("button")
                .addEventListener("click", this.#addToFavorites.bind(this));
        }
        return this.el
    }
}