import styled, { keyframes } from 'styled-components';
import { Container } from '@/style/CommonStyle';

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
  from {
    transform: translateY(100%);
  }
  to {
    transform: translateY(0%);
  }
`;

const SearchPageContainer = styled(Container)`
  justify-content: flex-start;
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
  animation: ${slideUp} 0.4s ease-out;
`;

const SearchRoom = () => {
  return <SearchPageContainer></SearchPageContainer>;
};

export default SearchRoom;
