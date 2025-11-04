import { useState, useEffect } from 'react';

import type { Meeting } from '@/types/meeting';
import { getMeetings, type GetMeetingsParams } from '@/api/services/meetup.service';

const USE_MOCK_DATA = true;

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
    if (searchCenter && !radius) {
      setMeetings([]);
      return;
    }

    const locationForApi = searchCenter || userLocation;
    if (!locationForApi) {
      return;
    }

    const fetchLogic = async () => {
      setIsLoading(true);
      setError(null);

      if (USE_MOCK_DATA) {
        setTimeout(() => {
          let data = mockMeetings;
          if (debouncedQuery) {
            data = data.filter((m) => m.title.toLowerCase().includes(debouncedQuery.toLowerCase()));
          }
          if (categories.length > 0) {
            data = data.filter((m) => categories.includes(m.category));
          }
          setMeetings(data);
          setIsLoading(false);
        }, 500);
      } else {
        try {
          const params: GetMeetingsParams = {};

          if (debouncedQuery) params.name = debouncedQuery;
          if (categories.length > 0) params.category = categories.join(',');

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
