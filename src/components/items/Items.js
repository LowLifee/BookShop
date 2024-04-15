import ProductService from '../../services/ProductsService';
import { useEffect, useState, useCallback } from 'react';

import Item from '../item/Item';

import './items.css';

const Items = () => {
   const [goods, setGoods] = useState([]);
   const [pageAmount, setAmount] = useState(20);

   const { getAmount } = ProductService();

   useEffect(() => {
      getAmount(`http://o-complex.com:1337/products?page=1&page_size=${pageAmount}`).then(res => {
         setGoods(res.products);
      }).catch(() => {
         console.log('error in fetch goods.')
      })
   }, [pageAmount]);

   window.addEventListener('scroll', () => {
      setAmount(amount => amount + 1)
   })


   const renderGoods = useCallback((array) => {
      const prod = array.map(product => {
         return (
            <Item key={product.id} desc={product} />
         )
      })

      return (
         <ul>
            {prod}
         </ul>
      )
   }, [goods]);

   const elemOfGoods = renderGoods(goods);


   return (
      <div className="item-wrapper">
         {elemOfGoods}
      </div>
   )
}

export default Items;