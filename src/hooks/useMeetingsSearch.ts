import { useState, useEffect } from 'react';

import type { Meeting } from '@/types/meeting';
import { getMeetings, type GetMeetingsParams } from '@/api/services/meetup.service';

const USE_MOCK_DATA = true;

const mockMeetings: Meeting[] = [
  {
    id: 1,
    title: '부산대 앞에서 같이 코딩할 분',
    category: '스터디',
    hashtags: ['#코딩', '#초보환영'],
    mannerTemperatureLimit: 30,
    deadline: '2025-10-16T18:00:00',
    address: '스타벅스 부산대역점',
    latitude: 35.2335,
    longitude: 129.081,
    currentMembers: 2,
    maxMembers: 5,
  },
  {
    id: 2,
    title: '저녁에 농구 한 게임!',
    category: '운동',
    hashtags: ['#농구', '#평일저녁'],
    mannerTemperatureLimit: 20,
    deadline: '2025-10-15T19:00:00',
    address: '온천천 농구장',
    latitude: 35.2101,
    longitude: 129.0683,
    currentMembers: 8,
    maxMembers: 10,
  },
  {
    id: 3,
    title: '주말 보드게임 모임',
    category: '게임',
    hashtags: ['#보드게임', '#주말'],
    mannerTemperatureLimit: 36,
    deadline: '2025-10-18T14:00:00',
    address: '히어로보드게임카페 서면점',
    latitude: 35.1578,
    longitude: 129.0594,
    currentMembers: 3,
    maxMembers: 6,
  },
  {
    id: 4,
    title: '서면에서 마라탕 드실 분',
    category: '맛집탐방',
    hashtags: ['#마라탕', '#중식'],
    mannerTemperatureLimit: 36.5,
    deadline: '2025-10-17T19:30:00',
    address: '라라관 서면점',
    latitude: 35.158,
    longitude: 129.06,
    currentMembers: 1,
    maxMembers: 4,
  },
  {
    id: 5,
    title: '이번 주 개봉 영화 보러 갈 사람',
    category: '영화',
    hashtags: ['#영화', '#최신영화'],
    mannerTemperatureLimit: 32,
    deadline: '2025-10-19T20:00:00',
    address: 'CGV 서면',
    latitude: 35.157,
    longitude: 129.058,
    currentMembers: 1,
    maxMembers: 2,
  },
  {
    id: 6,
    title: '기타 연주 함께 연습해요',
    category: '기타',
    hashtags: ['#음악', '#기타'],
    mannerTemperatureLimit: 25,
    deadline: '2025-10-20T17:00:00',
    address: '부산시민공원',
    latitude: 35.168,
    longitude: 129.055,
    currentMembers: 3,
    maxMembers: 5,
  },
];

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
