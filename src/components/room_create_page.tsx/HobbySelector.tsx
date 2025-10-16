import React from 'react';
import { StyledSelect } from './StyledComponents';

const hobbyCategories = ['운동', '스터디', '게임', '문화/예술', '맛집탐방', '기타'];

interface HobbySelectorProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export const HobbySelector = ({ value, onChange }: HobbySelectorProps) => {
  return (
    <StyledSelect name="hobby" value={value} onChange={onChange}>
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
