import type { Dispatch } from "react";
import { setMyProfile } from "@/store/slices/myProfileSlice";

// 공통 로그인 성공 처리 함수
export const handleLoginSuccess = (
  result: any,
  dispatch: Dispatch<any>,
  navigate: (path: string) => void,
  loginType: 'email' | 'kakao' = 'email'
) => {
  // 토큰 저장
  localStorage.setItem("accessToken", result.accessToken);
  localStorage.setItem("refreshToken", result.refreshToken);

  // Redux 상태 업데이트
  const userData = result.user || {};
  dispatch(setMyProfile({ 
    name: userData.name || userData.nickname || result.email
  }));

  alert(`${loginType === 'kakao' ? '카카오' : ''}로그인 성공!`);
  navigate("/home");
};

// 공통 로그인 실패 처리 함수
export const handleLoginError = (
  error: any,
  _navigate: (path: string) => void,
  loginType: 'email' | 'kakao' = 'email'
) => {
  console.error(`${loginType === 'kakao' ? '카카오 ' : ''}로그인 에러:`, error);
  
  if (error.response?.status === 401) {
    alert("이메일 또는 비밀번호가 잘못되었습니다.");
  } else if (error.response?.data?.detail) {
    alert(error.response.data.detail);
  } else if (error.message) {
    alert(`${loginType === 'kakao' ? '카카오 ' : ''}로그인 실패: ${error.message}`);
  } else {
    alert(`${loginType === 'kakao' ? '카카오 ' : ''}로그인에 실패했습니다. 네트워크 연결을 확인해주세요.`);
  }
};
