import React from 'react';
import styled from 'styled-components';
import AccountSidenav from '../../components/nav/AccountSidenav';
import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Container = styled.section`
  /* height: 100%; */
  overflow: auto;
  /* background: ${props => props.theme.bg_primary}; */
  /* background: #0a1a3521; */
  /* border: 1px solid ${props => (props.dark ? '#2f2e2eb6' : '#dad7d7')}; */
  /* box-shadow: 0px 0px 5px 3px ${props =>
    props.dark ? '#2f2e2eb6' : '#dad7d7'}; */
  display: flex;
  color: ${props => props.theme.color_golden};
  justify-content: center;
  align-items: center;
`;
const Wrapper = styled.div`
  margin-top: 0.5rem;
  width: 100%;
  padding: 1rem;
  flex: 1;
  overflow: auto;
  display: flex;
  gap: 0.5rem;
`;
const Content = styled.div`
  flex: 2;
  display: flex;
  gap: 0.5rem;
`;
const ProfileContainer = styled.div`
  flex: 1;
`;
const AccountLayout = () => {
  const { darkMode } = useSelector(state => state.app);
  return (
    <Container dark={darkMode}>
      <Wrapper>
        <AccountSidenav />
        <Content>
          <ProfileContainer>profile</ProfileContainer>
          <Outlet />
        </Content>
      </Wrapper>
    </Container>
  );
};

export default AccountLayout;
