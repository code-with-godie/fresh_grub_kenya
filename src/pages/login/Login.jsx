import { useEffect, useState } from 'react';
import styled from 'styled-components';
import google from '../../assets/google.png';
import { IconButton } from '@mui/material';
import {} from 'react-icons';
import { Close, Email, Fingerprint } from '@mui/icons-material';
import { IoIosEyeOff } from 'react-icons/io';
import { IoMdEye } from 'react-icons/io';
import LoadingAnimation from '../../components/loading/LoadingAnimation';
import { Bounce, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from 'react-redux';
import { closeLoginModel } from '../../context/appSlice';
import { login } from '../../context/userSlice';
import { motion } from 'framer-motion';
import { authService } from '../../appWrite/auth';
const Container = styled(motion.div)`
  display: flex;
  flex-direction: column;
  background-color: ${props => props.theme.bg_primary};
  box-shadow: 0px 0px 5px 3px ${props => (props.dark ? '#2f2e2eb6' : '#dad7d7')};
  padding: 1rem;
  gap: 0.5rem;
  .desc {
    color: gray;
    font-size: 0.9rem;
  }
  width: 100%;
  max-width: 400px;
`;
const Title = styled.h2`
  text-transform: capitalize;
  font-size: 2rem;
  text-align: center;
  color: var(--color-golden);
`;
const Description = styled.p`
  text-align: center;
  letter-spacing: 2px;
  color: var(--color-golden);
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;
const InputContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  flex: 1;
  padding: 0.5rem;
  border-radius: 0.5rem;
  border: 1px solid var(--color-golden);
  .eye {
    cursor: pointer;
    font-size: 1.5rem;
  }
`;
const Input = styled.input`
  flex: 1;
  color: ${props => props.theme.color_primary};
  font-size: 1rem;
  min-width: 0 !important;
  background-color: transparent;
  border: none;
  outline: none;
`;
const SubmitButton = styled.button`
  border: 1px solid #aaaaaa;
  color: ${props => props.theme.color_primary};
  outline: none;
  font-size: 1rem;
  background-color: var(--color-golden);
  text-transform: capitalize;
  border-radius: 1rem;
  padding: 1rem 0.5rem;
  border: none;
  cursor: pointer;
  :disabled {
    cursor: not-allowed;
    color: #c0c0c0;
    background-color: ${props => (props.dark ? ` gray` : ' #000000c6')};
  }
`;

const Divider = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem 0;
`;
const DividerText = styled.p`
  position: absolute;
  z-index: 10;
  padding: 0.2rem;
  background-color: var(--color-golden);
  border-radius: 50%;
  font-size: 0.9rem;
`;
const DividerLine = styled.div`
  position: absolute;
  z-index: 1;
  width: 100%;
  border: 1px solid var(--color-golden);
`;
const OAuthContainer = styled.div`
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
`;
const Image = styled.img`
  object-fit: contain;
  max-width: 70px;
  flex: 1;
  cursor: pointer;
`;
const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const variants = {
  initial: {
    opacity: 0,
    y: '-100vh',
    transition: { duration: 1 },
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 1 },
  },
};
const Login = () => {
  const [user, setUser] = useState({ email: '', password: '' });
  const [showPasword, setShowPassword] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const { currentUser: loggedInUser } = useSelector(state => state.user);
  const { darkMode, login: showLoginModel } = useSelector(state => state.app);
  const dispatch = useDispatch();
  const handleSubmit = async e => {
    e.preventDefault();
    try {
      setLoading(true);
      const newUser = await authService.loginWithCredentials(user);
      if (newUser) {
        const {
          favourites,
          avatar,
          username,
          isAdmin,
          $id,
          restaurants,
          email,
        } = newUser;
        setUser({ email: '', password: '' });
        dispatch(
          login({
            avatar,
            username,
            $id,
            restaurants,
            email,
            isAdmin,
            favourites,
          })
        );
      }
    } catch (error) {
      console.log(error);
      setUser({ email: '', password: '' });
      const message = error?.message || 'Something went wrong';
      toast.error(message, {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: `${darkMode ? 'dark' : 'light'}`,
        transition: Bounce,
      });
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user.email.length < 2 || user.password.length < 8) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }, [user]);
  useEffect(() => {
    if (loggedInUser) {
      dispatch(closeLoginModel());
    }
  }, [loggedInUser, dispatch]);
  return (
    <Container
      variants={variants}
      initial='initial'
      animate={showLoginModel ? 'animate' : 'initial'}
      dark={darkMode}
    >
      <Header>
        <Title>fresh grub </Title>
        <IconButton onClick={() => dispatch(closeLoginModel())}>
          {' '}
          <Close style={{ color: 'var(--color-golden)' }} />{' '}
        </IconButton>
      </Header>
      <Description>the most deliciuos outdoor food</Description>
      <Form onSubmit={handleSubmit}>
        <InputContainer>
          <Email />
          <Input
            name='email'
            type='email'
            value={user.email}
            onChange={e =>
              setUser(prev => ({ ...prev, email: e.target.value }))
            }
            placeholder='email address*'
          />
        </InputContainer>
        <InputContainer>
          <Fingerprint />
          <Input
            name='password'
            type={showPasword ? 'text' : 'password'}
            value={user.password}
            onChange={e =>
              setUser(prev => ({ ...prev, password: e.target.value }))
            }
            placeholder='**********'
          />
          {showPasword ? (
            <IoIosEyeOff
              onClick={() => setShowPassword(false)}
              className='eye'
            />
          ) : (
            <IoMdEye
              onClick={() => setShowPassword(true)}
              className='eye'
            />
          )}
        </InputContainer>
        <span className='desc'>
          password must be more than 8 characters long*
        </span>
        <SubmitButton
          dark={darkMode}
          disabled={disabled}
        >
          {' '}
          {loading ? <LoadingAnimation /> : 'login'}{' '}
        </SubmitButton>
      </Form>
      <Divider>
        <DividerText>Or</DividerText>
        <DividerLine />
      </Divider>
      <OAuthContainer>
        <IconButton>
          <Image src={google} />
        </IconButton>
        <IconButton>
          <Image src={google} />
        </IconButton>
        <IconButton>
          <Image src={google} />
        </IconButton>
      </OAuthContainer>
      <span
        className='desc'
        style={{ textAlign: 'center' }}
      >
        All right reserved. &copy; 2023 - {new Date().getFullYear()}-godie
      </span>
      <ToastContainer />
    </Container>
  );
};

export default Login;
