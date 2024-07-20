import { Search as Find, SearchOutlined } from '@mui/icons-material';
import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
const Wrapper = styled.div`
  border-radius: 0.5rem;
  align-self: stretch;
  margin-top: 3rem;
  display: flex;
  flex-direction: column;
  @media screen and (min-width: 768px) {
    padding: 1rem;
  }
`;
const Form = styled.form`
  flex: 1;
  display: flex;
  border: 1px solid var(--color-golden);
  align-items: center;
  gap: 0.5rem;
  .location {
    color: var(--color-golden);
    cursor: pointer;
    font-size: 1.7rem;
  }
  @media screen and (min-width: 768px) {
    padding: 0.2rem;
  }
`;
const Input = styled.input`
  padding: 0.5rem;
  border: none;
  outline: none;
  background: transparent;
  flex: 1;
  font-size: 1rem;
  min-width: 0 !important;
`;
const Submit = styled.button`
  background: var(--color-golden);
  outline: none;
  border: none;
  font-size: 1rem;
  padding: 0.5rem;
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  text-transform: capitalize;
  color: white;
  .search {
    color: white;
    font-size: 1.7rem;
  }
  @media screen and (min-width: 768px) {
    padding: 0.5rem 1rem;
  }
`;
const Search = () => {
  const [title, setTilte] = useState('');
  const { darkMode } = useSelector(state => state.app);
  const navigate = useNavigate();
  const handleSubmit = e => {
    e.preventDefault();
    if (title.length <= 0) return;
    navigate(`/search?search=${title}`);
  };
  return (
    <Wrapper>
      {/* <ButtonContainer>
        <Button
          className={type === 'rent' && 'active'}
          onClick={() => setType('rent')}
        >
          {' '}
          rent
        </Button>
        <Button
          className={type === 'buy' && 'active'}
          onClick={() => setType('buy')}
        >
          buy
        </Button>
      </ButtonContainer> */}
      <Form
        dark={darkMode}
        onSubmit={handleSubmit}
      >
        <SearchOutlined className='location' />
        <Input
          value={title}
          onChange={e => setTilte(e.target.value)}
          placeholder='search for a dish'
        />
        <Submit>
          submit <Find className='search' />
        </Submit>
      </Form>
    </Wrapper>
  );
};

export default Search;
