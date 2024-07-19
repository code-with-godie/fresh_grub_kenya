import styled from 'styled-components';
import { motion } from 'framer-motion';
import { NavLink, useNavigate } from 'react-router-dom';
import { FaMoon, FaSun } from 'react-icons/fa';
import { Home, Login, Logout, SignpostOutlined } from '@mui/icons-material';
import { Avatar } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import {
  closeDrawer,
  openLoginModel,
  openRegisterModel,
  toggleTheme,
} from '../../context/appSlice';
const Wrapper = styled.div`
  display: none;
  overflow: hidden;
  /* padding: 4rem 0.5rem 0.5rem 0.5rem; */
  &.show {
    position: absolute;
    bottom: 0;
    z-index: 10000;
    width: 100vw;
    height: 87vh;
    padding-right: 1rem;
    display: flex;
    justify-content: flex-end;
    align-items: flex-start;
  }
`;
const Container = styled(motion.div)`
  background: ${props => props.theme.bg_primary};
  box-shadow: 0px 0px 5px 3px ${props => (props.dark ? '#2f2e2eb6' : '#dad7d7')};
  width: 100vw;
  max-width: 200px;
  border-radius: 0.5rem;
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  .link {
    color: inherit;
    text-decoration: none;
    padding: 0.5rem;
    font-size: 1rem;
    text-transform: capitalize;
    transition: transform 150ms ease-in;
  }
  .link.active {
    font-size: 1.2rem;
    background: var(--faded_blue);
  }
  .link:hover {
    transform: scale(1.05);
  }
  @media screen and (min-width: 768px) {
    display: none;
  }
`;
const Item = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  &.profile {
    cursor: pointer;
  }
`;
const Label = styled.p``;
const variants = {
  hidden: { opacity: 0, x: '-100%', scale: 0, transition: { duration: 0.5 } },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    rotate: 360,
    transition: { duration: 0.5 },
  },
};

const UserDetails = styled.div`
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;
const Sidenav = ({ setShowModel }) => {
  const { darkMode, isDrawerOpen } = useSelector(state => state.app);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser: user } = useSelector(state => state.user);
  const logout = () => {
    setShowModel(true);
    dispatch(closeDrawer());
  };
  const handleProfile = () => {
    navigate('/profile');
    dispatch(closeDrawer());
  };
  const handleOrders = () => {
    navigate('/orders');
    dispatch(closeDrawer());
  };
  const handleClick = () => {
    dispatch(toggleTheme());
    dispatch(closeDrawer());
  };
  const login = () => {
    dispatch(openLoginModel());
  };
  const register = () => {
    dispatch(openRegisterModel());
  };
  return (
    <Wrapper
      onClick={() => dispatch(closeDrawer())}
      className={isDrawerOpen && 'show'}
    >
      <Container
        variants={variants}
        animate={isDrawerOpen ? 'visible' : 'hidden'}
        dark={darkMode}
      >
        <NavLink
          onClick={() => dispatch(closeDrawer())}
          className='link'
          to='/'
        >
          <Item>
            <Home />
            <Label>Home</Label>
          </Item>
        </NavLink>
        <NavLink
          onClick={() => dispatch(closeDrawer())}
          className='link'
          to='/menus'
        >
          <Item>
            <Home />
            <Label>All menus</Label>
          </Item>
        </NavLink>
        <div
          style={{ cursor: 'pointer', padding: '.5rem' }}
          className='icon'
          onClick={handleClick}
        >
          <Item>
            {darkMode ? <FaMoon /> : <FaSun />}
            <Label> {darkMode ? 'Dark mode' : 'Light Mode'} </Label>
          </Item>
        </div>
        {user ? (
          <UserDetails>
            <Item
              className='profile'
              onClick={logout}
            >
              <Logout />
              <Label>Logout</Label>
            </Item>
            <Item
              className='profile'
              onClick={handleOrders}
            >
              <Logout />
              <Label>My Orders</Label>
            </Item>
            <Item
              className='profile'
              onClick={handleProfile}
            >
              <Avatar
                src={user?.avatar}
                alt={user?.username}
              />
              <Label>welcome, {user?.username} </Label>
            </Item>
          </UserDetails>
        ) : (
          <>
            <div
              style={{ cursor: 'pointer' }}
              className='link'
              onClick={login}
            >
              <Item>
                <Login />
                <Label>sign in</Label>
              </Item>
            </div>
            <div
              style={{ cursor: 'pointer' }}
              className='link'
              onClick={register}
            >
              <Item>
                <SignpostOutlined />
                <Label>sign up</Label>
              </Item>
            </div>
          </>
        )}
      </Container>
    </Wrapper>
  );
};

export default Sidenav;
