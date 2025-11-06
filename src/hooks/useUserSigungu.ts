import { useState, useEffect } from 'react';
import { getSigunguListByLocation } from '@/api/services/sigungu.service';
import type { SigunguResponse } from '@/types/sigungu';

interface UseUserSigunguReturn {
  sidoName: string;
  sigunguList: SigunguResponse[];
  isLoading: boolean;
  error: string | null;
}

export const useUserSigungu = (): UseUserSigunguReturn => {
  const [sidoName, setSidoName] = useState('');
  const [sigunguList, setSigunguList] = useState<SigunguResponse[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserLocation = async () => {
      try {
        setIsLoading(true);

        // 사용자 위치 가져오기
        if (!navigator.geolocation) {
          throw new Error('위치 서비스를 지원하지 않는 브라우저입니다.\n브라우저 설정에서 위치 권한을 확인해주세요.');
        }

        navigator.geolocation.getCurrentPosition(
          async (position) => {
            try {
              const { latitude, longitude } = position.coords;

              const response = await getSigunguListByLocation(latitude, longitude);

              if (response.content && response.content.length > 0) {
                setSidoName(response.content[0].sidoName);
                setSigunguList(response.content);
              }

              setIsLoading(false);
            } catch (err) {
              const errorMessage = err instanceof Error ? err.message : String(err);
              setError(`위치 정보를 불러오는데 실패했습니다: ${errorMessage}\n브라우저 설정에서 위치 권한을 확인해주세요.`);
              setIsLoading(false);
            }
          },
          (err) => {
            const errorMessage = err.message || String(err.code);
            setError(`위치 정보 접근 권한이 필요합니다: ${errorMessage}\n브라우저 설정에서 위치 권한을 허용해주세요.`);
            setIsLoading(false);
          },
        );
      } catch (err) {
        const errorMsg = err instanceof Error ? err.message : '알 수 없는 오류가 발생했습니다.';
        setError(`${errorMsg}\n브라우저 설정에서 위치 권한을 확인해주세요.`);
        setIsLoading(false);
      }
    };

    fetchUserLocation();
  }, []);

  return { sidoName, sigunguList, isLoading, error };
};
