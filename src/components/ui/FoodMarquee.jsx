import React from 'react';
import './FoodMarquee.css';

const foodImages = [
  { id: 1, url: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&auto=format&fit=crop&q=80', alt: 'Healthy Salad' },
  { id: 2, url: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500&auto=format&fit=crop&q=80', alt: 'Fresh Pizza' },
  { id: 3, url: 'https://images.unsplash.com/photo-1567620905732-2d1ec7bb7445?w=500&auto=format&fit=crop&q=80', alt: 'Pancakes' },
  { id: 4, url: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=500&auto=format&fit=crop&q=80', alt: 'Italian Pizza' },
  { id: 5, url: 'https://images.unsplash.com/photo-1482049016688-2d3e1b311543?w=500&auto=format&fit=crop&q=80', alt: 'Gourmet Sandwich' },
  { id: 6, url: 'https://images.unsplash.com/photo-1484723091739-30a097e8f929?w=500&auto=format&fit=crop&q=80', alt: 'French Toast' },
  { id: 7, url: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=500&auto=format&fit=crop&q=80', alt: 'Vegetable Bowl' },
  { id: 8, url: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=500&auto=format&fit=crop&q=80', alt: 'Cheese Cake' },
];

export const FoodMarquee = () => {
  // Duplicate the array for a seamless loop
  const displayImages = [...foodImages, ...foodImages];

  return (
    <div className="marquee-container">
      <div className="marquee-content">
        {displayImages.map((food, index) => (
          <div key={`${food.id}-${index}`} className="marquee-item">
            <div className="marquee-image-wrapper">
              <img src={food.url} alt={food.alt} className="marquee-image" />
            </div>
          </div>
        ))}
      </div>
      <div className="marquee-overlay-left"></div>
      <div className="marquee-overlay-right"></div>
    </div>
  );
};
