import styled from 'styled-components';
import DishesList from '../../components/list/DishesList';
import Filters from '../../components/list/Filters';
import Slider from '../../components/slider/Slider';
import { useEffect, useState } from 'react';
import { appwriteService } from '../../appWrite/appwriteService';
import MenusSKeleton from '../../components/skeletons/MenusSkeleton';
import Error from '../../components/error/Error';
import { useCallback } from 'react';
import BestSellingSkeleton from '../../components/skeletons/BestSellingSkeleton';
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
  const [filters, setFilters] = useState([]);
  const [query, setQuery] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searching, setSearching] = useState(false);
  const [error, setErro] = useState(null);
  const filterProducts = useCallback(async () => {
    try {
      setSearching(true);
      const products = await appwriteService.filterProducts(query);
      setProducts(products);
    } catch (error) {
      console.log(error);
    } finally {
      setSearching(false);
    }
  }, [query]);
  const getRestaurants = async () => {
    try {
      setLoading(true);
      const data = await appwriteService.getAllMenus();
      setRestaurants(data.restaurants);
      setProducts(data.products);
      setFilters(data.categories);
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
  useEffect(() => {
    if (query?.length > 0) {
      filterProducts();
    }
  }, [query, filterProducts]);
  if (loading)
    return (
      <Container>
        <MenusSKeleton />
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
      <Slider restaurant={restaurant} />
      <Left>
        <Filters
          query={query}
          setQuery={setQuery}
          filters={filters}
          row
        />
      </Left>
      <Right>
        {searching ? (
          <BestSellingSkeleton large />
        ) : (
          <DishesList dishes={products} />
        )}
      </Right>
    </Container>
  );
};

export default Menus;
