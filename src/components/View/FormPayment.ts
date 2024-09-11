import { Component } from "./Component";
import { ensureElement } from "../../utils/utils";
import { IEvents } from "../base/events";

interface FormState {
    valid: boolean;
    errors: string[];
}

export class FormPayment<T> extends Component<FormState> {

    protected _submit: HTMLButtonElement;
    protected _errors: HTMLElement;
 
    constructor (protected container: HTMLFormElement, protected events: IEvents) {
        super(container); 
        
        this._submit = ensureElement<HTMLButtonElement>('button[type=submit]', this.container);
        this._errors = ensureElement<HTMLElement>('.form__errors', this.container);

        this.container.addEventListener('input', (e: Event) => {
            const target = e.target as HTMLInputElement;
            const field = target.name as keyof T;
            const value = target.value;
            this.onInputChange(field, value);            
        });

        const paymentButtons = this.container.querySelectorAll('.order__buttons .button');

        paymentButtons.forEach(button => {
            button.addEventListener('click', (e: Event) => {
                const target = e.target as HTMLButtonElement;
                const field = 'payment' as keyof T; 
                const value = target.textContent;                
                this.onInputChange(field, value); 
            });
        });
        
        this.container.addEventListener('submit', (e: Event) => {
            e.preventDefault();
            this.events.emit(`formPayment:submit`);
            this.events.emit(`order:send`);
        });
    }

    protected onInputChange(field: keyof T, value: string) {
        this.events.emit(`${this.container.name}.${String(field)}:change`, {
            field,
            value
        });
    } 
    
    set valid(value: boolean) {
        this._submit.disabled = !value;
    }

    set errors(value: string) {
        this.setText(this._errors, value);
    }

    render(state: Partial<T> & FormState) {
        const {valid, errors, ...inputs} = state;
        super.render({valid, errors});
        Object.assign(this, inputs);
        return this.container;

    }
}  
    