import React from 'react';
import styled from 'styled-components';
import Hero from '../../components/home/Hero';
import LetDoItTogether from '../../components/home/LetDoItTogether';
import About from '../../components/home/About';
import Restaurant from '../../components/home/Restaurant';
const Container = styled.section`
  /* padding: 0.5rem; */
`;
const Home = () => {
  return (
    <Container>
      <Hero />
      <Restaurant />
      <LetDoItTogether />
      <About />
    </Container>
  );
};

export default Home;