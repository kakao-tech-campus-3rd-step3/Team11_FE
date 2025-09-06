import { LoginButton } from '@/components/home_page/LoginButton';
import { Container, Text } from '@/style/CommonStyle';
import { useNavigate } from 'react-router-dom';
import { Logo } from './Landing.styled';
import LogoImg from '@/asset/LogoImg.png';

const Landing = () => {
  const navigte = useNavigate();

  return (
    <Container>
      <Logo alt="모밋 로고" src={LogoImg} onClick={() => navigte('/home')}></Logo>
      <Text>MOMEET</Text>
      <LoginButton onClick={() => navigte('/login')} />
    </Container>
  );
};

export default Landing;
