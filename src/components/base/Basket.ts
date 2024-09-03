import { FormErrors } from "../../types";
import { IEvents } from "./events";
import { Product, formPayment } from "../../types";
import { Contacts } from "../../types";


export interface dataOrder {
    basket: Product[];
    userContacts: Contacts;
    userPayment: formPayment;    
}

export class OrderData implements dataOrder {
     _basket: Product[];    
    userPayment: formPayment = {
        payment: '',
        address: ''
    };
    userContacts: Contacts = {
        email: '',
        phone: ''
    };
    preview: string | null;
    formErrors: FormErrors = {};
  
    protected events: IEvents;   


    constructor(events: IEvents) {
        this.events = events;
    }
   
    set basket(basket: Product[]) {
        this._basket = basket;
        this.events.emit('formPayment:open')
    }

    get basket () {
        return this._basket;
    }

    addProduct(product: Product) {
        this._basket = [...this._basket, product];
        this.events.emit('basket:changed', this._basket);
        console.log('Пользователь добавил товар в корзину.', this._basket);

    }

    getTotal() {
        return this._basket.length;
    }

    totalPrice(): number {
        return this._basket.reduce((total, product) => total + product.price, 0);
    }

    deleteProduct(productId: string, payload: Function | null = null) {
        this._basket = this.basket.filter(product => product.id !== productId);

        if(payload) {
            payload();
        } else {
            this.events.emit('basket:open');
            console.log('Пользователь добавил товар в корзину.', this._basket);

        }
    }

    getProducts() {
        return this._basket;
    }

    setPaymentField(field: keyof formPayment, value: string) {
        this.userPayment[field] = value;

        if (this.validatePaymentForm()) {
            this.events.emit('formContacts:open', this.userPayment );
        }
    }

    setContactsField(field: keyof Contacts, value: string) {
        this.userContacts[field] = value;

        if (this.validateContactsForm()) {
            this.events.emit('order:submit', this.userContacts );
        }
    }

    validatePaymentForm() {
        const errors: typeof this.formErrors = {};       
        if (!this.userPayment.payment) {
            errors.payment = 'Необходимо выбрать способ оплаты';
        }
        if (!this.userPayment.address) {
            errors.address = 'Необходимо указать адрес';
        }
        this.formErrors = errors;
        this.events.emit('formErrors:change', this.formErrors);
        return Object.keys(errors).length === 0;
    }


    validateContactsForm() {
        const errors: typeof this.formErrors = {};       
        if (!this.userContacts.phone) {
            errors.phone = 'Необходимо указать телефон';
        }
        if (!this.userContacts.email) {
            errors.email = 'Необходимо указать электронную почту';
        }
        this.formErrors = errors;
        this.events.emit('formErrors:change', this.formErrors);
        return Object.keys(errors).length === 0;
    }

    getOrder() {
        return {
            items: this._basket.map(product => product.id),
            payment: this.userPayment.payment,
            address: this.userPayment.address,
            email: this.userContacts.email,
            phone: this.userContacts.phone,
            total: this.totalPrice()
        };
    }

    clearOrder() {
        this._basket = [];
        this.events.emit('basket:changed', this._basket);
        console.log('Корзина очищена.', this._basket);
    }   

}