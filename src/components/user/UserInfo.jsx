import { Avatar } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;
const ImageContainer = styled.div`
  .avatar {
    width: 80px;
    height: 80px;
  }
`;
const UserInfo = () => {
  const { currentUser: user } = useSelector(state => state.user);
  return (
    <Container>
      <ImageContainer>
        <Avatar
          src={user?.avatar}
          alt={user?.username}
          className='avatar'
        />
      </ImageContainer>
    </Container>
  );
};

export default UserInfo;
