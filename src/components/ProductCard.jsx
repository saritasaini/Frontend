import React from 'react';

const ProductCard = ({ product, onAddToCart }) => {
  return (
    <div className="product-card glass">
      <img src={product.image} alt={product.name} />
      <div className="product-info">
        <h3 className="product-title">{product.name}</h3>
        <p style={{ color: 'var(--text-muted)', marginBottom: '10px', fontSize: '0.9rem' }}>{product.description}</p>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span className="product-price">${product.price.toFixed(2)}</span>
          <button 
            className="btn btn-solid" 
            style={{ padding: '5px 15px', fontSize: '0.9rem' }}
            onClick={() => onAddToCart(product)}
            disabled={product.countInStock === 0}
          >
            {product.countInStock === 0 ? 'Out of Stock' : 'Add'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
