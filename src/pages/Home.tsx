import { useRef, useState, useEffect } from 'react';
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
import { DUMMY_MEETINGS } from '@/data/mockData';
import { MeetingDetailModal } from '@/components/home_page/MeetingDetailModal';

declare global {
  interface Window {
    kakao: any;
  }
}

const KakaoMapCssFix = createGlobalStyle`
  #kakaoMap img { max-width: none !important; }
`;

const MarkerStyles = createGlobalStyle`
  .custom-div-icon { position: relative; width: 30px; height: 42px; }
  .marker-pin { width: 30px; height: 30px; border-radius: 50% 50% 50% 0;
    background: ${colors.primary400}; position: absolute; transform: rotate(-45deg);
    left: 50%; top: 50%; 
    margin: -15px 0 0 -15px; 
  }
  .marker-pin::after { content: ''; width: 24px; height: 24px; margin: 3px 0 0 3px;
    background: #fff; position: absolute; border-radius: 50%; }
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

const Home = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [selectedMeeting, setSelectedMeeting] = useState<Meeting | null>(null);
  const navigate = useNavigate();

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

  const APP_KEY = (import.meta.env.VITE_KAKAO_MAP_KEY as string) || (apikey?.kakaoMapKey as string);
  const map = useKakaoMap({ mapRef, appKey: APP_KEY });

  useEffect(() => {
    if (!map || !window.kakao) return;

    DUMMY_MEETINGS.forEach((meeting) => {
      const position = new window.kakao.maps.LatLng(meeting.latitude, meeting.longitude);
      const markerContent = `<div class="custom-div-icon"><div class="marker-pin"></div></div>`;

      const overlayElement = document.createElement('div');
      overlayElement.innerHTML = markerContent;
      overlayElement.style.cursor = 'pointer';
      overlayElement.onclick = () => {
        handleMarkerClick(meeting);
      };

      const customOverlay = new window.kakao.maps.CustomOverlay({
        position: position,
        content: overlayElement,
        yAnchor: 1,
      });

      customOverlay.setMap(map);
    });
  }, [map]);

  return (
    <>
      <GlobalStyle />
      <KakaoMapCssFix />
      <MarkerStyles />
      <HomePageContainer>
        <MapArea>
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
