import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Dashboard = () => {
  const [orders, setOrders] = useState([]);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userInfo = localStorage.getItem('userInfo');
    if (!userInfo) {
      navigate('/login');
    } else {
      setUser(JSON.parse(userInfo));
      fetchOrders(JSON.parse(userInfo));
    }
  }, [navigate]);

  const fetchOrders = async (userObj) => {
    try {
      const config = { headers: { Authorization: `Bearer ${userObj.token}` } };
      const url = userObj.isAdmin ? 'http://localhost:5000/api/orders' : 'http://localhost:5000/api/orders/myorders';
      const { data } = await axios.get(url, config);
      setOrders(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="animate-fade-in" style={{ paddingTop: '40px' }}>
      <h2 style={{ marginBottom: '30px', color: 'var(--primary-gold)' }}>User Dashboard</h2>
      
      {user && (
        <div className="glass" style={{ padding: '20px', borderRadius: '12px', marginBottom: '30px' }}>
          <h3>Profile Details</h3>
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Username:</strong> {user.username}</p>
        </div>
      )}

      <h3>{user && user.isAdmin ? 'All Customer Orders' : 'My Orders'}</h3>
      {orders.length === 0 ? (
        <p>You have no orders yet.</p>
      ) : (
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '15px' }}>
            <thead>
              <tr style={{ background: 'rgba(255,255,255,0.05)', textAlign: 'left' }}>
                <th style={{ padding: '12px' }}>ID</th>
                <th style={{ padding: '12px' }}>DATE</th>
                <th style={{ padding: '12px' }}>TOTAL</th>
                <th style={{ padding: '12px' }}>PAID</th>
                <th style={{ padding: '12px' }}>DELIVERED</th>
              </tr>
            </thead>
            <tbody>
              {orders.map(order => (
                <tr key={order._id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                  <td style={{ padding: '12px' }}>{order._id}</td>
                  <td style={{ padding: '12px' }}>{order.createdAt.substring(0, 10)}</td>
                  <td style={{ padding: '12px' }}>${order.totalPrice.toFixed(2)}</td>
                  <td style={{ padding: '12px' }}>{order.isPaid ? order.paidAt.substring(0, 10) : <span style={{ color: 'var(--danger)' }}>Not Paid</span>}</td>
                  <td style={{ padding: '12px' }}>{order.isDelivered ? order.deliveredAt.substring(0, 10) : <span style={{ color: 'var(--danger)' }}>Not Delivered</span>}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
