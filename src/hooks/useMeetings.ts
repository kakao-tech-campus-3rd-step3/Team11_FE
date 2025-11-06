import { useState, useEffect, useCallback } from 'react';
import type { Meeting } from '@/types/meeting';
import { ERROR_MESSAGES } from '@/constants/messages';
import api from '@/api/clients/axiosInstance';
import { categoryMap } from '@/utils/categoryMapper';

interface LocationData {
  lat: number;
  lng: number;
}

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
  isFilteredFromSearch: boolean,
  searchCenter: LocationData | null,
) => {
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMeetings = useCallback(async () => {
    if (!map) return;

    let locationToFetch;
    if (isFilteredFromSearch) {
      if (!searchCenter) {
        setIsLoading(false);
        setMeetings([]);
        return;
      }
      locationToFetch = { lat: searchCenter.lat, lng: searchCenter.lng };
    } else {
      const center = map.getCenter();
      locationToFetch = { lat: center.getLat(), lng: center.getLng() };
    }

    setIsLoading(true);
    setError(null);
    try {
      const params: ApiMeetingsParams = {
        latitude: locationToFetch.lat,
        longitude: locationToFetch.lng,
      };

      if (query) {
        params.name = query;
      }

      if (selectedCategories.length > 0) {
        const singleCategoryInKorean = selectedCategories[0];
        const apiCategory = categoryMap[singleCategoryInKorean];

        if (apiCategory) {
          params.category = apiCategory;
        }
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
  }, [map, selectedCategories, selectedRadius, query, isFilteredFromSearch, searchCenter]);

  useEffect(() => {
    if (!map || isFilteredFromSearch) {
      return;
    }
    window.kakao.maps.event.addListener(map, 'idle', fetchMeetings);
    return () => {
      window.kakao.maps.event.removeListener(map, 'idle', fetchMeetings);
    };
  }, [map, fetchMeetings, isFilteredFromSearch]);

  useEffect(() => {
    if (!map) {
      return;
    }
    fetchMeetings();
  }, [map, fetchMeetings]);

  return { meetings, isLoading, error };
};
