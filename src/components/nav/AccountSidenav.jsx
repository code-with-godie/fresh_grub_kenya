import {
  FavoriteBorderOutlined,
  Person2Outlined,
  Reviews,
} from '@mui/icons-material';
import React from 'react';
import { BiEnvelope } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { authService } from '../../appWrite/auth';
import { useDispatch } from 'react-redux';
import { logout } from '../../context/userSlice';
const Container = styled.div`
  display: none;
  @media screen and (min-width: 768px) {
    max-width: 300px;
    background-color: ${props => props.theme.bg_white};
    display: flex;
    flex-direction: column;
    border: 1px solid var(--color-golden);
    overflow: auto;
    &.wrapper {
      border-bottom: 1px solid var(--color-golden);
    }
    &.container {
      flex: 1;
    }
  }
`;
const Item = styled.div`
  padding: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  .icon {
    font-size: 1.7rem;
  }
  :hover {
    background-color: var(--color-golden);
    color: white;
  }
`;
const ItemLabel = styled.p`
  flex: 1;
  font-weight: 100;
  text-transform: capitalize;
  font-size: 1rem;
`;
const Logout = styled.button`
  background: transparent;
  border: none;
  outline: none;
  justify-content: flex-end;
  padding: 0.5rem;
  cursor: pointer;
  font-size: large;
  text-transform: capitalize;
`;
const AccountSidenav = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogout = () => {
    authService.logout().then(() => {
      dispatch(logout());
    });
  };
  return (
    <Container className='container'>
      <Container className='wrapper'>
        <Item onClick={() => navigate('/profile')}>
          <Person2Outlined className='icon' />
          <ItemLabel>fresh Grub account</ItemLabel>
        </Item>
        <Item onClick={() => navigate('/profile/restaurants')}>
          <Person2Outlined className='icon' />

          <ItemLabel>my restaurants</ItemLabel>
        </Item>
        {/* <Item onClick={() => navigate('/profile/restaurants')}>
          <BiEnvelope className='icon' />
          <ItemLabel>inbox</ItemLabel>
        </Item> */}
        <Item onClick={() => navigate('/profile/saved')}>
          <FavoriteBorderOutlined className='icon' />
          <ItemLabel>saved dishes</ItemLabel>
        </Item>
        <Item onClick={() => navigate('/profile/orders')}>
          <FavoriteBorderOutlined className='icon' />
          <ItemLabel>orders</ItemLabel>
        </Item>
      </Container>
      <Container className='wrapper'>
        <Item>
          <FavoriteBorderOutlined className='icon' />
          <ItemLabel>customer service</ItemLabel>
        </Item>
        <Item>
          <FavoriteBorderOutlined className='icon' />
          <ItemLabel>blue tick verification</ItemLabel>
        </Item>
        <Item>
          <FavoriteBorderOutlined className='icon' />
          <ItemLabel>privacy policy</ItemLabel>
        </Item>
      </Container>
      <Container className='wrapper'>
        <Item>
          <FavoriteBorderOutlined className='icon' />
          <ItemLabel>gift cards</ItemLabel>
        </Item>
        <Item>
          <FavoriteBorderOutlined className='icon' />
          <ItemLabel>customer management</ItemLabel>
        </Item>
        <Item>
          <FavoriteBorderOutlined className='icon' />
          <ItemLabel>branding</ItemLabel>
        </Item>
      </Container>
      <Logout onClick={handleLogout}>logout</Logout>
    </Container>
  );
};

export default AccountSidenav;
