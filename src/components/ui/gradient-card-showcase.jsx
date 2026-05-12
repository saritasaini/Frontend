import React from 'react';
import './gradient-card-showcase.css';

const cards = [
  {
    title: 'Royal Ambiance 🏛️',
    desc: 'Dine in a palace-inspired setting that reflects Jaipur\'s rich heritage, blending regal architecture with warm hospitality.',
    gradientFrom: '#ffbc00',
    gradientTo: '#ff0058',
  },
  {
    title: 'Bespoke Brews ☕',
    desc: 'Sourced from the finest estates across the globe and roasted to royal perfection by our master brewers.',
    gradientFrom: '#03a9f4',
    gradientTo: '#ff0058',
  },
  {
    title: 'Heritage Chefs 👨‍🍳',
    desc: 'Mastering recipes passed down through generations of royal kitchens, crafting each dish with centuries of tradition.',
    gradientFrom: '#4dff03',
    gradientTo: '#00d0ff',
  },
];

export default function SkewCards() {
  return (
    <div className="skew-cards-section">
      {cards.map(({ title, desc, gradientFrom, gradientTo }, idx) => (
        <div key={idx} className="skew-card">
          {/* Skewed gradient panels */}
          <span
            className="skew-card-gradient"
            style={{
              background: `linear-gradient(315deg, ${gradientFrom}, ${gradientTo})`,
            }}
          />
          <span
            className="skew-card-gradient-blur"
            style={{
              background: `linear-gradient(315deg, ${gradientFrom}, ${gradientTo})`,
            }}
          />

          {/* Animated blobs */}
          <span className="skew-card-blobs">
            <span className="skew-blob skew-blob-top" />
            <span className="skew-blob skew-blob-bottom" />
          </span>

          {/* Content */}
          <div className="skew-card-content">
            <h2>{title}</h2>
            <p>{desc}</p>
            <a href="/menu" className="skew-card-btn">
              Read More
            </a>
          </div>
        </div>
      ))}
    </div>
  );
}
