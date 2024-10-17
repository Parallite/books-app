import { AbstractView } from "../../common/view";
import { Header } from "../../components/header/header";
import { Footer } from "../../components/footer/footer";
import onChange from "on-change";
import { Search } from "../../components/search/search";
import { CardList } from "../../components/cardList/cardList";
import { Paginations } from "../../components/paginations/paginations";

const apiKey = process.env.GOOGLE_API_KEY;
const apiUrl = process.env.GOOGLE_BOOKS_API_URL;

export class MainView extends AbstractView {
    state = {
        list: [],
        totalFound: 0,
        loading: false,
        searchQuery: undefined,
        show: {
            startIndex: 0,
            maxResults: 12,
        },
        offset: 1
    };

    constructor(appState) {
        super();
        this.appState = appState;
        this.appState = onChange(this.appState, this.appStateHook.bind(this));
        this.state = onChange(this.state, this.stateHook.bind(this));
        this.setTitle("Поиск книг");
    }

    destroy() {
        onChange.unsubscribe(this.appState);
        onChange.unsubscribe(this.state);
    }

    appStateHook(path) {
        if (path === "favorites") {
            this.render();
        }
    }

    async stateHook(path) {
        try {
            if (path === "searchQuery") {
                this.state.loading = true;
                const data = await this.loadList(this.state.searchQuery, this.state.show.startIndex, this.state.show.maxResults);
                this.state.loading = false;
                if (data) {
                    [this.state.list, this.state.totalFound] = [data.items, data.totalItems];
                } else {
                    [this.state.list, this.state.totalFound] = [[], 0];
                }
            }
            if (path === "loading") {
                this.render();
            }
            if (path === "totalFound" || path === "list") {
                this.render();
            }
            if (path === "show.startIndex") {
                this.state.loading = true;
                const data = await this.loadList(this.state.searchQuery, this.state.show.startIndex, this.state.show.maxResults);
                this.state.loading = false;
                this.state.list = data.items;
                this.render();
            }
        } catch (error) {
            this.state.loading = false
            console.log(`Message: ${error.message}, status: ${error.code}`);
            this.render();
        }
    }

    async loadList(q, startIndex, maxIndex) {
        if (q) {
            const res = await fetch(`${apiUrl}?q=${q}&key=${apiKey}&startIndex=${startIndex}&maxResults=${maxIndex}`);
            return res.json();
        }
    }

    render() {
        const main = document.createElement("div");
        main.append(new Search(this.state).render());
        main.append(new CardList(this.appState, this.state).render());
        main.append(new Paginations(this.state).render());
        this.app.innerHTML = "";
        this.app.append(main);
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