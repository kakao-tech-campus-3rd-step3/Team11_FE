// src/hooks/useMeetingsSearch.ts
import { useState, useEffect } from 'react';

import type { Meeting } from '@/types/meeting';
import { getMeetings, type GetMeetingsParams } from '@/api/services/meetup.service';
import { categoryMap } from '@/utils/categoryMapper'; // categoryMap 임포트

const USE_MOCK_DATA = false; // <-- 여기를 false로 변경했습니다.

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
    // searchCenter가 있는데 radius가 없으면 검색하지 않음 (기존 로직 유지)
    if (searchCenter && !radius) {
      setMeetings([]);
      return;
    }

    const locationForApi = searchCenter || userLocation;
    if (!locationForApi) {
      // 위치 정보가 없으면 API 호출 방지
      return;
    }

    const fetchLogic = async () => {
      setIsLoading(true);
      setError(null);

      if (USE_MOCK_DATA) {
        // 이 부분은 이제 실행되지 않습니다.
        setTimeout(() => {
          // let data = mockMeetings;
          // ...
          setMeetings([]);
          setIsLoading(false);
        }, 500);
      } else {
        // 실제 API 호출 로직
        try {
          const params: GetMeetingsParams = {};

          if (debouncedQuery) params.name = debouncedQuery;

          // 카테고리 매핑 및 콤마(,)로
          if (categories.length > 0) {
            const apiCategories = categories
              .map((korCategory) => categoryMap[korCategory])
              .filter(Boolean); // 유효한 카테고리만 필터링

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
          setMeetings(data);
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
