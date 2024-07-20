import { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import LoadingAnimation from '../../components/loading/LoadingAnimation';
import { Bounce, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from 'react-redux';
import DropZone from '../../components/dropZone/DropZone';
import { appwriteService } from '../../appWrite/appwriteService';
import { useNavigate } from 'react-router-dom';
import Error from '../../components/error/Error';
const Wrapper = styled.div`
  display: flex;
  flex-direction: column-reverse;
  @media screen and (min-width: 768px) {
    flex-direction: row;
  }
`;
const Left = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  @media screen and (min-width: 768px) {
    justify-content: center;
  }
`;
const Right = styled.div`
  flex: 1;
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
  object-fit: cover;
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
const Select = styled.select`
  padding: 0.5rem;
  background: transparent;
  outline: none;
  border: none;
  flex: 1;
  min-width: 0 !important;
  font-size: 1rem;
  color: ${props => props.theme.color_primary};
  border: 1px solid var(--color-golden);
  border-radius: 0.5rem;
`;
const Option = styled.option``;
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

const CreateProduct = () => {
  const { currentUser: user } = useSelector(state => state.user);
  const [hotel, setHotel] = useState({
    title: '',
    price: '',
    size: [],
    instructions: [],
    ingridients: [],
    description: '',
    image: null,
    company: '',
    categories: [],
    rating: '',
  });
  const [image, setFile] = useState(null);
  const [myHotels, setMyHotels] = useState([]);
  const [disabled, setDisabled] = useState(true);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { darkMode } = useSelector(state => state.app);
  const getHotels = useCallback(async () => {
    try {
      setLoading(true);
      const res = await appwriteService.getSingleUserRestaurants(user?.$id);
      setMyHotels(res);
    } catch (error) {
      setError(error);
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, [user]);
  const handleChange = e => {
    const name = e.target.name;
    const value = e.target.value;
    setHotel(prev => ({ ...prev, [name]: value }));
  };
  const navigate = useNavigate();
  const handleSubmit = async e => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await appwriteService.createRestaurant({ ...hotel, image });
      console.log(res);
      if (res) {
        navigate(`/restaurant/${res.$id}`);
      }
    } catch (error) {
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
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getHotels();
  }, [getHotels]);
  if (loading)
    return (
      <Wrapper>
        <LoadingAnimation />
      </Wrapper>
    );
  if (error)
    return (
      <Wrapper>
        <Error messege={error} />
      </Wrapper>
    );
  return (
    <Wrapper>
      <Left>
        <Container dark={darkMode}>
          <Title>create a new product </Title>
          {/* <Description>just a few step and you are ready to go</Description> */}
          {/* <Title>Restaurant details</Title> */}

          <Form onSubmit={handleSubmit}>
            <Item>
              <InputWraper>
                <Label>product title*</Label>
                <InputContainer>
                  <Input
                    name='title'
                    value={hotel.title}
                    onChange={handleChange}
                    placeholder='product title'
                  />
                </InputContainer>
              </InputWraper>
              <Select>
                {myHotels?.map(item => (
                  <Option key={item?.$id}> {item?.name} </Option>
                ))}
              </Select>
            </Item>
            <Item>
              <InputWraper>
                <Label>product price*</Label>
                <InputContainer>
                  <Input
                    name='price'
                    value={hotel.price}
                    onChange={handleChange}
                    placeholder='product price'
                  />
                </InputContainer>
              </InputWraper>{' '}
              <InputWraper>
                <Label>product company</Label>
                <InputContainer>
                  <Input
                    name='company'
                    value={hotel.company}
                    onChange={handleChange}
                    placeholder='product company'
                  />
                </InputContainer>
              </InputWraper>
            </Item>
            <Item>
              <InputWraper>
                <Label>product description*</Label>
                <InputContainer>
                  <TextArea
                    name='description'
                    value={hotel.description}
                    onChange={handleChange}
                    placeholder='product description'
                  />
                </InputContainer>
              </InputWraper>
            </Item>
            <Item>
              <InputWraper>
                <Label>product street*</Label>
                <InputContainer>
                  <Input
                    name='street'
                    value={hotel.street}
                    onChange={handleChange}
                    placeholder='product street location'
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
          <Image src={URL.createObjectURL(image)} />
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

export default CreateProduct;
