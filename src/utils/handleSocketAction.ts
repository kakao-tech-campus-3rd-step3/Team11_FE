import type {
  ActionType,
  DefaultActionMessage,
  JoinLeaveActionMessage,
} from '@/types/meeting_room_page/actionMessage';
import type { ChatMessage } from '@/types/meeting_room_page/chatMessage';
import type React from 'react';
import type { NavigateFunction } from 'react-router-dom';
import { toast } from 'react-toastify';

let lastAction = '';
let lastActionTime = 0;

function isJoinLeaveActionMessage(
  msg: DefaultActionMessage | JoinLeaveActionMessage,
): msg is JoinLeaveActionMessage {
  return ['JOIN', 'EXIT'].includes(msg.action ?? '') && 'nickname' in msg;
}

export const handleSocketAction = <T>(
  expectedAction: ActionType,
  receivedAction: DefaultActionMessage | JoinLeaveActionMessage,
  navigate: NavigateFunction,
  myId?: number,
  setState?: React.Dispatch<React.SetStateAction<T>>,
): boolean | undefined => {
  if (expectedAction !== receivedAction.action) return;

  const now = Date.now();
  if (receivedAction.action === lastAction && now - lastActionTime < 1000) {
    return;
  }
  lastAction = receivedAction.action!;
  lastActionTime = now;

  switch (expectedAction) {
    case 'STARTED': {
      toast.success('모임이 시작되었습니다.', {
        id: 'STARTED',
      } as any);
      setState!(true as T);
      return true;
    }

    case 'NEAR_END': {
      toast.warn('모집 종료까지 10분 남았습니다!', {
        id: 'NEAR_END',
      } as any);
      navigate('/participant-evaluation');
      return false;
    }

    case 'END': {
      toast.info('모임이 종료되었습니다.', {
        id: 'END',
        position: 'bottom-center',
      } as any);
      navigate('/participant-evaluation');
      return false;
    }

    case 'END_BY_SYSTEM': {
      toast.info('모집 시간이 마감되었습니다.', {
        id: 'END_BY_SYSTEM',
      } as any);
      navigate('/home');
      return false;
    }

    case 'JOIN': {
      if (isJoinLeaveActionMessage(receivedAction) && setState) {
        const systemMessage: ChatMessage = {
          id: crypto.randomUUID(),
          senderId: receivedAction.participantId,
          senderType: 'system',
          content: `${receivedAction.nickname}님이 입장하셨습니다.`,
          time: new Date(),
        };

        setState((prev) => [systemMessage, ...(prev as any[])] as T);
        toast.success(`${receivedAction.nickname}님이 입장하셨습니다.`, {
          id: 'JOIN',
        } as any);
      }
      return false;
    }

    case 'EXIT': {
      if (isJoinLeaveActionMessage(receivedAction) && setState) {
        const systemMessage: ChatMessage = {
          id: crypto.randomUUID(),
          senderId: receivedAction.participantId,
          senderType: 'system',
          content: `${receivedAction.nickname}님이 퇴장하셨습니다.`,
          time: new Date(),
        };

        setState((prev) => [systemMessage, ...(prev as any[])] as T);
        if (myId === receivedAction.participantId) return false;
        toast.info(`${receivedAction.nickname}님이 퇴장하셨습니다.`, {
          id: 'EXIT',
        } as any);
      }
      return false;
    }

    case 'MODIFIED': {
      toast.info('모임방 정보가 수정되었습니다.', {
        id: 'MODIFIED',
      } as any);
      return false;
    }

    case 'CANCELED': {
      toast.info('모집이 취소되었습니다.', {
        id: 'CANCELED',
      } as any);
      navigate('/home');
      return false;
    }
  }
};
