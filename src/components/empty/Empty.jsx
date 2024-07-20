import React from 'react';
import styled from 'styled-components';
const Container = styled.div`
  min-height: 50vh;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;
const Messege = styled.h2``;
const Empty = ({ messege = 'no dishes yet' }) => {
  return (
    <Container>
      <Messege> {messege} </Messege>
    </Container>
  );
};

export default Empty;
