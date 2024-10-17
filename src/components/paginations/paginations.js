import { DivComponent } from "../../common/div-component";
import "./paginations.css"

export class Paginations extends DivComponent {
    constructor(parentState) {
        super();
        this.parentState = parentState;
    }

    #nextPagination() {
        this.parentState.show.startIndex += this.parentState.show.maxResults;
        this.parentState.offset += 1
    }

    #prevPagination() {
        if (this.parentState.show.startIndex > 0) {
            this.parentState.show.startIndex -= this.parentState.show.maxResults;
            this.parentState.offset -= 1
        }
    }

    render() {
        if (this.parentState.list.length === 0) {
            return this.el
        }

        this.el.classList.add("container", "paginations");
        this.el.innerHTML = `
            <button class="paginations__item paginations__item_prev">
                <img src='/static/arrow-back.svg' alt='Иконка показать больше' />
                <div>Previous page</div>
            </button>
            <div class="paginations__offset">${this.parentState.offset}</div>
            <button class="paginations__item paginations__item_next">
                <div>Next page</div>
                <img src='/static/arrow-forward.svg' alt='Иконка следующей страницы' />
            </button>
        `;
        if (this.parentState.list.length >= this.parentState.show.maxResults) {
            this.el
                .querySelector(".paginations__item_next")
                .addEventListener("click", this.#nextPagination.bind(this));
            this.el
                .querySelector(".paginations__item_prev")
                .addEventListener("click", this.#prevPagination.bind(this));
        }
        return this.el
    }
}