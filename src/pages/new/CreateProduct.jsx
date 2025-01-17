import { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import { Bounce, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from 'react-redux';
import DropZone from '../../components/dropZone/DropZone';
import { appwriteService } from '../../appWrite/appwriteService';
import { useNavigate } from 'react-router-dom';
import { FormControl, MenuItem, Select } from '@mui/material';
import LoadingAnimation from '../../components/loading/LoadingAnimation';
import { AddCircleOutline, Close } from '@mui/icons-material';
import CustomSelect from './MySelect';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column-reverse;

  @media screen and (min-width: 768px) {
    flex-direction: row;
    height: 100%;
    overflow: auto;
  }
`;
const Left = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  @media screen and (min-width: 768px) {
    justify-content: center;
    padding-top: 10rem;
    overflow: auto;
    padding-bottom: 5rem;
  }
`;
const Right = styled.div`
  flex: 1;
  @media screen and (min-width: 768px) {
    position: sticky;
    top: 0;
    z-index: 100;
  }
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
const Form = styled.div`
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
// const Select = styled.select`
//   padding: 0.5rem;
//   background: transparent;
//   outline: none;
//   border: none;
//   flex: 1;
//   min-width: 0 !important;
//   font-size: 1rem;
//   color: ${props => props.theme.color_primary};
//   border: 1px solid var(--color-golden);
//   border-radius: 0.5rem;
// `;
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

const AddIcon = styled(AddCircleOutline)`
  cursor: pointer;
  color: var(--color-golden);
`;
const CloseIcon = styled(Close)`
  cursor: pointer;
  color: white;
  background-color: #8e8e8e61;
  border-radius: 50%;
`;
const ListWrapper = styled.div`
  display: flex;
  gap: 2;
  justify-content: space-between;
`;

const CreateProduct = () => {
  const { currentUser: user } = useSelector(state => state.user);
  const [dish, setDish] = useState({
    title: '',
    price: '',
    size: [],
    instructions: [],
    ingredients: [],
    description: '',
    company: '',
    categories: [],
    restaurant: '',
  });
  const [image, setFile] = useState(null);
  const [myHotels, setMyHotels] = useState([]);
  const [disabled, setDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const [resLoading, setResLoading] = useState(false);
  const { darkMode } = useSelector(state => state.app);

  const getHotels = useCallback(async () => {
    try {
      setResLoading(true);
      const res = await appwriteService.getSingleUserRestaurants(user?.$id);
      setMyHotels(res);
    } catch (error) {
      toast.error('Something went wrong loading your hotels', {
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
      setResLoading(false);
    }
  }, [darkMode, user?.$id]);

  const handleChange = e => {
    const name = e.target.name;
    const value = e.target.value;
    setDish(prev => ({ ...prev, [name]: value }));
  };

  const handleAddField = field => {
    setDish(prev => ({ ...prev, [field]: [...prev[field], ''] }));
  };

  const handleFieldChange = (index, value, field) => {
    setDish(prev => {
      const newField = [...prev[field]];
      newField[index] = value;
      return { ...prev, [field]: newField };
    });
  };

  const handleRemoveField = (index, field) => {
    setDish(prev => {
      const newField = prev[field].filter((_, i) => i !== index);
      return { ...prev, [field]: newField };
    });
  };

  const navigate = useNavigate();
  const handleCategories = cat => {
    setDish(prev => ({ ...prev, categories: [...prev.categories, cat] }));
  };
  const handleSize = size => {
    setDish(prev => ({ ...prev, size: [...prev.size, size] }));
  };
  const handleRemoveItem = index => {
    setDish(prev => ({
      ...prev,
      categories: [...prev.categories.filter((_, i) => i !== index)],
    }));
  };
  const handleSizeRemoveItem = index => {
    setDish(prev => ({
      ...prev,
      size: [...prev.size.filter((_, i) => i !== index)],
    }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await appwriteService.createDish({ ...dish, image });
      if (res) {
        navigate(`/restaurant/${res?.restaurant?.$id}`);
      }
    } catch (error) {
      const message = error?.message || 'Something went wrong';
      console.log(message);
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
    getHotels();
  }, [getHotels]);
  useEffect(() => {
    if (!dish.categories || !dish.price || !dish.title || !image) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }, [dish, image]);

  return (
    <Wrapper>
      <Left>
        <Container dark={darkMode}>
          <Title>Create a New Dish</Title>
          <Form>
            <Item>
              <InputWraper>
                <Label>Dish Title*</Label>
                <InputContainer>
                  <Input
                    name='title'
                    value={dish.title}
                    onChange={handleChange}
                    placeholder='Dish title'
                  />
                </InputContainer>
              </InputWraper>
              <InputWraper>
                {resLoading ? (
                  <LoadingAnimation />
                ) : (
                  <>
                    <Label>Select a Restaurant *</Label>
                    <FormControl fullWidth>
                      <Select
                        name='restaurant'
                        value={dish.restaurant}
                        onChange={e =>
                          setDish(prev => ({
                            ...prev,
                            restaurant: e.target.value,
                          }))
                        }
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
                        {myHotels?.map(res => (
                          <CustomMenuItem
                            key={res.$id}
                            value={res.$id}
                            darkMode={darkMode}
                          >
                            {res.name}
                          </CustomMenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </>
                )}
              </InputWraper>
            </Item>
            <Item>
              <InputWraper>
                <Label>Product Price*</Label>
                <InputContainer>
                  <Input
                    name='price'
                    value={dish.price}
                    onChange={handleChange}
                    placeholder='Product price'
                  />
                </InputContainer>
              </InputWraper>
              <InputWraper>
                <Label>Product Company</Label>
                <InputContainer>
                  <Input
                    name='company'
                    value={dish.company}
                    onChange={handleChange}
                    placeholder='Product company'
                  />
                </InputContainer>
              </InputWraper>
            </Item>
            <Item>
              <InputWraper>
                <Label>dish category*</Label>
                <CustomSelect
                  handleRemoveItem={handleRemoveItem}
                  items={dish.categories}
                  setItems={handleCategories}
                />
              </InputWraper>
            </Item>
            <Item>
              <InputWraper>
                <Label>dish size(s)</Label>
                <CustomSelect
                  handleRemoveItem={handleSizeRemoveItem}
                  items={dish.size}
                  setItems={handleSize}
                />
              </InputWraper>
            </Item>
            <Item>
              <InputWraper>
                <Label>Product Description*</Label>
                <InputContainer>
                  <TextArea
                    name='description'
                    value={dish.description}
                    onChange={handleChange}
                    placeholder='Product description'
                  />
                </InputContainer>
              </InputWraper>
            </Item>
            <Item>
              <ListWrapper>
                <InputWraper>
                  <Label>Ingredients</Label>
                  {dish.ingredients.map((ingredient, index) => (
                    <InputContainer key={index}>
                      <Input
                        value={ingredient}
                        onChange={e =>
                          handleFieldChange(
                            index,
                            e.target.value,
                            'ingredients'
                          )
                        }
                        placeholder={`Ingredient ${index + 1}`}
                      />
                      <CloseIcon
                        onClick={() => handleRemoveField(index, 'ingredients')}
                      />
                    </InputContainer>
                  ))}
                </InputWraper>
                <AddIcon onClick={() => handleAddField('ingredients')} />
              </ListWrapper>
            </Item>
            <Item>
              <ListWrapper>
                <InputWraper>
                  <Label>Instructions</Label>
                  {dish.instructions.map((instruction, index) => (
                    <InputContainer key={index}>
                      <Input
                        value={instruction}
                        onChange={e =>
                          handleFieldChange(
                            index,
                            e.target.value,
                            'instructions'
                          )
                        }
                        placeholder={`Instruction ${index + 1}`}
                      />
                      <CloseIcon
                        onClick={() => handleRemoveField(index, 'instructions')}
                      />
                    </InputContainer>
                  ))}
                </InputWraper>
                <AddIcon onClick={() => handleAddField('instructions')} />
              </ListWrapper>
            </Item>
            <SubmitButton
              onClick={handleSubmit}
              dark={darkMode}
              disabled={disabled}
            >
              {loading ? <LoadingAnimation /> : 'Register Restaurant'}
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
            description='Drag and drop to select an image'
          />
        )}
      </Right>
    </Wrapper>
  );
};

export default CreateProduct;
