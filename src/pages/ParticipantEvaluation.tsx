import { EvaluationGuideLabel } from '@/components/participant_evaluation_page/EvaluationGuideLabel';
import { Header } from '@/components/participant_evaluation_page/Header';
import { ParticipantList } from '@/components/participant_evaluation_page/ParticipantList';
import { Container } from '@/style/CommonStyle';

const ParticipantEvaluation = () => {
  return (
    <Container>
      <Header />
      <EvaluationGuideLabel />
      <ParticipantList />
    </Container>
  );
};

export default ParticipantEvaluation;
