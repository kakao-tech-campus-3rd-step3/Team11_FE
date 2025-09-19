import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "@/api/auth";
import { handleLoginSuccess, handleLoginError } from "@/utils/authUtils";

import { Container, ContentContanier, Spacer } from "@/style/CommonStyle";
import LogoImg from "@/assets/momeetLogo.svg";
import {
  InputSection,
  Logo,
  LoginButton,
  LoginMain,
  LoginSection,
  KaKaoLoginBTn,
  LinkText,
} from "./Login.styled";
import apikey from "@/config/apikey.example";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ [key: string]: string[] }>({});

  // 로그인 핸들러
  const handleLogin = async () => {
    setErrors({});
    try {
      const result = await login(email, password);
      handleLoginSuccess(result, dispatch, navigate, 'email');
    } catch (err: any) {
      handleLoginError(err, navigate, 'email');
    }
  };

  // 카카오 로그인 핸들러
  const handleKakaoLogin = () => {
    if (!apikey.kakaoRestApiKey) {
      alert("카카오 API 키가 설정되지 않았습니다. 관리자에게 문의하세요.");
      return;
    }
    
    const REST_API_KEY = apikey.kakaoRestApiKey;
    const REDIRECT_URI = "http://localhost:5173/login";
    const kakaoAuthURL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
    window.location.href = kakaoAuthURL;
  };

  return (
    <Container>
      <ContentContanier>
        <LoginMain>
          <Logo alt="모밋 로고" src={LogoImg} />
          <Spacer h={48} />
          <LoginSection>
            <div>
              <InputSection
                placeholder="이메일"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {errors.email && (
                <div style={{ color: "red" }}>{errors.email[0]}</div>
              )}
            </div>
            <Spacer h={24} />
            <div>
              <InputSection
                type="password"
                placeholder="비밀번호"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {errors.password && (
                <div style={{ color: "red" }}>{errors.password[0]}</div>
              )}
            </div>
            <Spacer h={24} />
            <LoginButton onClick={handleLogin}>로그인</LoginButton>
            <Spacer h={12} />
            <KaKaoLoginBTn onClick={handleKakaoLogin}>
              카카오 간편 로그인
            </KaKaoLoginBTn>
            <Spacer h={12} />
            <div style={{ textAlign: "center" }}>
              <LinkText>
                계정이 없으신가요?{" "}
                <Link to="/signup" style={{ color: "#007bff", textDecoration: "none" }}>
                  회원가입하기
                </Link>
              </LinkText>
            </div>
          </LoginSection>
        </LoginMain>
      </ContentContanier>
    </Container>
  );
};

export default Login;
