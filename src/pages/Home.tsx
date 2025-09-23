import { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { createGlobalStyle } from 'styled-components';
import GlobalStyle from '@/style/GlobalStyle';
import { colors } from '@/style/themes';
import apikey from '@/config/apikey';
import { SearchButton } from '@/components/home_page/SearchButton';
import { useKakaoMap } from '@/hooks/useKakaoMap';
import { Overlay, OVERLAY_ANIMATION_DURATION } from '@/components/common/Overlay';
import { RoomCreateButton } from '@/components/home_page/RoomCreateButton';
import BottomNav from '@/components/common/BottomNav';
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
    left: 50%; top: 50%; margin: -15px 0 0 -15px; }
  .marker-pin::after { content: ''; width: 24px; height: 24px; margin: 3px 0 0 3px;
    background: #fff; position: absolute; border-radius: 50%; }
`;

const HomeContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 60px;
  display: flex;
  flex-direction: column;
`;

const MapArea = styled.div`
  flex: 1;
  position: relative;
  overflow: hidden;
`;

const MapContainer = styled.div.attrs({ id: 'kakaoMap' })`
  width: 100%;
  height: 100%;
`;

const Home = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<any>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const navigate = useNavigate();

  const handleSearchClick = () => {
    setIsSearchOpen(true);
    setTimeout(() => {
      navigate('/search-room');
    }, OVERLAY_ANIMATION_DURATION);
  };

  const APP_KEY = (import.meta.env.VITE_KAKAO_MAP_KEY as string) || (apikey?.kakaoMapKey as string);
  useKakaoMap({ mapRef, overlayRef, appKey: APP_KEY });

  return (
    <>
      <GlobalStyle />
      <KakaoMapCssFix />
      <MarkerStyles />
      <HomeContainer>
        <MapArea>
          <SearchButton onClick={handleSearchClick} />
          <MapContainer ref={mapRef} />
          <RoomCreateButton to="/create-room" />
        </MapArea>
        {isSearchOpen && <Overlay />}
      </HomeContainer>
      <BottomNav />
    </>
  );
};

export default Home;
