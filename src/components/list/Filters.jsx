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
  background-color: ${props =>
    props.active ? 'var(--color-golden)' : 'transparent'};
  font-size: 1rem;
  text-transform: capitalize;
  cursor: pointer;
  color: ${props => (props.active ? 'white' : 'var(--color-golden)')};
  &.active {
    background-color: var(--color-golden);
    color: white;
  }
`;
const Filters = ({ row, filters, query, setQuery }) => {
  const handleClick = item => {
    if (query?.includes(item)) {
      const remove = ['all', item];
      setQuery(prev =>
        prev.filter(filter => {
          if (!remove.includes(filter)) {
            return true;
          } else {
            return false;
          }
        })
      );
    } else {
      setQuery(prev => [...prev?.filter(filter => filter !== 'all'), item]);
    }
  };
  return (
    <FilterContainer className={row && 'row'}>
      <Filter
        active={query?.includes('all')}
        onClick={() => setQuery(['all'])}
      >
        all
      </Filter>
      {filters?.length > 0 &&
        filters?.map((item, index) => (
          <Filter
            onClick={() => handleClick(item)}
            active={query?.includes(item)}
            key={index}
          >
            {' '}
            {item}{' '}
          </Filter>
        ))}
    </FilterContainer>
  );
};

export default Filters;
