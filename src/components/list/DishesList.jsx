import styled from 'styled-components';
import Dish from './Dish';
import Empty from '../empty/Empty';
const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 0.5rem;
  padding: 0.5rem;
  &.small {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  }
`;
const DishesList = ({ dishes = [], small, owner }) => {
  if (dishes.length === 0)
    return (
      <Container>
        <Empty owner={owner} />
      </Container>
    );
  return (
    <Container className={small && 'small'}>
      {dishes.map(item => (
        <Dish
          small={small}
          key={item.$id}
          {...item}
        />
      ))}
    </Container>
  );
};

export default DishesList;
