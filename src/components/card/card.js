import { DivComponent } from "../../common/div-component";
import "./card.css"

export class Card extends DivComponent {
    constructor(appState, cardState) {
        super();
        this.appState = appState;
        this.cardState = cardState;
    }

    #addToFavorites() {
        this.appState.favorites.push(this.cardState);
    }

    #deleteFromFavorites() {
        this.appState.favorites = this.appState.favorites.filter(item => item.id !== this.cardState.id);
    }

    render() {
        this.el.classList.add("card");
        const existFavorites = this.appState.favorites.find(item => item.id === this.cardState.id);
        this.el.innerHTML = `
                <div class="card__content">
                    <img class="card__image" src=${this.cardState.volumeInfo.imageLinks.thumbnail} alt='Обложка книги' />
                    <div class="card__info">
                        <div class="card__tag">
                            Category: ${this.cardState.volumeInfo.categories ? this.cardState.volumeInfo.categories : "Не задано"}
                        </div>
                        <div class="card__name">
                            Name: ${this.cardState.volumeInfo.title}
                        </div>
                        <div class="card__description">
                            Description: ${this.cardState.volumeInfo.description ? this.cardState.volumeInfo.description : "Не задано"}
                        </div>
                        <div class="card__author">
                            Author: ${this.cardState.volumeInfo.authors ? this.cardState.volumeInfo.authors : "Не задано"}
                        </div>
                        <div class="card__footer">
                            <button class="button__add ${existFavorites ? "button__active" : "button__inactive"}" id=${this.cardState.id}>
                                ${existFavorites
                ? "<img src=\"static/favorites.svg\" alt=\"Иконка добавления в избранное\" />"
                : "<img src=\"static/favorites-white.svg\" alt=\"Иконка добавления в избранное\" />"
            }   
                            </button>
                        </div>
                    </div>
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