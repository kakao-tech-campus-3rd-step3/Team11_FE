import React from 'react';
import styled from 'styled-components';
import { StyledSelect } from './StyledComponents'; // 스타일 재사용

// 취미 데이터를 카테고리별로 그룹화
const hobbyData = [
  {
    category: '스포츠',
    hobbies: ['풋살', '축구', '농구', '배드민턴', '볼링', '테니스'],
  },
  {
    category: '관람/문화',
    hobbies: ['영화', '전시회', '뮤지컬', '콘서트', '독서'],
  },
  {
    category: '게임',
    hobbies: ['보드게임', 'PC게임', '콘솔게임'],
  },
  {
    category: '기타',
    hobbies: ['스터디', '코딩', '맛집탐방'],
  },
];

interface HobbySelectorProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export const HobbySelector = ({ value, onChange }: HobbySelectorProps) => {
  return (
    <StyledSelect name="hobby" value={value} onChange={onChange}>
      {hobbyData.map((group) => (
        <optgroup key={group.category} label={group.category}>
          {group.hobbies.map((hobby) => (
            <option key={hobby} value={hobby}>
              {hobby}
            </option>
          ))}
        </optgroup>
      ))}
    </StyledSelect>
  );
};
