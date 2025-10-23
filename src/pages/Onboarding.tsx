import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, ContentContanier } from '@/style/CommonStyle';
import OnboardingStep1 from '@/components/onboarding/OnboardingStep1';
import OnboardingStep2 from '@/components/onboarding/OnboardingStep2';
import OnboardingStep3 from '@/components/onboarding/OnboardingStep3';
import OnboardingStep4 from '@/components/onboarding/OnboardingStep4';
import type { MyProfileState } from '@/store/slices/myProfileSlice';
import { saveOnboardingProfile } from '@/api/profile';
import { useFunnel } from '@/hooks/useFunnel';

const Onboarding = () => {
  const navigate = useNavigate();
  const [Funnel, Step, setStep] = useFunnel(['기본정보', '프로필사진', '추가정보', '완료']);

  const [onboardingData, setOnboardingData] = useState<MyProfileState>({
    name: null,
    age: null,
    gender: null,
    nickname: null,
    imageUrl: undefined,
    description: null,
    baseLocation: null,
    temperature: null,
    likes: null,
    dislikes: null,
  });

  const handleNext = (stepData: Partial<MyProfileState>) => {
    setOnboardingData((prev) => ({ ...prev, ...stepData }));
  };

  const handleComplete = async (finalData: Partial<MyProfileState>) => {
    const completeData = { ...onboardingData, ...finalData };

    console.log('온보딩 완료 데이터:', completeData);

    try {
      await saveOnboardingProfile(completeData as MyProfileState);
      alert('프로필 설정이 완료되었습니다!');
      navigate('/home');
    } catch (error: any) {
      console.error('프로필 설정 실패:', error);
      alert(`프로필 설정 실패: ${error.message}`);
    }
  };

  return (
    <Container>
      <ContentContanier>
        <Funnel duration={400}>
          <Step name="기본정보">
            <OnboardingStep1
              data={onboardingData}
              onNext={(data) => {
                handleNext(data);
                setStep('프로필사진');
              }}
            />
          </Step>

          <Step name="프로필사진">
            <OnboardingStep2
              data={onboardingData}
              onNext={(data) => {
                handleNext(data);
                setStep('추가정보');
              }}
              onPrev={() => setStep('기본정보')}
            />
          </Step>

          <Step name="추가정보">
            <OnboardingStep3
              data={onboardingData}
              onNext={(data) => {
                handleNext(data);
                setStep('완료');
              }}
              onPrev={() => setStep('프로필사진')}
            />
          </Step>

          <Step name="완료">
            <OnboardingStep4
              data={onboardingData}
              onComplete={handleComplete}
              onPrev={() => setStep('추가정보')}
              onNext={() => {}}
            />
          </Step>
        </Funnel>
      </ContentContanier>
    </Container>
  );
};

export default Onboarding;
