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
import { validateNickname } from '@/utils/nicknameValidation';

const OnboardingStep1 = ({ data, onNext }: OnboardingStepProps) => {
  const [formData, setFormData] = useState({
    nickname: data.nickname || '',
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    
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
