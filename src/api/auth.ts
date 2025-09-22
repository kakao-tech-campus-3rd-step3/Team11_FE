import api from "./axiosInstance";

// 로그인 API
export const login = async (email: string, password: string) => {
  try {
    const res = await api.post("/api/auth/login", { email, password });
    return res.data;
  } catch (error: any) {
    console.error("로그인 실패:", error);
    throw new Error(error.response?.data?.message || "로그인 오류");
  }
};

// 카카오 로그인 API
export const kakaoLogin = async (code: string) => {
  try {
    const res = await api.post("/api/auth/kakao", { code });
    return res.data;
  } catch (error: any) {
    console.error("카카오 로그인 실패:", error);
    throw new Error(error.response?.data?.message || "카카오 로그인 오류");
  }
};

// 회원가입 API
export const signup = async (email: string, password1: string, password2: string) => {
  try {
    const res = await api.post("/api/auth/signup", { email, password1, password2 });
    return res.data; 
  } catch (error: any) {
    console.error("회원가입 실패:", error);
    throw new Error(error.response?.data?.message || "회원가입 오류");
  }
};