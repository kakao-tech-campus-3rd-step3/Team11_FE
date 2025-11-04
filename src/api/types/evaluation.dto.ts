export type RatingType = 'LIKE' | 'DISLIKE';

export interface EvaluableUserDTO {
  profileId: string;
  nickname: string;
  imageUrl: string;
  temperature: number;
  currentEvaluation: number | null;
}

export interface EvaluationItemDTO {
  targetProfileId: string;
  rating: RatingType;
}

export interface CreateEvaluationRequestDTO {
  items: EvaluationItemDTO[];
}

export type GetEvaluableUsersResponse = EvaluableUserDTO[];
