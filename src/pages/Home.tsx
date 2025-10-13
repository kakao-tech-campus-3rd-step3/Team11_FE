import { useRef, useState, useEffect } from 'react';
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
import MeetingIcon from '@/components/home_page/MeetingIcon';

declare global {
  interface Window {
    kakao: any;
  }
}

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
`;

const MapContainer = styled.div.attrs({ id: 'kakaoMap' })`
  width: 100%;
  height: 100%;
`;

const MessageOverlay = styled.div`
  position: absolute;
  top: 70px;
  left: 50%;
  transform: translateX(-50%);
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 10px 20px;
  border-radius: 20px;
  z-index: 10;
  font-size: 14px;
  text-align: center;
`;

const Home = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [selectedMeeting, setSelectedMeeting] = useState<Meeting | null>(null);
  const navigate = useNavigate();

  const APP_KEY = (import.meta.env.VITE_KAKAO_MAP_KEY as string) || (apikey?.kakaoMapKey as string);
  const map = useKakaoMap({ mapRef, appKey: APP_KEY });

  useEffect(() => {
    if (!map) return;

    const fetchMeetings = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const center = map.getCenter();
        const params = {
          latitude: center.getLat(),
          longitude: center.getLng(),
          radius: 2000,
        };
        const meetingData = await getMeetings(params);
        setMeetings(meetingData);
      } catch (err: any) {
        console.error('모임 정보를 불러오는 데 실패했습니다.', err);
        if (err.response?.status === 401) {
          setError('로그인이 필요합니다. 다시 로그인해주세요.');
        } else {
          setError('모임을 불러오는 중 오류가 발생했습니다.');
        }
        setMeetings([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMeetings();
  }, [map]);

  useEffect(() => {
    if (!map || !window.kakao || meetings.length === 0) return;

    meetings.forEach((meeting) => {
      const position = new window.kakao.maps.LatLng(meeting.latitude, meeting.longitude);

      const markerContainer = document.createElement('div');
      markerContainer.className = 'custom-div-icon';
      markerContainer.onclick = () => handleMarkerClick(meeting);
      markerContainer.style.cursor = 'pointer';

      const pinElement = document.createElement('div');
      pinElement.className = 'marker-pin';
      markerContainer.appendChild(pinElement);

      ReactDOM.createRoot(pinElement).render(
        <MeetingIcon category={meeting.category} className="marker-icon" />,
      );

      const customOverlay = new window.kakao.maps.CustomOverlay({
        position: position,
        content: markerContainer,
        yAnchor: 1,
      });

      customOverlay.setMap(map);
    });
  }, [map, meetings]);

  const handleSearchClick = () => {
    setIsSearchOpen(true);
    setTimeout(() => {
      navigate('/search-room');
    }, OVERLAY_ANIMATION_DURATION);
  };

  const handleMarkerClick = (meeting: Meeting) => {
    setSelectedMeeting(meeting);
  };

  const handleCloseModal = () => {
    setSelectedMeeting(null);
  };

  const renderMessage = () => {
    if (isLoading) return <MessageOverlay>주변 모임을 불러오는 중...</MessageOverlay>;
    if (error) return <MessageOverlay>{error}</MessageOverlay>;
    if (meetings.length === 0)
      return <MessageOverlay>주변에 진행 중인 모임이 없어요.</MessageOverlay>;
    return null;
  };

  return (
    <>
      <GlobalStyle />
      <KakaoMapCssFix />
      <MarkerStyles />
      <HomePageContainer>
        <MapArea>
          {renderMessage()}
          <SearchButton onClick={handleSearchClick} />
          <MapContainer ref={mapRef} />
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
