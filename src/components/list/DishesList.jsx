import styled from 'styled-components';
import Dish from './Dish';
const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 0.5rem;
  padding: 0.5rem;
  &.small {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  }
`;
const DishesList = ({ dishes = [], small }) => {
  if (dishes.length === 0)
    return (
      <Container>
        <h1>no dishes yet!!!!</h1>
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
