import { AbstractView } from "../../common/view";
import { Header } from "../../components/header/header";
import onChange from "on-change";
import { Search } from "../../components/search/search";
import { CardList } from "../../components/cardList/cardList";
// import { Spinner } from "../../components/spinner/spinner";

export class MainView extends AbstractView {
    state = {
        list: [],
        amount: 0,
        loading: false,
        searchQuery: undefined,
        offset: 0
    };

    constructor(appState) {
        super();
        this.appState = appState;
        // Отслеживает изменение State app
        this.appState = onChange(this.appState, this.appStateHook.bind(this));
        // Отслеживает изменение state main
        this.state = onChange(this.state, this.stateHook.bind(this));
        this.setTitle("Поиск книг");
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
                const data = await this.loadList(this.state.searchQuery, this.state.offset);
                this.state.loading = false;
                if (data) {
                    [this.state.list, this.state.amount] = [data.items, data.totalItems];
                } else {
                    [this.state.list, this.state.amount] = [[], 0];
                }
                console.log(this.state.list);
            }
            if (path === "loading") {
                this.render();
            }
            if (path === "amount" || path === "list") {
                this.render();
            }
        } catch (error) {
            this.state.loading = false
            console.log(`Message: ${error.message}, status: ${error.code}`);
        }
    }

    async loadList(q, offset) {
        if (q) {
            const res = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${q}&key=key&startIndex=${offset}`);
            return res.json();
        }
    }

    render() {
        const main = document.createElement("div");
        main.append(new Search(this.state).render());
        main.append(new CardList(this.appState, this.state).render());
        this.app.innerHTML = "";
        this.app.append(main);
        this.renderHeader();
    }

    renderHeader() {
        const header = new Header(this.appState).render();
        this.app.prepend(header);
    }
}