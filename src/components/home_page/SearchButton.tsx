import styled from '@emotion/styled';
import { colors } from '@/style/themes';

const SearchInput = styled.input`
  position: absolute;
  top: 32px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 10;
  width: 80%;
  height: 44px;
  padding: 0 15px;
  border: none;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  font-size: 16px;
  &:focus {
    outline: 1px solid ${colors.primary400};
  }
`;

export const SearchButton = () => {
  return <SearchInput type="text" placeholder="어떤 모임을 찾으시나요?" />;
};
