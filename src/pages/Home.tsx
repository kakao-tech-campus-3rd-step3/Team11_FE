import { useRef, useState, useEffect, useCallback } from 'react';
import ReactDOM from 'react-dom/client';
import { useNavigate } from 'react-router-dom';
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
import { getMeetings } from '@/api/main_meetings';
import MeetingIcon, { type MeetingCategory } from '@/components/home_page/MeetingIcon';
import { ERROR_MESSAGES, INFO_MESSAGES } from '@/constants/messages';
import { MapFilters } from '@/components/home_page/MapFilters';
import { RadiusFilter } from '@/components/home_page/RadiusFilter';

declare global {
  interface Window {
    kakao: any;
  }
}

interface LocationData {
  lat: number;
  lng: number;
}

const BUSAN_UNIVERSITY_LOCATION: LocationData = {
  lat: 35.2335,
  lng: 129.081,
};

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

const Home = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const markersRef = useRef<any[]>([]);
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [selectedMeeting, setSelectedMeeting] = useState<Meeting | null>(null);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedRadius, setSelectedRadius] = useState<string | null>(null);
  const [userLocation, setUserLocation] = useState<LocationData | null>(null);
  const navigate = useNavigate();

  const APP_KEY = (import.meta.env.VITE_KAKAO_MAP_KEY as string) || (apikey?.kakaoMapKey as string);
  const map = useKakaoMap({ mapRef, appKey: APP_KEY });

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      (err) => {
        console.error('위치 정보를 가져오는 데 실패했습니다:', err);
        setUserLocation(BUSAN_UNIVERSITY_LOCATION);
      },
    );
  }, []);

  const fetchMeetings = useCallback(async () => {
    if (!map) return;
    setIsLoading(true);
    setError(null);
    try {
      const center = map.getCenter();
      const params: any = {
        latitude: center.getLat(),
        longitude: center.getLng(),
      };
      if (selectedCategories.length > 0) {
        params.hobby = selectedCategories.join(',');
      }
      if (selectedRadius) {
        params.radius = parseInt(selectedRadius.replace('km', ''), 10) * 1000;
      }
      const meetingData = await getMeetings(params);
      setMeetings(meetingData);
    } catch (err: any) {
      console.error('모임 정보를 불러오는 데 실패했습니다.', err);
      setError(
        err.response?.status === 401
          ? ERROR_MESSAGES.LOGIN_REQUIRED
          : ERROR_MESSAGES.MEETING_FETCH_FAILED,
      );
      setMeetings([]);
    } finally {
      setIsLoading(false);
    }
  }, [map, selectedCategories, selectedRadius]);

  useEffect(() => {
    if (map && userLocation) {
      const userLatLng = new window.kakao.maps.LatLng(userLocation.lat, userLocation.lng);
      map.setCenter(userLatLng);
    }
  }, [map, userLocation]);

  useEffect(() => {
    if (map) {
      const listener = window.kakao.maps.event.addListener(map, 'idle', fetchMeetings);
      return () => {
        window.kakao.maps.event.removeListener(map, 'idle', listener);
      };
    }
  }, [map, fetchMeetings]);

  useEffect(() => {
    fetchMeetings();
  }, [selectedCategories, selectedRadius, fetchMeetings]);

  useEffect(() => {
    markersRef.current.forEach((marker) => marker.setMap(null));
    markersRef.current = [];

    if (!map || !window.kakao || meetings.length === 0) return;

    const newMarkers = meetings.map((meeting) => {
      const position = new window.kakao.maps.LatLng(meeting.latitude, meeting.longitude);
      const markerContainer = document.createElement('div');
      markerContainer.className = 'custom-div-icon';
      markerContainer.style.cursor = 'pointer';
      markerContainer.onclick = () => handleMarkerClick(meeting);

      const pinElement = document.createElement('div');
      pinElement.className = 'marker-pin';
      markerContainer.appendChild(pinElement);

      ReactDOM.createRoot(pinElement).render(
        <MeetingIcon category={meeting.category as MeetingCategory} className="marker-icon" />,
      );

      const customOverlay = new window.kakao.maps.CustomOverlay({
        position: position,
        content: markerContainer,
        yAnchor: 1,
      });
      customOverlay.setMap(map);
      return customOverlay;
    });

    markersRef.current = newMarkers;
  }, [map, meetings]);

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

  const handleMarkerClick = (meeting: Meeting) => {
    setSelectedMeeting(meeting);
  };

  const handleCloseModal = () => {
    setSelectedMeeting(null);
  };

  const handleCategoryClick = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category],
    );
  };

  const handleRadiusClick = (radius: string) => {
    setSelectedRadius((prev) => (prev === radius ? null : radius));
  };

  const renderMeetingMessage = () => {
    if (isLoading) return <MessageOverlay>{INFO_MESSAGES.LOADING_MEETINGS}</MessageOverlay>;
    if (error) return <MessageOverlay>{error}</MessageOverlay>;
    if (meetings.length === 0)
      return <MessageOverlay>{INFO_MESSAGES.NO_MEETINGS_FOUND}</MessageOverlay>;
    return null;
  };

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
              <SearchButton onClick={handleSearchClick} />
              <RadiusFilter selectedRadius={selectedRadius} onRadiusClick={handleRadiusClick} />
              <MapFilters
                selectedCategories={selectedCategories}
                onCategoryClick={handleCategoryClick}
              />
              {renderMeetingMessage()}
            </>
          ) : (
            <MessageOverlay>지도를 불러오는 중...</MessageOverlay>
          )}

          {isSearchOpen && <Overlay />}
          {selectedMeeting && (
            <MeetingDetailModal meeting={selectedMeeting} onClose={handleCloseModal} />
          )}
        </MapArea>
        <BottomNav />
      </HomePageContainer>
    </>
  );
};

export default Home;
