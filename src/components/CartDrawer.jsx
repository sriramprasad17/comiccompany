import React from 'react';

export default function CartDrawer({ 
  cartItems, 
  onRemove, 
  onClose, 
  onCheckout 
}) {
  const total = cartItems.reduce((sum, item) => sum + item.price, 0);

  return (
    <>
      <div className="cart-drawer-overlay" onClick={onClose}></div>
      <aside className="cart-drawer" aria-label="Shopping Cart">
        <div className="cart-header">
          <h2>Shopping Cart</h2>
          <button type="button" className="close-modal-btn" onClick={onClose} aria-label="Close cart drawer">×</button>
        </div>
        <div className="cart-body">
          {cartItems.length === 0 ? (
            <div className="cart-empty">
              <span style={{ fontSize: '3rem' }}>🛒</span>
              <p>Your shopping cart is empty</p>
            </div>
          ) : (
            cartItems.map(comic => (
              <div key={comic.id} className="cart-item">
                <img className="cart-item-cover" src={comic.cover} alt="" />
                <div>
                  <h4 className="cart-item-title">{comic.title}</h4>
                  <div className="cart-item-price">${comic.price.toFixed(2)}</div>
                </div>
                <button 
                  type="button" 
                  className="cart-item-remove" 
                  onClick={() => onRemove(comic.id)}
                  aria-label={`Remove ${comic.title} from cart`}
                >
                  🗑️
                </button>
              </div>
            ))
          )}
        </div>
        
        {cartItems.length > 0 && (
          <div className="cart-footer">
            <div className="cart-total-row">
              <span>Subtotal:</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <button type="button" className="checkout-btn" onClick={onCheckout}>
              Proceed to Checkout
            </button>
          </div>
        )}
      </aside>
    </>
  );
}
