import './scss/styles.scss';
import { ProductCard } from './components/View/ProductCard';
import { Cards } from './components/View/Cards';
import { ProductData } from './components/models/ProductData';
import { EventEmitter } from './components/base/events';
import { Modal } from './components/View/Modals';
import { OrderData } from './components/View/OrderData';
import { Api } from './components/base/api';
import { AppData } from './components/base/AppData';
import { IApi } from './types';
import { Payment } from './components/View/Payment';
import { cloneTemplate, ensureElement } from './utils/utils';
import { API_URL } from './utils/constants';
import { UserContacts } from './types';
import { BasketElement } from './components/View/BascketElement';
import { CountInBasket } from './components/View/CountInBasket';
import { ContactsForm } from './components/View/ContactsForm';
import { UserPayments } from './types';
import { Success } from './components/View/Success';
import { Page } from './components/View/Page';

const events = new EventEmitter();
const baseApi: IApi = new Api(API_URL);
const api = new AppData(baseApi);

events.onAll((event) => {
  console.log(event.eventName, event.data)
})

const productData = new ProductData(events);
const promise = api.getProducts();

promise
  .then((data) => {
    productData.products = data.items;
    console.log(data.items);
    events.emit('products:loaded');
  })
  .catch((err) => {
    console.error(err);
  });

const cardTemplate: HTMLTemplateElement = ensureElement<HTMLTemplateElement>('#card-catalog');
const galleryContainer = new Cards(
    ensureElement<HTMLTemplateElement>('.gallery'), events
  );

  
  events.on('products:loaded', () => {
    const cardsArray = productData.products.map((card) => {
      const cardInstant = new ProductCard(cloneTemplate(cardTemplate), events);
      return cardInstant.render(card);
    });
  
    galleryContainer.render({ catalog: cardsArray });
  });

  const cardModalTemplate: HTMLTemplateElement = ensureElement<HTMLTemplateElement>('#card-preview');
  const modal = new Modal(ensureElement<HTMLElement>('#modal-container'), events);
  const basketTemplate: HTMLTemplateElement = ensureElement<HTMLTemplateElement>('#basket');
  const basket = new BasketElement(cloneTemplate(basketTemplate), events);
  const cardBasketTemplate: HTMLTemplateElement = ensureElement<HTMLTemplateElement>('#card-basket');
  const basketCounter = new CountInBasket(ensureElement<HTMLTemplateElement>('.header__basket'), events);
  const paymentFormTemplate: HTMLTemplateElement =
ensureElement<HTMLTemplateElement>('#order'); 
  const contactsFormTemplate: HTMLTemplateElement =
ensureElement<HTMLTemplateElement>('#contacts'); 
  const contacts = new ContactsForm(cloneTemplate(contactsFormTemplate), events);
  const orderData = new OrderData(events);
  orderData.basket = []
  const successTemplate: HTMLTemplateElement = ensureElement<HTMLTemplateElement>('#success'); 
  const payments = new Payment(cloneTemplate(paymentFormTemplate), events);
  const page = new Page(document.body, events);


events.on('card:open', (data: { card: ProductCard}) => {
  const { card } = data;
  const productModalData = productData.getProduct(card.id);   
  const cardModal = new ProductCard(cloneTemplate(cardModalTemplate), events);
  const orderedProducts = orderData.getProducts();
  const isOrdered = orderedProducts.some(orderedProduct => orderedProduct.id === productModalData.id);

  cardModal.ordered = isOrdered; 

  modal.render({
      content: cardModal.render(productModalData)
  });
});


events.on('product:add', (data: { card: ProductCard }) => {
  const { card } = data; 
  const basketItemData = productData.getProduct(card.id);

  orderData.addProduct(basketItemData); 
  modal.close();
  basketCounter.counter = orderData.getTotal();    
});

events.on('product:delete', (data: { card: ProductCard }) => {
  const { card } = data; 
  const basketItemData = productData.getProduct(card.id); 

  orderData.deleteProduct(basketItemData.id);
  basketCounter.counter = orderData.getTotal(); 
});

events.on('basket:open', () => { 
  basket.items = orderData.basket.map((card, index) => {

  const cardBasket = new ProductCard(cloneTemplate(cardBasketTemplate), events);

  cardBasket.index = index + 1; 
  return cardBasket.render(card);
 
});
  const basketTotal = orderData.totalPrice();

  basket.total = basketTotal;  
modal.render({
  content: basket.render()  
})
})


events.on('formPayment:open', () => {
  modal.render({
    content: payments.render({
      address: '',
      payment: '',
      valid: false,
      errors: []
    })
  });
});

events.on(/^order\..*?:change$/, (data: { field: keyof UserPayments, value: string }) => {
  orderData.setPaymentField(data.field, data.value);
});

events.on('formErrors:change', (errors: Partial<Payment>) => {
  const { payment, address } = errors;
  payments.valid = !payment && !address;
  payments.errors = Object.values({payment, address}).filter(i => !!i).join('; ');
});


events.on('formPayment:submit', (data) => {
   modal.render({
    content: contacts.render({
      email: '',
      phone: '',
      valid: false,
      errors: []
    })
  });
});

events.on(/^contacts\..*?:change$/, (data: { field: keyof UserContacts, value: string }) => {
  orderData.setContactsField(data.field, data.value);
});

events.on('formErrors:change', (errors: Partial<UserContacts>) => {
  const { phone, email } = errors;
  contacts.valid = !phone && !email;
  contacts.errors = Object.values({phone, email}).filter(i => !!i).join('; ');
});

events.on('modal:open', () => {
  page.locked = true;
});

events.on('modal:close', () => {
  page.locked = false;
});

events.on('order:send', () => {
  
  const orderToSend = orderData.getOrder();

  api.postOrder(orderToSend)
  .then((result) => { 

    orderData.clearOrder();
    events.emit('order:sent');                
    basketCounter.counter = 0;
    const success = new Success(cloneTemplate(successTemplate), {
      onClick: () => {
        modal.close();
      }
    });

    modal.render({
      content: success.render({
        total: orderToSend.total
      })
    });
  })
  .catch(err => {
    console.error(err);
  });
});

