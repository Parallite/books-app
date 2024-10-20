import { DivComponent } from "../../common/div-component";
import { Card } from "../../components/card/card";
import "./cardList.css"

export class CardList extends DivComponent {
    constructor(appState, parentState) {
        super();
        this.appState = appState;
        this.parentState = parentState;
    }

    render() {

        if (this.parentState.loading) {
            const wrapper = document.createElement("div");
            wrapper.classList.add("wrapper");
            wrapper.innerHTML = "Loading..."
            this.el.append(wrapper)
            return this.el
        }

        if (this.parentState.list.length === 0) {
            const wrapper = document.createElement("div");
            wrapper.classList.add("wrapper");
            wrapper.innerHTML = "Enter values to search for books you are interested in..."
            this.el.append(wrapper)
            return this.el
        }

        const totalFound = document.createElement("h1");
        totalFound.classList.add("container");
        totalFound.classList.add("cards__total");
        totalFound.innerHTML = `
            Matches found: ${this.parentState.totalFound ? this.parentState.totalFound : 0}
        `;
        this.el.append(totalFound);

        const cardGrid = document.createElement("div");
        cardGrid.classList.add("container");
        cardGrid.classList.add("card__list");
        this.el.append(cardGrid);

        for (const card of this.parentState.list) {
            cardGrid.append(new Card(this.appState, card).render())
        }
        return this.el
    }
}