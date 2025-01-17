import { useEffect, useState } from 'react';
import styled from 'styled-components';
import Counter from '../../components/counter/Counts';
import LoadingAnimation from '../../components/loading/LoadingAnimation';
import { Bounce, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from 'react-redux';
import DropZone from '../../components/dropZone/DropZone';
import { appwriteService } from '../../appWrite/appwriteService';
import { useNavigate } from 'react-router-dom';
import { FormControl, IconButton, MenuItem, Select } from '@mui/material';
import { useLocation } from '../../hooks';
import { CameraAlt, Edit } from '@mui/icons-material';
const Wrapper = styled.div`
  display: flex;
  flex-direction: column-reverse;
  @media screen and (min-width: 768px) {
    overflow: auto;
    flex-direction: row;
    height: 100%;
  }
`;
const Left = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding-bottom: 5rem;
  @media screen and (min-width: 768px) {
    overflow: auto;
    padding-top: 2rem;
    justify-content: center;
  }
`;
const Right = styled.div`
  flex: 1;
  padding: 0.5rem;
  position: relative;
  @media screen and (min-width: 768px) {
    position: sticky;
    top: 0;
  }
`;
const SelectAnother = styled.div`
  position: absolute;
  top: 5px;
  right: 5px;
  z-index: 100000;
`;
const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 0.5rem;
  padding: 0.5rem;
  .desc {
    color: gray;
    font-size: 0.9rem;
  }
`;
const Title = styled.h2`
  text-transform: capitalize;
  font-size: 1.5rem;
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
const Item = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(170px, 1fr));
  gap: 0.5rem;
  padding: 0.5rem;
  &.small {
    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  }
`;
const InputWraper = styled.div`
  display: flex;
  gap: 0.2rem;
  flex-direction: column;
  flex: 1;
`;
const InputContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  flex: 1;
  padding: 0.5rem;
  border-radius: 0.5rem;
  border: 1px solid var(--color-golden);
`;
const Label = styled.p``;
const Input = styled.input`
  flex: 1;
  color: ${props => props.theme.color_primary};
  font-size: 1rem;
  min-width: 0 !important;
  background-color: transparent;
  border: none;
  outline: none;
  color: ${props => props.theme.color_primary};
`;
const Image = styled.img`
  width: 100%;
  height: auto;
  object-fit: contain;
  max-height: 50vh;
  border-radius: 0.5rem;
  /* @media screen and (max-width: 600px) {
    max-height: 40vh;
  } */
`;
const TextArea = styled.textarea`
  flex: 1;
  color: ${props => props.theme.color_primary};
  font-size: 1rem;
  min-width: 0 !important;
  background-color: transparent;
  border: none;
  min-height: 70px;
  max-height: 150px;
  color: ${props => props.theme.color_primary};
  resize: vertical;
  overflow: auto;
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

const CustomMenuItem = styled(MenuItem)(({ darkMode }) => ({
  backgroundColor: darkMode ? 'black' : 'white',
  color: darkMode ? 'white' : 'black',
  borderBottom: '1px solid #cab054',
  '&:hover': {
    backgroundColor: darkMode ? '#333' : '#f0f0f0',
  },
  '&.Mui-selected': {
    backgroundColor: darkMode ? '#444' : '#e0e0e0',
  },
}));

// const variants = {
//   initial: {
//     opacity: 0,
//     y: '-100vh',
//     transition: { duration: 1 },
//   },
//   animate: {
//     opacity: 1,
//     y: 0,
//     transition: { duration: 1 },
//   },
// };
const Partner = () => {
  const { currentUser: user } = useSelector(state => state.user);
  const { countries, getCountryStates } = useLocation();
  const [country, setCountry] = useState(null);
  const [states, setStates] = useState([]);
  const [hotel, setHotel] = useState({
    owner: user?.$id,
    name: '',
    short: '',
    city: null,
    country: null,
    street: '',
    description: '',
    image: null,
  });
  const [image, setFile] = useState(null);
  const [disabled, setDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const { darkMode } = useSelector(state => state.app);
  const handleChange = e => {
    const name = e.target.name;
    const value = e.target.value;
    if (name === 'country') {
      setCountry(value);
    }
    setHotel(prev => ({ ...prev, [name]: value }));
  };
  const navigate = useNavigate();
  const handleSubmit = async e => {
    e.preventDefault();
    try {
      setLoading(true);

      if (!image) throw new Error('Please select restaurant image');
      const res = await appwriteService.createRestaurant({
        ...hotel,
        image,
      });
      if (res) {
        navigate(`/restaurant/${res.$id}`);
      }
    } catch (error) {
      const message = error?.message || 'Something went wrong';
      toast.error(message, {
        position: 'bottom-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: `${darkMode ? 'dark' : 'light'}`,
        transition: Bounce,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (
      hotel.name.length < 3 ||
      hotel.short.length < 3 ||
      !hotel.street ||
      !hotel.city ||
      !hotel.country
    ) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }, [hotel]);
  useEffect(() => {
    if (country) {
      const states = getCountryStates(country?.isoCode);
      setStates(states);
    }
  }, [country, getCountryStates]);
  return (
    <Wrapper>
      <Left>
        <Container dark={darkMode}>
          <Counter />
          <Title>Best decision for your restaurant</Title>
          <Description>just a few step and you are ready to go</Description>
          {/* <Title>Restaurant details</Title> */}

          <Form onSubmit={handleSubmit}>
            <Item>
              <InputWraper>
                <Label>restaurant name*</Label>
                <InputContainer>
                  <Input
                    name='name'
                    value={hotel.name}
                    onChange={handleChange}
                    placeholder='restaurant name'
                  />
                </InputContainer>
              </InputWraper>
              <InputWraper>
                <Label>short description*</Label>
                <InputContainer>
                  <Input
                    name='short'
                    value={hotel.short}
                    onChange={handleChange}
                    placeholder='restaurant short description'
                  />
                </InputContainer>
              </InputWraper>
            </Item>
            <Item>
              <InputWraper>
                <Label>restaurant location(country)*</Label>
                <FormControl fullWidth>
                  <Select
                    name='country'
                    value={hotel.country || ''}
                    onChange={handleChange}
                    sx={{
                      '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#cab054',
                      },
                      color: () => (darkMode ? 'white' : 'black'),
                      '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#cab054',
                      },
                      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#cab054',
                      },
                      '& .MuiSelect-icon': {
                        color: () => (darkMode ? '#cab054' : '#cab054'),
                      },
                      '& .MuiMenuItem-root': {
                        backgroundColor: darkMode ? 'black' : '#fff',
                        color: () => (darkMode ? 'white' : '#cab054'),
                      },
                      '&.Mui-disabled': {
                        '& .MuiOutlinedInput-notchedOutline': {
                          borderColor: '#9797973f',
                        },
                        backgroundColor: ' #9797973f',
                        color: '#bfbebe',
                        cursor: 'not-allowed',
                        '& .MuiSelect-icon': {
                          color: '#cab054',
                        },
                      },
                    }}
                  >
                    {countries?.map(country => (
                      <CustomMenuItem
                        key={country.isoCode}
                        value={country}
                        darkMode={darkMode}
                      >
                        {country.name}
                      </CustomMenuItem>
                    ))}
                  </Select>
                </FormControl>
              </InputWraper>
            </Item>
            <Item>
              <InputWraper>
                <Label>Restaurant location(city)*</Label>
                <FormControl fullWidth>
                  <Select
                    name='city'
                    disabled={!country}
                    value={hotel.city || ''}
                    onChange={handleChange}
                    sx={{
                      '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#cab054',
                      },
                      color: () => (darkMode ? 'white' : 'black'),
                      '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#cab054',
                      },
                      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#cab054',
                      },
                      '& .MuiSelect-icon': {
                        color: () => (darkMode ? '#cab054' : '#cab054'),
                      },
                      '& .MuiMenuItem-root': {
                        backgroundColor: darkMode ? 'black' : '#fff',
                        color: () => (darkMode ? 'white' : '#cab054'),
                      },
                      '&.Mui-disabled': {
                        '& .MuiOutlinedInput-notchedOutline': {
                          borderColor: '#9797973f',
                        },
                        backgroundColor: ' #9797973f',
                        color: '#bfbebe',
                        cursor: 'not-allowed',
                        '& .MuiSelect-icon': {
                          color: '#bfbebe',
                        },
                      },
                    }}
                  >
                    {states?.map(state => (
                      <CustomMenuItem
                        key={state.isoCode}
                        value={state}
                        darkMode={darkMode}
                      >
                        {state.name}
                      </CustomMenuItem>
                    ))}
                  </Select>
                </FormControl>
              </InputWraper>
            </Item>
            <Item>
              <InputWraper>
                <Label>restaurant description*</Label>
                <InputContainer>
                  <TextArea
                    name='description'
                    value={hotel.description}
                    onChange={handleChange}
                    placeholder='restaurant description'
                  />
                </InputContainer>
              </InputWraper>
            </Item>
            <Item>
              <InputWraper>
                <Label>restaurant street*</Label>
                <InputContainer>
                  <Input
                    name='street'
                    value={hotel.street}
                    onChange={handleChange}
                    placeholder='restaurant street location'
                  />
                </InputContainer>
              </InputWraper>
            </Item>

            <SubmitButton
              dark={darkMode}
              disabled={disabled}
            >
              {' '}
              {loading ? <LoadingAnimation /> : 'register restaurant'}{' '}
            </SubmitButton>
          </Form>
          <ToastContainer />
        </Container>
      </Left>
      <Right>
        {image ? (
          <>
            <Image src={URL.createObjectURL(image)} />
            <SelectAnother>
              <IconButton>
                <Edit />
              </IconButton>
            </SelectAnother>
          </>
        ) : (
          <DropZone
            setFiles={setFile}
            description='drag and drop to select an image'
          />
        )}
      </Right>
    </Wrapper>
  );
};

export default Partner;
