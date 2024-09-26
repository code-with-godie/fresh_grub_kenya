import React from 'react';
import styled from 'styled-components';
import nodish from '../../assets/nodish.png';
const Container = styled.div`
  min-height: 35vh;
  width: 100vw;
  display: grid;
  place-content: center;
  gap: 0.5rem;
`;
const Image = styled.img`
  max-width: 300px;
  object-fit: contain;
`;
const Messege = styled.h2`
  text-align: center;
  font-style: italic;
`;
const Empty = ({ messege = 'no dishes yet', owner }) => {
  return (
    <Container>
      {owner ? <Image src={nodish} /> : <Image src={nodish} />}
      <Messege> {owner ? 'you have not added any dish yet' : messege} </Messege>
    </Container>
  );
};

export default Empty;
