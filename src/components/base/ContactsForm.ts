import { paymentForm } from "../PaymentForm";
import { IEvents } from "./events";
import { Contacts } from "../../types";

export class ContactsForm extends paymentForm <Contacts> {
    constructor(container: HTMLFormElement, events: IEvents) {
        super(container, events);
            }

    set phone(value: string) {
        (this.container.elements.namedItem('phone') as HTMLInputElement).value = value;
    }

    set email(value: string) {
        (this.container.elements.namedItem('email') as HTMLInputElement).value = value;
    }
}