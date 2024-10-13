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
            this.el.innerHTML = "Loading..."
            return this.el
        }

        const cardGrid = document.createElement("div");
        cardGrid.classList.add("card__grid");
        this.el.append(cardGrid);

        for (const card of this.parentState.list) {
            cardGrid.append(new Card(this.appState, card).render())
        }
        return this.el
    }
}

{/* <div class="card-list__paginations">
<div class="card-list__pagination">
    <img src='/static/arrow-back.svg' alt='Иконка предыдущей страницы' />
    Предыдущая страница
</div>
<div class="card-list__pagination">
    Следующая страница
    <img src='/static/arrow-forward.svg' alt='Иконка следующей страницы' />
</div>
</div> */}