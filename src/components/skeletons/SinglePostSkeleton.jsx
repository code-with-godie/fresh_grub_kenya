import { Skeleton } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  height: 90vh;
  width: 100%;
  gap: 1rem;
  padding: 1rem;
`;
const Wrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  .dark {
    background: #2a2929;
  }
  .banner {
    background: ${props => props.dark && '#626262'};
    width: 100%;
    flex: 1;
  }
  .desc {
    background-color: ${props => props.dark && '#626262'};
    width: 100%;
    height: 300px;
  }
  .content {
    background-color: ${props => props.dark && '#626262'};
    width: 100%;
    height: 50px;
  }
  .size {
    height: 70px;
  }
  .place {
    height: 100px;
  }
  .map {
    flex: 1;
  }
`;
const SinglePostSkelton = () => {
  const { darkMode } = useSelector(state => state.app);

  return (
    <Container>
      <Wrapper>
        <Skeleton
          variant='rectangular'
          className={`banner ${darkMode && 'dark'}`}
        />
      </Wrapper>
      <Wrapper>
        <Skeleton
          variant='rectangular'
          className={`desc ${darkMode && 'dark'}`}
        />
        <Skeleton
          variant='rectangular'
          className={`content size ${darkMode && 'dark'}`}
        />
        <Skeleton
          variant='rectangular'
          className={`content place ${darkMode && 'dark'}`}
        />
      </Wrapper>
    </Container>
  );
};

export default SinglePostSkelton;
