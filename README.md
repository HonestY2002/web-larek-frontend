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

1. Это объект который мы получаем с сервера. Мы не можем редактировать эти данные, но можем отображать объект используя эти данные interface Product { id: string; description: string; image: string; title: string; category: string; price: number;} 
 
2. Это пустой объект корзина, мы можем удалять и добалять товар в корзину, выбирать товар по id interface  Basket {items: Product[]; preview: string | null; addProduct(product: Product): void; deleteProduct(productId: string, payload: Function | null): void; getProduct(productId: string): Product;}

3. interface ProductData  {это данные товаров, а также действия которые мы можем выполнять products: Product[]; preview: string | null;  это указатель на товар который мы хотим 
посмотреть getProduct(productId: string): Product;}
 
4. Это даннные пользователя которые будут вноситься в форму, валидироваться и сохраняться в модели данных.
interface UserData {payment: string; address: string; email: string; phone: string;  addData() добавляем данные в объект заказа checkValidation(data: Record<keyof OrderFormData, string>): boolean; делаем валидацию}

5. Это пустой объект заказа который мы будем отправлять на сервер interface Order {  payment: string; email: string; phone: string; address: string; items: Product[]; getOrder(): метод возвращения с сервера данных полученных после успешной отправки заказа; setOrder(): метод сборки и отправки заказа на сервер;}

6. type PageProduct = Pick<Product, 'image' | 'title' | 'category' | 'price'>
    
7. type ProductPopup = Pick<Product, 'image' | 'title' | 'category' | 'price' | 'description'>
    
8. type AddProduct = Pick<Product, 'id' | 'title' | 'price' >
     
9. type ProductOrderPrice = Pick<Product, 'price'> 
    
10. type OrderFormData = Pick<Order, 'payment' | 'address' | 'email' | 'phone'> 
    
11. type OrderProducts = Pick<Order, 'items'>

## Архетиктура приложения

* Слой данных отвечает за хранение и изменение данных
* Слой представления отечает за отображение данных на странице
* Слой связи отвечает за связь представления и данных

### Базовый код

#### Класс Api
     
В данном случае конструктор класса Api принимает два параметра: 
 * baseUrl: string — базовый URL для взаимодействия с API. 
 * options: RequestInit = {} — дополнительные параметры конфигурации запроса.

Поля класса
* readonly baseUrl: string — базовый URL для запросов.
* protected options: RequestInit — параметры запроса, такие как заголовки и метод.

Конструктор
Создаёт экземпляр класса с заданным базовым URL и параметрами запроса. Если параметр options не указан, используются значения по умолчанию: constructor(baseUrl: string, options: RequestInit = {})

В данном случае конструктор класса Api принимает два параметра: 
 * baseUrl: string — базовый URL для взаимодействия с API. 
 * options: RequestInit = {} — дополнительные параметры конфигурации запроса.
   
Метод handleResponse
Обрабатывает ответ от сервера. Если ответ успешный, возвращает ответ в формате JSON. Если нет, пытается получить ошибку из ответа и возвращает её или статус ответа в виде строки.

#### Класс EventEmitter

    Брокер событий, классическая реализация. В расширенных вариантах есть возможность подписаться на все события или слушать события по шаблону. Основные методы, реализуемые классом, описаны интерфейсом 'IEvents':

    interface IEvents {
        on(event: EventName, callback: (data: T) => void): void;
        emit<T extends object>(event: string, data?: T): void;
        trigger<T extends object>(event: string, context?: Partial<T>): (data: T) => void;
}

### Слой данных.

#### ProductData
Класс отвечает за хранение и логику работы с данными товаров, отображаемых на странице и добавляемых в корзинку. 
Конструктор класса принимает брокер событий.

* _products: Product[] - массив объектов товаров
* _preview: string | null - id товара, выбранного для просмотра в модальном окне
* events: IEvent - экземпляр класса EventEmitter

В классе доступен набор методов для взаимодействия с этими данными.

* addProduct(product: Product): void - добавляет массив в корзину
* deleteProduct(productId: string, payload: Function | null): void - удаляет массив из корзины
* getProduct(productId: string): IProduct - возвращает товар по его id.

#### Класс Basket

Класс отвечает за хранение и логику работы с данными товаров, добавленных в корзину.
Данные товаров - это массив объектов товаров, их можно добавлять и удалять, а также подсчитывать общую стоимость товаров, добавленных в корзину.
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

#### Класс Order 

Класс отвечает за хранение и логику работы с данными заказа.
Конструктор класса принимает инстант брокера событий.

_basket: Basket[] - массив товаров, добавленных в корзину
_userdata: UserData - объект данных с информацией о пользователе
total: ProductOrderedPrice[] - информация о сумме заказа

В классе доступен набор методов для взаимодействия с этими данными.

* addOrder - Дабаляем данные в объект заказа
* deleteOrder - Очищаем объект заказа
* setOrder - Отправляем данные на сервер
* getOrder - Метод возвращает данные, после успешной отправки заказа

### Слой представления.

#### Класс Component

Класс Component содержит защищённое свойство element, которое является элементом, с которым будет работать компонент. Все классы наследуются от Component.

#### Класс Modal
Класс наследует класс Component, при этом добавляются элементы для открытия и закрытия модального окна.
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
* template id="contacts"> - по нажатию определенной кнопки пользователем открываеться модальное окно в котором находиться DOM-element, так реализуется метод открытия модального окна(open)

Конструктор класса: 

* constructor(selector: string, events: IEvents) - конструктор принимает темплейт по которому в разметке страницы будет устанавливаться модальное окно и класс EventEmitter для разных событий.

В классе предоставляется метод close для управлением модального окна. Для закрытия модального окна устанавливаеться слушатель на кнопку ESC, на клик по оверлею и кнопку крестик.

Поля класса:
* events: IEvents - брокер событий
* openButton: HTMLButtonElement - кнопка отрытия модального окна
* goFurtherButton: HTMLButtonElement - кнопка, открывающая следующее модальное окно (или завершающая заказ)
* handleSubmit: Function - функция, которая будет выполняться после подтвеждения
* close (): закрытие модального окна

#### Класс Form 

В классе есть возможности вводить данные, а также совершать с ними действия. Предназначен для реализации модального окна с формой, содержащей поля ввода. При клике(submit) инициирует событие, передавая в него объект с данными из полей ввода формы. При изменении данных в полях ввода инициирует событие изменения данных. Предоставляет методы для отображения ошибок и управления активностью кнопки сохранения. Наследует класс Component.

Методы для функциональноти кномпи сохранить и вывода ошибок:

* submitButton: HTMLButtonElement - кнопка подтверждения
* _form: HTMLFormElement - элемент формы
* formName: string - форма имени 
* inputs: NodeListOf - поля ввода формы
* errors: Record<string, HTMLElement> - объект, который хранит элементы вывода ошибок привязанный к атрибуту name

Методы:
* getValues(): Record<string, string> - возвращает объект с данными введенные пользователем
* setValues(data: Record<string, string>): void - принимает объект с данными для заполнения полей формы
* setError(data: { field: string, value: string, validInformation: string}): void - принимает объект с данными которые отображают или скрывают ошибки ввода
* showTextError (field: string, errorMessage: string): void - отоброжает текст самой оишибки
* hideError (field: string): void - очищает текст ошибки под указанным полем ввода
* setValid(isValid: boolean): void - изменяет активность кнопки подтверждения
* checkValidation - проверка на валидность всей формы

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

### Слой связи.

#### Класс AppData

Класс принимает в конструктор экземпляр класса Api и предоставляет методы, реализующие взаимодействие с бэкендом сервиса.

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