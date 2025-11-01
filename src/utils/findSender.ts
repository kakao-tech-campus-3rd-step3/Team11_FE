import type { ParticipantDTO } from '@/api/types/meeting_room.dto';

export const findSender = (
  participants: ParticipantDTO[],
  senderId: number,
): ParticipantDTO | undefined => {
  const sender = participants.find((p) => p.id === senderId);
  return sender;
};
