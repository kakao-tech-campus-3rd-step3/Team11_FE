export interface Meeting {
  id: number;
  title: string;
  category: string;
  description: string;
  address: string;
  latitude: number;
  longitude: number;
  currentMembers: number;
  maxMembers: number;
}
