import React from 'react';
import styled from 'styled-components';
import CartItems from './CartItems';
import CartTotal from './CartTotal';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ShoppingCart } from '@mui/icons-material';
const Wrapper = styled.div`
  min-height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 0.5rem;
  padding: 0.5rem;
`;
const Container = styled.div`
  height: auto;
  width: 100%;
  max-width: 900px;
  display: flex;
  gap: 1rem;
  flex-direction: column;
  @media screen and (min-width: 768px) {
    flex-direction: row;
    align-items: flex-start;
  }
`;
const ImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .btn {
    font-size: 7rem;
    color: var(--color-golden);
  }
`;
const Label = styled.p`
  padding: 0.5rem 1rem;
  color: var(--color-golden);
  border: 1px solid var(--color-golden);
  border-radius: 1rem;
  text-transform: capitalize;
  cursor: pointer;
`;
const Title = styled.h4`
  color: var(--color-golden);
  font-size: 1.3rem;
  font-weight: 500;
`;
const Description = styled.p`
  color: ${props => props.theme.color_primary};
`;
const Cart = () => {
  const cart = useSelector(state => state.cart.cartItems);
  const navigate = useNavigate();
  if (cart.length === 0) {
    return (
      <Wrapper>
        <ImageContainer>
          <ShoppingCart className='btn' />
        </ImageContainer>
        <Title>your shopping cart is empty</Title>
        <Description>
          lookes like you have not added anything to your cart.Go ahead and
          explore top menus
        </Description>
        <Label onClick={() => navigate('/menus')}>Explore menus</Label>
      </Wrapper>
    );
  }
  return (
    <Wrapper>
      <Container>
        <CartItems />
        <CartTotal />
      </Container>
    </Wrapper>
  );
};

export default Cart;
