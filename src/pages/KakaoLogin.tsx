import { useEffect, useState, useRef } from 'react';
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
  const [isProcessing, setIsProcessing] = useState(false);
  const processedRef = useRef(false); // 코드가 이미 처리되었는지 추적

  useEffect(() => {
    // 이미 처리된 경우 중복 실행 방지
    if (processedRef.current) {
      return;
    }

    const code = searchParams.get('code');
    const error = searchParams.get('error');

    console.log('카카오 로그인 콜백 - code:', code, 'error:', error, 'isProcessing:', isProcessing);

    if (error && !errorShown) {
      console.error('카카오 로그인 에러:', error);
      processedRef.current = true;
      setErrorShown(true);
      navigate('/login', {
        state: {
          kakaoError: `카카오 로그인에 실패했습니다: ${error}\n이미 가입된 계정인지 확인해 주세요.`,
        },
      });
      return;
    }

    if (code && !isProcessing) {
      console.log('인가 코드 수신:', code);
      processedRef.current = true; // 처리 시작 시 즉시 플래그 설정
      setIsProcessing(true);

      // async 함수를 즉시 실행
      (async () => {
        try {
          await handleKakaoLogin(code);
          // 성공 시 URL에서 code 파라미터 제거하여 재실행 방지
          const newSearchParams = new URLSearchParams(searchParams);
          newSearchParams.delete('code');
          window.history.replaceState({}, '', `${window.location.pathname}${newSearchParams.toString() ? '?' + newSearchParams.toString() : ''}`);
        } catch (err: any) {
          console.error('카카오 로그인 처리 실패:', err);
          if (!errorShown) {
            const errorMessage =
              err.response?.data?.detail ||
              err.response?.data?.message ||
              err.message ||
              '카카오 로그인에 실패했습니다. 네트워크 연결을 확인해주세요.';
            setErrorShown(true);
            navigate('/login', {
              state: {
                kakaoError: `${errorMessage}\n이미 가입된 계정인지 확인해 주세요.`,
              },
            });
          }
        } finally {
          setIsProcessing(false);
        }
      })();
    } else if (!code && !errorShown) {
      console.error('인가 코드가 없습니다.');
      processedRef.current = true;
      setErrorShown(true);
      navigate('/login', {
        state: {
          kakaoError: '카카오 로그인 인증에 실패했습니다. 다시 시도해주세요.\n이미 가입된 계정인지 확인해 주세요.',
        },
      });
    }
    // 의존성 배열에서 handleKakaoLogin 제거하여 불필요한 재실행 방지
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams, navigate, showToast, errorShown, isProcessing]);

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
