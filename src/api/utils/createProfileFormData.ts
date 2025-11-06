import type { MyProfileState } from '@/store/slices/myProfileSlice';

function dataURLToBlob(dataURL: string): { blob: Blob; mime: string } {
  const matches = dataURL.match(/^data:(.*?);base64,(.*)$/);
  if (!matches) {
    throw new Error('Invalid data URL');
  }
  const mime = matches[1];
  const base64 = matches[2];
  const binary = atob(base64);
  const len = binary.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  const blob = new Blob([bytes], { type: mime });
  return { blob, mime };
}

// 프로필 데이터를 FormData로 변환하는 함수
export const createProfileFormData = (profileData: MyProfileState): FormData => {
  const formData = new FormData();

  // 텍스트 필드들을 FormData에 추가
  const fields = ['nickname', 'age', 'gender', 'description'] as const;
  for (const key of fields) {
    const value = profileData[key as keyof MyProfileState];
    if (value !== null && value !== undefined && value !== '') {
      formData.append(key, value.toString());
    }
  }

  // baseLocation 처리
  if (profileData.baseLocation) {
    if (typeof profileData.baseLocation === 'string') {
      const locationParts = profileData.baseLocation.split(' ');
      if (locationParts.length >= 2) {
        formData.append('baseLocation.sidoName', locationParts[0]);
        formData.append('baseLocation.sigunguName', locationParts[1]);
      }
    } else if (typeof profileData.baseLocation === 'object') {
      if (profileData.baseLocation.sidoName) {
        formData.append('baseLocation.sidoName', profileData.baseLocation.sidoName);
      }
      if (profileData.baseLocation.sigunguName) {
        formData.append('baseLocation.sigunguName', profileData.baseLocation.sigunguName);
      }
    }
  }

  // 이미지 필드 처리
  if (profileData.imageUrl) {
    if (typeof profileData.imageUrl !== 'string') {
      formData.append('image', profileData.imageUrl as unknown as Blob);
    } else if (profileData.imageUrl.startsWith('data:')) {
      try {
        const { blob, mime } = dataURLToBlob(profileData.imageUrl);
        const extension = mime.split('/')[1] || 'png';
        formData.append('image', blob, `profile.${extension}`);
      } catch {
      }
    }
    // 일반 URL 문자열인 경우는 전송하지 않음(이미 서버에 저장된 이미지 유지)
  }

  return formData;
};
