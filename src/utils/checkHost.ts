import type { ParticipantDTO } from '@/api/types/meeting_room.dto';

export const checkHost = (participants: ParticipantDTO[], myId: number): boolean => {
  const me = participants.find((p) => p.id === myId);
  return me?.role === 'HOST';
};
