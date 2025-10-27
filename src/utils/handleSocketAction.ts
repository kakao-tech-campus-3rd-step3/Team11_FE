import type { ChatMessage } from '@/types/meeting_room_page/chatMessage';
import type { SetStateAction } from 'react';
import type { NavigateFunction } from 'react-router-dom';
import { toast } from 'react-toastify';

type ActionType =
  | 'ENTER'
  | 'JOIN'
  | 'LEAVE'
  | 'EXIT'
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

export const handleSocketAction = (
  expectedAction: ActionType,
  receivedAction: DefaultActionMessage | JoinLeaveActionMessage,
  navigate: NavigateFunction,
  setChatMessages?: React.Dispatch<SetStateAction<ChatMessage[]>>,
): boolean | undefined => {
  if (expectedAction !== receivedAction.action) return;

  switch (expectedAction) {
    case 'STARTED': {
      toast.success('모임이 시작되었습니다.');
      return true;
    }

    case 'FINISH': {
      toast.success('모임이 종료되었습니다.');
      navigate('/participant-evaluation');
      return false;
    }

    case 'JOIN': {
      if (isJoinLeaveActionMessage(receivedAction) && setChatMessages) {
        const systemMessage: ChatMessage = {
          id: crypto.randomUUID(),
          senderId: receivedAction.participantId,
          senderType: 'system',
          content: `${receivedAction.nickname}님이 입장하셨습니다.`,
          time: new Date(),
        };

        setChatMessages((prev) => [systemMessage, ...prev]);
        toast.success(`${receivedAction.nickname}님이 입장하셨습니다.`);
      }
      return false;
    }

    case 'EXIT': {
      if (isJoinLeaveActionMessage(receivedAction) && setChatMessages) {
        const systemMessage: ChatMessage = {
          id: crypto.randomUUID(),
          senderId: receivedAction.participantId,
          senderType: 'system',
          content: `${receivedAction.nickname}님이 퇴장하셨습니다.`,
          time: new Date(),
        };

        setChatMessages((prev) => [systemMessage, ...prev]);
        toast.success(`${receivedAction.nickname}님이 퇴장하셨습니다.`);
      }
      return false;
    }
  }
};
