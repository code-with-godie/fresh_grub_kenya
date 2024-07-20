import { ErrorOutline } from '@mui/icons-material';
import React from 'react';
import styled from 'styled-components';
const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 0.5rem;
  .icon {
    font-size: 5rem;
  }
`;

const Messege = styled.p`
  font-size: 1.5rem;
  text-transform: capitalize;
`;
const Error = ({ messege }) => {
  return (
    <Container>
      <ErrorOutline className='icon' />
      <Messege>{messege || 'Something went wrong'} </Messege>
    </Container>
  );
};

export default Error;
