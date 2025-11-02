import { useState, useEffect, useCallback } from 'react';
import type { Meeting } from '@/types/meeting';
import { ERROR_MESSAGES } from '@/constants/messages';
import { getMeetings } from '@/api/services/meetup.service';

export const useMeetings = (
  map: any,
  selectedCategories: string[],
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
      const params: any = {
        latitude: center.getLat(),
        longitude: center.getLng(),
      };
      if (selectedCategories.length > 0) {
        params.hobby = selectedCategories.join(',');
      }
      if (selectedRadius) {
        params.radius = parseInt(selectedRadius.replace('km', ''), 10) * 1000;
      }

      const meetingData = await getMeetings(params);
      setMeetings(meetingData);
    } catch (err: any) {
      console.error('모임 정보를 불러오는 데 실패했습니다.', err);
      setError(
        err.response?.status === 401
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
      const listener = window.kakao.maps.event.addListener(map, 'idle', fetchMeetings);
      return () => {
        window.kakao.maps.event.removeListener(map, 'idle', listener);
      };
    }
  }, [map, fetchMeetings]);

  useEffect(() => {
    fetchMeetings();
  }, [fetchMeetings]);

  return { meetings, isLoading, error };
};
