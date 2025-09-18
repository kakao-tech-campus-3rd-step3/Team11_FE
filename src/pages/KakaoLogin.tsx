import React, { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

const KakaoLogin = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const code = searchParams.get("code");
    console.log("카카오 인가 코드:", code);

    if (code) {
      // 실제 서비스에서는 백엔드로 code 보내고 토큰 발급
      // 예: axios.post("/api/auth/kakao", { code })
      navigate("/home"); // 테스트용으로 바로 홈 이동
    } else {
      console.error("인가 코드가 없습니다.");
    }
  }, []);

  return <div>카카오 로그인 중...</div>;
};

export default KakaoLogin;
