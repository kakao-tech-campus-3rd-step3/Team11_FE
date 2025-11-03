import { FormInput } from '@/pages/My.styled';
import styled from 'styled-components';

const LocationInputContainer = styled.div`
  position: relative;
`;

const SuggestionList = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background-color: white;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  margin-top: 4px;
  max-height: 200px;
  overflow-y: auto;
  z-index: 100;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const SuggestionItem = styled.div`
  padding: 8px 12px;
  cursor: pointer;
  border-bottom: 1px solid #e5e7eb;
  transition: background-color 0.2s;

  &:hover {
    background-color: #f3f4f6;
  }

  &:last-child {
    border-bottom: none;
  }
`;

interface LocationInputProps {
  sido: string;
  setSido: (value: string) => void;
  sigungu: string;
  onSigunguChange: (value: string) => void;
  onSigunguFocus: () => void;
  onSigunguSelect: (value: string) => void;
  onSigunguBlur: () => void;
  sigunguSuggestions: string[];
  showSigunguSuggestions: boolean;
  disabled?: boolean;
}

export const LocationInput = ({
  sido,
  setSido,
  sigungu,
  onSigunguChange,
  onSigunguFocus,
  onSigunguSelect,
  onSigunguBlur,
  sigunguSuggestions,
  showSigunguSuggestions,
  disabled = false,
}: LocationInputProps) => {
  return (
    <div style={{ display: 'flex', gap: '8px', flexDirection: 'column' }}>
      <FormInput
        type="text"
        value={sido}
        onChange={(e) => setSido(e.target.value)}
        placeholder="시/도 (예: 부산광역시)"
      />
      <LocationInputContainer>
        <FormInput
          type="text"
          value={sigungu}
          onChange={(e) => onSigunguChange(e.target.value)}
          onFocus={onSigunguFocus}
          onBlur={onSigunguBlur}
          disabled={disabled}
          placeholder="시/군/구 (예: 금정구)"
        />
        {showSigunguSuggestions && sigunguSuggestions.length > 0 && (
          <SuggestionList>
            {sigunguSuggestions.map((suggestion, index) => (
              <SuggestionItem
                key={index}
                onClick={() => onSigunguSelect(suggestion)}
              >
                {suggestion}
              </SuggestionItem>
            ))}
          </SuggestionList>
        )}
      </LocationInputContainer>
    </div>
  );
};

