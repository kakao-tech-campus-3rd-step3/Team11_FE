import React from 'react';
import { StyledSelect } from './StyledComponents';

const hobbyData = [
  {
    category: '운동',
    hobbies: ['풋살', '축구', '농구', '배드민턴', '볼링', '테니스', '헬스', '러닝'],
  },
  {
    category: '스터디',
    hobbies: ['코딩', '외국어', '독서', '자격증', '면접 준비'],
  },
  {
    category: '게임',
    hobbies: ['보드게임', 'PC게임', '콘솔게임', '모바일게임'],
  },
  {
    category: '문화/예술',
    hobbies: ['영화', '전시회', '뮤지컬', '콘서트', '공연 관람'],
  },
  {
    category: '맛집탐방',
    hobbies: ['맛집투어', '카페투어', '빵집투어', '요리/베이킹'],
  },
  {
    category: '기타',
    hobbies: ['산책', '여행', '봉사활동', '반려동물'],
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
