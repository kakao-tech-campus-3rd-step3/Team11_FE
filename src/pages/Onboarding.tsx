import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, ContentContanier } from '@/style/CommonStyle';
import OnboardingStep1 from '@/components/onboarding/OnboardingStep1';
import OnboardingStep2 from '@/components/onboarding/OnboardingStep2';
import OnboardingStep3 from '@/components/onboarding/OnboardingStep3';
import OnboardingStep4 from '@/components/onboarding/OnboardingStep4';
import type { MyProfileState } from '@/store/slices/myProfileSlice';
import { saveOnboardingProfile } from '@/api/auth';

const Onboarding = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [onboardingData, setOnboardingData] = useState<MyProfileState>({
    name: null,
    age: null,
    gender: null,
    nickname: null,
    imageUrl: null,
    description: null,
    baseLocation: null,
    temperature: null,
    likes: null,
    dislikes: null
  });

  const handleNext = (stepData: Partial<MyProfileState>) => {
    setOnboardingData(prev => ({ ...prev, ...stepData }));
    setCurrentStep(prev => prev + 1);
  };

  const handlePrev = () => {
    setCurrentStep(prev => prev - 1);
  };

  const handleComplete = async (finalData: Partial<MyProfileState>) => {
    const completeData = { ...onboardingData, ...finalData };
    
    try {
      await saveOnboardingProfile(completeData as MyProfileState);
      alert('프로필 설정이 완료되었습니다!');
      navigate('/home');
    } catch (error: any) {
      console.error('프로필 설정 실패:', error);
      alert('프로필 설정에 실패했습니다. 다시 시도해주세요.');
    }
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return <OnboardingStep1 data={onboardingData} onNext={handleNext} />;
      case 2:
        return <OnboardingStep2 data={onboardingData} onNext={handleNext} onPrev={handlePrev} />;
      case 3:
        return <OnboardingStep3 data={onboardingData} onNext={handleNext} onPrev={handlePrev} />;
      case 4:
        return <OnboardingStep4 data={onboardingData} onComplete={handleComplete} onPrev={handlePrev} onNext={() => {}} />;
      default:
        return <OnboardingStep1 data={onboardingData} onNext={handleNext} />;
    }
  };

  return (
    <Container>
      <ContentContanier>
        {renderCurrentStep()}
      </ContentContanier>
    </Container>
  );
};

export default Onboarding;

