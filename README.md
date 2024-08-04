# Проектная работа "Веб-ларек"

Стек: HTML, SCSS, TS, Webpack

Структура проекта:
- src/ — исходные файлы проекта
- src/components/ — папка с JS компонентами
- src/components/base/ — папка с базовым кодом

Важные файлы:
- src/pages/index.html — HTML-файл главной страницы
- src/types/index.ts — файл с типами
- src/index.ts — точка входа приложения
- src/styles/styles.scss — корневой файл стилей
- src/utils/constants.ts — файл с константами
- src/utils/utils.ts — файл с утилитами

## Установка и запуск
Для установки и запуска проекта необходимо выполнить команды

```
npm install
npm run start
```

или

```
yarn
yarn start
```
## Сборка

```
npm run build
```

или

```
yarn build
```

# Данные и типы данных, используемые в приложении

1. Это объект который мы получаем с сервера. Мы не можем редактировать эти данные, но можем отображать объект с помощью этих данных.
export interface IProduct {
        id: string;
        description: string;
        image: string;
        title: string;
        category: string;
        price: number;
    }
    
2. Это объекты при выборе заказа.

    export interface IOrder { 
        payment: string;
        email: string;
        phone: string;
        address: string;
        total: IProductOrderPrice[];
        items: IBasketProductData; 
    }

3. Каталог товаров.

    export interface IBasketProductData { 
        products: IProduct[];
        preview: string | null; 
        addProduct(product: IProduct): void;
        deleteProduct(productId: string, payload: Function | null): void;
        getProduct(productId: string): IProduct;
    }
    
    * export type IPageProduct = Pick<IProduct, 'image' | 'title' | 'category' | 'price'>
    
    * export type IProductPopup = Pick<IProduct, 'image' | 'title' | 'category' | 'price' | 'description'>
    
    * export type IAddProduct = Pick<IProduct, 'id' | 'title' | 'price' >
     
    * export type IProductOrderPrice = Pick<IProduct, 'price'> 
    
    * export type IOrderFormData = Pick<IOrder, 'payment' | 'address' | 'email' | 'phone'> 
    
    * export type IOrderProducts = Pick<IOrder, 'items'>

    # Архетиктура приложения

    ## Стандартный код

    Класс API содержит стандартный код отправки запроса.

   ### Класс EventEmitter

    Брокер событий, классическая реализация. В расширенных вариантах есть возможность подписаться на все события или слушать события по шаблону. Основные методы, реализуемые классом, описаны интерфейсом 'IEvents':

    export interface IEvents {
        on(event: EventName, callback: (data: T) => void): void;
        emit<T extends object>(event: string, data?: T): void;
        trigger<T extends object>(event: string, context?: Partial<T>): (data: T) => void;
}

## Данные отвечающие за отображение на странице

### Класс IBasketProductData
Класс отвечает за функционал работы с данными товара и отображением на странице и дабавлением в корзину.  

* _products: IProduct[] - массив объектов товаров
* _preview: string | null - id товара, выбранного для просмотра в модальном окне
* events: IEvent - экземпляр класса EventEmitter

В классе доступен набор методов для взаимодействия с этими данными.

* addProduct(product: IProduct): void - добавляет одну карточку товара в конец массива и вызывает событие изменения массива.
* deleteProduct(productId: string, payload: Function | null): void - удаляет карточку из массива.
* getProduct(productId: string): IProduct - возвращает товар по его id.

### Класс IProductList
Класс отвечает за хранение и логику работы с данными заказа.

В полях класса хранятся следующие данные:

* payment: string; - информация о способе оплаты
* email: string; - информация о email заказчика
* phone: string; - информация о телефоне заказчика
* address: string; - информация о телефоне заказчика
* total: IProductOrderPrice[]; - информация о сумме заказа
* items: IBasketProductData;  - информация о массиве карточек, добавленных в корзинку
* events: IEvent - экземпляр класса EventEmitter

## Данные отображения внутри контейнера DOM-element.

### Класс Modal

Проанализировав верстку, у нас есть одно модальное окно, внутри которого размещается контент вызванного модального окна.

Внутри может находиться:

div class="modal__container
div class="card card_full карточка с полным описанием товара и - кнопка в корзину
div class="basket" - корзина со всеми выбранными товарами и кнопка оформить
form class="form"> - форма заполнения данных покупателя и кнопка далее
form class="form"> - форма заполнения данных покупателя и кнопка оплатить
div class="order-success"> - извещение об успешном оформлении заказа и кнопка перехода на главную страницу

Реализация происходит путем вставления в модальное окно таких шаблонов как:

template id="success">
template id="card-catalog">
template id="card-preview">
template id="card-basket">
template id="basket">
template id="order">
template id="contacts">

**Список всех событий, которые могут генерироваться в системе:**

* product:open - выбор товара для просмотра в модальном окне
* product:select - добавление товара в корзину 
* basket:select - открываем корзину для просмотра 
* basket:changed - изменение массива товаров в корзине 
* product:delete - удаляем товар из корзины 
* orderFormFirst:open - открытие первого модального окна с формой редактирования заказа
* orderFormSecond:open - открытие второго модального окна с формой редактирования заказа
* payWay:select - выбор способа оплаты 
* address:input - изменение данных в форме с данными адреса
* email:input - изменение данных в форме с данными почты
* phone:input - изменение данных в форме с данными телефона
* address:validation - событие, сообщающее о необходимости валидации формы с адресом
* email:validation - событие, сообщающее о необходимости валидации формы с почтой
* phone:validation - событие, сообщающее о необходимости валидации формы с телефоном
* mainpage:open - закрываем модальное окно и открываем главную страницу
* orderForm:clear - необходима очистка данных, введенных в форму
* order:changed - изменение данных заказа
* order:submit - сохранение заказа по нажатию кнопки оплатить