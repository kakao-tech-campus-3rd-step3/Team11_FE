import styled from '@emotion/styled';
import { colors } from '@/style/themes';
import { CATEGORIES, RADII } from '@/constants/filters';

const FiltersContainer = styled.div`
  width: 90%;
  padding: 16px;
  margin-bottom: 16px;
  border: 1px dashed ${colors.secondary300};
  border-radius: 8px;
  box-sizing: border-box;
`;

const FilterSection = styled.div`
  margin-bottom: 16px;
  &:last-child {
    margin-bottom: 0;
  }
`;

const FilterTitle = styled.h3`
  font-size: 0.9rem;
  font-weight: 600;
  margin: 0 0 8px 0;
  color: ${colors.secondary700};
`;

const FilterOptions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const FilterButton = styled.button`
  padding: 8px 12px;
  border-radius: 16px;
  border: 1px solid ${colors.secondary300};
  background-color: #fff;
  cursor: pointer;
  font-size: 0.9rem;

  &.selected {
    background-color: ${colors.primary100};
    border-color: ${colors.primary400};
    font-weight: 500;
  }
`;

interface SearchFiltersProps {
  selectedCategories: string[];
  selectedRadius: string | null;
  onCategoryClick: (category: string) => void;
  onRadiusClick: (radius: string) => void;
}

export const SearchFilters = ({
  selectedCategories,
  selectedRadius,
  onCategoryClick,
  onRadiusClick,
}: SearchFiltersProps) => {
  return (
    <FiltersContainer>
      <FilterSection>
        <FilterTitle>카테고리</FilterTitle>
        <FilterOptions>
          {CATEGORIES.map((category) => (
            <FilterButton
              key={category}
              className={selectedCategories.includes(category) ? 'selected' : ''}
              onClick={() => onCategoryClick(category)}
            >
              {category}
            </FilterButton>
          ))}
        </FilterOptions>
      </FilterSection>

      <FilterSection>
        <FilterTitle>반경</FilterTitle>
        <FilterOptions>
          {RADII.map((radius) => (
            <FilterButton
              key={radius}
              className={selectedRadius === radius ? 'selected' : ''}
              onClick={() => onRadiusClick(radius)}
            >
              {radius}
            </FilterButton>
          ))}
        </FilterOptions>
      </FilterSection>
    </FiltersContainer>
  );
};
