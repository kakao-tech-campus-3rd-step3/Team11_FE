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
  TopSubtitle
} from './OnboardingStyles';
import { Spacer } from '@/style/CommonStyle';

const OnboardingStep1 = ({ data, onNext }: OnboardingStepProps) => {
  const [formData, setFormData] = useState({
    nickname: data.nickname || '',
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // 에러 메시지 초기화
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleNext = () => {
    if (!formData.nickname.trim()) {
      setErrors({ nickname: '닉네임을 입력해주세요' });
      return;
    }
    onNext({ nickname: formData.nickname });
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
              placeholder="닉네임"
              value={formData.nickname}
              onChange={(e) => handleInputChange('nickname', e.target.value)}
            />
            {errors.nickname && <ErrorMessage>{errors.nickname}</ErrorMessage>}
          </FormField>
        </FormSection>

      <FixedFooterContainer>
        <SignupButton onClick={handleNext}>
          다음
        </SignupButton>
      </FixedFooterContainer>
    </>
  );
};

export default OnboardingStep1;