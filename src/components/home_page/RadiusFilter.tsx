import styled from '@emotion/styled';
import { colors } from '@/style/themes';

const FilterContainer = styled.div`
  position: absolute;
  top: 120px;
  right: 16px;
  z-index: 10;
  display: flex;
  flex-direction: column;
  gap: 6px;
  background-color: rgba(255, 255, 255, 0.9);
  padding: 8px;
  border-radius: 28px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
`;

const FilterButton = styled.button`
  width: 46px;
  height: 46px;
  border-radius: 50%;
  border: 1px solid ${colors.secondary200};
  background-color: white;
  cursor: pointer;
  font-size: 0.85rem;
  font-weight: 500;
  color: ${colors.secondary500};
  transition: all 0.2s ease-in-out;

  &.selected {
    background-color: ${colors.primary400};
    border-color: ${colors.primary400};
    color: white;
    font-weight: 700;
  }
`;

const radii = ['1km', '3km', '5km'];

interface RadiusFilterProps {
  selectedRadius: string | null;
  onRadiusClick: (radius: string) => void;
}

export const RadiusFilter = ({ selectedRadius, onRadiusClick }: RadiusFilterProps) => {
  return (
    <FilterContainer>
      {radii.map((radius) => (
        <FilterButton
          key={radius}
          className={selectedRadius === radius ? 'selected' : ''}
          onClick={() => onRadiusClick(radius)}
        >
          {radius}
        </FilterButton>
      ))}
    </FilterContainer>
  );
};
