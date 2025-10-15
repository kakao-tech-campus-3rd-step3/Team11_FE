import { useState } from 'react';
import type { OnboardingStepProps } from '@/types/onboarding';
import {
  FormSection,
  FormField,
  FormInput,
  SignupButton,
  ErrorMessage,
  FixedHeaderContainer,
  FixedFooterContainer,
  TopTitle,
  TopSubtitle,
} from './OnboardingStyles';
import { Spacer } from '@/style/CommonStyle';

const OnboardingStep1 = ({ data, onNext }: OnboardingStepProps) => {
  const [formData, setFormData] = useState({
    nickname: data.nickname || '',
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateNickname = (nickname: string) => {
    const trimmed = nickname.trim();
    
    if (!trimmed) {
      return '닉네임을 입력해주세요';
    }
    
    if (trimmed.length < 2) {
      return '닉네임은 2자 이상이어야 합니다';
    }
    
    if (trimmed.length > 20) {
      return '닉네임은 20자 이하여야 합니다';
    }
    
    return null; // 유효함
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    
    // 실시간 유효성 검사 (닉네임일 때만)
    if (field === 'nickname') {
      const error = validateNickname(value);
      setErrors((prev) => ({ ...prev, [field]: error || '' }));
    }
  };

  const handleNext = () => {
    const nicknameError = validateNickname(formData.nickname);
    
    if (nicknameError) {
      setErrors({ nickname: nicknameError });
      return;
    }
    
    onNext({ nickname: formData.nickname.trim() });
  };

  return (
    <>
      <FixedHeaderContainer>
        <TopTitle>환영합니다!</TopTitle>
        <Spacer h={12} />
        <TopSubtitle>기본 정보를 입력해 주세요</TopSubtitle>
      </FixedHeaderContainer>

      <FormSection>
        <FormField>
          <FormInput
            type="text"
            placeholder="닉네임 (2~20자)"
            value={formData.nickname}
            onChange={(e) => handleInputChange('nickname', e.target.value)}
            maxLength={20}
          />
          {errors.nickname && <ErrorMessage>{errors.nickname}</ErrorMessage>}
          {!errors.nickname && formData.nickname && (
            <div style={{ 
              fontSize: '0.75rem', 
              color: '#666', 
              marginTop: '4px',
              textAlign: 'right'
            }}>
              {formData.nickname.trim().length}/20자
            </div>
          )}
        </FormField>
      </FormSection>

      <FixedFooterContainer>
        <SignupButton onClick={handleNext}>다음</SignupButton>
      </FixedFooterContainer>
    </>
  );
};

export default OnboardingStep1;
