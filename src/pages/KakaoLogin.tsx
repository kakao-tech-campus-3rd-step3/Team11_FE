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
      const result = await kakaoLogin(code);
      handleLoginSuccess(result, dispatch, navigate, 'kakao');
    } catch (error: any) {
      handleLoginError(error, navigate, 'kakao');
    }
  };

  return <div>카카오 로그인 중...</div>;
};

export default KakaoLogin;
