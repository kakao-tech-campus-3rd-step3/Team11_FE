import styled from '@emotion/styled';
import { toast } from 'react-toastify';
import { createEvaluation } from '@/api/services/evaluation.service';
import type { EvaluationItemDTO } from '@/api/types/evaluation.dto';
import { useNavigate } from 'react-router-dom';

interface SubmitButtonProps {
  meetUpId: string | null;
  evaluations: EvaluationItemDTO[];
}

const Container = styled.div`
  display: flex;
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 5rem;
  justify-content: center;
  align-items: center;
  padding-left: 2rem;
  padding-right: 2rem;
  box-sizing: border-box;
`;

const Button = styled.button`
  width: 100%;
  height: 3rem;
  background-color: #ff8a8a;
  justify-content: center;
  align-items: center;
  color: white;
  border: none;
  border-radius: 0.75rem;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #f95858;
  }
`;

export const SubmitButton = ({ meetUpId, evaluations }: SubmitButtonProps) => {
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!meetUpId) return toast.error('meetUpId가 없습니다.');
    if (evaluations.length === 0) return toast.info('평가할 참여자를 선택하세요.');

    try {
      const payload = { items: evaluations };
      await createEvaluation(meetUpId, payload);
      toast.success('참여자 평가가 성공적으로 제출되었습니다.');
      navigate('/home');
    } catch (error) {
      console.error(error);
      toast.error('제출 중 오류가 발생했습니다.');
    }
  };

  return (
    <Container>
      <Button onClick={handleSubmit}>제출하기</Button>
    </Container>
  );
};
