import { AbstractView } from "../../common/view";
import { Header } from "../../components/header/header";
import { Footer } from "../../components/footer/footer";
import onChange from "on-change";
import { CardList } from "../../components/cardList/cardList";

export class FavoritesView extends AbstractView {
    constructor(appState) {
        super();
        this.appState = appState;
        // Отслеживает изменение State app
        this.appState = onChange(this.appState, this.appStateHook.bind(this));
        // Отслеживает изменение state main
        this.setTitle("My books");
    }

    destroy() {
        onChange.unsubscribe(this.appState);
    }

    appStateHook(path) {
        if (path === "favorites") {
            this.render();
        }
    }

    render() {
        const favorites = document.createElement("div");
        favorites.innerHTML = `
        <h1 class="container">
            Favorites: ${this.appState.favorites.length ? this.appState.favorites.length : 0}
        </h1>
`;
        favorites.append(new CardList(this.appState, { list: this.appState.favorites }).render());
        this.app.innerHTML = "";
        this.app.append(favorites);
        this.renderHeader();
        this.renderFooter();
    }

    renderHeader() {
        const header = new Header(this.appState).render();
        this.app.prepend(header);
    }

    renderFooter() {
        const footer = new Footer().render();
        this.app.append(footer);
    }
}