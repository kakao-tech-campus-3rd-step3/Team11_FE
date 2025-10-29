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
  longitude: number | undefined;
  latitude: number | undefined;
  address: string | undefined;
}

export interface Profile {
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

export interface ParticipantDTO {
  id: number;
  profile: Profile;
  role: 'HOST' | 'MEMBER';
  isActive: boolean;
  isRated: boolean;
  lastActiveAt: string;
  createdAt: string;
}
export interface MeetupRequestDTO {
  name: string;
  category: string;
  description: string;
  hashTags: string[];
  capacity: number;
  scoreLimit: number;
  startAt: string;
  endAt: string;
  location: Location;
}

export interface MeetupResponseDTO {
  id: string;
  name: string;
  category: string;
  description: string;
  participantCount: number;
  capacity: number;
  scoreLimit: number;
  owner: Owner;
  sigungu: Sigungu;
  location: Location;
  hashTags: string[];
  status: string;
  startAt: string;
  endAt: string;
  createdAt: string;
  updatedAt: string;
}

export interface ChatListResponseDTO {
  content: ChatMessageDTO[];
  size: number;
  nextId: number;
  hasNext: boolean;
}

export interface ChatMessageDTO {
  type: 'TEXT' | 'IMAGE' | 'SYSTEM';
  senderId: number;
  content: string;
  sentAt: string;
}
