// src/hooks/useMeetingsSearch.ts
import { useState, useEffect } from 'react';

import type { Meeting } from '@/types/meeting';
import { getMeetings, type GetMeetingsParams } from '@/api/services/meetup.service';
import { categoryMap } from '@/utils/categoryMapper';

const USE_MOCK_DATA = false;

interface LocationData {
  lat: number;
  lng: number;
}

const useDebounceValue = (value: string, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => clearTimeout(handler);
  }, [value, delay]);
  return debouncedValue;
};

interface UseMeetingsSearchParams {
  query: string;
  categories: string[];
  radius: string | null;
  searchCenter: LocationData | null;
  userLocation: LocationData | null;
}

export const useMeetingsSearch = ({
  query,
  categories,
  radius,
  searchCenter,
  userLocation,
}: UseMeetingsSearchParams) => {
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const debouncedQuery = useDebounceValue(query, 500);

  useEffect(() => {
    // --- 여기가 수정되었습니다 ---
    // if (searchCenter && !radius) {
    //   setMeetings([]);
    //   return;
    // }
    // "반경" 미선택 시 빈 배열을 반환하던 로직을 삭제했습니다.
    // --- 수정 끝 ---

    const locationForApi = searchCenter || userLocation;
    if (!locationForApi) {
      return;
    }

    const fetchLogic = async () => {
      setIsLoading(true);
      setError(null);

      if (USE_MOCK_DATA) {
        // ... (실행 안 됨)
      } else {
        try {
          const params: GetMeetingsParams = {};

          if (debouncedQuery) params.name = debouncedQuery;

          if (categories.length > 0) {
            const apiCategories = categories
              .map((korCategory) => categoryMap[korCategory])
              .filter(Boolean);

            if (apiCategories.length > 0) {
              params.category = apiCategories.join(',');
            }
          }

          params.latitude = locationForApi.lat;
          params.longitude = locationForApi.lng;

          if (radius) {
            params.radius = parseInt(radius.replace('km', ''), 10);
          }

          const data = await getMeetings(params);

          // 프론트엔드에서 name으로 한번 더 필터링
          let filteredData = data;
          if (debouncedQuery) {
            filteredData = data.filter((meeting) =>
              meeting.name.toLowerCase().includes(debouncedQuery.toLowerCase()),
            );
          }
          setMeetings(filteredData);
        } catch (err: any) {
          setError(err.message || '모임을 불러오는 데 실패했습니다.');
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchLogic();
  }, [debouncedQuery, categories, radius, searchCenter, userLocation]);

  return { meetings, isLoading, error };
};
