import {
  KeyboardArrowDown,
  KeyboardArrowUp,
  ShoppingCart,
} from '@mui/icons-material';
import { Badge, IconButton } from '@mui/material';
import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { BsPersonFillCheck } from 'react-icons/bs';
import { FaBars, FaMoon, FaSun } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import {
  openLoginModel,
  openRegisterModel,
  toggleDrawer,
  toggleTheme,
} from '../../context/appSlice';
import { motion } from 'framer-motion';
import AccountModel from './AccountModel';
const Container = styled.div`
  display: flex;
  gap: 0.5rem;
  justify-content: space-between;
  align-items: center;
  position: sticky;
  top: 0;

  z-index: 10000;
  background-color: ${props => props.theme.bg_primary};
`;
const LogoContainer = styled.div`
  padding: 0.5rem;
`;
const LinksContainer = styled(motion.div)`
  display: none;
  @media screen and (min-width: 768px) {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;
    a {
      color: inherit;
      text-decoration: none;
      text-transform: capitalize;
    }
    a.active {
      font-size: 1.3rem;
      color: var(--color-golden);
    }
  }
`;
const IconsContainer = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  .btn {
    border: 1px solid var(--color-golden);
    border-radius: 0.5rem;
    background-color: transparent;
    color: var(--color-golden);
  }
  .cart {
    background-color: transparent;
    color: var(--color-golden);
  }

  .icon {
    background-color: 1px solid ${props => props.theme.color_primary};
    font-size: 1.5rem;
  }
  .cart:not(.show) {
    @media screen and (max-width: 600px) {
      display: none;
    }
  }
  .btn:not(.show) {
    @media screen and (max-width: 600px) {
      display: none;
    }
  }
  .small {
    @media screen and (min-width: 768px) {
      display: none;
    }
  }
`;
const Logo = styled.h2`
  text-transform: capitalize;
  color: var(--color-golden);
  font-size: 2rem;
  cursor: pointer;
`;
const linkVariants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: { staggerChildren: 1 },
  },
};
const iconsVariants = {
  initial: {
    opacity: 0,
    y: -100,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: { staggerChildren: 1 },
  },
};
const PersonWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  border: 1px solid var(--color-golden);
  border-radius: 0.5rem;
  color: var(--color-golden);
  padding: 0.5rem;
  height: 45px;
  cursor: pointer;
  position: relative;
  @media screen and (max-width: 600px) {
    display: none;
  }
`;
const Name = styled.h4``;
const Topnav = ({ showProfile, setShowProfile }) => {
  const { darkMode } = useSelector(state => state.app);
  const navigate = useNavigate();
  const { currentUser: user } = useSelector(state => state.user);
  const { amount } = useSelector(state => state.cart);
  const dispatch = useDispatch();
  const login = () => {
    dispatch(openLoginModel());
  };
  const register = () => {
    dispatch(openRegisterModel());
  };
  return (
    <Container>
      <LogoContainer>
        <Logo onClick={() => navigate('/')}>Fresh grub</Logo>
      </LogoContainer>
      <LinksContainer
        variants={linkVariants}
        initial='initial'
        animate='animate'
      >
        <motion.div variants={linkVariants}>
          <NavLink to='/'>home</NavLink>
        </motion.div>
        <motion.div variants={linkVariants}>
          <NavLink to='/menus'> menu</NavLink>
        </motion.div>
        {user ? (
          <></>
        ) : (
          <>
            <motion.div variants={linkVariants}>
              <div
                onClick={register}
                style={{ cursor: 'pointer' }}
              >
                sign up
              </div>
            </motion.div>
            <motion.div variants={linkVariants}>
              <div
                onClick={login}
                style={{ cursor: 'pointer' }}
              >
                sign in
              </div>
            </motion.div>
          </>
        )}
      </LinksContainer>
      <IconsContainer
        variants={iconsVariants}
        initial='initial'
        animate='animate'
      >
        {user ? (
          <>
            <motion.div variants={iconsVariants}>
              <PersonWrapper>
                <IconButton
                  className='cart'
                  // onClick={() => dispatch(toggleTheme())}
                >
                  <Badge badgeContent={`${amount}`}>
                    <ShoppingCart />
                  </Badge>
                </IconButton>
                <Name>Cart</Name>
              </PersonWrapper>
            </motion.div>
            <motion.div variants={iconsVariants}>
              <PersonWrapper onClick={() => setShowProfile(prev => !prev)}>
                <BsPersonFillCheck className='icon' />
                <Name> {user?.username} </Name>
                {showProfile ? (
                  <KeyboardArrowUp className='icon' />
                ) : (
                  <KeyboardArrowDown className='icon' />
                )}
              </PersonWrapper>
            </motion.div>
          </>
        ) : (
          <></>
        )}
        <motion.div variants={iconsVariants}>
          <IconButton
            onClick={() => dispatch(toggleTheme())}
            className='btn'
          >
            {darkMode ? (
              <FaMoon className='icon' />
            ) : (
              <FaSun className='icon' />
            )}
          </IconButton>
        </motion.div>
        <motion.div variants={iconsVariants}>
          <IconButton
            onClick={() => dispatch(toggleDrawer())}
            className='btn show small'
          >
            <FaBars />
          </IconButton>
        </motion.div>
      </IconsContainer>
    </Container>
  );
};

export default Topnav;
