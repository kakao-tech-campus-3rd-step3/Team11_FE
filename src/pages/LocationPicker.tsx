import React, { useEffect, useRef, useState } from 'react';
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
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedLocation, setSelectedLocation] = useState<LocationInfo | null>(
    location.state?.currentLocation || null,
  );
  const markerRef = useRef<any>(null);

  useEffect(() => {
    const APP_KEY = (import.meta.env.VITE_KAKAO_MAP_KEY as string) || apikey?.kakaoMapKey;
    const script = document.createElement('script');
    script.async = true;
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${APP_KEY}&libraries=services&autoload=false`;
    document.head.appendChild(script);

    script.onload = () => {
      window.kakao.maps.load(() => {
        if (!mapRef.current) return;

        const initialLocation = location.state?.currentLocation;
        const center = initialLocation
          ? new window.kakao.maps.LatLng(initialLocation.lat, initialLocation.lng)
          : new window.kakao.maps.LatLng(35.179554, 129.075642);

        const options = {
          center: center,
          level: 3,
        };
        const map = new window.kakao.maps.Map(mapRef.current, options);
        const geocoder = new window.kakao.maps.services.Geocoder();

        if (initialLocation) {
          const initialMarker = new window.kakao.maps.Marker({ position: center });
          initialMarker.setMap(map);
          markerRef.current = initialMarker;
        }

        window.kakao.maps.event.addListener(map, 'click', (mouseEvent: any) => {
          const latlng = mouseEvent.latLng;
          map.setCenter(latlng);

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
        });
      });
    };

    return () => {
      const scripts = document.head.getElementsByTagName('script');
      for (let i = 0; i < scripts.length; i++) {
        if (scripts[i].src.includes('dapi.kakao.com')) {
          document.head.removeChild(scripts[i]);
        }
      }
    };
  }, [location.state?.currentLocation]);

  const handleConfirm = () => {
    if (selectedLocation) {
      navigate('/create-room', {
        state: { selectedLocation: selectedLocation },
        replace: true,
      });
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <>
      <GlobalStyle />
      <KakaoMapCssFix />
      <PageContainer>
        <CommonHeader title="지도에서 위치 선택" onBackButtonClick={handleBack} />
        <MapContainer ref={mapRef} />
        <ConfirmButton onClick={handleConfirm} disabled={!selectedLocation}>
          {selectedLocation ? `'${selectedLocation.name}' 확정` : '지도를 클릭하여 위치 선택'}
        </ConfirmButton>
      </PageContainer>
    </>
  );
};

export default LocationPicker;
