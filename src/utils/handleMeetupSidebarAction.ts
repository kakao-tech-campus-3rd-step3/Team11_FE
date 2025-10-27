import {
  cancelMeetUp,
  endMeetUp,
  leaveMeetUp,
  startMeetUp,
} from '@/api/services/meetup_room.service';
import type { NavigateFunction } from 'react-router-dom';
import { toast } from 'react-toastify';

export const handleMeetupAction = async (
  action: 'start' | 'cancel' | 'update' | 'end' | 'leave',
  navigate: NavigateFunction,
  meetUpId?: string,
  callback?: () => void,
) => {
  switch (action) {
    case 'start': {
      try {
        await startMeetUp();
      } catch (e: any) {
        toast.error(e.message);
      }
      break;
    }

    case 'cancel': {
      try {
        await cancelMeetUp();
        toast.info('모집이 취소되었습니다.');
        navigate('/home');
      } catch (e: any) {
        toast.error(e.message);
      }
      break;
    }

    case 'update': {
      try {
        navigate('/create-room/update');
      } catch (e: any) {
        toast.error(e.message);
      }
      break;
    }

    case 'end': {
      try {
        await endMeetUp();
        navigate('/participant-evaluation');
      } catch (e: any) {
        toast.error(e.message);
      }
      break;
    }

    case 'leave': {
      try {
        await leaveMeetUp(meetUpId!);
        callback?.();
        toast.success('모임에서 나갔습니다.');
        navigate('/home');
      } catch (e: any) {
        toast.error(e.message);
      }
      break;
    }

    default:
      toast.error('잘못된 액션입니다.');
  }
};
