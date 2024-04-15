import { useCallback, useEffect, useState, useContext } from 'react';
import { Orders } from '../../App'
import ProductService from '../../services/ProductsService';

import './form.css';

const Form = () => {

   const [nameOfItem, setNameItem] = useState([]);
   const [phoneNumb, setPhoneNumb] = useState('');
   const [checker, setCheck] = useState(false);

   const { postProduct } = ProductService();


   const orderedProducts = useContext(Orders);
   const { popupToggle, product } = orderedProducts;

   useEffect(() => {
      const amount = [];
      for (let i = 0; i < localStorage.length; i++) {
         amount.push(localStorage.key(i));
      };
      setNameItem(amount);
   }, [localStorage.length, product, checker])

   const renderOrderName = useCallback(() => {
      const keys = [];
      for (let i = 0; i < localStorage.length; i++) {
         keys.push(localStorage.key(i));
      }


      const elems = keys.map((item, i) => {
         if (item !== 'phone') {
            return (
               <span key={i}>{item}</span>
            )
         };
      });
      return elems;
   }, [localStorage.length], nameOfItem);

   const renderOrderAmount = useCallback(() => {
      const amount = [];
      nameOfItem.forEach(item => {
         if (item !== 'phone') {
            amount.push(localStorage.getItem(item));
         };
      });
      if (localStorage.length > 0) {
         const amountElem = amount.map((item, i) => {
            const arr = item.split(',')
            return (
               <span key={i}>
                  <span>{arr[0]}x</span> <span>{arr[1] * arr[0]}₽</span>
               </span>
            )
         })
         return amountElem;
      } else {
         return null;
      }

   }, [nameOfItem, localStorage.length, phoneNumb]);

   const handleSubmit = useCallback((e, orderInfo) => {
      e.preventDefault();
      if (!checker && localStorage.length > 1) {
         const allOrders = {
            phone: '',
            cart: []
         }
         for (let i = 0; i < localStorage.length; i++) {
            if (nameOfItem[i] === 'phone') {
               allOrders.phone = orderInfo;
            } else {
               if (localStorage.length > 0) {
                  const value = localStorage.getItem(nameOfItem[i]).split(',');
                  allOrders.cart.push({ id: nameOfItem[i], quantity: value[0] })
               }
            }
         }

         postProduct(allOrders)
            .then(res => {
               popupToggle();
               console.log({
                  "success": 1,
               })
            })
            .catch(() => {
               console.log({
                  "success": 0,
                  "error": "отсутствуют товарвы"
               })
            });

         localStorage.clear();
         setPhoneNumb('');
      }
   }, [nameOfItem, localStorage.length]);

   const handleChange = useCallback((e) => {
      setPhoneNumb(e.target.value);
      localStorage.setItem('phone', phoneNumb);
      const regexp = /[a-z]/ig;

      setCheck(checker => {
         return regexp.test(e.target.value)
      })
   }, [phoneNumb])

   const namesOfProduct = renderOrderName();
   const amountOfProduct = renderOrderAmount();

   return (
      <div className="form">
         <h2>Добавленные товары</h2>
         <div className="good-amount">
            <div className="goods-name">
               {namesOfProduct}
            </div>
            <div className="quantity">
               {amountOfProduct}

            </div>
         </div>
         <form action="submit" onSubmit={(e) => handleSubmit(e, phoneNumb)}>
            <input
               type="tel"
               placeholder='+7(___) ___ __-__'
               name='phone'
               value={phoneNumb}
               onChange={(e) => handleChange(e)}
               required
               style={{ border: checker ? '2px solid red' : '' }} />
            <button id='send-btn'>заказать</button>
         </form>
      </div>
   )
}

export default Form;