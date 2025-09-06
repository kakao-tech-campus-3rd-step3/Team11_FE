import styled from '@emotion/styled';
import type { ButtonHTMLAttributes } from 'react';

const Button = styled.button`
  all: unset;
  width: auto;
  height: auto;
  font-size: 1rem;
  border: none;
  color: '#000000';
  background-color: 'trransparent';
  cursor: pointer;
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: scale(1.1);
  }
`;

export const LoginButton = (props: ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <Button {...props}>
      {'<'}Login{'/>'}
    </Button>
  );
};
