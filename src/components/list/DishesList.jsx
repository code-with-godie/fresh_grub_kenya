import styled from 'styled-components';
import Dish from './Dish';
const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 0.5rem;
  padding: 0.5rem;
`;
const DishesList = ({ dishes = [] }) => {
  if (dishes.length === 0)
    return (
      <Container>
        <h1>no dishes yet!!!!</h1>
      </Container>
    );
  return (
    <Container>
      {dishes.map(item => (
        <Dish
          key={item.$id}
          {...item}
        />
      ))}
    </Container>
  );
};

export default DishesList;
