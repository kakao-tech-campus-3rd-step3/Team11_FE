import { Container } from '@/style/CommonStyle';
import { useNavigate } from 'react-router-dom';
import { 
  Logo, 
  WhiteBackground,
  SplashScreen, 
  SplashContent, 
  SplashTitle, 
  SplashSubtitle,
  Text
} from './Landing.styled';
import LogoImg from '@/assets/momeetLogo.svg';

const Landing = () => {
  const navigate = useNavigate();

  return (
    <>
      <WhiteBackground />
      
      {/* 랜딩 페이지  */}
      <Container onClick={() => navigate('/login')}>
        <Logo alt="모밋 로고" src={LogoImg} onClick={() => navigate('/home')}></Logo>
        <Text>MOMEET</Text>
      </Container>
      
      {/* 스플래시 스크린 */}
      <SplashScreen onClick={() => navigate('/login')}>
        <SplashContent>
          <SplashTitle>MOMEET</SplashTitle>
          <SplashSubtitle>새로운 만남을 시작하세요</SplashSubtitle>
        </SplashContent>
      </SplashScreen>
    </>
  );
};

export default Landing;
