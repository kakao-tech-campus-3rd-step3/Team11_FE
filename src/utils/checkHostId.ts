import type { ParticipantDTO } from '@/api/types/meeting_room.dto';

export const checkHostId = (participants: ParticipantDTO[]): number => {
  const host = participants.find((p) => p.role === 'HOST');
  return host!.id;
};
