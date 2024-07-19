import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import Footer from './Footer';
import Topnav from '../../components/nav/Topnav';
import { useEffect, useState } from 'react';
import Sidenav from '../../components/nav/Sidenav';
import { useDispatch, useSelector } from 'react-redux';
import Model from '../../components/models/Model';
import Login from '../../pages/login/Login';
import Register from '../../pages/register/Register';
import LogoutModel from '../../components/nav/LogoutModel';
import { getCart, getCartTotal } from '../../context/cartSlice';
import { getUser } from '../../context/userSlice';

const Wrapper = styled.main`
  display: flex;
  justify-content: center;
  width: 100%;
  color: ${props => props.theme.color_primary};
  background: ${props => props.theme.bg_primary};
  height: 100vh;
  overflow: auto;
`;
const Container = styled.section`
  flex: 1;
  max-width: 1000px;
  overflow: auto;
`;
const RootLayout = () => {
  const [showModel, setShowModel] = useState(false);
  const { login, register } = useSelector(state => state.app);
  const { cartItems } = useSelector(state => state.cart);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCartTotal());
  }, [dispatch, cartItems]);
  useEffect(() => {
    dispatch(getUser());
    dispatch(getCart());
  }, [dispatch]);
  useEffect(() => {
    console.log('cart changed', cartItems);
  }, [cartItems]);
  return (
    <Wrapper>
      <Container>
        <Topnav setShowModel={setShowModel} />
        <Sidenav setShowModel={setShowModel} />
        <LogoutModel
          showModel={showModel}
          setShowModel={setShowModel}
        />
        <Outlet />
        <Footer />
      </Container>
      {login && (
        <Model center>
          <Login />
        </Model>
      )}
      {register && (
        <Model center>
          <Register />
        </Model>
      )}
    </Wrapper>
  );
};

export default RootLayout;
