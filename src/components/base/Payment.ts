import { IEvents } from "./events";
import { formPayment } from "../../types";
import { paymentForm } from "../PaymentForm";


export class Payment extends paymentForm <formPayment> {
    constructor(container: HTMLFormElement, events: IEvents) {
        super(container, events);
            }

    set address(value: string) {
        (this.container.elements.namedItem('address') as HTMLInputElement).value = value;
    }

    set payment(value: string) {
        const cashButton = this.container.elements.namedItem('cash') as HTMLButtonElement;
        const cardButton = this.container.elements.namedItem('card') as HTMLButtonElement;
     
        cashButton.addEventListener('click', () => {
            this.payment = 'cash'; 
        });

        cardButton.addEventListener('click', () => {
            this.payment = 'card'; 
        });

        if (value === 'cash') {
            cashButton.classList.add('button_alt-active');
            cardButton.classList.remove('button_alt-active');
        } else if (value === 'card') {
            cardButton.classList.add('button_alt-active');
            cashButton.classList.remove('button_alt-active');
        }
    }
}

