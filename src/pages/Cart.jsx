import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const items = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [];
    setCartItems(items);
  }, []);

  const removeFromCartHandler = (id) => {
    const newItems = cartItems.filter(x => x.product !== id);
    setCartItems(newItems);
    localStorage.setItem('cartItems', JSON.stringify(newItems));
  };

  const checkoutHandler = async () => {
    const userInfo = localStorage.getItem('userInfo');
    if (!userInfo) {
      navigate('/login?redirect=cart');
      return;
    }

    const { token } = JSON.parse(userInfo);
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    };

    const totalPrice = cartItems.reduce((acc, item) => acc + item.qty * item.price, 0);

    try {
      await axios.post('http://localhost:5000/api/orders', {
        orderItems: cartItems,
        totalPrice
      }, config);
      
      localStorage.removeItem('cartItems');
      setCartItems([]);
      alert('Order placed successfully!');
      navigate('/dashboard');
    } catch (error) {
      console.error(error);
      alert('Failed to place order');
    }
  };

  return (
    <div className="animate-fade-in" style={{ paddingTop: '40px' }}>
      <h2 style={{ marginBottom: '30px', color: 'var(--primary-gold)' }}>Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty. <Link to="/menu" style={{ color: 'var(--primary-gold)' }}>Go to Menu</Link></p>
      ) : (
        <div style={{ display: 'flex', gap: '30px', flexWrap: 'wrap' }}>
          <div style={{ flex: '1', minWidth: '300px' }}>
            {cartItems.map(item => (
              <div key={item.product} className="cart-item glass" style={{ marginBottom: '15px', borderRadius: '12px' }}>
                <img src={item.image} alt={item.name} />
                <div style={{ flex: '1', marginLeft: '15px' }}>
                  <Link to={`/product/${item.product}`} style={{ fontWeight: '600' }}>{item.name}</Link>
                  <p style={{ color: 'var(--primary-gold)' }}>${item.price.toFixed(2)}</p>
                </div>
                <div>
                  <span style={{ margin: '0 15px' }}>Qty: {item.qty}</span>
                  <button onClick={() => removeFromCartHandler(item.product)} style={{ background: 'transparent', border: 'none', color: 'var(--danger)', cursor: 'pointer' }}>Remove</button>
                </div>
              </div>
            ))}
          </div>
          <div className="glass" style={{ width: '300px', padding: '20px', borderRadius: '12px', height: 'fit-content' }}>
            <h3>Order Summary</h3>
            <div style={{ margin: '20px 0', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '10px' }}>
              <p style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Total Items:</span>
                <span>{cartItems.reduce((acc, item) => acc + item.qty, 0)}</span>
              </p>
              <p style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px', fontSize: '1.2rem', fontWeight: 'bold', color: 'var(--primary-gold)' }}>
                <span>Total:</span>
                <span>${cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}</span>
              </p>
            </div>
            <button className="btn btn-solid" style={{ width: '100%' }} onClick={checkoutHandler}>
              Proceed To Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
