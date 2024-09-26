import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { appwriteService } from '../../appWrite/appwriteService';
import DishesList from '../list/DishesList';
import Error from '../error/Error';
import BestSellingSkeleton from '../skeletons/BestSellingSkeleton';
const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  overflow: auto;
`;
const Title = styled.h2`
  text-align: center;
  text-transform: capitalize;
  color: var(--color-golden);
  font-size: 2rem;
`;
const TopDishes = () => {
  // const navigate = useNavigate();
  const [dishes, setDishes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setErro] = useState(null);
  const getRestaurants = async () => {
    try {
      setLoading(true);
      const data = await appwriteService.getBestSellingDishes();
      setDishes(data);
    } catch (error) {
      const mes = error?.message || 'Something wennt wrong';
      setErro(mes);
    } finally {
      setLoading(false);
    }
  };
  // const goto = id => {
  //   navigate(`/restaurant/${id}`);
  // };
  useEffect(() => {
    getRestaurants();
  }, []);
  if (loading)
    return (
      <Wrapper>
        <BestSellingSkeleton />
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
      <Title>best selling dishes</Title>
      <DishesList
        small
        dishes={dishes}
      />
    </Wrapper>
  );
};

export default TopDishes;
