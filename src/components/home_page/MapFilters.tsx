import styled from '@emotion/styled';
import { colors } from '@/style/themes';

const FiltersContainer = styled.div`
  position: absolute;
  top: 75px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 10;
  width: 100%;
  max-width: calc(100% - 32px);
  overflow-x: auto;
  white-space: nowrap;
  text-align: center;
  padding-bottom: 8px;

  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
`;

const FilterButton = styled.button`
  display: inline-block;
  margin: 0 4px;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  background-color: rgba(255, 255, 255, 0.95);
  cursor: pointer;
  font-size: 0.9rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: all 0.2s ease-in-out;

  &.selected {
    background-color: ${colors.primary400};
    border-color: ${colors.primary400};
    color: white;
    font-weight: 600;
  }
`;

const categories = ['게임', '영화', '맛집탐방', '운동', '스터디', '기타'];

interface MapFiltersProps {
  selectedCategories: string[];
  onCategoryClick: (category: string) => void;
}

export const MapFilters = ({ selectedCategories, onCategoryClick }: MapFiltersProps) => {
  return (
    <FiltersContainer>
      {categories.map((category) => (
        <FilterButton
          key={category}
          className={selectedCategories.includes(category) ? 'selected' : ''}
          onClick={() => onCategoryClick(category)}
        >
          {category}
        </FilterButton>
      ))}
    </FiltersContainer>
  );
};
