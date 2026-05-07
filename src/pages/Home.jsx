import React from 'react';
import { Link } from 'react-router-dom';
import { FoodMarquee } from '../components/ui/FoodMarquee';



const Home = () => {
  return (
    <div className="animate-fade-in">
      <section className="hero" style={{ height: '100vh', position: 'relative' }}>
        <div className="hero-glass-box">
          <span style={{ color: 'var(--primary-gold)', fontWeight: 800, fontSize: '0.8rem', letterSpacing: '4px', textTransform: 'uppercase', marginBottom: '20px', display: 'block' }}>ESTD. 2015</span>
          <h1 style={{ color: 'var(--text-bright)' }}>Savor the <span>Royal Essence</span> of Coffee</h1>
          <p style={{ color: 'var(--text-main)', opacity: 0.9 }}>Indulge in a symphony of heritage flavors and modern culinary excellence, crafted for the true connoisseur.</p>
          <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', marginTop: '35px' }}>
            <Link to="/menu" className="btn btn-solid">Explore Menu</Link>
            <Link to="/bookings" className="btn">Reserve a Table</Link>
          </div>
        </div>
        <FoodMarquee />
      </section>

      <section className="container" style={{ padding: '80px 0' }}>
        <div className="grid">
          <div className="glass" style={{ padding: '50px 40px', borderRadius: '30px', textAlign: 'center' }}>
            <div style={{ fontSize: '3rem', marginBottom: '20px' }}>🏛️</div>
            <h3>Royal Ambiance</h3>
            <p style={{ color: 'var(--text-muted)', marginTop: '15px' }}>Dine in a palace-inspired setting that reflects Jaipur's rich heritage.</p>
          </div>
          <div className="glass" style={{ padding: '50px 40px', borderRadius: '30px', textAlign: 'center' }}>
            <div style={{ fontSize: '3rem', marginBottom: '20px' }}>☕</div>
            <h3>Bespoke Brews</h3>
            <p style={{ color: 'var(--text-muted)', marginTop: '15px' }}>Sourced from the finest estates and roasted to royal perfection.</p>
          </div>
          <div className="glass" style={{ padding: '50px 40px', borderRadius: '30px', textAlign: 'center' }}>
            <div style={{ fontSize: '3rem', marginBottom: '20px' }}>👨‍🍳</div>
            <h3>Heritage Chefs</h3>
            <p style={{ color: 'var(--text-muted)', marginTop: '15px' }}>Mastering recipes passed down through generations of royal kitchens.</p>
          </div>
        </div>
      </section>

      <section style={{ background: 'var(--bg-card)', padding: '100px 0' }}>
        <div className="container">
          <h2 style={{ textAlign: 'center', marginBottom: '60px', color: 'var(--text-bright)', fontSize: '3rem' }}>Our Heritage Journey</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '40px', maxWidth: '800px', margin: '0 auto' }}>
            <div style={{ borderLeft: '2px solid var(--primary-gold)', paddingLeft: '40px', position: 'relative' }}>
              <div style={{ position: 'absolute', left: '-11px', top: '0', width: '20px', height: '20px', borderRadius: '50%', background: 'var(--primary-gold)', border: '4px solid #000' }}></div>
              <span style={{ color: 'var(--primary-gold)', fontWeight: 800, fontSize: '1.5rem' }}>2015</span>
              <h3 style={{ color: 'var(--text-bright)', margin: '10px 0' }}>The Royal Inauguration</h3>
              <p style={{ color: 'var(--text-muted)' }}>The Palace Cafe opened its doors in the heart of Jaipur, blending architecture with aroma.</p>
            </div>
            <div style={{ borderLeft: '2px solid var(--primary-gold)', paddingLeft: '40px', position: 'relative' }}>
              <div style={{ position: 'absolute', left: '-11px', top: '0', width: '20px', height: '20px', borderRadius: '50%', background: 'var(--primary-gold)', border: '4px solid #000' }}></div>
              <span style={{ color: 'var(--primary-gold)', fontWeight: 800, fontSize: '1.5rem' }}>2018</span>
              <h3 style={{ color: 'var(--text-bright)', margin: '10px 0' }}>Golden Bean Award</h3>
              <p style={{ color: 'var(--text-muted)' }}>Recognized as the finest heritage cafe for our bespoke brewing techniques.</p>
            </div>
            <div style={{ borderLeft: '2px solid var(--primary-gold)', paddingLeft: '40px', position: 'relative' }}>
              <div style={{ position: 'absolute', left: '-11px', top: '0', width: '20px', height: '20px', borderRadius: '50%', background: 'var(--primary-gold)', border: '4px solid #000' }}></div>
              <span style={{ color: 'var(--primary-gold)', fontWeight: 800, fontSize: '1.5rem' }}>2021</span>
              <h3 style={{ color: 'var(--text-bright)', margin: '10px 0' }}>Global Recognition</h3>
              <p style={{ color: 'var(--text-muted)' }}>Expanding our legacy to luxury connoisseurs across the globe.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
