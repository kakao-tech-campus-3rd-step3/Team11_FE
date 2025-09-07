import { Container, ContentContanier } from '@/style/CommonStyle';
import LogoImg from '@/asset/LogoImg.png';
import {
  InputSection,
  Logo,
  LoginButton,
  LoginMain,
  LoginSection,
  Spacer,
} from './Login.styled';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <ContentContanier>
      <LoginMain>
          <Logo alt="모밋 로고" src={LogoImg} />
          <Spacer h={24}/>
          <LoginSection>
            <div>
              <InputSection
              placeholder="이메일"
              />
            </div>
            <div>
              <InputSection
                type="password"
                placeholder="비밀번호"

              />
            </div>
            <Spacer h={24}/>
            <LoginButton onClick={() => navigate('/home')}>
              로그인
            </LoginButton>
          </LoginSection>
        </LoginMain>
        </ContentContanier>
    </Container>

  );
};

export default Login;
