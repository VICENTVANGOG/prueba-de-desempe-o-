import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/redux/store';
import { FaShoppingCart } from 'react-icons/fa';
import { removeItem } from '@/redux/cartSlice'; 
import { CartItem } from '@/redux/interfaces/CartItem'; 
import './Cart.scss';

const Cart: React.FC = () => {
  const items = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [message, setMessage] = useState(''); 

  const toggleModal = () => {
    setIsModalOpen(prev => !prev);
    setMessage(''); 
  };

  const totalPrice = items.reduce((total, item: CartItem) => total + (item.price * item.quantity), 0);

  const handleRemoveItem = (id: number) => {
    dispatch(removeItem(id)); 
  };

  const handleCheckout = async () => {
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ products: items }),
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message || 'Error en el checkout');
      } else {
        setMessage(data.message || 'Checkout exitoso');
      }
    } catch (error) {
      console.error('Error en el checkout:', error);
      setMessage('Error en el checkout, por favor intenta de nuevo.');
    }
  };

  return (
    <>
      <div className="cart" onClick={toggleModal}>
        <FaShoppingCart size={30} />
        {items.length > 0 && <span>{items.length}</span>}
      </div>

      <div className={`modal ${isModalOpen ? 'open' : ''}`}>
        <span className="close-button" onClick={toggleModal}>✖</span>
        <h2>Your Cart</h2>
        <div className="cart-items">
          {items.length > 0 ? (
            items.map((item: CartItem) => (
              <div key={item.id} className="cart-item">
                <img src={item.image} alt={item.title} />
                <div>
                  <p>{item.title}</p>
                  <p>Quantity: {item.quantity}</p>
                </div>
                <div className="delete">
                  <button onClick={() => handleRemoveItem(item.id)}>Remove</button>
                </div>
              </div>
            ))
          ) : (
            <p>Your cart is empty</p>
          )}
        </div>
        <div className="total">Total: ${totalPrice.toFixed(2)}</div>
        <button className="checkout-button" onClick={handleCheckout}>Checkout</button>
        {message && <p className="checkout-message">{message}</p>} 
      </div>
    </>
  );
};

export default Cart;
