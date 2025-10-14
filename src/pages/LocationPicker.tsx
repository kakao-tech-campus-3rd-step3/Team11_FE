import { useEffect, useRef, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styled, { createGlobalStyle } from 'styled-components';
import GlobalStyle from '@/style/GlobalStyle';
import apikey from '@/config/apikey';
import { CommonHeader } from '@/components/common/CommonHeader';

declare global {
  interface Window {
    kakao: any;
  }
}

interface LocationInfo {
  name: string;
  lat: number;
  lng: number;
}

const KakaoMapCssFix = createGlobalStyle`
  div[style*="width: 1px; height: 1px;"] {
    display: none !important;
  }
`;

const PageContainer = styled.div`
  width: 100%;
  max-width: 720px;
  margin: 0 auto;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
`;

const MapContainer = styled.div`
  flex: 1;
  width: 100%;
`;

const ConfirmButton = styled.button`
  position: fixed;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  width: 90%;
  max-width: 400px;
  padding: 1rem;
  border-radius: 12px;
  border: none;
  background-color: #4f46e5;
  color: white;
  font-size: 1.1rem;
  font-weight: bold;
  cursor: pointer;
  z-index: 10;

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

const LocationPicker = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const markerRef = useRef<any>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { formValues, hashtags, currentLocation } = location.state || {};

  const [map, setMap] = useState<any>(null);
  const [geocoder, setGeocoder] = useState<any>(null);
  const [selectedLocation, setSelectedLocation] = useState<LocationInfo | null>(
    currentLocation || null,
  );

  useEffect(() => {
    const APP_KEY = (import.meta.env.VITE_KAKAO_MAP_KEY as string) || apikey?.kakaoMapKey;
    const scriptId = 'kakao-map-script';

    const initializeMap = () => {
      window.kakao.maps.load(() => {
        if (!mapRef.current) return;

        const center = new window.kakao.maps.LatLng(35.179554, 129.075642);
        const options = { center, level: 3 };
        const mapInstance = new window.kakao.maps.Map(mapRef.current, options);
        const geocoderInstance = new window.kakao.maps.services.Geocoder();

        setMap(mapInstance);
        setGeocoder(geocoderInstance);
      });
    };

    let script = document.getElementById(scriptId) as HTMLScriptElement | null;

    if (!script) {
      script = document.createElement('script');
      script.id = scriptId;
      script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${APP_KEY}&libraries=services&autoload=false`;
      script.async = true;
      document.head.appendChild(script);

      script.onload = () => {
        script!.dataset.loaded = 'true';
        initializeMap();
      };
    } else if (script.dataset.loaded) {
      // 스크립트는 있지만, 로딩이 완료된 경우
      initializeMap();
    } else {
      // 스크립트는 있지만, 아직 로딩 중인 경우
      const handleLoad = () => initializeMap();
      script.addEventListener('load', handleLoad);
      return () => {
        script?.removeEventListener('load', handleLoad);
      };
    }
  }, []);

  useEffect(() => {
    if (!map || !geocoder) return;

    if (currentLocation && !selectedLocation) {
      const initialPosition = new window.kakao.maps.LatLng(
        currentLocation.lat,
        currentLocation.lng,
      );
      map.setCenter(initialPosition);
      const marker = new window.kakao.maps.Marker({ position: initialPosition });
      marker.setMap(map);
      markerRef.current = marker;
    }

    const handleClick = (mouseEvent: any) => {
      const latlng = mouseEvent.latLng;

      if (markerRef.current) {
        markerRef.current.setPosition(latlng);
      } else {
        const newMarker = new window.kakao.maps.Marker({ position: latlng });
        newMarker.setMap(map);
        markerRef.current = newMarker;
      }

      geocoder.coord2Address(latlng.getLng(), latlng.getLat(), (result: any, status: any) => {
        if (status === window.kakao.maps.services.Status.OK) {
          const roadAddress =
            result[0]?.road_address?.address_name || result[0]?.address?.address_name;
          setSelectedLocation({
            name: roadAddress,
            lat: latlng.getLat(),
            lng: latlng.getLng(),
          });
        }
      });
    };

    window.kakao.maps.event.addListener(map, 'click', handleClick);

    return () => {
      if (window.kakao && window.kakao.maps && window.kakao.maps.event && map) {
        window.kakao.maps.event.removeListener(map, 'click', handleClick);
      }
    };
  }, [map, geocoder, currentLocation]);

  const handleConfirm = () => {
    if (selectedLocation) {
      navigate('/create-room', {
        state: {
          formValues: formValues,
          hashtags: hashtags,
          selectedLocation: selectedLocation,
        },
        replace: true,
      });
    }
  };

  const handleBack = () => {
    navigate('/create-room', {
      state: {
        formValues: formValues,
        hashtags: hashtags,
        selectedLocation: currentLocation,
      },
      replace: true,
    });
  };

  return (
    <>
      <GlobalStyle />
      <KakaoMapCssFix />
      <PageContainer>
        <CommonHeader
          title="지도에서 위치 선택(위치선택이 되지 않을 시 새로고침)"
          onBackButtonClick={handleBack}
        />
        <MapContainer ref={mapRef} />
        <ConfirmButton onClick={handleConfirm} disabled={!selectedLocation}>
          {selectedLocation ? `'${selectedLocation.name}' 확정` : '지도를 클릭하여 위치 선택'}
        </ConfirmButton>
      </PageContainer>
    </>
  );
};

export default LocationPicker;
