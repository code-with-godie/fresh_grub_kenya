import React from 'react';
import styled from 'styled-components';
import rider from '../../assets/rider.png';
import chef from '../../assets/chef.png';
import career from '../../assets/career.png';
import { useNavigate } from 'react-router-dom';
const Container = styled.div`
  min-height: 500px;
  /* background-color: #e9f8f5; */
`;
const Image = styled.img`
  object-fit: cover;
  width: 100%;
  height: auto;
`;
const AnotherImage = styled(Image)`
  max-width: 350px;
`;
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  * {
    flex: 1;
  }
  @media screen and (min-width: 768px) {
    flex-direction: row;
  }
`;
const Parent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  align-items: center;
  justify-content: flex-start;
  /* padding:.5rem; */
`;
const Description = styled.p`
  padding: 0 3rem;
  text-align: justify;
  flex: 1;
`;
const Title = styled.h1`
  font-size: 2rem;
  text-align: center;
  padding: 1rem;
  color: var(--color-golden);
`;
const Button = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  outline: none;
  border: 1px solid var(--color-golden);
  background: transparent;
  padding: 1rem;
  color: var(--color-golden);
  justify-content: center;
  font-size: 1rem;
  font-weight: bold;
  text-transform: capitalize;
  align-self: stretch;
  cursor: pointer;
`;
const LetDoitTogether = () => {
  const navigate = useNavigate();
  return (
    <Container>
      <Title>Let's Do it together</Title>
      <Wrapper>
        <Parent>
          <AnotherImage src={rider} />
          <Title>Become a rider</Title>
          <Description>
            Enjoy flexibility freedom and competitive earnings by delivering
            through Fast Food
          </Description>
        </Parent>
        <Parent>
          <AnotherImage src={chef} />
          <Title>Become a partner</Title>
          <Description>
            Glow with Fast Food! Our techology and user base can help you boost
            sales and unlock new opportunities
          </Description>
          <Button onClick={() => navigate('/partner')}>register here</Button>
        </Parent>
        <Parent>
          <AnotherImage src={career} />
          <Title>Become a rider</Title>
          <Description>
            Ready for an exiting new challenge? if youre ambitious,humble and
            love working with others,then we want to hear from you.
          </Description>
        </Parent>
      </Wrapper>
    </Container>
  );
};

export default LetDoitTogether;
