import styled from '@emotion/styled';
import { colors } from '@/style/themes';
import { useRef, useState, useCallback } from 'react';

const FiltersContainer = styled.div`
  position: absolute;
  top: 75px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 10;
  width: 90%;
  max-width: 480px;

  overflow-x: auto;
  white-space: nowrap;
  padding-bottom: 8px;

  user-select: none;
  cursor: grab;

  &:active {
    cursor: grabbing;
  }

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

const categories = [
  '스포츠',
  '맛집탐방',
  '문화예술',
  '스터디',
  '여행',
  '게임',
  '덕질',
  '기타',
] as const;

interface MapFiltersProps {
  selectedCategories: string[];
  onCategoryClick: (category: string) => void;
}

export const MapFilters = ({ selectedCategories, onCategoryClick }: MapFiltersProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const onMouseDown = useCallback((e: React.MouseEvent) => {
    if (!scrollRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  }, []);

  const onMouseLeave = useCallback(() => {
    setIsDragging(false);
  }, []);

  const onMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  const onMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!isDragging || !scrollRef.current) return;
      e.preventDefault();
      const x = e.pageX - scrollRef.current.offsetLeft;
      const walk = (x - startX) * 1.5;
      scrollRef.current.scrollLeft = scrollLeft - walk;
    },
    [isDragging, startX, scrollLeft],
  );

  return (
    <FiltersContainer
      ref={scrollRef}
      onMouseDown={onMouseDown}
      onMouseLeave={onMouseLeave}
      onMouseUp={onMouseUp}
      onMouseMove={onMouseMove}
    >
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
