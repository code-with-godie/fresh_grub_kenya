import React from 'react';
import styled from 'styled-components';
import url from '../../assets/how.jpg';
const Container = styled.div`
  height: auto;
`;
const Image = styled.img`
  max-width: 100%;
  height: auto;
  object-fit: cover;
`;
const Title = styled.h1`
  font-size: 2rem;
  text-align: center;
  padding: 1rem;
`;

const HowItWorks = () => {
  return (
    <Container>
      <Title>How its works</Title>
      <Image
        src={url}
        alt='how it works'
      />
    </Container>
  );
};

export default HowItWorks;
