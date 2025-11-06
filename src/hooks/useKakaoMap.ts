import { useEffect, useState } from 'react';

declare global {
  interface Window {
    kakao: any;
  }
}

type UseKakaoMapParams = {
  mapRef: React.RefObject<HTMLDivElement | null>;
  appKey: string;
  center?: { lat: number; lng: number };
  level?: number;
  minLevel?: number; // 🔽 줌인(가까이) 제한 레벨
  maxLevel?: number; // 🔽 줌아웃(멀리) 제한 레벨
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
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${encodeURIComponent(
      appKey,
    )}&autoload=false`;
    script.async = true;
    script.onload = () => window.kakao.maps.load(() => resolve());
    script.onerror = () => reject(new Error('Kakao Maps SDK load error'));
    document.head.appendChild(script);
  });
}

export function useKakaoMap({
  mapRef,
  appKey,
  center = { lat: 35.2335, lng: 129.081 },
  level = 4,
  minLevel = 2, // 🔽 추가
  maxLevel = 7, // 🔽 추가
}: UseKakaoMapParams) {
  const [mapInstance, setMapInstance] = useState<any>(null);

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
      let map: any = null; // 🔽 map 변수 스코프 상향

      // 🔽 줌 변경 핸들러 함수
      const handleZoomChanged = () => {
        if (!map) return;
        const currentLevel = map.getLevel();

        if (minLevel && currentLevel < minLevel) {
          map.setLevel(minLevel, { animate: false });
        } else if (maxLevel && currentLevel > maxLevel) {
          map.setLevel(maxLevel, { animate: false });
        }
      };

      loadKakaoSDK(APP_KEY)
        .then(() => {
          if (!mapRef.current) return;
          const { kakao } = window as any;
          const centerLatLng = new kakao.maps.LatLng(center.lat, center.lng);

          // 🔽 map 변수 할당
          map = new kakao.maps.Map(mapRef.current, { center: centerLatLng, level });

          // 🔽 줌 제한 로직 추가
          if (minLevel || maxLevel) {
            kakao.maps.event.addListener(map, 'zoom_changed', handleZoomChanged);
          }

          setMapInstance(map);

          ro = new ResizeObserver(() => map.relayout());
          ro.observe(mapRef.current!);

          cleanupFunc = () => {
            if (ro && mapRef.current) ro.unobserve(mapRef.current);
            // 🔽 줌 이벤트 리스너 제거
            if ((minLevel || maxLevel) && map) {
              kakao.maps.event.removeListener(map, 'zoom_changed', handleZoomChanged);
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
  }, [appKey, center.lat, center.lng, level, mapRef, minLevel, maxLevel]); // 🔽 의존성 배열 추가

  return mapInstance;
}
