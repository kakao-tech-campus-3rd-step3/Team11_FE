export const validateNickname = (nickname: string): string | null => {
  const trimmed = nickname.trim();
  
  if (!trimmed) {
    return '닉네임을 입력해주세요';
  }
  
  if (trimmed.length < 2 || trimmed.length > 20) {
    return '닉네임은 2자 이상 20자 이하여야 합니다';
  }

  return null;
};

export const isNicknameValid = (nickname: string): boolean => {
  const trimmed = nickname.trim();
  return trimmed.length >= 2 && trimmed.length <= 20;
};

