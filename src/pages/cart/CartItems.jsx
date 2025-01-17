import React from 'react';
import styled from 'styled-components';
import DeleteIcon from '@mui/icons-material/Delete';
import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { increase, decrease, removeCartItem } from '../../context/cartSlice';
const Container = styled.div`
  flex: 2;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  .btn:disabled {
    cursor: not-allowed;
  }
`;

const Item = styled.div`
  background: ${props => props.dark && `#181818`};
  box-shadow: ${props => !props.dark && `0px 0px 5px 3px #dad7d7`};
  color: ${props => props.theme.color_golden};
  display: flex;
  flex-direction: column;
  transition: all 300ms ease-in-out;
  :hover {
    transform: scale(1.03);
  }
  @media screen and (min-width: 768px) {
    flex-direction: row;
  }
`;

const Image = styled.img`
  max-width: 100%;
  height: 100%;
  object-fit: contain;
`;
const ImageContainer = styled.div`
  flex: 1;
`;
const DescriptionContainer = styled.div`
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  flex: 1;
`;
const DescriptionWrapper = styled.div`
  display: flex;
  gap: 0.2rem;
  flex: 1;
  align-items: center;
`;
const ButtonWrapper = styled(DescriptionWrapper)`
  justify-content: space-between;
  /* padding-top: 1rem; */
`;
const Label = styled.h3`
  text-transform: capitalize;
`;
const SmallLable = styled.p`
  text-transform: capitalize;
  font-size: 0.9rem;
  font-weight: bold;
`;
const SmallLableDescription = styled.p`
  text-transform: capitalize;
  font-size: 0.9rem;
`;
const Title = styled.h2`
  text-transform: capitalize;
`;
const Price = styled.h3``;
const QualityWrapper = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  gap: 0.5rem;
  .arrow {
    font-size: 1.5rem;
    cursor: pointer;
  }
`;
const Quantity = styled.button`
  padding: 0.3rem;
  border: 1px solid var(--color-golden);
  outline: none;
  color: inherit;
  font-size: 1rem;
  cursor: pointer;
  height: 40px;
  flex: 1;
  background-color: transparent;
  border-radius: 0.5rem;
  :disabled {
    background-color: #8080809b;
    cursor: not-allowed;
  }
  :focus:not(.amount) {
    background-color: var(--color-golden);
    color: white;
  }
`;
const Remove = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  outline: none;
  border: 1px solid var(--color-golden);
  padding: 0.5rem 1rem;
  color: var(--color-golden);
  background-color: transparent;
  border-radius: 0.5rem;
  font-size: 1rem;
  text-transform: capitalize;
  cursor: pointer;
`;
const CartItems = () => {
  const cart = useSelector(state => state.cart.cartItems);
  const { darkMode } = useSelector(state => state.app);
  const dispatch = useDispatch();
  const increaseItem = id => {
    dispatch(increase(id));
  };
  const decreaseItem = id => {
    dispatch(decrease(id));
  };
  const deleteItem = id => {
    dispatch(removeCartItem(id));
  };

  return (
    <Container>
      {cart.map(item => (
        <Item
          dark={darkMode}
          key={item.$id}
        >
          <ImageContainer>
            <Image src={item.image} />
          </ImageContainer>
          <DescriptionContainer>
            <Title> {item.name} </Title>
            <DescriptionWrapper>
              <Label>price:</Label>
              <Price>Kshs. {item.price} </Price>
            </DescriptionWrapper>
            <DescriptionWrapper>
              <SmallLable>Flavour:</SmallLable>
              <SmallLableDescription>{item?.flavour} </SmallLableDescription>
            </DescriptionWrapper>
            <DescriptionWrapper>
              <SmallLable>Soda:</SmallLable>

              <SmallLableDescription>
                {item?.soda?.join(' , ')}
              </SmallLableDescription>
            </DescriptionWrapper>
            <DescriptionWrapper>
              <SmallLable>Size(s):</SmallLable>

              <SmallLableDescription>
                {item?.size?.join(' , ')}
              </SmallLableDescription>
            </DescriptionWrapper>
            <ButtonWrapper>
              <DescriptionWrapper>
                <QualityWrapper>
                  <Quantity onClick={() => increaseItem(item.$id)}>
                    <KeyboardArrowUp className='arrow' />
                  </Quantity>
                  <Quantity className='amount'> {item?.amount} </Quantity>
                  <Quantity
                    disabled={item?.amount <= 1}
                    onClick={() => decreaseItem(item.$id)}
                  >
                    <KeyboardArrowDown className='arrow' />
                  </Quantity>
                </QualityWrapper>
              </DescriptionWrapper>
              <Remove onClick={() => deleteItem(item?.$id)}>
                {' '}
                <DeleteIcon /> delete
              </Remove>
            </ButtonWrapper>
          </DescriptionContainer>
        </Item>
      ))}
    </Container>
  );
};

export default CartItems;
