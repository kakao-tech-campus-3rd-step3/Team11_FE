import React from 'react';
import { StyledSelect } from './StyledComponents';

const hobbyCategories = ['스포츠', '식사', '문화/예술', '스터디', '여행', '게임', '덕질', '기타'];

interface HobbySelectorProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export const HobbySelector = ({ value, onChange }: HobbySelectorProps) => {
  return (
    <StyledSelect name="category" value={value} onChange={onChange}>
      <option value="" disabled>
        취미를 선택해주세요
      </option>
      {hobbyCategories.map((category) => (
        <option key={category} value={category}>
          {category}
        </option>
      ))}
    </StyledSelect>
  );
};
