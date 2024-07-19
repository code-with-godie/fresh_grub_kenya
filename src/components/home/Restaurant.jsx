import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { appwriteService } from '../../appWrite/appwriteService';
const Wrapper = styled.section`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  overflow: auto;
`;
const Title = styled.h2`
  text-align: center;
  text-transform: capitalize;
  color: var(--color-golden);
  font-size: 2rem;
`;
const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 3rem 0.5rem;
  align-content: flex-start;
  flex: 1;
  overflow: auto;
  height: 100%;
`;
const Item = styled.div`
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.3rem;
  position: relative;
  cursor: pointer;
`;
const Image = styled.img`
  width: 150px;
  height: 150px;
  object-fit: cover;
  @media screen and (max-width: 768px) {
    width: 100%;
    height: auto;
  }
`;
const Name = styled.p`
  padding: 0.5rem 1rem;
  width: 150px;
  border-radius: 0.5rem;
  text-align: center;
  text-transform: capitalize;
  background-color: var(--color-golden);
  position: absolute;
  bottom: -10px;
  z-index: 10px;
  @media screen and (max-width: 768px) {
    width: 100%;
  }
`;
const Restaurant = () => {
  const navigate = useNavigate();
  const [restaurant, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setErro] = useState(null);
  const getRestaurants = async () => {
    try {
      setLoading(true);
      const data = await appwriteService.getTopRestaurant();
      setRestaurants(data);
    } catch (error) {
      const mes = error?.message || 'Something wennt wrong';
      setErro(mes);
    } finally {
      setLoading(false);
    }
  };
  const goto = id => {
    navigate(`/restaurant/${id}`);
  };
  useEffect(() => {
    getRestaurants();
  }, []);
  if (loading) return <p>loading</p>;
  if (error) return <p> {error} </p>;
  return (
    <Wrapper>
      <Title>top restaurants</Title>
      <Container>
        {restaurant.map(item => (
          <Item
            key={item.$id}
            onClick={() => goto(item.$id)}
          >
            <Image src={item?.image} />
            <Name> {item.name} </Name>
          </Item>
        ))}
      </Container>
    </Wrapper>
  );
};

export default Restaurant;
