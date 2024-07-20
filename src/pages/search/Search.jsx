import styled from 'styled-components';
import { SearchOutlined } from '@mui/icons-material';
import { useSearchParams } from 'react-router-dom';
import DishesList from '../../components/list/DishesList';
import LoadingAnimation from '../../components/loading/LoadingAnimation';
import Error from '../../components/error/Error';
import { useCallback, useEffect, useState } from 'react';
import { appwriteService } from '../../appWrite/appwriteService';
const Container = styled.div`
  display: flex;
  overflow: auto;
  height: 91.5vh;
  gap: 0.5rem;
  padding: 1rem 0 0 0;
  flex-direction: column;
  cursor: pointer;
  @media screen and (min-width: 768px) {
    flex-direction: row;
    /* align-items: flex-start; */
  }
`;
const Left = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;
const Right = styled.div`
  flex: 1;
  .map {
    width: 100%;
    height: 100%;
  }
  background-color: red;
  @media screen and (min-width: 768px) {
    max-width: 500px;
  }
`;
const Introduction = styled.p`
  font-size: 1.2rem;
`;
const Label = styled.p``;
const InputContainer = styled.div`
  display: flex;
  padding: 0.5rem;
  gap: 0.5rem;
  /* border: 1px solid #a6a5a5bf; */
  border: 1px solid var(--color-golden);
  border-radius: 0.3rem;
  &.container {
    padding: 0;
    border: none;
    flex: 1;
  }
`;
const Input = styled.input`
  background: transparent;
  outline: none;
  border: none;
  flex: 1;
  min-width: 0 !important;
  font-size: 1rem;
  color: ${props => props.theme.color_primary};
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
`;
const Option = styled.option`
  background-color: transparent;
  appearance: none;
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  @media screen and (min-width: 768px) {
    flex-direction: row;
    align-items: flex-end;
  }
`;
const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;
const SubmitButton = styled.button`
  background: var(--color-golden);
  outline: none;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.5rem;
  font-size: 1rem;
  cursor: pointer;
  @media screen and (min-width: 768px) {
    align-items: center;
  }
`;
const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [query, setQuery] = useState({
    title: searchParams.get('search') || '',
    location: '',
    minPrice: 0,
    maxPrice: 1000000,
    property: 'apartment',
  });
  const [dishes, setDishes] = useState([]);

  const search = useCallback(async () => {
    try {
      const data = await appwriteService.search(searchParams.get('search'));
      setDishes(data);
    } catch (error) {
      setError(error);
    }
  }, [searchParams]);
  const onChange = e => {
    const name = e.target.name;
    const value = e.target.value;
    setQuery(prev => ({ ...prev, [name]: value }));
  };
  const handleSubmit = e => {
    e.preventDefault();
    setSearchParams(query);
  };
  useEffect(() => {
    search();
  }, [search]);
  if (error) {
    console.log(error);
  }
  // if (error) return <Error messege={error} />;
  return (
    <Container>
      <Left>
        <Introduction>
          Search results for <strong> {searchParams.get('search')} </strong>
        </Introduction>
        {/* <Form onSubmit={handleSubmit}>
          <InputContainer className='container'>
            <InputWrapper>
              <Label>Type</Label>
              <Select
                onChange={onChange}
                name='type'
                value={query.type}
              >
                <Option>rent</Option>
                <Option>buy</Option>
              </Select>
            </InputWrapper>
            <InputWrapper>
              <Label>property</Label>
              <Select
                onChange={onChange}
                name='property'
                value={query.property}
              >
                <Option>apartment</Option>
                <Option>house</Option>
                <Option>condo</Option>
                <Option>land</Option>
              </Select>
            </InputWrapper>
          </InputContainer>
          <InputContainer className='container'>
            <InputWrapper>
              <Label>minPrice</Label>
              <InputContainer>
                <Input
                  placeholder='0'
                  type='number'
                  onChange={onChange}
                  name='minPrice'
                  value={query.minPrice}
                />
              </InputContainer>
            </InputWrapper>
            <InputWrapper>
              <Label>maxPrice</Label>
              <InputContainer>
                <Input
                  placeholder='0'
                  type='number'
                  onChange={onChange}
                  name='maxPrice'
                  value={query.maxPrice}
                />
              </InputContainer>
            </InputWrapper>
          </InputContainer>
          <SubmitButton>
            <SearchOutlined />
            search
          </SubmitButton>
        </Form> */}
        {error ? (
          <p>could not load posts</p>
        ) : loading ? (
          <LoadingAnimation />
        ) : (
          <DishesList dishes={dishes} />
        )}
      </Left>
    </Container>
  );
};

export default Search;
