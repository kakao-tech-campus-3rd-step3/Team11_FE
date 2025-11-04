import { useState, useEffect, useCallback } from 'react';
import type { Meeting } from '@/types/meeting';
import { ERROR_MESSAGES } from '@/constants/messages';
import api from '@/api/clients/axiosInstance';
import { categoryMap } from '@/utils/categoryMapper';
interface ApiMeetingsParams {
  latitude: number;
  longitude: number;
  category?: string;
  radius?: number;
}

export const useMeetings = (
  map: any,
  selectedCategories: string[], //
  selectedRadius: string | null,
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

      if (selectedCategories.length > 0) {
        const apiCategories = selectedCategories.map(
          (korCategory) => categoryMap[korCategory] || korCategory,
        );
        params.category = apiCategories.join(',');
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
  }, [map, selectedCategories, selectedRadius]);

  useEffect(() => {
    if (map) {
      fetchMeetings();
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
