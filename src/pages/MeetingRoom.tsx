import { ChatBox } from '@/components/meeting_room_page/ChatBox';
import { ChatInput } from '@/components/meeting_room_page/ChatInput';
import { Header } from '@/components/meeting_room_page/Header';
import { ParticipantList } from '@/components/meeting_room_page/ParticipantList';
import { Container } from '@/style/CommonStyle';

const MeetingRoom = () => {
  return (
    <Container>
      <Header />
      <ParticipantList />
      <ChatBox />
      <ChatInput />
    </Container>
  );
};

export default MeetingRoom;
