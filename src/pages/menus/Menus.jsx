import styled from 'styled-components';
import DishesList from '../../components/list/DishesList';
import Filters from '../../components/list/Filters';
import Slider from '../../components/slider/Slider';
import { useEffect, useState } from 'react';
import { appwriteService } from '../../appWrite/appwriteService';
const Container = styled.div`
  display: flex;
  min-height: 70vh;
  overflow: auto;
  gap: 0.5rem;
  flex-direction: column;
`;
const Left = styled.div``;
const Right = styled.div`
  /* @media screen and (min-width: 768px) {
    flex: 3;
  } */
`;
const Menus = () => {
  const [restaurant, setRestaurants] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setErro] = useState(null);
  const getRestaurants = async () => {
    try {
      setLoading(true);
      const data = await appwriteService.getAllMenus();
      setRestaurants(data[0]);
      setProducts(data[1]);
    } catch (error) {
      const mes = error?.message || 'Something wennt wrong';
      setErro(mes);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getRestaurants();
  }, []);
  if (loading) return <p>loading</p>;
  if (error) return <p> {error} </p>;
  return (
    <Container>
      <Slider restaurant={restaurant} />
      <Left>
        <Filters row />
      </Left>
      <Right>
        <DishesList dishes={products} />
      </Right>
    </Container>
  );
};

export default Menus;
