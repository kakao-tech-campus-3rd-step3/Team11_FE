export type ActionType =
  | 'ENTER'
  | 'JOIN'
  | 'LEAVE'
  | 'EXIT'
  | 'MODIFIED'
  | 'CANCELED'
  | 'MESSAGE'
  | 'STARTED'
  | 'NEAR_END'
  | 'END'
  | 'END_BY_SYSTEM'
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
