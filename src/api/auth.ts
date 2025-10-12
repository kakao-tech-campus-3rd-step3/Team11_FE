import api from './axiosInstance';
import type { MyProfileState } from '@/store/slices/myProfileSlice';

// 프로필 조회
export const getMyProfile = async (): Promise<MyProfileState> => {
  try {
    const response = await api.get('/api/profiles/me');
    return response.data;
  } catch (error: any) {
    console.error('프로필 조회 실패:', error);

    if (!error.response) {
      if (error.code === 'ECONNABORTED') {
        throw new Error('서버 응답 시간이 초과되었습니다. 잠시 후 다시 시도해주세요.');
      } else if (error.code === 'ERR_NETWORK') {
        throw new Error('네트워크 연결에 실패했습니다. 인터넷 연결을 확인해주세요.');
      } else {
        throw new Error('서버에 연결할 수 없습니다. 잠시 후 다시 시도해주세요.');
      }
    }

    // 서버 응답 에러 처리
    const errorMessage =
      error.response.data?.detail ||
      error.response.data?.message ||
      '프로필 정보를 불러오는데 실패했습니다.';
    throw new Error(errorMessage);
  }
};

// 온보딩용 프로필 저장
export const saveOnboardingProfile = async (profileData: MyProfileState) => {
  try {
    const formData = new FormData();

    const fields = ['nickname', 'age', 'gender', 'description'] as const;
    for (const key of fields) {
      const value = profileData[key as keyof MyProfileState];
      if (value) {
        formData.append(key, value.toString());
      }
    }

    // baseLocation 임시방편!!! 추후 수정필요
    if (profileData.baseLocation) {
      formData.append('baseLocation.baseLocationId', '26410');
    }

    // 이미지 필드 처리
    if (profileData.imageUrl) {
      // imageUrl이 File 객체인 경우
      if (profileData.imageUrl && typeof profileData.imageUrl !== 'string') {
        formData.append('image', profileData.imageUrl);
      } else {
        // imageUrl이 문자열 URL인 경우, Blob으로 변환
        try {
          const response = await fetch(profileData.imageUrl);
          const blob = await response.blob();
          const file = new File([blob], 'profile-image.jpg', { type: blob.type });
          formData.append('image', file);
        } catch (error) {
          console.warn('이미지 URL을 File로 변환하는데 실패했습니다:', error);
        }
      }
    }

    // FormData 내용
    console.log('프로필 저장 요청 데이터 (FormData):');
    for (let [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
    }
    console.log('원본 데이터:', profileData);

    const response = await api.post('/api/profiles', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error: any) {
    console.error('프로필 저장 실패:', error);

    // 네트워크 에러 처리 (response가 없는 경우)
    if (!error.response) {
      if (error.code === 'ECONNABORTED') {
        throw new Error('서버 응답 시간이 초과되었습니다. 잠시 후 다시 시도해주세요.');
      } else if (error.code === 'ERR_NETWORK') {
        throw new Error('네트워크 연결에 실패했습니다. 인터넷 연결을 확인해주세요.');
      } else {
        throw new Error('서버에 연결할 수 없습니다. 잠시 후 다시 시도해주세요.');
      }
    }

    // 유효성 검사 에러 처리
    if (error.response.data?.validationErrors) {
      const validationErrors = error.response.data.validationErrors;
      const errorMessages = Object.entries(validationErrors)
        .map(([_, messages]) => (messages as string[]).join('\n'))
        .join('\n');
      throw new Error(errorMessages || '유효성 검사에 실패했습니다.');
    }

    // 서버 응답 에러 처리
    const errorMessage =
      error.response.data?.detail || error.response.data?.message || '프로필 저장에 실패했습니다.';
    throw new Error(errorMessage);
  }
};

// 프로필 수정 API
export const updateProfile = async (profileData: MyProfileState) => {
  try {
    const formData = new FormData();

    // 텍스트 필드들을 FormData에 추가
    const fields = ['nickname', 'age', 'gender', 'description'] as const;
    for (const key of fields) {
      const value = profileData[key as keyof MyProfileState];
      if (value) {
        const formattedValue = key === 'gender' ? (value as string).toUpperCase() : 
                              key === 'age' ? (value as number).toString() : 
                              value as string;
        formData.append(key, formattedValue);
      }
    }

    // baseLocation  추후 수정필요
    if (profileData.baseLocation) {
      formData.append('baseLocation.baseLocationId', '26410');
    }

    // 이미지 필드 처리
    if (profileData.imageUrl) {
      // imageUrl이 File 객체인 경우
      if (profileData.imageUrl && typeof profileData.imageUrl !== 'string') {
        formData.append('image', profileData.imageUrl);
      } else {
        // imageUrl이 문자열 URL인 경우, Blob으로 변환
        try {
          const response = await fetch(profileData.imageUrl);
          const blob = await response.blob();
          const file = new File([blob], 'profile-image.jpg', { type: blob.type });
          formData.append('image', file);
        } catch (error) {
          console.warn('이미지 URL을 File로 변환하는데 실패했습니다:', error);
        }
      }
    }

    // FormData 내용 로깅
    console.log('프로필 수정 요청 데이터 (FormData):');
    for (let [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
    }
    console.log('원본 데이터:', profileData);

    const response = await api.put('/api/profiles/me', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error: any) {
    console.error('프로필 수정 실패:', error);

    // 네트워크 에러 처리 (response가 없는 경우)
    if (!error.response) {
      if (error.code === 'ECONNABORTED') {
        throw new Error('서버 응답 시간이 초과되었습니다. 잠시 후 다시 시도해주세요.');
      } else if (error.code === 'ERR_NETWORK') {
        throw new Error('네트워크 연결에 실패했습니다. 인터넷 연결을 확인해주세요.');
      } else {
        throw new Error('서버에 연결할 수 없습니다. 잠시 후 다시 시도해주세요.');
      }
    }

    // 유효성 검사 에러 처리
    if (error.response.data?.validationErrors) {
      const validationErrors = error.response.data.validationErrors;
      const errorMessages = Object.entries(validationErrors)
        .map(([_, messages]) => (messages as string[]).join('\n'))
        .join('\n');
      throw new Error(errorMessages || '유효성 검사에 실패했습니다.');
    }

    // 서버 응답 에러 처리
    const errorMessage =
      error.response.data?.detail || error.response.data?.message || '프로필 수정에 실패했습니다.';
    throw new Error(errorMessage);
  }
};

// 로그인 API
export const login = async (email: string, password: string) => {
  try {
    const res = await api.post('/api/auth/login', { email, password });
    return res.data;
  } catch (error: any) {
    console.error('로그인 실패:', error);

    // 유효성 검사 에러 처리
    if (error.response?.data?.validationErrors) {
      const validationErrors = error.response.data.validationErrors;
      const errorMessages = Object.entries(validationErrors)
        .map(([_, messages]) => (messages as string[]).join('\n'))
        .join('\n');
      throw new Error(errorMessages || '유효성 검사에 실패했습니다.');
    }

    const errorMessage = error.response?.data?.detail || '로그인 오류가 발생했습니다222.';
    throw new Error(errorMessage);
  }
};

// 카카오 로그인 API
export const kakaoLogin = async (code: string) => {
  try {
    console.log('카카오 로그인 API 호출 - code:', code);
    const res = await api.post('/api/auth/kakao', { code });
    console.log('카카오 로그인 API 응답:', res.data);
    return res.data;
  } catch (error: any) {
    console.error('카카오 로그인 실패:', error);
    console.error('에러 응답:', error.response?.data);
    console.error('에러 상태:', error.response?.status);

    // 유효성 검사 에러 처리
    if (error.response?.data?.validationErrors) {
      const validationErrors = error.response.data.validationErrors;
      const errorMessages = Object.entries(validationErrors)
        .map(([_, messages]) => (messages as string[]).join('\n'))
        .join('\n');
      throw new Error(errorMessages || '유효성 검사에 실패했습니다.');
    }

    const errorMessage = error.response?.data?.detail || '카카오 로그인 오류';
    throw new Error(errorMessage);
  }
};

// 회원가입 API
export const signup = async (email: string, password1: string, password2: string) => {
  try {
    const res = await api.post('/api/auth/signup', { email, password1, password2 });
    return res.data;
  } catch (error: any) {
    console.error('회원가입 실패:', error);

    // 유효성 검사 에러 처리
    if (error.response?.data?.validationErrors) {
      const validationErrors = error.response.data.validationErrors;
      const errorMessages = Object.entries(validationErrors)
        .map(([_, messages]) => (messages as string[]).join('\n'))
        .join('\n');
      throw new Error(errorMessages || '유효성 검사에 실패했습니다.');
    }

    const errorMessage = error.response?.data?.detail || '회원가입 오류가 발생했습니다.';
    throw new Error(errorMessage);
  }
};
