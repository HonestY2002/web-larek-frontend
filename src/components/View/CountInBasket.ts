import { Component } from "./Component";
import { IEvents } from "../base/events";
import { ensureElement } from "../../utils/utils";


interface BasketCounter {
    counter: number;
}

export class CountInBasket extends Component<BasketCounter>{
    protected _counter: HTMLElement;
    protected events: IEvents;

    constructor(container: HTMLElement, events: IEvents) {
        super(container);
        this.events = events;
        
        this._counter = ensureElement('.header__basket-counter');

        this.container.addEventListener('click', () => this.events.emit('basket:open'))
    }

    set counter(quantity: number) {
        this.setText(this._counter, quantity.toString());
    }
}