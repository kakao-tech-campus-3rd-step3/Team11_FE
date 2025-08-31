import { LoginButton } from '@/components/home_page/LoginButton';
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
  background-color: #f0f0f0;
`;

const Text = styled.div`
  font-size: 1.25rem;
  font-weight: 500;
  color: #333;
  margin-bottom: 2rem;
  cursor: pointer;
`;

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
