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
- src/scss/styles.scss — корневой файл стилей
- src/utils/constants.ts — файл с константами
- src/utils/utils.ts — файл с утилитами
- src/utils/items.ts — файл c массивом объектов товаров

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

## Данные и типы данных, используемые в приложении

1. Это объект который мы получаем с сервера. Мы не можем редактировать эти данные, но можем отображать объект с помощью этих данных.
export interface Product { id: string; description: string; image: string; title: string; category: string; price: number;}

2. Это объекты при выборе заказа, мы можем выбирать товары по id, также добавлять и удалять товар.
export interface  Basket {items: Product[]; preview: string | null; total: ProductOrderPrice[]; addProduct(product: Product): void; deleteProduct(productId: string, payload: Function | null): void; getProduct(productId: string): Product;}

3. Данные товаров с которыми мы можем взаимодействовать.
export interface ProductData { products: Product[]; preview: string | null; addProduct(product: Product): void; deleteProduct(productId: string, payload: Function | null): void; getProduct(productId: string): Product;}

4. Данные которые будут вводиться в форму и отправляться на сервер. 
export interface UserData {payment: string; address: string; email: string; phone: string;}

5. export type IPageProduct = Pick<IProduct, 'image' | 'title' | 'category' | 'price'>
    
6. export type IProductPopup = Pick<IProduct, 'image' | 'title' | 'category' | 'price' | 'description'>
    
7. export type IAddProduct = Pick<IProduct, 'id' | 'title' | 'price' >
     
8. export type IProductOrderPrice = Pick<IProduct, 'price'> 
    
9. export type IOrderFormData = Pick<IOrder, 'payment' | 'address' | 'email' | 'phone'> 
    
10. export type IOrderProducts = Pick<IOrder, 'items'>

    ## Архетиктура приложения

    * Компоненты  изменения и хранения данных.
    * Компоненты  представления.
    * Компоненты  коммуникации.

    ### Базовый код

    Класс API содержит стандартный код отправки запроса.

   #### Класс EventEmitter

    Брокер событий, классическая реализация. В расширенных вариантах есть возможность подписаться на все события или слушать события по шаблону. Основные методы, реализуемые классом, описаны интерфейсом 'IEvents':

    export interface IEvents {
        on(event: EventName, callback: (data: T) => void): void;
        emit<T extends object>(event: string, data?: T): void;
        trigger<T extends object>(event: string, context?: Partial<T>): (data: T) => void;
}

### Компоненты  изменения и хранения данных

#### ProductData
Класс отвечает за функционал работы с данными товара и отображением на странице и дабавлением в корзину.  
Конструктор класса принимает брокер событий.

* _products: Product[] - массив объектов товаров
* _preview: string | null - id товара, выбранного для просмотра в модальном окне
* events: IEvent - экземпляр класса EventEmitter

В классе доступен набор методов для взаимодействия с этими данными.

* addProduct(product: Product): void - добавляет одну карточку товара в конец массива и вызывает событие изменения массива.
* deleteProduct(productId: string, payload: Function | null): void - удаляет карточку из массива.
* getProduct(productId: string): IProduct - возвращает товар по его id.

#### Класс Basket

Класс отвечает за хранение и логику работы с данными товаров. Товары можно добавлять, удалять и посчитать стоимость товаров.
Конструктор класса принимает брокер событий.

* _products: Product[] - массив товаров, добавленных в корзину
* _preview: string | null - id товара, выбранного для удаления из корзины
* events: IEvent - экземпляр класса EventEmitter

В классе доступен набор методов для взаимодействия с этими данными.

* addProduct(product: Product): 
* deleteProduct(productId: string, payload: Function | null): void 
* getProduct(productId: string):

#### Класс UserData

Класс отвечает за хранение и логику работы с данными при оформлении заказа.
Конструктор класса принимает брокер событий.
   
* payment: string;
* address: string;
* email: string;
* phone: string;

В классе доступен набор методов для взаимодействия с этими данными.

* addUserData - добавляем данные в объект данных пользователя.
* deleteUserData - удаляем данные из объекта данных пользователя
* updateUserData - обновляем данные в объекте данных пользователя

#### Класс Order 

Класс отвечает за хранение и логику работы с данными заказа.
Конструктор класса принимает инстант брокера событий.

* payment: string;
* email: string;
* phone: string;
* address: string;
* items: Basket;
* data: UserData; 

В классе доступен набор методов для взаимодействия с этими данными.

* addOrder - Дабаляем данные в объект заказа
* deleteOrder - Очищаем объект заказа
* setOrder - Отправляем данные на сервер
* getOrder - Метод возвращает данные, после успешной отправки заказа

### Компоненты  представления.

#### Класс Component

Класс Component содержит защищённое свойство element, которое является элементом, с которым будет работать компонент. Все классы наследуются от Component.

#### Класс Modal

Проанализировав верстку, у нас есть одно модальное окно, внутри которого размещается контент вызванного модального окна.

Внутри может находиться:

* div class="modal__container
* div class="card card_full карточка с полным описанием товара и - кнопка в корзину
* div class="basket" - корзина со всеми выбранными товарами и кнопка оформить
* form class="form"> - форма заполнения данных покупателя и кнопка далее
* form class="form"> - форма заполнения данных покупателя и кнопка оплатить
* div class="order-success"> - извещение об успешном оформлении заказа и кнопка перехода на главную страницу

Реализация происходит путем вставления в модальное окно таких шаблонов как:

* template id="success">
* template id="card-catalog">
* template id="card-preview">
* template id="card-basket">
* template id="basket">
* template id="order">
* template id="contacts">

#### Класс Form 

В классе есть возможности вводить данные, а также совершать с ними действия. Предназначен для реализации модального окна с формой, содержащей поля ввода. При клике(submit) инициирует событие, передавая в него объект с данными из полей ввода формы. При изменении данных в полях ввода инициирует событие изменения данных. Предоставляет методы для отображения ошибок и управления активностью кнопки сохранения. Наследует класс Component.

#### Класс Product
Отвечает за отображение товара, отрисовывает данные названия, описания, изображения, цены. Класс используется для отображения товара на главной странице, в модальном окне и в корзине. В конструктор класса передается DOM элемент template для отрисовки конкретного отображения. Слушатель событий отслеживает, на какую карточку произошел клик:

* id: string;
* description: string;
* image: string;
* title: string;
* category: string;
* price: number;

В классе доступен набор методов для взаимодействия с этими данными.

* getter id возвращает id выбранной карточки 
* setData(productData: Product): void - заполняет атрибуты элементов товара данными

### Компоненты  коммуникации.

#### Класс AppData

Принимает в конструктор экземпляр класса Api и предоставляет методы, реализующие взаимодействие с бэкендом сервиса.

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