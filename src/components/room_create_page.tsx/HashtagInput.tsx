import React, { useState } from 'react';
import styled from 'styled-components';
import { StyledInput } from './StyledComponents';
import { colors } from '@/style/themes';

const MaxTextLength = 7;
const MaxHashtags = 3;
const HashtagContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.5rem;
  margin-top: 0.5rem;
`;

const Hashtag = styled.span`
  background-color: ${colors.primary100};
  color: ${colors.primary};
  padding: 0.25rem 0.5rem;
  border-radius: 0.75rem;
  font-size: 0.875rem;
  font-weight: 500;
  line-height: 1.25rem;
  display: flex;
  align-items: center;
`;

const RemoveButton = styled.button`
  all: unset;
  margin-left: 6px;
  cursor: pointer;
  font-weight: bold;
`;

export type SetState<T> = React.Dispatch<React.SetStateAction<T>>;

interface HashtagInputProps {
  hashtags: string[];
  onChangeHashtags: (newHashtags: string[]) => void;
}

export const HashtagInput = ({ hashtags, onChangeHashtags }: HashtagInputProps) => {
  const [inputValue, setInputValue] = useState('');

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === ' ' && inputValue.trim() !== '') {
      e.preventDefault();
      const newTag = `#${inputValue.trim()}`;
      if (hashtags.length < MaxHashtags && !hashtags.includes(newTag)) {
        onChangeHashtags([...hashtags, newTag]);
        setInputValue('');
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length <= MaxTextLength) {
      setInputValue(e.target.value);
    }
  };

  const removeHashtag = (tagToRemove: string) => {
    onChangeHashtags(hashtags.filter((tag) => tag !== tagToRemove));
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
