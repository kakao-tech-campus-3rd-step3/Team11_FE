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
    return () => {
      clearTimeout(handler);
    };
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

    try {
      const params: GetMeetingsParams = {};
      const locationForApi = searchCenter || userLocation;

      if (debouncedSearchQuery) {
        params.name = debouncedSearchQuery;
      }
      if (selectedCategories.length > 0) {
        params.hobby = selectedCategories.join(',');
      }
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
  }, [debouncedSearchQuery, selectedCategories, selectedRadius, searchCenter, userLocation]);

  useEffect(() => {
    if (userLocation || searchCenter) {
      fetchMeetings();
    }
  }, [fetchMeetings, userLocation, searchCenter]);

  const handleBackButtonClick = () => {
    setIsClosing(true);
  };

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
      const timer = setTimeout(() => {
        navigate(-1);
      }, 400);
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
