import styled from 'styled-components';
import { colors } from '@/style/themes';

export const StyledInput = styled.input`
  width: 100%;
  box-sizing: border-box;
  color: rgb(42, 48, 56);
  transition: border-color 200ms;
  border-style: solid;
  min-height: 3rem;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5rem;
  padding: 0.75rem;
  border-width: 1px;
  border-color: rgb(229, 231, 235);
  border-radius: 0.5rem;

  &::placeholder {
    color: rgb(156, 163, 175);
  }

  &:focus {
    outline: none;
    border-color: ${colors.primary};
  }
`;

export const StyledSelect = styled(StyledInput).attrs({ as: 'select' })`
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%239CA3AF' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 12px center;
  padding-right: 40px;
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
`;
