import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { appwriteService } from '../../appWrite/appwriteService';
const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;
const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  grid-auto-rows: 250px;
  gap: 2rem 1rem;
  flex: 1;
  @media screen and (max-width: 600px) {
    grid-auto-rows: 200px;
  }
`;
const Item = styled.div`
  position: relative;
  cursor: pointer;
  display: flex;
`;
const Right = styled.div`
  flex: 1;
  background: #0000008c url(${props => props.bg}) no-repeat center;
  background-size: cover;
  background-blend-mode: darken;
  @media screen and (min-width: 768px) {
    border-radius: 0.5rem;
  }
`;
const Left = styled.div`
  flex: 1;
  position: absolute;
  bottom: 0;
  z-index: 100;
  color: var(--color-golden);
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
`;
const Title = styled.h2`
  text-align: center;
  text-transform: capitalize;
  color: var(--color-golden);
  font-size: 2rem;
`;
const Description = styled.p`
  @media screen and (min-width: 768px) {
    font-size: 1.5rem;
  }
`;
const ShopNow = styled.button`
  border: 1px solid var(--color-golden);
  padding: 0.5rem 1rem;
  background-color: var(--color-golden);
  outline: none;
  cursor: pointer;
  border-radius: 0.5rem;
  font-size: 1rem;
  text-transform: capitalize;
  color: white;
  @media screen and (min-width: 768px) {
    font-size: 1.5rem;
    padding: 1rem 3rem;
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
            <Right bg={item?.image} />
            {/* <Image src={item?.image} /> */}
            <Left>
              <Title> {item?.name} </Title>
              <Description> {item?.short_desc} </Description>
              <ShopNow onClick={() => navigate(`/restaurant/${item?.$id}`)}>
                {' '}
                explore and order
              </ShopNow>
            </Left>
          </Item>
        ))}
      </Container>
    </Wrapper>
  );
};

export default Restaurant;
