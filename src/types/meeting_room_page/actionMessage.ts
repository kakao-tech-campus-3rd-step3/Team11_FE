export type ActionType =
  | 'JOIN' // 모임 참여
  | 'EXIT' // 모임 탈퇴
  | 'KICKED' // 강제 퇴장
  | 'ENTER' // 입장
  | 'LEAVE' // 퇴장
  | 'MESSAGE' // 채팅 메세지
  | 'MODIFIED' // 모임방 수정
  | 'CANCELED' // 모집 취소
  | 'NEAR_STARTED' // 모임 시작 임박 알림
  | 'STARTED' // 모임 시작(OPEN -> IN_PROGRESS)
  | 'NEAR_END' // 모임 종료 임박 알림
  | 'END' // 모임 종료
  | undefined;

export type DefaultActionMessage = {
  participantId: number;
  action: ActionType;
};

export type JoinLeaveActionMessage = {
  action: ActionType;
  nickname: string;
  participantId: number;
  profileId: string;
  profileImageUrl: string;
};
