import { DivComponent } from "../../common/div-component";
import "./spinner.css"

export class Spinner extends DivComponent {
    constructor() {
        super();
    }
    render() {
        this.el.classList.add("spinner");
        this.el.innerHTML = `
                <div class="spinner">
                    Loading...
                </div>
        `;
        return this.el
    }
}