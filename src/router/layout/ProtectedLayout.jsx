import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { openLoginModel } from '../../context/appSlice';
const ProtectedLayout = () => {
  const user = useSelector(state => state.user.currentUser);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  if (!user) {
    dispatch(openLoginModel());
    navigate('/');
  }
  return (
    <>
      <Outlet />{' '}
    </>
  );
};

export default ProtectedLayout;
