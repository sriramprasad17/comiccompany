import React, { useState } from 'react';

export default function AppPaymentModal({ username, onSubmit }) {
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [cardName, setCardName] = useState('');

  const handleCardNumberChange = (e) => {
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
      setCardNumber(val.substring(0, 19));
    }
  };

  const handleExpiryChange = (e) => {
    let val = e.target.value.replace(/[^0-9]/g, '');
    if (val.length > 2) {
      val = val.substring(0, 2) + '/' + val.substring(2, 4);
    }
    setExpiry(val.substring(0, 5));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const cleanCard = cardNumber.replace(/\s/g, '');
    if (cleanCard.length !== 16) {
      alert('Please enter a valid 16-digit card number.');
      return;
    }
    if (expiry.length !== 5) {
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
    <div className="dialog-overlay">
      <div className="modal-content glass-panel paywall-modal-content">
        <div className="modal-header" style={{ borderBottom: '1px solid rgba(255, 51, 51, 0.15)' }}>
          <div>
            <span className="paywall-badge">Premium Membership</span>
            <h2 className="modal-title" style={{ fontSize: '1.5rem', fontWeight: '800' }}>Unlock Comic Company</h2>
          </div>
        </div>
        <div className="modal-body" style={{ gap: '1.25rem' }}>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: '1.5' }}>
            Welcome, <strong>{username}</strong>! To access our premium database of **Marvel, DC, Disney, Fantasy, and Horror** comics, activate your monthly subscription. All books are completely free to read once active!
          </p>

          <form className="checkout-form" onSubmit={handleFormSubmit}>
            <div className="checkout-summary" style={{ background: 'rgba(255, 51, 51, 0.05)', borderColor: 'rgba(255, 51, 51, 0.2)' }}>
              <span>Monthly Subscription Access</span>
              <span className="checkout-price" style={{ color: 'var(--color-primary)' }}>$9.99/mo</span>
            </div>
            
            <div className="form-group">
              <label htmlFor="sub-card-name">Cardholder Name</label>
              <input 
                type="text" 
                id="sub-card-name" 
                className="form-control" 
                placeholder="John Doe" 
                value={cardName}
                onChange={(e) => setCardName(e.target.value)}
                required 
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="sub-card-number">Card Number</label>
              <input 
                type="text" 
                id="sub-card-number" 
                className="form-control" 
                placeholder="xxxx xxxx xxxx xxxx" 
                value={cardNumber} 
                onChange={handleCardNumberChange} 
                required 
              />
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="sub-card-expiry">Expiry Date</label>
                <input 
                  type="text" 
                  id="sub-card-expiry" 
                  className="form-control" 
                  placeholder="MM/YY" 
                  value={expiry} 
                  onChange={handleExpiryChange} 
                  required 
                />
              </div>
              <div className="form-group">
                <label htmlFor="sub-card-cvv">CVV</label>
                <input 
                  type="password" 
                  id="sub-card-cvv" 
                  className="form-control" 
                  placeholder="•••" 
                  value={cvv} 
                  onChange={(e) => setCvv(e.target.value.replace(/[^0-9]/g, '').substring(0, 3))} 
                  required 
                />
              </div>
            </div>

            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', lineHeight: '1.4' }}>
              🔒 <strong>Sandbox Environment:</strong> This is a secure college project sandbox. Transactions are fully simulated. No real money will be charged.
            </div>

            <button type="submit" className="checkout-btn" style={{ marginTop: '1rem' }}>
              Activate Membership & Enter Hub
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
