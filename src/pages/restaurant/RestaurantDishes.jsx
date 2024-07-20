import styled from 'styled-components';
import Filters from '../../components/list/Filters';
import DishesList from '../../components/list/DishesList';
import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { appwriteService } from '../../appWrite/appwriteService';
import LoadingAnimation from '../../components/loading/LoadingAnimation';
import Error from '../../components/error/Error';
const Container = styled.div``;
const BannerContainer = styled.div`
  position: relative;
`;

const Image = styled.img`
  max-height: 300px;
  width: 100%;
  object-fit: cover;
  /* opacity: 0.7; */
`;
const TitleContainer = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
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
const RestaurantDishes = () => {
  const [restaurant, setRestaurant] = useState(null);
  const params = useParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const getRestaurant = useCallback(async () => {
    try {
      setLoading(true);
      const data = await appwriteService.getRestaurant(params?.id);
      setRestaurant(data);
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
  if (loading)
    return (
      <Container>
        <LoadingAnimation />
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
      </BannerContainer>
      <Filters />
      <DishesList dishes={restaurant?.products} />
    </Container>
  );
};

export default RestaurantDishes;
