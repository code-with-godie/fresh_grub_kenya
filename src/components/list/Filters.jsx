import React from 'react';
import styled from 'styled-components';
const FilterContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  overflow: auto;
  padding: 0.5rem;
  ::-webkit-scrollbar {
    height: 0;
  }
`;
const Filter = styled.button`
  flex-shrink: 0;
  position: sticky;
  top: 50px;
  z-index: 100;
  border: 1px solid ${props => props.theme.color_golden};
  border-radius: 1.5rem;
  padding: 0.5rem 1rem;
  background-color: transparent;
  font-size: 1rem;
  text-transform: capitalize;
  cursor: pointer;
  color: ${props => props.theme.color_golden};
  &.active {
    background-color: var(--color-golden);
    color: white;
  }
`;
const Filters = ({ row }) => {
  return (
    <FilterContainer className={row && 'row'}>
      <Filter>all</Filter>
      <Filter>hamburger</Filter>
      <Filter>sushi</Filter>
      <Filter>dessert</Filter>
      <Filter>pizza</Filter>
      <Filter>hamburger</Filter>
      <Filter>sushi</Filter>
      <Filter>dessert</Filter>
      <Filter>pizza</Filter>
      <Filter>hamburger</Filter>
      <Filter>sushi</Filter>
      <Filter>dessert</Filter>
      <Filter>pizza</Filter>
      <Filter>hamburger</Filter>
      <Filter>sushi</Filter>
      <Filter>dessert</Filter>
      <Filter>pizza</Filter>
      <Filter>hamburger</Filter>
      <Filter>sushi</Filter>
      <Filter>dessert</Filter>
      <Filter>pizza</Filter>
      <Filter>hamburger</Filter>
      <Filter>sushi</Filter>
      <Filter>dessert</Filter>
    </FilterContainer>
  );
};

export default Filters;
