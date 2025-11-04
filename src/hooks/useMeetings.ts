// src/hooks/useMeetings.ts
import { useState, useEffect, useCallback } from 'react';
import type { Meeting } from '@/types/meeting';
import { ERROR_MESSAGES } from '@/constants/messages';
import api from '@/api/clients/axiosInstance';
import { categoryMap } from '@/utils/categoryMapper';

interface ApiMeetingsParams {
  latitude: number;
  longitude: number;
  name?: string;
  category?: string;
  radius?: number;
}

export const useMeetings = (
  map: any,
  selectedCategories: string[],
  selectedRadius: string | null,
  query: string | null,
) => {
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMeetings = useCallback(async () => {
    if (!map) return;
    setIsLoading(true);
    setError(null);
    try {
      const center = map.getCenter();

      const params: ApiMeetingsParams = {
        latitude: center.getLat(),
        longitude: center.getLng(),
      };

      if (query) {
        params.name = query;
      }

      if (selectedCategories.length > 0) {
        // --- 여기가 수정되었습니다 ---
        // 1. 한국어 카테고리를 영어 API 키로 매핑합니다.
        const apiCategories = selectedCategories
          .map((korCategory) => categoryMap[korCategory])
          .filter(Boolean); // 2. 매핑되지 않은 값(undefined)을 제거합니다.

        // 3. 유효한 카테고리가 하나라도 있을 때만 파라미터에 추가합니다.
        if (apiCategories.length > 0) {
          params.category = apiCategories.join(',');
        }
        // --- 수정 끝 ---
      }

      if (selectedRadius) {
        params.radius = parseInt(selectedRadius.replace('km', ''), 10);
      }

      const response = await api.get('/api/meetups/geo', { params });

      const meetingData = response.data;

      setMeetings(Array.isArray(meetingData) ? meetingData : []);
    } catch (err: any) {
      console.error('모임 정보를 불러오는 데 실패했습니다.', err);

      const errorMessage = err.message || '알 수 없는 오류';

      setError(
        errorMessage.includes('401')
          ? ERROR_MESSAGES.LOGIN_REQUIRED
          : ERROR_MESSAGES.MEETING_FETCH_FAILED,
      );
      setMeetings([]);
    } finally {
      setIsLoading(false);
    }
  }, [map, selectedCategories, selectedRadius, query]);

  useEffect(() => {
    if (map) {
      const listener = window.kakao.maps.event.addListener(map, 'idle', fetchMeetings);
      return () => {
        window.kakao.maps.event.removeListener(map, 'idle', listener);
      };
    }
  }, [map, fetchMeetings]);

  useEffect(() => {
    if (map) {
      fetchMeetings();
    }
  }, [selectedCategories, selectedRadius, map, fetchMeetings]);

  return { meetings, isLoading, error };
};
