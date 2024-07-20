import { Home, Search } from '@mui/icons-material';
import React from 'react';
import { BsPersonCheckFill } from 'react-icons/bs';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  position: fixed;
  background: ${props => props.theme.bg_primary};
  box-shadow: 0px 0px 5px 3px ${props => (props.dark ? '#2f2e2eb6' : '#dad7d7')};
  bottom: 0;
  width: 100%;
  .active {
    font-size: 1.2rem;
    color: var(--color-golden) !important;
    border: 1px solid var(--color-golden);
  }
  .link {
    text-decoration: none;
    display: flex;
    flex: 1;
    padding: 0.5rem;
    justify-content: center;
    flex-direction: column;
    color: inherit;
    align-items: center;
  }
  z-index: 100000;
  @media screen and (min-width: 768px) {
    display: none;
  }
`;
const Label = styled.p``;

const Item = styled.div`
  flex: 1;
  display: flex;
  gap: 0.2rem;
  font-size: 1rem;
  color: inherit;
  .icon {
    color: inherit;
    font-size: 1.7rem;
  }
  &.row {
    flex-direction: column;
    align-items: center;
  }
`;
const BottomNav = ({ showProfile, setShowProfile }) => {
  const { currentUser: user } = useSelector(state => state.user);
  const { darkMode } = useSelector(state => state.app);
  return (
    <Container dark={darkMode}>
      <Item>
        <NavLink
          className={({ isActive }) => (isActive ? 'active link' : 'link')}
          to='/'
        >
          <Home className='icon' />
          <Label>home</Label>
        </NavLink>
      </Item>
      <Item>
        <NavLink
          className={({ isActive }) => (isActive ? 'active link' : 'link')}
          to='/menus'
        >
          <Home className='icon' />
          <Label>menu</Label>
        </NavLink>
      </Item>

      {user ? (
        <Item
          className='row'
          onClick={() => setShowProfile(prev => !prev)}
        >
          <BsPersonCheckFill className='icon' />
          <Label> {user?.username} </Label>
        </Item>
      ) : (
        <Item className='row'>
          <Search className='icon' />
          <Label>search</Label>
        </Item>
      )}
    </Container>
  );
};

export default BottomNav;
