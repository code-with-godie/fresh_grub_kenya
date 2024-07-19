import { Instagram, LinkedIn, ShoppingCart } from '@mui/icons-material';
import { Avatar, Badge, IconButton } from '@mui/material';
import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { FaBars, FaMoon, FaSun } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import {
  openLoginModel,
  openRegisterModel,
  toggleDrawer,
  toggleTheme,
} from '../../context/appSlice';
import { motion } from 'framer-motion';
const Container = styled.div`
  display: flex;
  gap: 0.5rem;
  justify-content: space-between;
  align-items: center;
  position: sticky;
  top: 0;
  /* padding: 0.5rem; */

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
const Topnav = ({ setShowModel }) => {
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
          <NavLink to='/menus'>all menus</NavLink>
        </motion.div>
        {user ? (
          <>
            <motion.div variants={linkVariants}>
              <NavLink to='/orders'>my orders</NavLink>
            </motion.div>
            <motion.div variants={linkVariants}>
              <div
                onClick={() => setShowModel(true)}
                style={{ cursor: 'pointer' }}
              >
                logout
              </div>
            </motion.div>
            <Avatar
              alt={user?.username}
              src={user?.avatar}
            />
          </>
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
        <motion.div variants={iconsVariants}>
          {user && (
            <IconButton
              className='cart show'
              // onClick={() => dispatch(toggleTheme())}
            >
              <Badge badgeContent={`${amount}`}>
                <ShoppingCart />
              </Badge>
            </IconButton>
          )}
        </motion.div>
        <motion.div variants={iconsVariants}>
          <IconButton className='btn'>
            <Instagram className='icon' />
          </IconButton>
        </motion.div>
        <motion.div variants={iconsVariants}>
          <IconButton className='btn'>
            <LinkedIn className='icon' />
          </IconButton>
        </motion.div>
        <motion.div variants={iconsVariants}>
          <IconButton
            className='btn'
            onClick={() => dispatch(toggleTheme())}
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
            className='btn show small'
            onClick={() => dispatch(toggleDrawer())}
          >
            <FaBars />
          </IconButton>
        </motion.div>
      </IconsContainer>
    </Container>
  );
};

export default Topnav;
