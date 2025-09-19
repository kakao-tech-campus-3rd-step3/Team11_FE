import React, { useState } from 'react';
import styled from 'styled-components';
import { StyledInput } from './StyledComponents';

const HashtagContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
  margin-top: 8px;
`;

const Hashtag = styled.span`
  background-color: #eef2ff;
  color: #4f46e5;
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 0.875rem;
  display: flex;
  align-items: center;
`;

const RemoveButton = styled.button`
  all: unset;
  margin-left: 6px;
  cursor: pointer;
  font-weight: bold;
`;

interface HashtagInputProps {
  hashtags: string[];
  setHashtags: React.Dispatch<React.SetStateAction<string[]>>;
}

export const HashtagInput = ({ hashtags, setHashtags }: HashtagInputProps) => {
  const [inputValue, setInputValue] = useState('');

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === ' ' && inputValue.trim() !== '') {
      e.preventDefault();
      if (hashtags.length < 3) {
        setHashtags([...hashtags, `#${inputValue.trim()}`]);
        setInputValue('');
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // 7자 글자 수 제한
    if (e.target.value.length <= 7) {
      setInputValue(e.target.value);
    }
  };

  const removeHashtag = (tagToRemove: string) => {
    setHashtags(hashtags.filter((tag) => tag !== tagToRemove));
  };

  return (
    <>
      <StyledInput
        type="text"
        value={inputValue}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder="태그 입력 후 스페이스바"
        disabled={hashtags.length >= 3}
      />
      <HashtagContainer>
        {hashtags.map((tag) => (
          <Hashtag key={tag}>
            {tag}
            <RemoveButton onClick={() => removeHashtag(tag)}>x</RemoveButton>
          </Hashtag>
        ))}
      </HashtagContainer>
    </>
  );
};
