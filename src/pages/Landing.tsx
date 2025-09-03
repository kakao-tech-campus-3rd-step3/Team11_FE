import { LoginButton } from '@/components/home_page/LoginButton';
import { Container, Text } from '@/style/CommonStyle';
import { useNavigate } from 'react-router-dom';


const Landing = () => {
  const navigte = useNavigate();

  return (
    <Container>
      <Text onClick={() => navigte('/home')}>안녕하세요?</Text>
      <LoginButton onClick={() => navigte('/login')} />
    </Container>
  );
};

export default Landing;
