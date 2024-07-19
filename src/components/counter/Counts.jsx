import React from 'react';
import styled from 'styled-components';
import CountUp from 'react-countup';
const Container = styled.div`
  padding: 0.5rem;
  align-self: stretch;
  display: flex;
  justify-content: space-between;
`;
const Item = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2em;
  align-items: center;
`;
const ItemLabel = styled.p`
  :nth-child(1) {
    font-weight: bold;
    font-size: 1.5rem;
    @media screen and (min-width: 768px) {
      font-size: 2rem;
    }
  }
  :nth-child(2) {
    text-transform: capitalize;
    font-size: 1rem;
  }
`;
const Counts = () => {
  return (
    <Container>
      <Item>
        <ItemLabel>
          <CountUp
            start={7200}
            end={10000}
            duration={4}
          />
          <span style={{ color: 'var(--faded_blue)' }}>+</span>
        </ItemLabel>
        <ItemLabel>premium products</ItemLabel>
      </Item>
      <Item>
        <ItemLabel>
          <CountUp
            start={1000}
            end={2500}
            duration={4}
          />
          <span style={{ color: 'var(--faded_blue)' }}>+</span>
        </ItemLabel>
        <ItemLabel>happy customers</ItemLabel>
      </Item>
      <Item>
        <ItemLabel>
          <CountUp
            start={0}
            end={15}
            duration={4}
          />{' '}
          <span style={{ color: 'var(--faded_blue)' }}>+</span>
        </ItemLabel>
        <ItemLabel>award winnings</ItemLabel>
      </Item>
    </Container>
  );
};

export default Counts;
