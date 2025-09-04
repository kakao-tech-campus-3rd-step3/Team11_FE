import { Header } from '@/components/meeting_room_page/Header';
import { ParticipantList } from '@/components/meeting_room_page/ParticipantList';
import { Container } from '@/style/CommonStyle';

const MeetingRoom = () => {
  return (
    <Container>
      <Header />
      <ParticipantList />
    </Container>
  );
};

export default MeetingRoom;
