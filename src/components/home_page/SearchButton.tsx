import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { colors } from '@/style/themes';

const SearchContainer = styled(Link)`
  position: absolute;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 10;
  width: 90%;
  max-width: 480px;
  height: 48px;
  border-radius: 24px;
  background-color: #fff;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  display: flex;
  align-items: center;
  padding: 0 20px;
  text-decoration: none;
  color: ${colors.secondary400};
  font-weight: 500;
  cursor: pointer;
  transition: box-shadow 0.2s ease-in-out;

  &:hover {
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
  }
`;

const SearchText = styled.span`
  margin-left: 8px;
`;

export const SearchButton = () => {
  return (
    <SearchContainer to="/search-room">
      <span>🔍</span>
      <SearchText>모임 검색!</SearchText>
    </SearchContainer>
  );
};
