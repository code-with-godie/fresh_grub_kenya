import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Rating } from '@mui/material';
import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { decrease, increase } from '../../context/cartSlice';
import { appwriteService } from '../../appWrite/appwriteService';
import CartModel from './CartModel';
import Model from '../../components/models/Model';
import Error from '../../components/error/Error';
import { openLoginModel } from '../../context/appSlice';
import SinglePostSkelton from '../../components/skeletons/SinglePostSkeleton';
const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem;
  @media screen and (min-width: 768px) {
    height: 100%;
    overflow: auto;
  }
`;
const Container = styled.div`
  display: flex;
  width: 100%;
  max-width: 900px;
  gap: 1rem;
  flex-direction: column;
  @media screen and (min-width: 768px) {
    overflow: auto;
    height: 80vh;
    flex-direction: row;
  }
`;
const ImageContainer = styled.div`
  flex: 1;
  display: flex;
  background-color: ${props => (props.dark ? `#0e0d0d` : `#f3f2f2`)};
  @media screen and (min-width: 768px) {
    position: sticky;
    top: 0;
  }
`;
const Image = styled.img`
  max-width: 100%;
  height: auto;
  object-fit: contain;
`;
const DescriptionContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 0.5rem;
`;

const Title = styled.h3`
  color: var(--color-golden);
`;
const Price = styled.h1`
  color: ${props => props.theme.color_golden};
  font-weight: 500;
  font-size: 3rem;
`;
const Description = styled.p`
  color: ${props => props.theme.color_golden};
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
  font-size: 1.3rem;
  font-weight: bold;
  text-transform: capitalize;
  cursor: pointer;
  .cart {
    font-size: 2rem;
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
const Control = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
  padding: 0.5rem;
`;
const QualityWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex: 1;
  .arrow {
    /* font-size: 1.5rem; */
    cursor: pointer;
  }
`;
const IngredientContainer = styled.ul`
  padding: 0.5rem;
  padding-left: 1rem;
  color: ${props => props.theme.color_golden};
  list-style-type: lower-roman;
`;
const Ingredient = styled.li``;
const SizeContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-wrap: wrap;
`;
const Size = styled.p`
  padding: 0.5rem;
  flex-shrink: 0;
  color: ${props => props.theme.color_golden};
  border: 1px solid ${props => props.theme.color_golden};
  border-radius: 0.5rem;
  &.selected {
    color: white;
    background-color: var(--color_golden);
  }
`;
const ButtonContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
  flex: 1;
`;
const SingleProduct = () => {
  const cart = useSelector(state => state.cart);
  const { darkMode } = useSelector(state => state.app);
  const { currentUser: user } = useSelector(state => state.user);
  const navigate = useNavigate();
  const [showModel, setShowModel] = useState(false);
  const [product, setProduct] = useState({});
  const [productCart, setProductCart] = useState({});
  const [inCart, setIncart] = useState(
    cart?.cartItems?.some(item => item.$id === product?.$id)
  );
  const dispatch = useDispatch();
  const increaseItem = id => {
    dispatch(increase(id));
  };
  const decreaseItem = id => {
    dispatch(decrease(id));
  };
  const handleModel = () => {
    if (user) {
      setShowModel(true);
    } else {
      dispatch(openLoginModel());
    }
  };
  const params = useParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const getRestaurant = useCallback(async () => {
    try {
      setLoading(true);
      const data = await appwriteService.getSingleProduct(params?.id);
      setProduct(data);
    } catch (error) {
      const mes = error?.message || 'Something went wrong';
      setError(mes);
    } finally {
      setLoading(false);
    }
  }, [params]);

  useEffect(() => {
    getRestaurant();
  }, [getRestaurant]);
  useEffect(() => {
    setIncart(cart?.cartItems?.some(item => item.$id === product?.$id));
    setProductCart(cart?.cartItems?.find(item => item.$id === product?.$id));
  }, [cart, product]);

  if (loading)
    return (
      <Wrapper>
        <SinglePostSkelton />
      </Wrapper>
    );
  if (error)
    return (
      <Wrapper>
        <Error messege={error} />
      </Wrapper>
    );
  return (
    <Wrapper>
      <Container>
        <ImageContainer dark={darkMode}>
          <Image src={product?.image} />
        </ImageContainer>
        <DescriptionContainer>
          <Title> {product?.name} </Title>
          <Price>Price Kshs: {product?.price} </Price>
          <Link
            style={{ textDecoration: 'none' }}
            to={`/restaurant/${product?.restaurant?.$id}`}
          >
            <Description> {product?.restaurant?.name} </Description>
          </Link>
          <Rating
            readOnly
            value={product?.rating}
          />
          {product?.description && (
            <Description> {product?.description} </Description>
          )}
          {product?.company && (
            <>
              <Title>company</Title>
              <Description> {product?.company} </Description>
            </>
          )}
          {product?.size?.length > 0 && (
            <SizeContainer>
              {product?.size?.map((size, index) => (
                <Size key={index}> {size} </Size>
              ))}
            </SizeContainer>
          )}
          <Control>
            {inCart ? (
              <>
                <QualityWrapper>
                  <Quantity onClick={() => increaseItem(product.$id)}>
                    <KeyboardArrowUp className='arrow' />
                  </Quantity>
                  <Quantity className='amount'>
                    {' '}
                    {productCart?.amount}{' '}
                  </Quantity>

                  <Quantity
                    disabled={productCart?.amount <= 1}
                    onClick={() => decreaseItem(product.$id)}
                  >
                    <KeyboardArrowDown className='arrow' />
                  </Quantity>
                </QualityWrapper>
                <Button onClick={() => navigate('/cart')}> see In Cart</Button>
              </>
            ) : (
              <ButtonContainer>
                <Button
                  onClick={handleModel}
                  className='order'
                >
                  order now
                </Button>
                <Button onClick={handleModel}>add to cart</Button>
              </ButtonContainer>
            )}
          </Control>
          {product?.ingredients?.length > 0 && (
            <>
              <Title>Ingredients</Title>
              <IngredientContainer>
                {product?.ingredients?.map((item, index) => (
                  <Ingredient key={index}> {item} </Ingredient>
                ))}
              </IngredientContainer>
            </>
          )}
          {product?.instructions?.length > 0 && (
            <>
              <Title>Preparation nstructions</Title>
              <IngredientContainer>
                {product?.instructions?.map((item, index) => (
                  <Ingredient key={index}> {item} </Ingredient>
                ))}
              </IngredientContainer>
            </>
          )}
        </DescriptionContainer>
      </Container>
      {showModel && (
        <Model
          bg=' #09090913'
          center
        >
          <CartModel
            setShowModel={setShowModel}
            productCart={productCart}
            inCart={inCart}
            {...product}
          />
        </Model>
      )}
    </Wrapper>
  );
};

export default SingleProduct;
