import React from 'react';
import styled from 'styled-components';
import hero from '../../assets/hero.png';
import { Edit, Opacity, Phone } from '@mui/icons-material';
import { motion } from 'framer-motion';
import CustomDescription from './CustomDescription';
const Container = styled.section`
  height: 90vh;
  display: flex;
  position: relative;
`;
const Left = styled.div`
  position: relative;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  z-index: 10;
  justify-content: center;
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
const ControlContainer = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
  padding: 0 0.5rem;
`;
const TitleContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;
const Control = styled(motion.button)`
  outline: none;
  padding: 0.5rem 1rem;
  border: 1px solid var(--color-golden);
  cursor: pointer;
  outline: none;
  background-color: transparent;
  font-size: 1rem;
  color: inherit;
  border-radius: 1.5rem;
  &.custom {
    border-radius: 50%;
    width: 50px;
    height: 50px;
    display: grid;
    place-content: center;
    color: var(--color-golden);
    :hover {
      opacity: 0.8;
    }
  }
  &.custom.fill {
    background-color: white;
  }
`;
const BottomControlsContainer = styled(motion.div)`
  display: flex;
  gap: 1rem;
  align-items: center;
  padding-top: 2rem;
  @media screen and (min-width: 768px) {
    padding-top: 0;
    position: absolute;
    z-index: 10;
    bottom: 1rem;
    left: 0;
  }
`;

const btnVariants = {
  initial: {
    opacity: 0,
    x: '-50vw',
  },
  animate: {
    opacity: 1,
    x: 0,
    transition: { staggerChildren: 1 },
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
const bottomBtnVariants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: { delay: 3.5, staggerChildren: 1 },
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
        <ControlContainer
          variants={btnVariants}
          initial='initial'
          animate='animate'
        >
          <Control variants={btnVariants}>order now</Control>
          <Control variants={btnVariants}>location</Control>
          <Control variants={btnVariants}>seat type</Control>
        </ControlContainer>
        <BottomControlsContainer
          variants={bottomBtnVariants}
          initial='initial'
          animate='animate'
        >
          <Control className='custom '>
            <Edit />
          </Control>
          <Control className='custom fill'>
            <Phone />
          </Control>
        </BottomControlsContainer>
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
