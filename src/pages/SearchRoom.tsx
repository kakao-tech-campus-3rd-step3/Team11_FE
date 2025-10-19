import { useState, useEffect, useMemo, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { Container } from '@/style/CommonStyle';
import { CommonHeader } from '@/components/common/CommonHeader';
import { SearchInput } from '@/components/search_page/SearchInput';
import { SearchFilters } from '@/components/search_page/SearchFilters';
import { SearchResultList } from '@/components/search_page/SearchResultList';
import { getMeetings, type GetMeetingsParams } from '@/api/meeting_list';
import type { Meeting } from '@/types/meeting';

// ✅ 이 값을 false로 바꾸면 실제 API를 호출하고, true로 바꾸면 아래 mockMeetings를 사용합니다.
const USE_MOCK_DATA = true;

const mockMeetings: Meeting[] = [
  {
    id: 1,
    title: '부산대 앞에서 같이 코딩할 분',
    category: '스터디',
    hashtags: ['#코딩', '#초보환영'],
    mannerTemperatureLimit: 30,
    deadline: '2025-10-16T18:00:00',
    description: '리액트 스터디원을 모집합니다.',
    address: '스타벅스 부산대역점',
    latitude: 35.2335,
    longitude: 129.081,
    currentMembers: 2,
    maxMembers: 5,
  },
  {
    id: 2,
    title: '저녁에 농구 한 게임!',
    category: '운동',
    hashtags: ['#농구', '#평일저녁'],
    mannerTemperatureLimit: 20,
    deadline: '2025-10-15T19:00:00',
    description: '같이 땀 흘리실 분 구합니다!',
    address: '온천천 농구장',
    latitude: 35.2101,
    longitude: 129.0683,
    currentMembers: 8,
    maxMembers: 10,
  },
  {
    id: 3,
    title: '주말 보드게임 모임',
    category: '게임',
    hashtags: ['#보드게임', '#주말'],
    mannerTemperatureLimit: 36,
    deadline: '2025-10-18T14:00:00',
    description: '다양한 보드게임 함께 즐겨요.',
    address: '히어로보드게임카페 서면점',
    latitude: 35.1578,
    longitude: 129.0594,
    currentMembers: 3,
    maxMembers: 6,
  },
  {
    id: 4,
    title: '서면에서 마라탕 드실 분',
    category: '맛집탐방',
    hashtags: ['#마라탕', '#중식'],
    mannerTemperatureLimit: 36.5,
    deadline: '2025-10-17T19:30:00',
    description: '서면 맛집 같이 가요!',
    address: '라라관 서면점',
    latitude: 35.158,
    longitude: 129.06,
    currentMembers: 1,
    maxMembers: 4,
  },
  {
    id: 5,
    title: '이번 주 개봉 영화 보러 갈 사람',
    category: '영화',
    hashtags: ['#영화', '#최신영화'],
    mannerTemperatureLimit: 32,
    deadline: '2025-10-19T20:00:00',
    description: '영화 보고 치맥하실 분 구합니다.',
    address: 'CGV 서면',
    latitude: 35.157,
    longitude: 129.058,
    currentMembers: 1,
    maxMembers: 2,
  },
  {
    id: 6,
    title: '기타 연주 함께 연습해요',
    category: '기타',
    hashtags: ['#음악', '#기타'],
    mannerTemperatureLimit: 25,
    deadline: '2025-10-20T17:00:00',
    description: '기타 연습 같이 하실 분!',
    address: '부산시민공원',
    latitude: 35.168,
    longitude: 129.055,
    currentMembers: 3,
    maxMembers: 5,
  },
];

interface LocationData {
  lat: number;
  lng: number;
}

const useDebounce = (value: string, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => clearTimeout(handler);
  }, [value, delay]);
  return debouncedValue;
};

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

const SearchStatusText = styled.p`
  text-align: center;
  margin-top: 2rem;
  color: #6b7280;
`;

const BUSAN_UNIVERSITY_LOCATION: LocationData = {
  lat: 35.2335,
  lng: 129.081,
};

const SearchRoom = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isClosing, setIsClosing] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedRadius, setSelectedRadius] = useState<string | null>(null);
  const [results, setResults] = useState<Meeting[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [userLocation, setUserLocation] = useState<LocationData | null>(null);
  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  const searchCenter = useMemo<LocationData | null>(() => {
    return location.state?.searchCenter || null;
  }, [location.state]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      (err) => {
        console.error('위치 정보를 가져오는데 실패했습니다:', err);
        setUserLocation(BUSAN_UNIVERSITY_LOCATION);
      },
    );
  }, []);

  const fetchMeetings = useCallback(async () => {
    if (searchCenter && !selectedRadius) {
      setResults([]);
      return;
    }
    setIsLoading(true);
    setError(null);

    if (USE_MOCK_DATA) {
      setTimeout(() => {
        let data = mockMeetings;
        if (debouncedSearchQuery) {
          data = data.filter((m) =>
            m.title.toLowerCase().includes(debouncedSearchQuery.toLowerCase()),
          );
        }
        if (selectedCategories.length > 0) {
          data = data.filter((m) => selectedCategories.includes(m.category));
        }
        setResults(data);
        setIsLoading(false);
      }, 500);
    } else {
      try {
        const params: GetMeetingsParams = {};
        const locationForApi = searchCenter || userLocation;
        if (debouncedSearchQuery) params.name = debouncedSearchQuery;
        if (selectedCategories.length > 0) params.hobby = selectedCategories.join(',');
        if (locationForApi) {
          params.latitude = locationForApi.lat;
          params.longitude = locationForApi.lng;
          if (selectedRadius) {
            params.radius = parseInt(selectedRadius.replace('km', ''), 10);
          }
        }
        const data = await getMeetings(params);
        setResults(data);
      } catch (err: any) {
        setError(err.message || '모임을 불러오는 데 실패했습니다.');
      } finally {
        setIsLoading(false);
      }
    }
  }, [debouncedSearchQuery, selectedCategories, selectedRadius, searchCenter, userLocation]);

  useEffect(() => {
    if (userLocation || searchCenter) {
      fetchMeetings();
    }
  }, [fetchMeetings, userLocation, searchCenter]);

  const handleBackButtonClick = () => setIsClosing(true);
  const handleCategoryClick = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category],
    );
  };
  const handleRadiusClick = (radius: string) => {
    setSelectedRadius((prev) => (prev === radius ? null : radius));
  };

  useEffect(() => {
    if (isClosing) {
      const timer = setTimeout(() => navigate(-1), 400);
      return () => clearTimeout(timer);
    }
  }, [isClosing, navigate]);

  return (
    <SearchPageContainer $closing={isClosing}>
      <CommonHeader title="모임 검색" onBackButtonClick={handleBackButtonClick} />
      <SearchInput query={searchQuery} setQuery={setSearchQuery} />
      <SearchFilters
        selectedCategories={selectedCategories}
        selectedRadius={selectedRadius}
        onCategoryClick={handleCategoryClick}
        onRadiusClick={handleRadiusClick}
      />
      {isLoading && <SearchStatusText>검색 중...</SearchStatusText>}
      {error && <SearchStatusText style={{ color: 'red' }}>{error}</SearchStatusText>}
      {!isLoading && !error && (
        <SearchResultList
          results={results.map((meeting) => ({
            ...meeting,
            location: meeting.address,
          }))}
        />
      )}
    </SearchPageContainer>
  );
};

export default SearchRoom;
