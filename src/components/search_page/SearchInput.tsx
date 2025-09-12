import styled from '@emotion/styled';
import { colors } from '@/style/themes';

const InputWrapper = styled.div`
  width: 90%;
  margin: 16px 0;
  position: relative;
`;

const Input = styled.input`
  width: 100%;
  height: 48px;
  padding: 0 20px 0 45px;
  border: 1px solid ${colors.secondary300};
  border-radius: 24px;
  font-size: 1rem;
  outline: none;
  box-sizing: border-box;

  &:focus {
    border-color: ${colors.primary400};
  }
`;

const SearchIcon = styled.span`
  position: absolute;
  left: 15px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 20px;
`;

interface SearchInputProps {
  query: string;
  setQuery: (query: string) => void;
}

export const SearchInput = ({ query, setQuery }: SearchInputProps) => {
  return (
    <InputWrapper>
      <SearchIcon>🔍</SearchIcon>
      <Input
        type="text"
        placeholder="검색"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    </InputWrapper>
  );
};
