import {HeaderComponent} from '../../components/HeaderComponent'
import {useEffect ,useState} from 'react';
import { ProductsGrid } from './ProductsGrid';
import axios from 'axios';
import { useSearchParams } from 'react-router';
import './HomePage.css';

export function HomePage({cart,loadCart}){
  const API = import.meta.env.VITE_API_URL;
  const [searchParams] =useSearchParams();
  const [products ,setProducts] =useState([]);
  const search = searchParams.get('search');

  useEffect(()=>{
    const reqUrl = search ? `${API}/api/products?search=${search}` : `${API}/api/products`;

    async function getP() {
      const response = await axios.get(reqUrl);
      setProducts(response.data);
      
    }
    getP();
    
    
   
    
  } ,[search] );

    return (
     <>
        <title>Ecommerce Project</title>
        
        <HeaderComponent cart={cart}/>
        <div className="home-page">
         <ProductsGrid  products={products} loadCart={loadCart}/>
        </div>
    </>
    );
}