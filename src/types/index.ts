export type ApiPostMethods = 'POST' | 'PUT' | 'DELETE' | 'PATCH';

export interface UserContacts {
    email: string;
    phone: string;
}

export interface BasketView {
    items: HTMLElement[];
    total: number;
}

export interface UserData {
    payment: string;
    address: string;
    email: string;
    phone: string;
}

export interface Product {
        id: string;
        description: string;
        image: string;
        title: string;
        category: string;
        price: number;
    }
    
    export interface Data { 
        total: number;
        items: Product[]
    }

    export interface SendOrderData extends Order {
        total: number;
        items: string[];
    }

    export interface Order { 
        payment: string;
        email: string;
        phone: string;
        address: string;
    }
    
    export interface productData { 
        products: Product[];
        preview: string | null; 
        getProduct(productId: string): Product;
    }

    export interface  Basket { 
        items: Product[];
            addProduct(product: Product): void;
            deleteProduct(productId: string, payload: Function | null): void;
    }

    export interface IApi {
        baseUrl: string;
        get<T>(url: string): Promise<T>;
        post<T>(url: string, data: object, method?: ApiPostMethods): Promise<T>;
    }

    export interface orderResponse {
        id: string;
        total: number;
    }

    export interface UserPayments {
        address: string;
        payment: string;
        
    }

    export interface cardsType {
        catalog: HTMLElement[];
        totalBasket: HTMLElement;
    }
    
    export type PageProduct = Pick<Product, 'image' | 'title' | 'category' | 'price'>
    
    export type ProductPopup = Pick<Product, 'image' | 'title' | 'category' | 'price' | 'description'>
    
    export type AddProduct = Pick<Product, 'id' | 'title' | 'price' >
     
    export type ProductOrderPrice = Pick<Product, 'price'> 
    
    export type OrderFormData = Pick<Order, 'payment' | 'address' | 'email' | 'phone'> 
    
    export type FormErrors = Partial<Record<keyof  UserData, string>>;