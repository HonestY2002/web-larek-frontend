import { cardsType } from "../types";
import { IEvents } from "./base/events";
import { Component } from "./base/Component";


export class Cards extends Component<cardsType>{
    
    protected _catalog: HTMLElement;
    protected _totalBasket?: HTMLElement;
    protected _button?: HTMLButtonElement;

    constructor(protected container: HTMLElement, protected events: IEvents) {
        super(container);
        this.events = events;

        this._button = this.container.querySelector('.button');
        this._totalBasket = this.container.querySelector('.basket__price');

        if (this._button) {
            this._button.addEventListener('click', () => this.events.emit ('basket:order'))
        }
    }

    set catalog(items: HTMLElement[]) {
        this.container.replaceChildren( ...items);
    }
          
}