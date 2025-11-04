import api from '../clients/axiosInstance';
import type {
  CreateEvaluationRequestDTO,
  GetEvaluableUsersResponse,
} from '../types/evaluation.dto';

export const getEvaluableParticipants = async (meetUpId: string) => {
  const response = await api.get<GetEvaluableUsersResponse>(
    `/api/meetups/${meetUpId}/evaluations/candidates`,
  );
  return response.data;
};

export const createEvaluation = async (meetupId: string, payload: CreateEvaluationRequestDTO) => {
  const response = await api.post(`/api/meetups/${meetupId}/evaluations`, payload);
  return response.data;
};
