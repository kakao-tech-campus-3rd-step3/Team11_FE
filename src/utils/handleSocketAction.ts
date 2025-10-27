import type { NavigateFunction } from 'react-router-dom';
import { toast } from 'react-toastify';

type ActionType = 'ENTER' | 'LEAVE' | 'EXIT' | 'MESSAGE' | 'STARTED' | 'FINISH' | undefined;

export const handleSocketAction = async (action: ActionType, navigate: NavigateFunction) => {
  switch (action) {
    case 'STARTED': {
      try {
        toast.success('모임이 시작되었습니다.');
      } catch (e: any) {
        toast.error(e.message);
      }
      break;
    }

    case 'FINISH': {
      try {
        toast.success('모임이 종료되었습니다.');
        navigate('/participant-evaluation');
      } catch (e: any) {
        toast.error(e.message);
      }
      break;
    }
  }
};
