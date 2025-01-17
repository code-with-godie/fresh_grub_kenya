import { Close } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import React, { useState } from 'react';
import styled from 'styled-components';

const Container = styled.form`
  display: flex;
  gap: 0.5rem;
  overflow: auto;
  border: 1px solid var(--color-golden);
  padding: 0.3rem;
  border-radius: 0.5rem;
  align-items: center;
  ::-webkit-scrollbar {
    height: 0;
  }
`;
const Input = styled.input`
  padding: 0.5rem;
  border-radius: 0.5rem;
  flex: 1;
  min-width: 200px;
  border: none;
  outline: none;
  color: ${props => props.theme.color_primary};
  background-color: transparent;
`;
const Item = styled.button`
  padding: 0.3rem;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  background-color: #80808056;
  border-radius: 1rem;
  outline: none;
  border: none;
  flex-shrink: 0;
  color: white;
`;
const InputList = ({ items, setItems, handleRemoveItem }) => {
  const [inputValue, setInputValue] = useState('');
  const handleInputChange = e => {
    setInputValue(e.target.value);
  };

  const handleAddItem = e => {
    e.preventDefault();
    if (inputValue.trim() !== '') {
      setItems(inputValue);
      setInputValue('');
    }
  };

  return (
    <Container onSubmit={handleAddItem}>
      {items.map((item, index) => (
        <Item key={index}>
          {item}{' '}
          <IconButton
            style={{ padding: '.1rem' }}
            onClick={() => handleRemoveItem(index)}
          >
            <Close
              fontSize='small'
              style={{ color: 'white' }}
            />
          </IconButton>
        </Item>
      ))}
      <Input
        type='text'
        value={inputValue}
        onChange={handleInputChange}
        placeholder='product category'
      />
    </Container>
  );
};

export default InputList;
