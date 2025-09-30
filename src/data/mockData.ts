import type { Meeting } from '@/types/meeting';

export const DUMMY_MEETINGS: Meeting[] = [
  {
    id: 1,
    title: '부산대 앞에서 리액트 스터디!',
    category: '스터디',
    hashtags: ['#리액트', '#타입스크립트', '#초보환영'],
    mannerTemperatureLimit: 36.5,
    deadline: '2025-10-05 18:00',
    description:
      '리액트와 타입스크립트에 대해 심도 깊게 공부할 스터디원을 모집합니다. 초보자도 환영해요!',
    address: '부산광역시 금정구 장전동',
    latitude: 35.2339,
    longitude: 129.0859,
    currentMembers: 3,
    maxMembers: 5,
  },
  {
    id: 2,
    title: '서면에서 저녁에 같이 코딩하실 분?',
    category: '스터디',
    hashtags: ['#모각코', '#프론트엔드', '#백엔드'],
    mannerTemperatureLimit: 40.0,
    deadline: '2025-10-02 12:00',
    description:
      '서면 근처 카페에서 저녁 시간동안 함께 모여 코딩해요. 서로 질문도 하고 지식도 공유하는 시간을 가져요.',
    address: '부산광역시 부산진구 부전동',
    latitude: 35.1578,
    longitude: 129.0592,
    currentMembers: 2,
    maxMembers: 4,
  },
  {
    id: 3,
    title: '해운대에서 주말 농구하실 분 구합니다',
    category: '운동',
    hashtags: ['#농구', '#주말운동', '#활력'],
    mannerTemperatureLimit: 30.0,
    deadline: '2025-10-04 09:00',
    description:
      '주말 오전에 해운대 해수욕장 근처 농구 코트에서 같이 땀 흘리실 분들을 찾습니다. 즐겁게 운동해요!',
    address: '부산광역시 해운대구 우동',
    latitude: 35.1631,
    longitude: 129.1634,
    currentMembers: 6,
    maxMembers: 10,
  },
];
