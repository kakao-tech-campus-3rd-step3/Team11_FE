import styled from 'styled-components';
import { colors } from '@/style/themes';

export const StyledInput = styled.input`
  width: 100%;
  padding: 12px;
  font-size: 1rem;
  border: 1px solid ${colors.secondary200};
  border-radius: 8px;
  box-sizing: border-box;

  &::placeholder {
    color: ${colors.secondary300};
  }

  &:focus {
    outline: none;
    border-color: ${colors.primary400};
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
  gap: 16px;
`;
