import ProductService from '../../services/ProductsService';
import { useCallback, useEffect, useState } from 'react';
import Spinner from '../spinner/Spinner';
import Comment from '../comment/Comment';


import './feedBack.css';

const FeedBack = () => {
   const [headers, setHeaders] = useState([]);

   const { getComments, process, clearError, setProcess } = ProductService();

   console.log(process)

   useEffect(() => {
      getComments().then(res => {
         setHeaders(res);
      }).catch(() => {
         console.log('error fetch header')
      })
   }, [])

   const renderComments = useCallback((comments) => {

      switch (process) {
         case 'loading':
            return (
               <div className="feed-back">
                  <Spinner />
               </div>
            );
         case 'fulfiled':
            const comment = comments.map((item, i) => {
               return (
                  <Comment key={i} comment={item} id={i} />
               )
            });
            return (
               <div className="feed-back">
                  {comment}
               </div>
            );
      }

   }, [headers, process])

   const element = renderComments(headers)

   return (
      <>
         {element}
      </>
   )

}

export default FeedBack;