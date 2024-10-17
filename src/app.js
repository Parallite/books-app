import { BookView } from "./views/book/book";
import { FavoritesView } from "./views/favorites/favorites";
import { MainView } from "./views/main/main";

class App {
    routes = [
        { path: "", componentView: MainView },
        { path: "#favorites", componentView: FavoritesView },
        { path: "#book/:id", componentView: BookView }
    ];

    appState = {
        favorites: [],
    };

    constructor() {
        window.addEventListener("hashchange", this.route.bind(this));
        this.route()
    }

    route() {
        if (this.currentView) {
            this.currentView.destroy();
        }

        const view = this.routes.find((route) => {
            if (route.path === location.hash) {
                return true
            }
            const dynamicRoute = "#book";
            if (route.path.split("/")[0] === dynamicRoute && route.path.split("/")[1] === ":id") {
                return true
            }
        }).componentView

        if (view.name == "BookView") {
            let location = document.location.href;
            location = location.replace("#", "/");
            const { searchParams } = new URL(location);
            const bookId = searchParams.get("id");
            this.currentView = new view(this.appState, bookId);
            this.currentView.render();
        } else {
            this.currentView = new view(this.appState);
            this.currentView.render();
        }
    }
}

new App()