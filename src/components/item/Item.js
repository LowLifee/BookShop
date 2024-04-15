import { useCallback, useState, useContext, useEffect } from 'react';
import { Orders } from '../../App';

import './item.css';

const Item = (props) => {

   const { desc: { image_url, title, description, price, id } } = props;

   const localAmount = localStorage.getItem(id) ? +(localStorage.getItem(id) + '').split(',')[0] : 0;

   const [amountItem, setAmount] = useState(localAmount);
   const [amountActive, setAmountActive] = useState(false);

   const orderedProducts = useContext(Orders);

   const { setData, data, product, setProduct } = orderedProducts;


   const settingNameToLocal = useCallback((e) => {
      if (e.target.getAttribute('data-value') === 'minus') {
         setAmount(amount => {
            if (amount > 0) {
               return amount - 1
            } else {
               return 0
            }
         });
      } else {
         setAmount(amount => amount + 1);
      }
      localStorage.setItem(`${id}`, [amountItem, price]);
      setProduct({ id: id, amount: [amountItem, price] });
   }, [amountItem, localStorage.length, product]);

   const toggleActive = useCallback(() => {
      setAmountActive(active => !active);
   }, [amountActive]);

   return (
      <li>
         <div className="item-info">
            <div className="descrription">
               <img
                  src={image_url}
                  alt="monkey"
                  className='item-img' />
               <h2>{id}</h2>
               <p>description </p>
            </div>
            <div className="price-buy">
               <div className="item-price">
                  <span>Цена:</span> <span>{price}₽</span>
               </div>
               <div className="btn-buy">
                  <div
                     className='buy-sector'
                     style={{ display: !amountActive ? 'block' : 'none', transition: 'all 0.5s' }}>
                     <button
                        className="button-item"
                        onClick={toggleActive}>Купить</button>
                  </div>
                  <div
                     className='amount-sector'
                     style={{ display: amountActive ? 'flex' : 'none', transition: 'all 0.s' }}>
                     <button
                        className='subtrack-btn plus-minus'
                        data-value='minus'
                        onClick={(e) => settingNameToLocal(e)}>-</button>
                     <span className='amount-item' id={id}>{amountItem}</span>
                     <button
                        className='add-btn plus-minus'
                        data-value='plus'
                        onClick={(e) => settingNameToLocal(e)}>+</button>
                  </div>
               </div>
            </div>
         </div>
      </li>
   )
}

export default Item;