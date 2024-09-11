import { FormPayment } from "./FormPayment";
import { IEvents } from "../base/events";
import { UserContacts } from "../../types";

export class ContactsForm extends FormPayment <UserContacts> {
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