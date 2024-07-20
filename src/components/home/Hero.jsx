import React from 'react';
import styled from 'styled-components';
import hero from '../../assets/hero.png';
import { motion } from 'framer-motion';
import CustomDescription from './CustomDescription';
import Search from './Search';
const Container = styled.section`
  min-height: 70vh;
  display: flex;
  position: relative;
`;
const Left = styled.div`
  position: relative;
  flex: 1;
  display: flex;
  flex-direction: column-reverse;
  gap: 0.5rem;
  z-index: 10;
  @media screen and (min-width: 768px) {
    flex-direction: column;
    justify-content: center;
  }
`;
const Right = styled.div`
  position: absolute;
  z-index: 2;
  @media screen and (min-width: 768px) {
    position: static;
    flex: 1;
    display: grid;
    place-content: center;
  }
`;
const Image = styled(motion.img)`
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
`;
const Title = styled(motion.h1)`
  font-size: 2.5rem;
  font-weight: 600;
  color: var(--color-golden);
  font-size: 3rem;
  @media screen and (max-width: 768px) {
    color: inherit;
  }
`;
const Description = styled(motion.p)``;
const TitleContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const btnVariants = {
  initial: {
    opacity: 0,
    x: '-50vw',
  },
  animate: {
    opacity: 1,
    x: 0,
    transition: { duration: 1 },
  },
};
const titleVariants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: { staggerChildren: 1 },
  },
};
const imageVariants = {
  initial: {
    scale: 0,
  },
  animate: {
    scale: 1,
    transition: { duration: 1 },
  },
};
const Hero = () => {
  return (
    <Container>
      <Left>
        <TitleContainer
          variants={titleVariants}
          initial='initial'
          animate='animate'
        >
          <CustomDescription title='choose your own flavour' />
          <Title variants={titleVariants}>
            The key to delicious dining is Fresh grub
          </Title>
          <Description variants={titleVariants}>
            The most delicious outdoor food
          </Description>
        </TitleContainer>
        <Search />
      </Left>
      <Right>
        <Image
          variants={imageVariants}
          initial='initial'
          animate='animate'
          src={hero}
        />
      </Right>
    </Container>
  );
};

export default Hero;
