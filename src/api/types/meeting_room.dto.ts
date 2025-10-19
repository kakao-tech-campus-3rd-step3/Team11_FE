export interface Owner {
  id: string;
  nickname: string;
  age: number;
  gender: 'MALE' | 'FEMALE';
  imageUrl: string;
  description: string;
  baseLocationId: number;
  baseLocation: string;
  temperature: number;
  likes: number;
  dislikes: number;
  createdAt: string;
  updatedAt: string;
}

export interface Sigungu {
  sidoName: string;
  sidoCode: number;
  sigunguName: string;
  sigunguCode: number;
  baseLocation: BaseLocation;
  createdAt: string;
  updatedAt: string;
}

export interface BaseLocation {
  longitude: number;
  latitude: number;
  address: string;
}

export interface Location {
  longitude: number;
  latitude: number;
  address: string;
}

export interface MeetupRequestDTO {
  name: string;
  category: string;
  subCategory: string;
  description: string;
  hashTags: string[];
  capacity: number;
  scoreLimit: number;
  durationHours: number;
  location: Location;
}

export interface MeetupResponseDto {
  id: string;
  name: string;
  category: string;
  subCategory: string;
  description: string;
  participantCount: number;
  capacity: number;
  scoreLimit: number;
  owner: Owner;
  sigungu: Sigungu;
  location: Location;
  hashTags: string[];
  status: string;
  endAt: string;
  createdAt: string;
  updatedAt: string;
}
