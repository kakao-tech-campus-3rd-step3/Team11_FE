import { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { Container } from '@/style/CommonStyle';
import { SearchHeader } from '@/components/search_page/SearchHeader';
import { useNavigate } from 'react-router-dom';

const dummyData = [
  {
    id: 1,
    title: '금정구에서 같이 공부할 분!',
    location: '스타벅스 부산대역점',
    category: '스터디',
  },
  { id: 2, title: '저녁에 농구하실 분 구합니다', location: '온천천 농구장', category: '운동' },
  {
    id: 3,
    title: '주말에 보드게임 하실 분',
    location: '히어로보드게임카페 부산대점',
    category: '취미',
  },
];

const slideUp = keyframes`
  from { transform: translateY(100%); }
  to { transform: translateY(0%); }
`;

const slideDown = keyframes`
  from { transform: translateY(0%); }
  to { transform: translateY(100%); }
`;

const SearchPageContainer = styled(Container)<{ $closing?: boolean }>`
  justify-content: flex-start;
  padding-top: 6rem;
  height: 100vh;
  max-width: 720px;
  background-color: #ffffffff;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: 0 auto;
  z-index: 100;
  animation: ${({ $closing }) => ($closing ? slideDown : slideUp)} 0.4s ease-out forwards;
`;

const Search = () => {
  const [isClosing, setIsClosing] = useState(false);
  const navigate = useNavigate();

  const handleBackButtonClick = () => {
    setIsClosing(true);
  };

  useEffect(() => {
    if (isClosing) {
      const timer = setTimeout(() => {
        navigate(-1);
      }, 400);
      return () => clearTimeout(timer);
    }
  }, [isClosing, navigate]);

  return (
    <SearchPageContainer $closing={isClosing}>
      <SearchHeader onBackButtonClick={handleBackButtonClick} />
    </SearchPageContainer>
  );
};

export default Search;
