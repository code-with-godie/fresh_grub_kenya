import { Skeleton } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import BestSellingSkeleton from './BestSellingSkeleton';
const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: auto;
  width: 100%;
  gap: 1rem;
  padding: 1rem;
`;
const Wrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  &.row {
    flex-direction: row;
    overflow: auto;
  }
  .dark {
    background: #2a2929;
  }
  .banner {
    background: ${props => props.dark && '#626262'};
    width: 100%;
    height: 300px;
    border-radius: 1rem;
  }
  .desc {
    background-color: ${props => props.dark && '#626262'};
    border-radius: 1.5rem;
    height: 40px;
    flex: 1 0 150px;
  }
  .content {
    background-color: ${props => props.dark && '#626262'};
    width: 100%;
    height: 50px;
  }
`;
const MenusSkeleton = () => {
  const { darkMode } = useSelector(state => state.app);

  return (
    <Container>
      <Wrapper>
        <Skeleton
          variant='rounded'
          className={`banner ${darkMode && 'dark'}`}
        />
      </Wrapper>
      <Wrapper className='row'>
        <Skeleton
          variant='rectangular'
          className={`desc ${darkMode && 'dark'}`}
        />
        <Skeleton
          variant='rectangular'
          className={`desc ${darkMode && 'dark'}`}
        />
        <Skeleton
          variant='rectangular'
          className={`desc ${darkMode && 'dark'}`}
        />
        <Skeleton
          variant='rectangular'
          className={`desc ${darkMode && 'dark'}`}
        />
        <Skeleton
          variant='rectangular'
          className={`desc ${darkMode && 'dark'}`}
        />
        <Skeleton
          variant='rectangular'
          className={`desc ${darkMode && 'dark'}`}
        />
        <Skeleton
          variant='rectangular'
          className={`desc ${darkMode && 'dark'}`}
        />
        <Skeleton
          variant='rectangular'
          className={`desc ${darkMode && 'dark'}`}
        />
        <Skeleton
          variant='rectangular'
          className={`desc ${darkMode && 'dark'}`}
        />
        <Skeleton
          variant='rectangular'
          className={`desc ${darkMode && 'dark'}`}
        />
        <Skeleton
          variant='rectangular'
          className={`desc ${darkMode && 'dark'}`}
        />
        <Skeleton
          variant='rectangular'
          className={`desc ${darkMode && 'dark'}`}
        />
        <Skeleton
          variant='rectangular'
          className={`desc ${darkMode && 'dark'}`}
        />
        <Skeleton
          variant='rectangular'
          className={`desc ${darkMode && 'dark'}`}
        />
        <Skeleton
          variant='rectangular'
          className={`desc ${darkMode && 'dark'}`}
        />
        <Skeleton
          variant='rectangular'
          className={`desc ${darkMode && 'dark'}`}
        />
        <Skeleton
          variant='rectangular'
          className={`desc ${darkMode && 'dark'}`}
        />
      </Wrapper>
      <BestSellingSkeleton large />
    </Container>
  );
};

export default MenusSkeleton;
