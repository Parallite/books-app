import onChange from "on-change";
import { AbstractView } from "../../common/view";
import { Header } from "../../components/header/header";
import { Footer } from "../../components/footer/footer";
import { BookDetails } from "../../components/bookDetails/bookDetails";


const apiUrl = process.env.GOOGLE_BOOKS_API_URL;

export class BookView extends AbstractView {
    state = {
        loading: false,
        book: undefined,
        isFirstMount: true,
    };

    constructor(appState, bookId) {
        super();
        this.appState = appState;
        this.bookId = bookId;
        this.appState = onChange(this.appState, this.appStateHook.bind(this));
        this.state = onChange(this.state, this.stateHook.bind(this));
        this.setTitle("Book");
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
        console.log(path);
        try {
            if (path === "isFirstMount") {
                this.state.loading = true;
                const data = await this.loadBook(this.bookId);
                this.state.loading = false;
                if (data) {
                    this.state.book = data.volumeInfo;
                }
            }
            if (path === "loading") {
                this.render();
            }
            if (path === "book") {
                this.render();
            }
        } catch (error) {
            this.state.loading = false
            console.log(`Message: ${error.message}, status: ${error.code}`);
            this.render();
        }
    }

    async loadBook(q) {
        if (q) {
            const res = await fetch(`${apiUrl}/${q}`);
            return res.json();
        }
    }

    mount() {
        this.state.isFirstMount = false
    }

    render() {
        if (this.state.isFirstMount) {
            this.mount();
        }
        this.app.innerHTML = "";
        const main = document.createElement("div");
        this.app.append(main);
        main.append(new BookDetails(this.state.book).render());
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