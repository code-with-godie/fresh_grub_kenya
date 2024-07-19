import React from 'react';
import styled from 'styled-components';
import CustomDescription from './CustomDescription';
import knife from '../../assets/knife.png';
const Container = styled.section`
  display: flex;
  gap: 1rem;
  align-items: center;
  height: 100vh;
  @media screen and (max-width: 768px) {
    flex-direction: column;
  }
`;
const Left = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  padding: 0.5rem;
  gap: 0.5rem;
`;
const Right = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 0.5rem;
  gap: 0.5rem;
  padding: 0.5rem;
`;
const Image = styled.img`
  max-height: 90%;
  width: auto;
  object-fit: contain;
  @media screen and (max-width: 768px) {
    position: absolute;
    top: 0;
    z-index: -1;
  }
`;
const Description = styled.div`
  letter-spacing: 2px;
`;
const About = () => {
  return (
    <Container>
      <Left>
        <CustomDescription
          bold
          title='About Us'
        />
        <Description>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Id dolores
          veniam, molestiae eum impedit mollitia. Repellendus sed iure,
          doloremque labore aliquam harum commodi voluptatum quidem a rerum
          iusto, id sunt?
        </Description>
      </Left>
      <Image src={knife} />
      <Right>
        <CustomDescription
          bold
          title='Our History'
        />
        <Description>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Earum quam
          atque doloribus, ab cumque animi perferendis sint eveniet quia velit
          reiciendis minus omnis alias vel qui? Corrupti voluptate aperiam
          corporis.
        </Description>
      </Right>
    </Container>
  );
};

export default About;
