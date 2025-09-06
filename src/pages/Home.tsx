import { useEffect, useRef } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import GlobalStyle from '@/style/GlobalStyle';
import { colors } from '@/style/themes';
import apikey from '@/config/apikey';
import { SearchButton } from '@/components/home_page/SearchButton';
import { useKakaoMap } from '@/hooks/useKakaoMap';

declare global {
  interface Window {
    kakao: any;
  }
}

function loadKakaoSDK(appKey: string) {
  if (typeof window !== 'undefined' && window.kakao?.maps) return Promise.resolve();
  return new Promise<void>((resolve, reject) => {
    const scriptId = 'kakao-maps-sdk';
    const existing = document.getElementById(scriptId) as HTMLScriptElement | null;
    if (existing) {
      if (window.kakao?.maps) return window.kakao.maps.load(() => resolve());
      existing.addEventListener('load', () => window.kakao.maps.load(() => resolve()), {
        once: true,
      });
      existing.addEventListener('error', () => reject(new Error('Kakao Maps SDK load error')), {
        once: true,
      });
      return;
    }
    const script = document.createElement('script');
    script.id = scriptId;
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${encodeURIComponent(appKey)}&autoload=false`;
    script.async = true;
    script.onload = () => window.kakao.maps.load(() => resolve());
    script.onerror = () => reject(new Error('Kakao Maps SDK load error'));
    document.head.appendChild(script);
  });
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
  inset: 0;
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

const CreateMoimButton = styled.button`
  position: absolute;
  bottom: 20px;
  right: 20px;
  z-index: 10;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  border: none;
  background-color: ${colors.primary400};
  color: #fff;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  font-size: 32px;
  line-height: 56px;
  cursor: pointer;
`;

const Home = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<any>(null);

  const APP_KEY = (import.meta.env.VITE_KAKAO_MAP_KEY as string) || (apikey?.kakaoMapKey as string);
  useKakaoMap({ mapRef, overlayRef, appKey: APP_KEY });

  return (
    <>
      <GlobalStyle />
      <KakaoMapCssFix />
      <MarkerStyles />
      <HomeContainer>
        <MapArea>
          <SearchButton />
          <MapContainer ref={mapRef} />
          <CreateMoimButton>+</CreateMoimButton>
        </MapArea>
      </HomeContainer>
    </>
  );
};

export default Home;
