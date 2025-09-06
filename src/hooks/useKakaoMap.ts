import { useEffect } from 'react';

declare global {
  interface Window {
    kakao: any;
  }
}

type UseKakaoMapParams = {
  mapRef: React.RefObject<HTMLDivElement | null>;
  overlayRef?: React.MutableRefObject<any>;
  appKey: string;
  center?: { lat: number; lng: number };
  level?: number;
};

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

export function useKakaoMap({
  mapRef,
  overlayRef,
  appKey,
  center = { lat: 35.2335, lng: 129.081 },
  level = 4,
}: UseKakaoMapParams) {
  useEffect(() => {
    const MAX_RETRIES = 3;
    const RETRY_DELAY = 2000;

    let cleanupFunc: (() => void) | null = null;

    const initMap = (attempt = 1) => {
      const APP_KEY = (appKey || '').trim();
      if (!APP_KEY) {
        console.error('API 키를 찾을 수 없음.');
        return;
      }

      let ro: ResizeObserver | null = null;

      loadKakaoSDK(APP_KEY)
        .then(() => {
          if (!mapRef.current) return;
          const { kakao } = window as any;

          const centerLatLng = new kakao.maps.LatLng(center.lat, center.lng);
          const map = new kakao.maps.Map(mapRef.current, { center: centerLatLng, level });

          const content = `
            <div class="custom-div-icon">
              <div class="marker-pin"></div>
            </div>
          `;
          const overlay = new kakao.maps.CustomOverlay({
            position: centerLatLng,
            content,
            yAnchor: 1,
            map,
          });
          if (overlayRef) overlayRef.current = overlay;

          ro = new ResizeObserver(() => map.relayout());
          ro.observe(mapRef.current!);

          cleanupFunc = () => {
            if (ro && mapRef.current) ro.unobserve(mapRef.current);
            if (overlayRef?.current) {
              overlayRef.current.setMap(null);
              overlayRef.current = null;
            }
          };
        })
        .catch((error) => {
          console.error('지도 로딩 실패:', error);
          if (attempt < MAX_RETRIES) {
            setTimeout(() => initMap(attempt + 1), RETRY_DELAY);
          } else {
            console.error('API 키 또는 네트워크 확인.');
          }
        });
    };

    initMap();

    return () => {
      if (cleanupFunc) cleanupFunc();
    };
  }, [appKey, center.lat, center.lng, level, mapRef, overlayRef]);
}
