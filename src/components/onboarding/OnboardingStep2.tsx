import { useState } from 'react';
import type { OnboardingStepProps } from '@/types/onboarding';
import {
  FormSection,
  FormField,
  SignupButton,
  FixedHeaderContainer,
  FixedFooterContainer,
  StepIndicator,
  StepDot,
  BackButton,
  BackArrowIcon,
  TopTitle,
  TopSubtitle,
  ProfileImageContainer,
  ProfileImage,
  ProfileImagePlaceholder,
  CameraIcon,
} from './OnboardingStyles';
import backArrow from '@/assets/onoboarding_page/chevron-left.svg';
import cameraIcon from '@/assets/onoboarding_page/camera.svg';
import { Spacer } from '@/style/CommonStyle';

const OnboardingStep2 = ({ data, onNext, onPrev }: OnboardingStepProps) => {
  const [imageUrl, setImageUrl] = useState(data.imageUrl || '');

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // 실제로는 파일을 서버에 업로드하고 URL을 받아와야 함
      // 여기서는 임시로 로컬 URL을 생성
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setImageUrl(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleNext = () => {
    onNext({ imageUrl });
  };

  return (
    <>
      <FixedHeaderContainer>
        <BackButton onClick={onPrev}>
          <BackArrowIcon src={backArrow} alt="back" />
        </BackButton>
        <TopTitle>프로필 사진</TopTitle>
        <Spacer h={12} />
        <TopSubtitle>나를 나타내는 사진을 올려주세요</TopSubtitle>
      </FixedHeaderContainer>

      <FormSection>
        <FormField>
          <ProfileImageContainer
            onClick={() => document.getElementById('profile-image-upload')?.click()}
          >
            {imageUrl ? (
              <ProfileImage src={imageUrl} alt="프로필 이미지" />
            ) : (
              <ProfileImagePlaceholder>
                <CameraIcon src={cameraIcon} alt="camera" />
              </ProfileImagePlaceholder>
            )}
          </ProfileImageContainer>

          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            style={{ display: 'none' }}
            id="profile-image-upload"
          />
        </FormField>
      </FormSection>

      <FixedFooterContainer>
        <StepIndicator>
          <StepDot $active={true} />
          <StepDot $active={false} />
          <StepDot $active={false} />
        </StepIndicator>
        <SignupButton onClick={handleNext}>다음</SignupButton>
      </FixedFooterContainer>
    </>
  );
};

export default OnboardingStep2;
