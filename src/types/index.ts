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
    
    
    export interface Order { 
        payment: string;
        email: string;
        phone: string;
        address: string;
        items: Basket;
        data: UserData; 
    }

    export interface productData { 
        products: Product[];
        preview: string | null; 
        addProduct(product: Product): void;
        deleteProduct(productId: string, payload: Function | null): void;
        getProduct(productId: string): Product;
    }

    export interface  Basket { 
        items: Product[];
        preview: string | null; 
        total: ProductOrderPrice[];
        addProduct(product: Product): void;
        deleteProduct(productId: string, payload: Function | null): void;
        getProduct(productId: string): Product;
    }

    
    export type PageProduct = Pick<Product, 'image' | 'title' | 'category' | 'price'>
    
    export type ProductPopup = Pick<Product, 'image' | 'title' | 'category' | 'price' | 'description'>
    
    export type AddProduct = Pick<Product, 'id' | 'title' | 'price' >
     
    export type ProductOrderPrice = Pick<Product, 'price'> 
    
    export type OrderFormData = Pick<Order, 'payment' | 'address' | 'email' | 'phone'> 
    
    export type OrderProducts = Pick<Order, 'items'>