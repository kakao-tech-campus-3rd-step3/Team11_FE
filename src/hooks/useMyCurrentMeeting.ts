import { useState, useEffect, useCallback } from 'react';
import { getMyJoinedMeetup } from '@/api/services/meetup_room.service';
import type { MeetupResponseDTO } from '@/api/types/meeting_room.dto';

export const useMyCurrentMeeting = () => {
  const [myMeeting, setMyMeeting] = useState<MeetupResponseDTO | null>(null);
  const [isLoadingMeeting, setIsLoadingMeeting] = useState(true);
  const [meetingError, setMeetingError] = useState<string | null>(null);

  const fetchMyMeeting = useCallback(async () => {
    try {
      setIsLoadingMeeting(true);
      const meetingData = await getMyJoinedMeetup();
      setMyMeeting(meetingData);
    } catch (err: any) {
      setMyMeeting(null);
      setMeetingError(err.message || '참여 중인 모임 정보를 불러오는데 실패했습니다.');
    } finally {
      setIsLoadingMeeting(false);
    }
  }, []);

  useEffect(() => {
    fetchMyMeeting();
  }, [fetchMyMeeting]);

  return { myMeeting, isLoadingMeeting, meetingError, refetchMyMeeting: fetchMyMeeting };
};
