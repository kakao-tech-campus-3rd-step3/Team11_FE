import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setMyProfile } from "@/store/slices/myProfileSlice";
import { signup } from "@/api/auth";

import { Container, ContentContanier, Spacer } from "@/style/CommonStyle";
import LogoImg from "@/assets/momeetLogo.svg";
import {
  InputSection,
  Logo,
  LoginButton,
  LoginMain,
  LoginSection,
  RegisterButton,
  KaKaoLoginBTn,
} from "./Login.styled";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [errors, setErrors] = useState<{ [key: string]: string[] }>({});

  // 회원가입 핸들러
  const handleSignup = async () => {
    setErrors({});
    if (password1 !== password2) {
      setErrors({ password2: ["비밀번호가 일치하지 않습니다."] });
      return;
    }

    try {
      const result = await signup({ email, password1, password2 });

      // 토큰 저장
      localStorage.setItem("accessToken", result.accessToken);
      localStorage.setItem("refreshToken", result.refreshToken);

      // Redux 상태 업데이트 (예시는 이메일만 name에 넣음)
      dispatch(setMyProfile({ name: email }));

      alert("회원가입 완료!");
      navigate("/home");
    } catch (err: any) {
      if (err.status === 409) {
        alert(err.detail); // 이미 가입한 이메일
      } else if (err.status === 400 && err.validationErrors) {
        setErrors(err.validationErrors); // 필드별 에러 표시
      } else {
        alert(err.detail || "회원가입 실패");
      }
    }
  };

  // 카카오 로그인 핸들러
  const handleKakaoLogin = () => {
    const REST_API_KEY = "여기에_발급받은_REST_API_KEY";
    const REDIRECT_URI = "http://localhost:5173/kakao/callback";
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
                value={password1}
                onChange={(e) => setPassword1(e.target.value)}
              />
              {errors.password1 && (
                <div style={{ color: "red" }}>{errors.password1[0]}</div>
              )}
            </div>
            <Spacer h={24} />
            <div>
              <InputSection
                type="password"
                placeholder="비밀번호 확인"
                value={password2}
                onChange={(e) => setPassword2(e.target.value)}
              />
              {errors.password2 && (
                <div style={{ color: "red" }}>{errors.password2[0]}</div>
              )}
            </div>
            <Spacer h={24} />
            <LoginButton onClick={() => navigate("/home")}>로그인</LoginButton>
            <Spacer h={14} />
            <RegisterButton onClick={handleSignup}>회원가입</RegisterButton>
            <Spacer h={12} />
            <KaKaoLoginBTn onClick={handleKakaoLogin}>
              카카오 간편 로그인
            </KaKaoLoginBTn>
          </LoginSection>
        </LoginMain>
      </ContentContanier>
    </Container>
  );
};

export default Login;
