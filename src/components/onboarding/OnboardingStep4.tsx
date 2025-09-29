import { useState } from 'react';
import type { OnboardingStepProps } from '@/types/onboarding';
import {
  FixedHeaderContainer,
  FixedFooterContainer,
  FormSection,
  FormField,
  FormLabel,
  GenderButton,
  AgeControl,
  AgeButton,
  AgeDisplay,
  TextArea,
  SignupButton,
  StepIndicator,
  StepDot,
  BackButton,
  BackArrowIcon,
  TopTitle,
  TopSubtitle
} from './OnboardingStyles';
import backArrow from '@/assets/onoboarding_page/chevron-left.svg';
import { Spacer } from '@/style/CommonStyle';

const OnboardingStep4 = ({ data, onComplete, onPrev }: OnboardingStepProps) => {
  const [formData, setFormData] = useState({
    gender: data.gender || '',
    age: data.age || 25,
    description: data.description || ''
  });

  const handleGenderChange = (gender: string) => {
    setFormData(prev => ({ ...prev, gender }));
  };

  const handleAgeChange = (change: number) => {
    const newAge = Math.max(18, Math.min(100, formData.age + change));
    setFormData(prev => ({ ...prev, age: newAge }));
  };


  const handleIntroductionChange = (value: string) => {
    setFormData(prev => ({ ...prev, description: value }));
  };

  const handleComplete = () => {

    onComplete?.(formData);
  };

  return (
    <>
      <FixedHeaderContainer>
        <BackButton onClick={onPrev}>
          <BackArrowIcon src={backArrow} alt="back" />
        </BackButton>
        <TopTitle>상세 프로필 설정</TopTitle>
        <Spacer h={12} />
        <TopSubtitle>자신을 간단히 소개해 주세요</TopSubtitle>
      </FixedHeaderContainer>

      <FormSection>
        <FormField>
          <FormLabel>성별</FormLabel>
          <div style={{ display: 'flex', gap: '12px', marginTop: '16px' }}>
            <GenderButton
              $active={formData.gender === 'male'}
              onClick={() => handleGenderChange('male')}
            >
              남성
            </GenderButton>
            <GenderButton
              $active={formData.gender === 'female'}
              onClick={() => handleGenderChange('female')}
            >
              여성
            </GenderButton>
          </div>
        </FormField>

        <FormField>
          <FormLabel>나이</FormLabel>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <AgeControl>
              <AgeButton onClick={() => handleAgeChange(-1)}>▼</AgeButton>
              <AgeDisplay>{formData.age}</AgeDisplay>
              <AgeButton onClick={() => handleAgeChange(1)}>▲</AgeButton>
            </AgeControl>
          </div>
        </FormField>

        <FormField>
          <FormLabel>자기소개</FormLabel>
          <TextArea
            placeholder="자신을 소개해주세요"
            value={formData.description}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => handleIntroductionChange(e.target.value)}
            rows={4}
          />
        </FormField>
      </FormSection>

      <FixedFooterContainer>
        <StepIndicator>
          <StepDot $active={false} />
          <StepDot $active={false} />
          <StepDot $active={true} />
        </StepIndicator>
        
        <SignupButton onClick={handleComplete}>
          완료!
        </SignupButton>
      </FixedFooterContainer>
    </>
  );
};

export default OnboardingStep4;

