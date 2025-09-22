import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useLogin } from '@/hooks/useLogin';

const KakaoLogin = () => {
  const [searchParams] = useSearchParams();
  const { handleKakaoLogin } = useLogin();

  useEffect(() => {
    const code = searchParams.get('code');

    if (code) {
      handleKakaoLogin(code);
    } else {
      console.error('인가 코드가 없습니다.');
      // navigate는 useLogin 훅 내부에서 처리되므로 여기서는 제거
    }
  }, [handleKakaoLogin, searchParams]);


  return <div>카카오 로그인 중...</div>;
};

export default KakaoLogin;
