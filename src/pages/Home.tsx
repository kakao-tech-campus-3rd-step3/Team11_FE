// src/pages/Home.tsx
import { useRef, useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styled, { createGlobalStyle } from 'styled-components';
import GlobalStyle from '@/style/GlobalStyle';
import { colors } from '@/style/themes';
import apikey from '@/config/apikey';
import { SearchButton } from '@/components/home_page/SearchButton';
import { useKakaoMap } from '@/hooks/useKakaoMap';
import { Overlay, OVERLAY_ANIMATION_DURATION } from '@/components/common/Overlay';
import BottomNav from '@/components/common/BottomNav';
import { Container } from '@/style/CommonStyle';
import type { Meeting } from '@/types/meeting';
import { MeetingDetailModal } from '@/components/home_page/MeetingDetailModal';
import { INFO_MESSAGES } from '@/constants/messages';
import { MapFilters } from '@/components/home_page/MapFilters';
import { RadiusFilter } from '@/components/home_page/RadiusFilter';
import { useUserLocation } from '@/hooks/useUserLocation';
import { useMeetings } from '@/hooks/useMeetings';
import { useMeetingMarkers } from '@/hooks/useMeetingMarkers';
import { categoryMap } from '@/utils/categoryMapper';

// ... (KakaoMapCssFix, MarkerStyles, HomePageContainer, MapArea, MapContainer, MessageOverlay, CancelSearchButton 선언) ...
// (기존 코드와 동일)

const KakaoMapCssFix = createGlobalStyle`
  #kakaoMap img { max-width: none !important; }
`;

const MarkerStyles = createGlobalStyle`
  .custom-div-icon { 
    position: relative; 
    width: 30px; 
    height: 42px; 
  }
  .marker-pin { 
    width: 30px; 
    height: 30px; 
    border-radius: 50% 50% 50% 0;
    background: #fff;
    border: 3px solid ${colors.primary400};
    position: absolute; 
    transform: rotate(-45deg);
    left: 50%; 
    top: 50%;
    margin: -15px 0 0 -15px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .marker-icon {
    width: 16px;
    height: 16px;
    transform: rotate(45deg);
    fill: ${colors.primary400};
  }
`;

const HomePageContainer = styled(Container)`
  justify-content: space-between;
`;

const MapArea = styled.div`
  flex: 1;
  position: relative;
  overflow: hidden;
  width: 100%;
  background-color: #f0f0f0;
`;

const MapContainer = styled.div.attrs({ id: 'kakaoMap' })`
  width: 100%;
  height: 100%;
`;

const MessageOverlay = styled.div`
  position: absolute;
  top: 130px;
  left: 50%;
  transform: translateX(-50%);
  background-color: rgba(0, 0, 0, 0.75);
  color: white;
  padding: 10px 20px;
  border-radius: 20px;
  z-index: 5;
  font-size: 14px;
  text-align: center;
  max-width: calc(100% - 40px);
`;

const CancelSearchButton = styled.button`
  position: absolute;
  top: 500px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 5;
  background-color: ${colors.primary500};
  color: white;
  border: none;
  border-radius: 20px;
  padding: 8px 16px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
`;

interface MapFiltersState {
  categories: string[];
  radius: string | null;
  query: string | null;
}

const Home = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [selectedMeeting, setSelectedMeeting] = useState<Meeting | null>(null);
  const [filters, setFilters] = useState<MapFiltersState>({
    categories: [],
    radius: null,
    query: null,
  });

  // SearchRoom에서 넘어왔는지 확인하는 상태 추가
  const [isFilteredFromSearch, setIsFilteredFromSearch] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const APP_KEY = (import.meta.env.VITE_KAKAO_MAP_KEY as string) || (apikey?.kakaoMapKey as string);
  const map = useKakaoMap({ mapRef, appKey: APP_KEY });
  const userLocation = useUserLocation();

  useEffect(() => {
    const searchState = location.state?.searchFilters;
    if (searchState) {
      setFilters({
        categories: searchState.categories || [],
        radius: searchState.radius || null,
        query: searchState.query || null,
      });
      // SearchRoom에서 넘어온 필터임을 표시
      setIsFilteredFromSearch(true);
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  const { meetings, isLoading, error } = useMeetings(
    map,
    filters.categories,
    filters.radius,
    filters.query,
  );

  const handleMarkerClick = (meeting: Meeting) => {
    setSelectedMeeting(meeting);
  };

  useMeetingMarkers(map, meetings, handleMarkerClick);

  useEffect(() => {
    if (map && userLocation && !location.state?.searchFilters) {
      const userLatLng = new window.kakao.maps.LatLng(userLocation.lat, userLocation.lng);
      map.setCenter(userLatLng);
    }
  }, [map, userLocation, location.state]);

  const handleSearchClick = () => {
    setIsSearchOpen(true);
    setTimeout(() => {
      const center = map?.getCenter();
      navigate('/search-room', {
        state: {
          searchCenter: center ? { lat: center.getLat(), lng: center.getLng() } : userLocation,
        },
      });
    }, OVERLAY_ANIMATION_DURATION);
  };

  const handleCloseModal = () => {
    setSelectedMeeting(null);
  };

  const handleCategoryClick = (category: string) => {
    setFilters((prev) => ({
      ...prev,
      categories: prev.categories.includes(category)
        ? prev.categories.filter((c) => c !== category)
        : [...prev.categories, category],
    }));
  };

  const handleRadiusClick = (radius: string) => {
    setFilters((prev) => ({
      ...prev,
      radius: prev.radius === radius ? null : radius,
    }));
  };

  const handleCancelSearch = () => {
    setFilters({
      categories: [],
      radius: null,
      query: null,
    });
    // 검색 모드 상태 해제
    setIsFilteredFromSearch(false);
  };

  const renderMeetingMessage = () => {
    if (isLoading) return <MessageOverlay>{INFO_MESSAGES.LOADING_MEETINGS}</MessageOverlay>;
    if (error) return <MessageOverlay>{error}</MessageOverlay>;
    if (meetings.length === 0)
      return <MessageOverlay>{INFO_MESSAGES.NO_MEETINGS_FOUND}</MessageOverlay>;
    return null;
  };

  // SearchRoom에서 적용된 필터가 있는지, 또는 사용자가 직접 필터를 적용했는지 확인
  const hasActiveFilters =
    isFilteredFromSearch || filters.query || filters.categories.length > 0 || filters.radius;

  return (
    <>
      <GlobalStyle />
      <KakaoMapCssFix />
      <MarkerStyles />
      <HomePageContainer>
        <MapArea>
          <MapContainer ref={mapRef} />
          {map ? (
            <>
              {/* 활성 필터가 있을 때만 "취소" 버튼 표시 */}
              {hasActiveFilters && (
                <CancelSearchButton onClick={handleCancelSearch}>검색/필터 취소</CancelSearchButton>
              )}

              <SearchButton onClick={handleSearchClick} />

              {/* SearchRoom에서 넘어오지 않았을 때만 (일반 모드일 때만) 필터 UI 표시 */}
              {!isFilteredFromSearch && (
                <>
                  <RadiusFilter selectedRadius={filters.radius} onRadiusClick={handleRadiusClick} />
                  <MapFilters
                    selectedCategories={filters.categories}
                    onCategoryClick={handleCategoryClick}
                  />
                </>
              )}

              {renderMeetingMessage()}
            </>
          ) : (
            <MessageOverlay>지도를 불러오는 중...</MessageOverlay>
          )}

          {isSearchOpen && <Overlay />}
          {selectedMeeting && (
            <MeetingDetailModal
              meeting={selectedMeeting}
              onClose={handleCloseModal}
              isOpen={true}
            />
          )}
        </MapArea>
        <BottomNav />
      </HomePageContainer>
    </>
  );
};

export default Home;
