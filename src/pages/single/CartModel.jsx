import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import {
  Add,
  Close,
  Done,
  KeyboardArrowDown,
  KeyboardArrowUp,
} from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { addToCart, decrease, increase } from '../../context/cartSlice';
import { openLoginModel } from '../../context/appSlice';
const Container = styled(motion.div)`
  background: ${props => (props.dark ? `#181818` : 'white')};
  box-shadow: ${props => !props.dark && `0px 0px 5px 3px #dad7d7`};
  color: ${props => props.theme.color_golden};
  width: 100%;
  max-width: 700px;
  overflow: auto;
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  overflow: auto;
  @media screen and (min-width: 768px) {
    max-height: 70vh;
  }
`;
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  @media screen and (min-width: 768px) {
    flex-direction: row;
  }
  overflow: auto;
`;
const Left = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  @media screen and (min-width: 768px) {
    overflow: auto;
  }
`;
const Right = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 0.5rem;
  @media screen and (min-width: 768px) {
    overflow: auto;
  }
`;
const ItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  .icon {
    background-color: var(--color-golden);
    padding: 0.5rem;
    border-radius: 50%;
    font-size: 2rem;
    color: white;
    cursor: pointer;
  }
`;
const Item = styled.div`
  padding: 0.5rem;
  border: 1px solid gray;
  color: gray;
  border-radius: 0.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  &.selected {
    color: var(--color-golden);
    border: 1px solid var(--color-golden);
  }
`;
const Title = styled.h3``;
const Description = styled.p`
  .required {
    background-color: var(--color-golden);
    color: white;
    padding: 0.2rem;
    border-radius: 0.3rem;
    font-size: 0.8rem;
  }
`;
const Label = styled.p`
  text-transform: capitalize;
`;
const StrongLabel = styled.h3`
  font-size: 1.5rem;
`;
const CloseBtn = styled.div`
  display: flex;
  justify-content: flex-end;
`;
const ImageContainer = styled.div`
  display: grid;
  place-content: center;
`;
const Image = styled.img`
  width: 100%;
  height: auto;
  border-radius: 0.5rem;
  object-fit: cover;
  max-height: 170px;
`;

const DescriptionContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;
const Name = styled.h4``;
const ButtonContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
  flex: 1;
  padding-bottom: 1rem;
`;
const QualityWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex: 1;
  .arrow {
    cursor: pointer;
  }
`;
const Button = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  outline: none;
  border: none;
  background: transparent;
  padding: 0.5rem 1rem;
  color: ${props => props.theme.color_golden};
  border: 1px solid var(--color-golden);
  justify-content: center;
  border-radius: 0.5rem;
  flex: 1;
  font-size: 1.1rem;
  font-weight: bold;
  text-transform: capitalize;
  cursor: pointer;
  .cart {
    font-size: 1.5rem;
  }
  &:disabled {
    cursor: not-allowed;
    background-color: #9f9898;
  }
  &.order {
    background-color: var(--color-golden);
    color: white;
  }
`;
const Quantity = styled.button`
  padding: 0.3rem;
  border: 1px solid var(--color-golden);
  outline: none;
  color: ${props => props.theme.color_golden};
  font-size: 1rem;
  height: 50px;
  border-radius: 0.5rem;
  flex: 1;
  cursor: pointer;
  background-color: transparent;
  display: grid;
  place-content: center;
  :disabled {
    background-color: #8080809b;
    cursor: not-allowed;
  }
  :focus:not(.amount) {
    background-color: var(--color-golden);
    color: white;
  }
`;
const variants = {
  hidden: { opacity: 0, scale: 0, transition: { duration: 0.5 } },
  visible: {
    opacity: 1,
    scale: 1,
    rotate: 360,
    transition: { duration: 0.5 },
  },
};

const CartModel = ({
  showModel,
  setShowModel,
  image,
  size: productSizes,
  price,
  description,
  productCart,
  inCart,
  $id,
  title,
}) => {
  const { darkMode } = useSelector(state => state.app);
  const { currentUser: user } = useSelector(state => state.user);
  const dispatch = useDispatch();
  const [size, setSize] = useState([]);
  const [flavour, setFlavour] = useState(null);
  const flavours = ['regular', 'spicy'];
  const sodas = [
    'coke',
    'sprite',
    'fanta orange',
    'fanta passion',
    'fanta black current',
  ];
  const [soda, setSoda] = useState([]);
  const increaseItem = id => {
    dispatch(increase(id));
  };
  const decreaseItem = id => {
    dispatch(decrease(id));
  };
  const orderNow = () => {};
  const addCartItem = () => {
    if (user) {
      dispatch(
        addToCart({
          $id,
          price,
          amount: 1,
          name: title,
          image,
          soda,
          flavour,
          size,
        })
      );
      setShowModel(false);
    } else {
      dispatch(openLoginModel());
    }
  };
  return (
    <Container
      dark={darkMode}
      // variants={variants}
      // initial='hidden'
      // animate={showModel ? 'visible' : 'hidden'}
    >
      <CloseBtn>
        <IconButton onClick={() => setShowModel(false)}>
          <Close style={{ color: 'var(--color-golden)' }} />
        </IconButton>
      </CloseBtn>
      <Wrapper>
        <Left>
          <ItemWrapper>
            <Title>Choose your flavour</Title>
            <Description>
              Choose one . <span className='required'>required</span>
            </Description>
            {flavours.map((item, index) => (
              <Item
                className={flavour === item && 'selected'}
                key={index}
                dark={darkMode}
                onClick={() => setFlavour(item)}
              >
                <Label> {item} </Label>{' '}
                {flavour === item ? (
                  <Done className='icon' />
                ) : (
                  <Add className='icon' />
                )}
              </Item>
            ))}
          </ItemWrapper>
          {productSizes?.length > 0 && (
            <ItemWrapper>
              <Title>Choose prefered size</Title>
              <Description>
                Choose size(s) . <span className='required'>required</span>
              </Description>
              {productSizes?.map((item, index) => (
                <Item
                  className={size === item && 'selected'}
                  key={index}
                  dark={darkMode}
                  onClick={() => setSize(prev => [...prev, item])}
                >
                  <Label> {item} </Label>{' '}
                  {size.includes(item) ? (
                    <Done className='icon' />
                  ) : (
                    <Add className='icon' />
                  )}
                </Item>
              ))}
            </ItemWrapper>
          )}
          <ItemWrapper>
            <Title>Choose a soda flavour</Title>
            {sodas.map((item, index) => (
              <Item
                className={soda === item && 'selected'}
                key={index}
                dark={darkMode}
                onClick={() => setSoda(prev => [...prev, item])}
              >
                <Label> {item} </Label>{' '}
                {soda.includes(item) ? (
                  <Done className='icon' />
                ) : (
                  <Add className='icon' />
                )}
              </Item>
            ))}
          </ItemWrapper>
        </Left>
        <Right>
          <ImageContainer>
            <Image src={image} />
          </ImageContainer>
          <Name> {title} </Name>
          <DescriptionContainer>
            <StrongLabel>Price Kshs: </StrongLabel>
            <StrongLabel> {price} </StrongLabel>
          </DescriptionContainer>
          <DescriptionContainer>
            <Description>
              {' '}
              {description?.length > 100
                ? `${description.substring(0, 100)}...`
                : description}{' '}
            </Description>
          </DescriptionContainer>

          {inCart ? (
            <>
              <QualityWrapper>
                <Quantity onClick={() => increaseItem($id)}>
                  <KeyboardArrowUp className='arrow' />
                </Quantity>
                <Quantity className='amount'> {productCart?.amount} </Quantity>

                <Quantity
                  disabled={productCart?.amount <= 1}
                  onClick={() => decreaseItem($id)}
                >
                  <KeyboardArrowDown className='arrow' />
                </Quantity>
              </QualityWrapper>
            </>
          ) : (
            <ButtonContainer>
              <Button
                disabled={!soda || !flavour || !size}
                onClick={orderNow}
                className='order'
              >
                order now
              </Button>
              <Button
                disabled={!flavour || (productSizes.length > 0 && !size)}
                onClick={addCartItem}
              >
                add to cart
              </Button>
            </ButtonContainer>
          )}
        </Right>
      </Wrapper>
    </Container>
  );
};

export default CartModel;
