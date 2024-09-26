import { Skeleton } from '@mui/material';
import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';

const Container = styled.div`
  display: flex;
  /* height: 90vh; */
  display: grid;
  grid-auto-rows: 300px;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1rem;
  padding: 1rem;
  &.large {
    grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
    grid-auto-rows: 150px;
    .desc {
      border-radius: 1rem;
    }
  }
  .dark {
    background: #2a2929;
  }
  .desc {
    background-color: ${props => props.dark && '#626262'};
    /* width: 100%;
    height: 200px; */
    height: 100%;
  }
`;
const BestSellingSkeleton = ({ large }) => {
  const { darkMode } = useSelector(state => state.app);

  return (
    <Container className={large && 'large'}>
      {Array(8).fill(
        <Skeleton
          variant='rectangular'
          className={`desc ${darkMode && 'dark'}`}
        />
      )}
    </Container>
  );
};

export default BestSellingSkeleton;
