export interface MeetingLocation {
  longitude: number;
  latitude: number;
  address: string;
}

export interface Meeting {
  id: number;
  name: string;
  category: string;
  hashTags: string[];
  scoreLimit: number;
  endAt: string;
  location: MeetingLocation;
  participantCount: number;
  capacity: number;

  [key: string]: any;
}
