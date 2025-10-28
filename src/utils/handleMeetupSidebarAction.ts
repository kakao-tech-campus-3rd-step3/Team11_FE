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
        toast.error(e.message, {
          id: 'STARTED_ERROR',
        } as any);
      }
      break;
    }

    case 'cancel': {
      try {
        await cancelMeetUp();
        toast.info('모집이 취소되었습니다.', {
          id: 'CANCEL',
        } as any);
        navigate('/home');
      } catch (e: any) {
        toast.error(e.message, {
          id: 'CANCEL_ERROR',
        } as any);
      }
      break;
    }

    case 'update': {
      try {
        navigate('/create-room/update');
      } catch (e: any) {
        toast.error(e.message, {
          id: 'MODIFY_ERROR',
        } as any);
      }
      break;
    }

    case 'end': {
      try {
        await endMeetUp();
        toast.success('모임이 종료되었습니다.', {
          id: 'FINISH',
          position: 'bottom-center',
        } as any);
        navigate('/participant-evaluation');
      } catch (e: any) {
        toast.error(e.message, {
          id: 'END_ERROR',
        } as any);
      }
      break;
    }

    case 'leave': {
      try {
        await leaveMeetUp(meetUpId!);
        callback?.();
        toast.success('모임에서 나갔습니다.', {
          id: 'LEAVE',
        } as any);
        navigate('/home');
      } catch (e: any) {
        toast.error(e.message, {
          id: 'LEAVE_ERROR',
        } as any);
      }
      break;
    }
  }
};
