import { useState, useEffect } from 'react';

interface LocationData {
  lat: number;
  lng: number;
}

const BUSAN_UNIVERSITY_LOCATION: LocationData = {
  lat: 35.2335,
  lng: 129.081,
};

export const useUserLocation = () => {
  const [userLocation, setUserLocation] = useState<LocationData | null>(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      (err) => {
        console.error('위치 정보를 가져오는 데 실패했습니다:', err);
        setUserLocation(BUSAN_UNIVERSITY_LOCATION);
      },
    );
  }, []);

  return userLocation;
};
