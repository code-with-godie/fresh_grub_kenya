import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { IconButton } from '@mui/material';
import { Favorite, FavoriteBorder, Star } from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { authService } from '../../appWrite/auth';
import { openLoginModel } from '../../context/appSlice';
import { updateUser } from '../../context/userSlice';

const Container = styled.div`
  display: flex;
  background: ${props => props.dark && `#181818`};
  box-shadow: ${props => !props.dark && `0px 0px 5px 3px #dad7d7`};
  padding: 0.3rem;
`;
const Left = styled.div``;
const Right = styled.div`
  flex: 1;
`;
const Image = styled.img`
  width: 150px;
  height: 130px;
  border-radius: 1rem;
  object-fit: cover;
`;
const Top = styled.div`
  padding: 0.5rem;
  .btn {
    padding: 0.1rem;
    color: var(--color-golden);
  }
`;
const Bottom = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem;
  .link {
    text-decoration: none;
    background: var(--color-golden);
    color: ${props => props.theme.color_primary};
    padding: 0.5rem;
    border-radius: 1rem;
  }
`;
const TitleContainer = styled.div`
  display: flex;
  align-items: center;
`;
const Title = styled.h4`
  flex: 1;
  font-weight: 400;
`;
const DescriptionContainer = styled.div``;
const Description = styled.p``;
const StarWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--color-golden);
`;
const Price = styled.h4`
  color: var(--color-golden);
  font-size: 1.2rem;
`;
const Dish = ({ title, image, description, price, rating, $id }) => {
  const { darkMode } = useSelector(state => state.app);
  const { currentUser } = useSelector(state => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [liked, setLiked] = useState(false);
  const addToFavourite = async e => {
    e.stopPropagation();
    if (!currentUser) {
      dispatch(openLoginModel());
      return;
    }
    const newUser = await authService.addToFavourite(currentUser?.email, $id);
    const {
      favourites,
      avatar,
      username,
      isAdmin,
      $id: newID,
      restaurants,
      email,
    } = newUser;
    dispatch(
      updateUser({
        favourites,
        avatar,
        username,
        isAdmin,
        $id: newID,
        restaurants,
        email,
      })
    );
  };
  useEffect(() => {
    if (currentUser) {
      setLiked(currentUser?.favourites?.includes($id));
    }
  }, [currentUser, $id]);
  return (
    <Container
      onClick={() => navigate(`/dish/${$id}`)}
      dark={darkMode}
    >
      <Left>
        <Image src={image} />
      </Left>
      <Right>
        <Top>
          <TitleContainer>
            <Title> {title} </Title>
            <IconButton
              className='btn'
              onClick={addToFavourite}
            >
              {liked ? <Favorite /> : <FavoriteBorder />}
            </IconButton>
          </TitleContainer>
          <DescriptionContainer>
            <Price>Price (Kshs) : {price} </Price>
          </DescriptionContainer>
          <DescriptionContainer>
            <Description>
              {' '}
              {description?.length > 30
                ? `${description?.substring(0, 30)}...`
                : description}{' '}
            </Description>
          </DescriptionContainer>
        </Top>
        <Bottom>
          <StarWrapper>
            <Star />
            <Description> {rating} </Description>
          </StarWrapper>
          <Link className='link'>see more</Link>
        </Bottom>
      </Right>
    </Container>
  );
};

export default Dish;
