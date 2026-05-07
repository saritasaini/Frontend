import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from '../components/ProductCard';

const Menu = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get('http://localhost:5000/api/products');
        setProducts(data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const addToCartHandler = (product) => {
    const cartItems = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [];
    const existItem = cartItems.find(x => x.product === product._id);
    
    if (existItem) {
      localStorage.setItem('cartItems', JSON.stringify(cartItems.map(x => x.product === existItem.product ? { ...existItem, qty: existItem.qty + 1 } : x)));
    } else {
      cartItems.push({
        product: product._id,
        name: product.name,
        image: product.image,
        price: product.price,
        qty: 1
      });
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }
    alert('Added to cart!');
  };

  return (
    <div className="animate-fade-in" style={{ paddingTop: '40px' }}>
      <h2 style={{ marginBottom: '30px', textAlign: 'center', color: 'var(--primary-gold)' }}>Our Premium Menu</h2>
      {loading ? (
        <p style={{ textAlign: 'center' }}>Loading...</p>
      ) : (
        <div className="grid">
          {products.map(product => (
            <ProductCard key={product._id} product={product} onAddToCart={addToCartHandler} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Menu;
