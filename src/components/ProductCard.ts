import { Component } from "./base/Component";
import { Product} from "../types";
import { IEvents } from "./base/events";
import { ensureElement } from "../utils/utils";
import { CDN_URL } from "../utils/constants";


export class ProductCard extends Component<Product> {
    
    protected events: IEvents;
    protected _image?: HTMLImageElement;
    protected _category?: HTMLElement;
    protected _title: HTMLElement;
    protected _description?: HTMLElement;
    protected _price: HTMLElement;
    protected _id: string;
    protected _ordered: boolean = false;
    protected _deleteButton?: HTMLButtonElement;
    protected _basketButton?: HTMLButtonElement;
    protected _product: Product;
    protected _index: HTMLElement;  
    protected _priceValue: number | null = null;
    protected _isBasketButtonDisabled: boolean = false;

    constructor(protected container: HTMLElement, events: IEvents) {
        super(container);
 
        this.events = events;
    
        this._deleteButton = this.container.querySelector('.basket__item-delete');
        this._basketButton = this.container.querySelector('.button.card__button');
        this._title = ensureElement<HTMLElement>('.card__title', this.container);
        this._price = ensureElement<HTMLElement>('.card__price', this.container);
        this._image = this.container.querySelector('.card__image');
        this._category = this.container.querySelector('.card__category'); 
        this._description = this.container.querySelector('.card__text');
        this._index = this.container.querySelector('.basket__item-index'); 


        if (this._basketButton) {
            this._basketButton.addEventListener('click', (event) => {
                event.stopPropagation();

                this.events.emit('product:add', { card: this });
            });
        }

        if (this._deleteButton) {
            this._deleteButton.addEventListener('click', (event) => {
                event.stopPropagation();

                this.events.emit('product:delete', { card: this });
        });            
        }                 

        this.container.addEventListener('click', () => this.events.emit('card:open', { card: this }));
    }

    render(productData: Partial<Product> | undefined) { 
        const { ...allProductData } = productData;
        Object.assign(this, allProductData); 
        this.updateBasketButtonState(); 
        return this.container;
    }

    protected updateBasketButtonState() {
        if (this._basketButton) {
            this._basketButton.disabled = this.ordered || this._priceValue === null; 
        }
    }

    set ordered(value: boolean) {
        this._ordered = value;
        
        if (this._basketButton) {
            this._basketButton.disabled = value; 
        }
    }
   
    set price(price: number | null) {
        this._priceValue = price; 
    
        if (price !== null) {
            this.setText(this._price, price.toString() + ' синапсов');
            this._isBasketButtonDisabled = false;
        } else {
            this.setText(this._price, 'Бесценно');
            this._isBasketButtonDisabled = true; 
        }
        
        if (this._basketButton) {
            this._basketButton.disabled = this._isBasketButtonDisabled;
            this._basketButton.textContent = this._isBasketButtonDisabled ? 'Не продается' : 'В корзину'; 
        }
    
        this.updateBasketButtonState();
    } 
    
    get ordered(): boolean {
        return this._ordered;
    }
    
    set index(index: number) {
        if (this._index) {
        this.setText(this._index, index);
    }
    }

    set id (id) {
        this._id = id;
    }
 
    get id() { 
       return this._id;
    }    

    set title (title: string) {
        this.setText(this._title, title);
    }  

    set image(url: string) {
        if (this._image) 
        this._image.src = CDN_URL + url;    
    }
       
    set description(description: string) {
        if (this._description) {
        this.setText(this._description, description);
    }
    }  

    set category(category: string) {
        if (this._category) {
            this._category.classList.remove('card__category_other', 'card__category_soft', 'card__category_hard', 'card__category_additional', 'card__category_button');
            this._category.textContent = category;      
            this.setText(this._category, category);
        }
    } 

    deleteCard() {
        this.container.remove();
    }
     
}