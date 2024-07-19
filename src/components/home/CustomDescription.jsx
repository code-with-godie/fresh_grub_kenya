import React from 'react';
import styled from 'styled-components';
import image from '../../assets/spoon.png';
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.3rem;
`;
const Title = styled.p`
  &.bold {
    font-size: 2rem;
    color: var(--color-golden);
  }
`;
const Image = styled.img`
  max-width: 100%;
  object-fit: contain;
  height: auto;
`;
function CustomDescription({ title, bold }) {
  return (
    <Container>
      <Title className={bold && 'bold'}> {title} </Title>
      <Image src={image} />
    </Container>
  );
}

export default CustomDescription;
