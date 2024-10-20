import { DivComponent } from "../../common/div-component";
import "./footer.css"

export class Footer extends DivComponent {
    constructor() {
        super();
    }
    render() {
        this.el.classList.add("footer");
        this.el.innerHTML = `
        <div class="footer-wrapper">
            <div class="footer__menu">
                <a class="footer__menu-item" href="#">
                    <span>Find a book</span>
                </a>
                <a class="footer__menu-item" href="#favorites">
                    <span>My favorites</span>
                </a>
            </div>
            <a class="footer__logo" href="#">
                <img src='/static/logo-yellow.svg' alt='Логотип' />
            </a>
        </div>
        `;
        return this.el
    }
}