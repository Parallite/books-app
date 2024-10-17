import { DivComponent } from "../../common/div-component";
import "./header.css"

export class Header extends DivComponent {
    constructor(appState) {
        super();
        this.appState = appState;
    }

    render() {
        this.el.classList.add("header");
        this.el.innerHTML = `
            <div>
                <a class="header__logo-wrapper" class="menu__item" href="#">
                    <img class="header__logo" src='/static/logo.svg' alt='Логотип' />
                    <span>E-library</span>
                </a>
            </div>
            <div class="menu">
                <a class="menu__item" href="#">
                    <img src='/static/search.svg' alt='Иконка поиска' />
                    <span>Find a book</span>
                </a>
                <a class="menu__item" href="#favorites">
                    <img src='/static/favorites.svg' alt='Иконка избранного' />
                    <span>My favorites</span>
                    <div class='menu__counter'>
                        ${this.appState.favorites.length}
                    </div>
                </a>
            </div>
        `;

        return this.el
    }
}