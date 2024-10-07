import styled from 'styled-components';

const StyledButton = styled.button`
 background-color: #6366f1; 
      border: none;
      border-radius: 8px; 
      padding: 10px 15px; 
      cursor: pointer;
      font-size: 16px;
      color: white;
      transition: background-color 0.3s, box-shadow 0.3s; 
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); 
  
      &:hover {
        background-color: #4f46e5;
        box-shadow: 0 6px 8px rgba(0, 0, 0, 0.2); 
      }
  
      &:active {
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        transform: translateY(2px); 
`;

const Checkout = () => {
  const handleCheckout = () => {
  
  };

  return (
    <div className="checkout">
      <StyledButton onClick={handleCheckout}>
        Checkout
      </StyledButton>
    </div>
  );
};

export default Checkout;
