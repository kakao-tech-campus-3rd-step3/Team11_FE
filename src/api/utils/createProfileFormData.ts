import type { MyProfileState } from '@/store/slices/myProfileSlice';

// 프로필 데이터를 FormData로 변환하는 함수
export const createProfileFormData = (profileData: MyProfileState): FormData => {
  const formData = new FormData();

  // 텍스트 필드들을 FormData에 추가
  const fields = ['nickname', 'age', 'gender', 'description'] as const;
  for (const key of fields) {
    const value = profileData[key as keyof MyProfileState];
    if (value) {
      formData.append(key, value.toString());
    }
  }

  // baseLocation 처리
  if (profileData.baseLocation) {
    // baseLocation이 문자열인 경우 (예: "부산광역시 금정구")
    if (typeof profileData.baseLocation === 'string') {
      const locationParts = profileData.baseLocation.split(' ');
      if (locationParts.length >= 2) {
        formData.append('baseLocation.sidoName', locationParts[0]);
        formData.append('baseLocation.sigunguName', locationParts[1]);
      }
    }
    // baseLocation이 객체인 경우
    else if (typeof profileData.baseLocation === 'object') {
      if (profileData.baseLocation.sidoName) {
        formData.append('baseLocation.sidoName', profileData.baseLocation.sidoName);
      }
      if (profileData.baseLocation.sigunguName) {
        formData.append('baseLocation.sigunguName', profileData.baseLocation.sigunguName);
      }
    }
  }

  // 이미지 필드 처리 (
  if (profileData.imageUrl && typeof profileData.imageUrl !== 'string') {
    formData.append('image', profileData.imageUrl);
  }

  return formData;
};
