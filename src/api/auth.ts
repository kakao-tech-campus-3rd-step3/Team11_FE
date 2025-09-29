import api from "./axiosInstance";
import type { MyProfileState } from '@/store/slices/myProfileSlice';

// 프로필 조회 
export const getMyProfile = async (): Promise<MyProfileState> => {
  try {
    const response = await api.get('/api/profiles/me');
    return response.data;
  } catch (error) {
    console.error('프로필 조회 실패:', error);
    throw error;
  }
};

// 온보딩용 프로필 저장
export const saveOnboardingProfile = async (profileData: MyProfileState) => {
  try {
    const apiData = [
      {
        key: "nickname",
        value: profileData.nickname || '',
        description: "",
        type: "text",
        enabled: true
      },
      {
        key: "age", 
        value: profileData.age?.toString() || '',
        description: "",
        type: "text",
        enabled: true
      },
      {
        key: "gender",
        value: profileData.gender?.toUpperCase() || '',
        description: "",
        type: "text", 
        enabled: true
      },
      {
        key: "image",
        value: profileData.imageUrl ? [profileData.imageUrl] : [],
        description: "",
        type: "file",
        enabled: true
      },
      {
        key: "description",
        value: profileData.description || '',
        description: "",
        type: "text",
        enabled: true
      },
      {
        key: "baseLocation",
        value: profileData.baseLocation || '',
        description: "",
        type: "text",
        enabled: true
      }
    ];
    
    const response = await api.post('/api/profiles', apiData);
    return response.data;
  } catch (error: any) {
    console.error('프로필 저장 실패:', error);
    throw error;
  }
};

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
    console.log("카카오 로그인 API 호출 - code:", code);
    const res = await api.post("/api/auth/kakao", { code });
    console.log("카카오 로그인 API 응답:", res.data);
    return res.data;
  } catch (error: any) {
    console.error("카카오 로그인 실패:", error);
    console.error("에러 응답:", error.response?.data);
    console.error("에러 상태:", error.response?.status);
    
    const errorMessage = error.response?.data?.message || 
                        error.response?.data?.detail || 
                        error.message || 
                        "카카오 로그인 오류";
    throw new Error(errorMessage);
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