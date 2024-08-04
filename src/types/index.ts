export interface IProduct {
        id: string;
        description: string;
        image: string;
        title: string;
        category: string;
        price: number;
    }
    
    
    export interface IOrder { 
        payment: string;
        email: string;
        phone: string;
        address: string;
        total: IProductOrderPrice[];
        items: IBasketProductData; 
    }

    export interface IBasketProductData { 
        products: IProduct[];
        preview: string | null; 
        addProduct(product: IProduct): void;
        deleteProduct(productId: string, payload: Function | null): void;
        getProduct(productId: string): IProduct;
    }
    
    export type IPageProduct = Pick<IProduct, 'image' | 'title' | 'category' | 'price'>
    
    export type IProductPopup = Pick<IProduct, 'image' | 'title' | 'category' | 'price' | 'description'>
    
    export type IAddProduct = Pick<IProduct, 'id' | 'title' | 'price' >
     
    export type IProductOrderPrice = Pick<IProduct, 'price'> 
    
    export type IOrderFormData = Pick<IOrder, 'payment' | 'address' | 'email' | 'phone'> 
    
    export type IOrderProducts = Pick<IOrder, 'items'>