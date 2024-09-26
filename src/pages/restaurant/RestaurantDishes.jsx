import styled from 'styled-components';
import Filters from '../../components/list/Filters';
import DishesList from '../../components/list/DishesList';
import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { appwriteService } from '../../appWrite/appwriteService';
import Error from '../../components/error/Error';
import { Add } from '@mui/icons-material';
import { useSelector } from 'react-redux';
import MenusSkeleton from '../../components/skeletons/MenusSkeleton';
const Container = styled.div``;
const BannerContainer = styled.div`
  position: relative;
  padding: 0.5rem;
`;

const Image = styled.img`
  max-height: 300px;
  width: 100%;
  object-fit: cover;
  border-radius: 0.5rem;
  /* opacity: 0.7; */
`;
const TitleContainer = styled.div`
  position: absolute;
  bottom: 1rem;
  left: 1rem;
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  z-index: 100;
  color: ${props => props.theme.color_golden_white};
`;
const Title = styled.h3`
  text-transform: capitalize;
  font-size: 2.5rem;
`;
const Location = styled.p`
  font-size: 1.2rem;
`;
const OwnerControl = styled.p`
  font-size: 1.2rem;
  position: absolute;
  top: 10px;
  right: 10px;
  /* flex-wrap: wrap; */
  /* max-width: 150px; */
  padding: 0.5rem;
  display: flex;
  gap: 0.5rem;
  z-index: 100;
  background-color: #cab054bc;
  border-radius: 0.5rem;
  cursor: pointer;
  color: white;
`;
const RestaurantDishes = () => {
  const [restaurant, setRestaurant] = useState(null);
  const params = useParams();
  const navigate = useNavigate();
  const { currentUser: user } = useSelector(state => state.user);
  const [owner, setOwner] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const getRestaurant = useCallback(async () => {
    try {
      setLoading(true);
      const data = await appwriteService.getRestaurant(params?.id);
      setOwner(user?.$id === data?.owner?.$id);
      setRestaurant(data);
    } catch (error) {
      const mes = error?.message || 'Something went wrong';
      setError(mes);
    } finally {
      setLoading(false);
    }
  }, [params, user]);

  useEffect(() => {
    getRestaurant();
  }, [getRestaurant]);
  if (loading)
    return (
      <Container>
        <MenusSkeleton />
      </Container>
    );
  if (error)
    return (
      <Container>
        <Error messege={error} />
      </Container>
    );
  return (
    <Container>
      <BannerContainer>
        <Image src={restaurant?.image} />
        <TitleContainer>
          <Title> {restaurant?.name} </Title>
          <Location>{restaurant?.short_desc} </Location>
          <Location>{restaurant?.street} </Location>
        </TitleContainer>
        {owner && (
          <OwnerControl onClick={() => navigate('/new')}>
            <Add /> add more dishes
          </OwnerControl>
        )}
      </BannerContainer>
      <Filters />
      <DishesList
        owner={owner}
        dishes={restaurant?.products}
      />
    </Container>
  );
};

export default RestaurantDishes;
