import { getEvaluableParticipants } from '@/api/services/evaluation.service';
import type { EvaluableUserDTO, EvaluationItemDTO } from '@/api/types/evaluation.dto';
import { EvaluationGuideLabel } from '@/components/participant_evaluation_page/EvaluationGuideLabel';
import { Header } from '@/components/participant_evaluation_page/Header';
import { ParticipantList } from '@/components/participant_evaluation_page/ParticipantList';
import { SubmitButton } from '@/components/participant_evaluation_page/SubmitButton';
import { Container } from '@/style/CommonStyle';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

const ParticipantEvaluation = () => {
  const [searchParams] = useSearchParams();
  const meetUpId = searchParams.get('meetUpId');
  const [participants, setParticipants] = useState<EvaluableUserDTO[]>();
  const [evaluations, setEvaluations] = useState<EvaluationItemDTO[]>([]);

  console.log(evaluations);

  useEffect(() => {
    const getData = async () => {
      try {
        if (!meetUpId) return;

        const response = await getEvaluableParticipants(meetUpId);
        setParticipants(response);
        console.log('평가 모임 조회', response);
      } catch (error) {
        console.error(error);
      }
    };
    getData();
  }, [meetUpId]);

  return (
    <Container>
      <Header />
      <EvaluationGuideLabel />
      <ParticipantList participants={participants} setEvaluations={setEvaluations} />
      <SubmitButton meetUpId={meetUpId} evaluations={evaluations} />
    </Container>
  );
};

export default ParticipantEvaluation;
