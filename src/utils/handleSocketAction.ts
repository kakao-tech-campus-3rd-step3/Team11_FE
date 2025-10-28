import type { ChatMessage } from '@/types/meeting_room_page/chatMessage';
import type React from 'react';
import type { NavigateFunction } from 'react-router-dom';
import { toast } from 'react-toastify';

let lastAction = '';
let lastActionTime = 0;

type ActionType =
  | 'ENTER'
  | 'JOIN'
  | 'LEAVE'
  | 'EXIT'
  | 'CANCELED'
  | 'MESSAGE'
  | 'STARTED'
  | 'FINISH'
  | undefined;

type DefaultActionMessage = {
  participantId: number;
  action: ActionType;
};

type JoinLeaveActionMessage = {
  action: ActionType;
  nickname: string;
  participantId: number;
  profileId: string;
  profileImageUrl: string;
};

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

    case 'FINISH': {
      toast.success('모임이 종료되었습니다.', {
        id: 'FINISH',
        position: 'bottom-center',
      } as any);
      navigate('/participant-evaluation');
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
        toast.success(`${receivedAction.nickname}님이 퇴장하셨습니다.`, {
          id: 'EXIT',
        } as any);
      }
      return false;
    }

    case 'CANCELED': {
      toast.info('모집이 취소되었습니다.', {
        id: 'CANCELED',
      } as any);
      navigate('/home');
    }
  }
};
