import { useHttp } from "../hooks/http.hook";
import { useCallback } from "react";

const __url = 'http://o-complex.com:1337/';
const __comments = 'http://o-complex.com:1337/reviews';
const __pageAmount = 'http://o-complex.com:1337/products?page=1&page_size=20';
const __postProd = 'http://o-complex.com:1337/order';

const ProductService = () => {
   const { process, clearError, request, setProcess } = useHttp();

   const getComments = useCallback(async () => {
      const res = await request(__comments)
      return res;
   }, []);

   const getAmount = useCallback(async (amount = __pageAmount) => {
      const res = await request(amount)
      return res;
   }, [])

   const postProduct = useCallback(async (data) => {
      const res = await request(__postProd, "POST", JSON.stringify(data));
      return res;
   }, [])

   return {
      getComments,
      getAmount,
      postProduct,
      process,
      clearError,
      setProcess
   }
}

export default ProductService;