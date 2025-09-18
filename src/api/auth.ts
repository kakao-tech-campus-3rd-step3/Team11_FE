import axios from "axios";

const BASE_URL = "http://localhost:8000"; // 실제 서버 주소로 변경

interface SignupData {
  email: string;
  password1: string;
  password2: string;
}

export const signup = async (data: SignupData) => {
  try {
    const response = await axios.post(`${BASE_URL}/api/auth/signup`, data, {
      headers: { "Content-Type": "application/json" },
    });
    return response.data; // { accessToken, refreshToken }
  } catch (error: any) {
    if (error.response) {
      return Promise.reject(error.response.data);
    } else {
      return Promise.reject({ detail: "서버 연결 실패" });
    }
  }
};
