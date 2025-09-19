import { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { kakaoLogin } from "@/api/auth";
import { handleLoginSuccess, handleLoginError } from "@/utils/authUtils";

const KakaoLogin = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const code = searchParams.get("code");

    if (code) {
      handleKakaoLogin(code);
    } else {
      console.error("인가 코드가 없습니다.");
      navigate("/login");
    }
  }, [navigate, searchParams]);

  const handleKakaoLogin = async (code: string) => {
    try {
      console.log("카카오 로그인 처리 시작");
      
      
      // 임시로 테스트용 계정
      const testEmail = "alice@test.com";
      const testPassword = "testpass1212!";
      
      console.log("테스트 계정으로 로그인 시도:", testEmail);
      
      const { login } = await import("@/api/auth");
      const result = await login(testEmail, testPassword);
      
      console.log("로그인 성공:", result);
      handleLoginSuccess(result, dispatch, navigate, 'kakao');
    } catch (error: any) {
      console.error("카카오 로그인 실패:", error);
      handleLoginError(error, navigate, 'kakao');
    }
  };

  return <div>카카오 로그인 중...</div>;
};

export default KakaoLogin;
