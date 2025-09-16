import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import apikey from '@/config/apikey';

interface LocationInfo {
  name: string;
  lat: number;
  lng: number;
}

const PageContainer = styled.div`
  position: fixed;
  inset: 0;
  display: flex;
  flex-direction: column;
`;

const Header = styled.header`
  padding: 1rem;
  text-align: center;
  font-weight: bold;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  background: white;
  z-index: 10;
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
  const [selectedLocation, setSelectedLocation] = useState<LocationInfo | null>(null);
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

        const options = {
          center: new window.kakao.maps.LatLng(35.179554, 129.075642),
          level: 3,
          cursor: 'crosshair',
        };
        const map = new window.kakao.maps.Map(mapRef.current, options);
        const geocoder = new window.kakao.maps.services.Geocoder();

        window.kakao.maps.event.addListener(map, 'click', (mouseEvent: any) => {
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
        });
      });
    };
  }, []);

  const handleConfirm = () => {
    if (selectedLocation) {
      navigate('/create-room', {
        state: { selectedLocation: selectedLocation },
      });
    }
  };

  return (
    <PageContainer>
      <Header>지도에서 위치 선택</Header>
      <MapContainer ref={mapRef} />
      <ConfirmButton onClick={handleConfirm} disabled={!selectedLocation}>
        {selectedLocation ? `'${selectedLocation.name}' 확정` : '지도를 클릭하여 위치 선택'}
      </ConfirmButton>
    </PageContainer>
  );
};

export default LocationPicker;
