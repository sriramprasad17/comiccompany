import React, { useState } from 'react';

export default function CheckoutModal({ total, itemsCount, onClose, onSubmit }) {
  const [cardholderName, setCardholderName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');

  const handleCardNumberChange = (e) => {
    // Format: xxxx xxxx xxxx xxxx
    const val = e.target.value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = val.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || '';
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length > 0) {
      setCardNumber(parts.join(' '));
    } else {
      setCardNumber(val.substring(0, 19)); // fallback
    }
  };

  const handleExpiryChange = (e) => {
    // Format: MM/YY
    let val = e.target.value.replace(/[^0-9]/g, '');
    if (val.length > 2) {
      val = val.substring(0, 2) + '/' + val.substring(2, 4);
    }
    setExpiryDate(val.substring(0, 5));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    
    // Quick validation checks
    const cleanCard = cardNumber.replace(/\s/g, '');
    if (cleanCard.length !== 16) {
      alert('Please enter a valid 16-digit card number.');
      return;
    }
    if (expiryDate.length !== 5) {
      alert('Please enter expiration date in MM/YY format.');
      return;
    }
    if (cvv.length !== 3) {
      alert('Please enter a valid 3-digit CVV.');
      return;
    }

    onSubmit();
  };

  return (
    <div className="dialog-overlay" onClick={(e) => e.target.classList.contains('dialog-overlay') && onClose()}>
      <div className="modal-content glass-panel" style={{ width: 'min(480px, 95vw)' }}>
        <div className="modal-header">
          <h2 className="modal-title">Simulated Checkout</h2>
          <button type="button" className="close-modal-btn" onClick={onClose} aria-label="Close modal">×</button>
        </div>
        <div className="modal-body">
          <form className="checkout-form" onSubmit={handleFormSubmit}>
            <div className="checkout-summary">
              <span>Total Items ({itemsCount})</span>
              <span className="checkout-price">${total.toFixed(2)}</span>
            </div>
            
            <div className="form-group">
              <label htmlFor="card-name">Cardholder Name</label>
              <input 
                type="text" 
                id="card-name" 
                className="form-control" 
                placeholder="John Doe" 
                value={cardholderName} 
                onChange={(e) => setCardholderName(e.target.value)} 
                required 
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="card-number">Card Number</label>
              <input 
                type="text" 
                id="card-number" 
                className="form-control" 
                placeholder="1234 5678 1234 5678" 
                value={cardNumber} 
                onChange={handleCardNumberChange} 
                required 
              />
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="card-expiry">Expiry Date</label>
                <input 
                  type="text" 
                  id="card-expiry" 
                  className="form-control" 
                  placeholder="MM/YY" 
                  value={expiryDate} 
                  onChange={handleExpiryChange} 
                  required 
                />
              </div>
              <div className="form-group">
                <label htmlFor="card-cvv">CVV</label>
                <input 
                  type="password" 
                  id="card-cvv" 
                  className="form-control" 
                  placeholder="•••" 
                  value={cvv} 
                  onChange={(e) => setCvv(e.target.value.replace(/[^0-9]/g, '').substring(0, 3))} 
                  required 
                />
              </div>
            </div>

            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', lineHeight: '1.4' }}>
              🔒 <strong>Secure Simulated Checkout:</strong> This is a secure sandbox environment. No actual money will be charged, and transactions are simulated using your mock wallet balance.
            </div>

            <button type="submit" className="checkout-btn" style={{ marginTop: '1rem' }}>
              Complete Purchase
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
