import { useState } from 'react';
import type { OnboardingStepProps } from '@/types/onboarding';
import {
  FormSection,
  FormField,
  FormInput,
  SignupButton,
  FixedHeaderContainer,
  FixedFooterContainer,
  StepIndicator,
  StepDot,
  BackButton,
  BackArrowIcon,
  SuggestionList,
  SuggestionItem,
  SearchInputContainer,
  SearchIcon,
  TopSubtitle,
  StepTitle,
} from './OnboardingStyles';
import backArrow from '@/assets/onoboarding_page/chevron-left.svg';
import searchIcon from '@/assets/onoboarding_page/search.svg';
import { Spacer } from '@/style/CommonStyle';
import { useUserSigungu } from '@/hooks/useUserSigungu';

const OnboardingStep3 = ({ onNext, onPrev }: OnboardingStepProps) => {
  const { sidoName, sigunguList, isLoading, error } = useUserSigungu();
  const [sigungu, setSigungu] = useState('');
  const [sigunguSuggestions, setSigunguSuggestions] = useState<string[]>([]);
  const [showSigunguSuggestions, setShowSigunguSuggestions] = useState(false);

  const handleSigunguChange = (value: string) => {
    setSigungu(value);

    if (value.trim()) {
      const filtered = sigunguList
        .map((s) => s.sigunguName)
        .filter((sigunguName) => sigunguName.toLowerCase().includes(value.toLowerCase()));
      setSigunguSuggestions(filtered);
      setShowSigunguSuggestions(true);
    } else {
      setSigunguSuggestions([]);
      setShowSigunguSuggestions(false);
    }
  };

  const handleSigunguSelect = (selectedSigungu: string) => {
    setSigungu(selectedSigungu);
    setShowSigunguSuggestions(false);
  };

  const handleNext = () => {
    if (sidoName.trim() && sigungu.trim()) {
      onNext({
        baseLocation: {
          sidoName: sidoName,
          sigunguName: sigungu,
        },
      });
    } else {
      alert('시/도와 시/군/구를 모두 선택해주세요');
    }
  };

  return (
    <>
      <FixedHeaderContainer>
        <BackButton onClick={onPrev}>
          <BackArrowIcon src={backArrow} alt="back" />
        </BackButton>
        <StepTitle>위치 설정</StepTitle>
        <Spacer h={12} />
        <TopSubtitle>내위치, 또는 모임을 탐색할 장소를 설정하세요</TopSubtitle>
      </FixedHeaderContainer>

      <FormSection>
        {isLoading && <p>위치 정보를 불러오는 중...</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}
        
        <FormField>
          <SearchInputContainer>
            <FormInput
              type="text"
              placeholder="시/도 선택 (예: 부산광역시)"
              value={sidoName}
              readOnly
            />
            <SearchIcon src={searchIcon} alt="search" />
          </SearchInputContainer>
        </FormField>

        <FormField>
          <SearchInputContainer>
            <FormInput
              type="text"
              placeholder="시/군/구 선택 (예: 금정구)"
              value={sigungu}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleSigunguChange(e.target.value)
              }
              onFocus={() => setShowSigunguSuggestions(true)}
              onBlur={() => setTimeout(() => setShowSigunguSuggestions(false), 100)}
              disabled={!sidoName.trim() || isLoading}
            />
            <SearchIcon src={searchIcon} alt="search" />
            {showSigunguSuggestions && sigunguSuggestions.length > 0 && (
              <SuggestionList>
                {sigunguSuggestions.map((suggestion, index) => (
                  <SuggestionItem key={index} onClick={() => handleSigunguSelect(suggestion)}>
                    {suggestion}
                  </SuggestionItem>
                ))}
              </SuggestionList>
            )}
          </SearchInputContainer>
        </FormField>
      </FormSection>

      <FixedFooterContainer>
        <StepIndicator>
          <StepDot $active={false} />
          <StepDot $active={true} />
          <StepDot $active={false} />
        </StepIndicator>
        <SignupButton onClick={handleNext}>다음</SignupButton>
      </FixedFooterContainer>
    </>
  );
};

export default OnboardingStep3;
