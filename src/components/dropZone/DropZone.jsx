import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import styled from 'styled-components';
const Wrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 0.5rem;
  height: 200px;
  @media screen and (max-width: 768px) {
    height: 120px;
  }
`;
const Container = styled.div`
  padding: 0.5rem;
  flex: 1;
  border: 1px dotted var(--color-golden);
  height: 100%;
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
  justify-content: center;
`;
const Select = styled.div`
  background-color: var(--color-golden);
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  cursor: pointer;
  color: #000000dc;
`;
const DropZone = ({ setFiles, description }) => {
  const onDrop = useCallback(
    acceptedFiles => {
      acceptedFiles.forEach(file => {
        setFiles(file);
      });
    },
    [setFiles]
  );
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'image/*': ['.png', '.jpeg', 'jpg', '.gif', '.PNG', '.svg', 'webp'],
    },
    onDrop,
  });
  return (
    <Wrapper>
      <Container {...getRootProps()}>
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the files here ...</p>
        ) : (
          <>
            <p> {description} </p>
            <Select>click to select a file</Select>
          </>
        )}
      </Container>
    </Wrapper>
  );
};

export default DropZone;
