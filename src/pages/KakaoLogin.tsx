import { useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useLogin } from '@/hooks/useLogin';

const KakaoLogin = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { handleKakaoLogin } = useLogin();

  useEffect(() => {
    const code = searchParams.get('code');
    const error = searchParams.get('error');

    console.log('카카오 로그인 콜백 - code:', code, 'error:', error);

    if (error) {
      console.error('카카오 로그인 에러:', error);
      alert(`카카오 로그인에 실패했습니다: ${error}`);
      navigate('/login');
      return;
    }

    if (code) {
      console.log('인가 코드 수신:', code);
      handleKakaoLogin(code);
    } else {
      console.error('인가 코드가 없습니다.');
      alert('카카오 로그인 인증에 실패했습니다. 다시 시도해주세요.');
      navigate('/login');
    }
  }, [handleKakaoLogin, searchParams, navigate]);

  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      height: '100vh',
      fontSize: '18px'
    }}>
      카카오 로그인 처리 중...
    </div>
  );
};

export default KakaoLogin;
