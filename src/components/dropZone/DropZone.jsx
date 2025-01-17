import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import styled from 'styled-components';
import { Bounce, toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from 'react-redux';

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
  const { darkMode } = useSelector(state => state.app);
  const onDrop = useCallback(
    acceptedFiles => {
      acceptedFiles.forEach(file => {
        setFiles(file);
      });
    },
    [setFiles]
  );

  const { getRootProps, getInputProps, isDragActive, fileRejections } =
    useDropzone({
      accept: {
        'image/png': ['.png'],
        'image/jpeg': ['.jpeg', '.jpg'],
        'image/svg+xml': ['.svg'],
        'image/webp': ['.webp'],
      },
      onDrop,
      maxSize: 5 * 1024 * 1024, // 5MB
      onDropRejected: fileRejections => {
        fileRejections.forEach(({ errors }) => {
          errors.forEach(err => {
            toast.error(err.message, {
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
          });
        });
      },
    });

  return (
    <Wrapper>
      <Container {...getRootProps()}>
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the files here ...</p>
        ) : (
          <>
            <p>{description}</p>
            <Select>Click to select a file</Select>
          </>
        )}
      </Container>
      <ToastContainer />
    </Wrapper>
  );
};

export default DropZone;
