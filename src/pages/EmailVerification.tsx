import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Container, ContentContanier, Spacer } from '@/style/CommonStyle';
import LogoImg from '@/assets/momeetLogo.svg';
import {
  VerificationMain,
  Logo,
  VerificationSection,
  SuccessIcon,
  Title,
  Message,
  LoginButton,
} from './EmailVerification.styled';
import { verifyEmail } from '@/api/services/auth.service';
import { Toast } from '@/components/common/Toast';
import { useToast } from '@/hooks/useToast';

const EmailVerification = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const code = searchParams.get('code');
  const { showToast, hideToast, toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [isVerified, setIsVerified] = useState(false);

  useEffect(() => {
    const handleVerification = async () => {
      if (!code) {
        showToast('인증 코드가 없습니다.');
        setTimeout(() => navigate('/login'), 2000);
        return;
      }

      try {
        await verifyEmail(code);
        setIsVerified(true);
        setIsLoading(false);
      } catch (error: any) {
        const errorMessage =
          error.response?.data?.detail ||
          error.response?.data?.message ||
          error.message ||
          '이메일 인증에 실패했습니다.';
        showToast(errorMessage);
        setIsLoading(false);
      }
    };

    handleVerification();
  }, [code, navigate, showToast]);

  const handleGoToLogin = () => {
    navigate('/login');
  };

  if (isLoading) {
    return (
      <Container>
        <ContentContanier>
          <VerificationMain>
            <Logo alt="모밋 로고" src={LogoImg} />
            <Spacer h={48} />
            <VerificationSection>
              <Title>인증 중...</Title>
              <Message>이메일 인증을 진행하고 있습니다.</Message>
            </VerificationSection>
          </VerificationMain>
        </ContentContanier>
      </Container>
    );
  }

  if (!isVerified) {
    return (
      <Container>
        <ContentContanier>
          <VerificationMain>
            <Logo alt="모밋 로고" src={LogoImg} />
            <Spacer h={48} />
            <VerificationSection>
              <Title>인증 실패</Title>
              <Message>
                이메일 인증에 실패했습니다.
                <br />
                링크가 만료되었거나 잘못된 링크일 수 있습니다.
              </Message>
              <LoginButton onClick={handleGoToLogin}>로그인하기</LoginButton>
            </VerificationSection>
          </VerificationMain>
        </ContentContanier>
        {toast.visible && <Toast message={toast.message} onClose={hideToast} />}
      </Container>
    );
  }

  return (
    <Container>
      <ContentContanier>
        <VerificationMain>
          <Logo alt="모밋 로고" src={LogoImg} />
          <Spacer h={48} />
          <VerificationSection>
            <SuccessIcon />
            <Title>인증이 완료되었습니다!</Title>
            <Message>
              이메일 인증이 성공적으로 완료되었습니다.
              <br />
              로그인하여 서비스를 이용해보세요.
            </Message>
            <LoginButton onClick={handleGoToLogin}>로그인하기</LoginButton>
          </VerificationSection>
        </VerificationMain>
      </ContentContanier>
      {toast.visible && <Toast message={toast.message} onClose={hideToast} />}
    </Container>
  );
};

export default EmailVerification;

