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

const LocationInfo = styled.div`
  position: fixed;
  top: 80px;
  left: 50%;
  transform: translateX(-50%);
  width: 90%;
  max-width: 400px;
  padding: 1rem;
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  z-index: 10;
  text-align: center;
  font-size: 0.95rem;
  color: #333;
`;

const LocationPicker = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const markerRef = useRef<any>(null);
  const geocoderRef = useRef<any>(null);
  const mapInstanceRef = useRef<any>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const prevPath = location.state?.prevPath ?? '/create-room';
  const { formValues, hashtags, currentLocation } = location.state || {};

  const [selectedLocation, setSelectedLocation] = useState<LocationInfo | null>(
    currentLocation || null,
  );
  const [displayAddress, setDisplayAddress] = useState<string>(
    currentLocation ? currentLocation.name : '지도를 클릭하여 위치를 선택하세요',
  );

  useEffect(() => {
    const APP_KEY = (import.meta.env.VITE_KAKAO_MAP_KEY as string) || apikey?.kakaoMapKey;
    const scriptId = 'kakao-map-script';

    const loadKakaoMap = () => {
      if (!window.kakao || !window.kakao.maps) return;

      window.kakao.maps.load(() => {
        if (!mapRef.current) return;

        const center = currentLocation
          ? new window.kakao.maps.LatLng(currentLocation.lat, currentLocation.lng)
          : new window.kakao.maps.LatLng(35.2335, 129.081);

        const options = { center, level: 3 };
        const mapInstance = new window.kakao.maps.Map(mapRef.current, options);

        mapInstanceRef.current = mapInstance;

        if (window.kakao.maps.services) {
          geocoderRef.current = new window.kakao.maps.services.Geocoder();
        }

        if (currentLocation) {
          const initialPosition = new window.kakao.maps.LatLng(
            currentLocation.lat,
            currentLocation.lng,
          );
          const marker = new window.kakao.maps.Marker({ position: initialPosition });
          marker.setMap(mapInstance);
          markerRef.current = marker;
        }

        const handleClick = (mouseEvent: any) => {
          const latlng = mouseEvent.latLng;

          if (markerRef.current) {
            markerRef.current.setPosition(latlng);
          } else {
            const newMarker = new window.kakao.maps.Marker({ position: latlng });
            newMarker.setMap(mapInstance);
            markerRef.current = newMarker;
          }

          setDisplayAddress('주소를 검색하는 중...');

          if (geocoderRef.current) {
            geocoderRef.current.coord2Address(
              latlng.getLng(),
              latlng.getLat(),
              (result: any, status: any) => {
                if (status === window.kakao.maps.services.Status.OK && result[0]) {
                  const roadAddress = result[0].road_address;
                  const jibunAddress = result[0].address;

                  const finalAddress = roadAddress
                    ? roadAddress.address_name
                    : jibunAddress.address_name;

                  const locationData = {
                    name: finalAddress,
                    lat: latlng.getLat(),
                    lng: latlng.getLng(),
                  };

                  setSelectedLocation(locationData);
                  setDisplayAddress(finalAddress);
                } else {
                  const coordText = `위도: ${latlng.getLat().toFixed(6)}, 경도: ${latlng.getLng().toFixed(6)}`;

                  const locationData = {
                    name: coordText,
                    lat: latlng.getLat(),
                    lng: latlng.getLng(),
                  };

                  setSelectedLocation(locationData);
                  setDisplayAddress(coordText);
                }
              },
            );
          } else {
            const coordText = `위도: ${latlng.getLat().toFixed(6)}, 경도: ${latlng.getLng().toFixed(6)}`;

            const locationData = {
              name: coordText,
              lat: latlng.getLat(),
              lng: latlng.getLng(),
            };

            setSelectedLocation(locationData);
            setDisplayAddress(coordText);
          }
        };

        window.kakao.maps.event.addListener(mapInstance, 'click', handleClick);
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
        loadKakaoMap();
      };
    } else {
      loadKakaoMap();
    }
  }, []);

  const handleConfirm = () => {
    if (selectedLocation) {
      navigate(prevPath, {
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
    navigate(prevPath, {
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
          title="지도에서 위치 선택(주소지가 나오지 않을 시 좌표로 표시됩니다)"
          onBackButtonClick={handleBack}
        />
        <MapContainer ref={mapRef} />
        <LocationInfo>{displayAddress}</LocationInfo>
        <ConfirmButton onClick={handleConfirm} disabled={!selectedLocation}>
          {selectedLocation ? '위치 확정' : '지도를 클릭하여 위치 선택'}
        </ConfirmButton>
      </PageContainer>
    </>
  );
};

export default LocationPicker;
