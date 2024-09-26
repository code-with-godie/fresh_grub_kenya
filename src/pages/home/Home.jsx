import React from 'react';
import styled from 'styled-components';
import Hero from '../../components/home/Hero';
import LetDoItTogether from '../../components/home/LetDoItTogether';
import About from '../../components/home/About';
import Restaurant from '../../components/home/Restaurant';
import TopDishes from '../../components/home/TopDishes';
const Container = styled.section`
  /* padding: 0.5rem; */
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;
const Home = () => {
  return (
    <Container>
      <Hero />
      <TopDishes />
      <Restaurant />
      <LetDoItTogether />
      <About />
    </Container>
  );
};

export default Home;
