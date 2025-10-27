import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useLogin } from '@/hooks/useLogin';
import { useToast } from '@/hooks/useToast';
import { Toast } from '@/components/common/Toast';

const KakaoLogin = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { handleKakaoLogin } = useLogin();
  const { showToast, hideToast, toast } = useToast();
  const [errorShown, setErrorShown] = useState(false);

  useEffect(() => {
    const code = searchParams.get('code');
    const error = searchParams.get('error');

    console.log('카카오 로그인 콜백 - code:', code, 'error:', error);

    if (error && !errorShown) {
      console.error('카카오 로그인 에러:', error);
      showToast(`카카오 로그인에 실패했습니다: ${error}`);
      setErrorShown(true);
      setTimeout(() => {
        navigate('/login');
      }, 2000);
      return;
    }

    if (code) {
      console.log('인가 코드 수신:', code);
      try {
        handleKakaoLogin(code);
      } catch (err: any) {
        if (!errorShown) {
          const errorMessage =
            err.response?.data?.detail ||
            err.response?.data?.message ||
            '카카오 로그인에 실패했습니다. 네트워크 연결을 확인해주세요.';
          showToast(errorMessage);
          setErrorShown(true);
        }
      }
    } else if (!code && !errorShown) {
      console.error('인가 코드가 없습니다.');
      showToast('카카오 로그인 인증에 실패했습니다. 다시 시도해주세요.');
      setErrorShown(true);
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    }
  }, [handleKakaoLogin, searchParams, navigate, showToast, errorShown]);

  return (
    <>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          fontSize: '18px',
        }}
      >
        카카오 로그인 처리 중...
      </div>
      {toast.visible && <Toast message={toast.message} onClose={hideToast} />}
    </>
  );
};

export default KakaoLogin;
