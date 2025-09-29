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
  TopTitle,
  TopSubtitle,
  StepTitle
} from './OnboardingStyles';
import backArrow from '@/assets/onoboarding_page/chevron-left.svg';
import searchIcon from '@/assets/onoboarding_page/search.svg';
import { Spacer } from '@/style/CommonStyle';

const OnboardingStep3 = ({ data, onNext, onPrev }: OnboardingStepProps) => {
  const [location, setLocation] = useState(data.baseLocation || '');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  // 더미 위치 데이터 (실제로는 API에서 가져와야 함)
  const dummyLocations = [
    '서울특별시',
    '세명시',
    '인천광역시',
    '부산광역시',
    '대구광역시'
  ];

  const handleLocationChange = (value: string) => {
    setLocation(value);
    
    if (value.trim()) {
      const filtered = dummyLocations.filter(loc => 
        loc.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleLocationSelect = (selectedLocation: string) => {
    setLocation(selectedLocation);
    setShowSuggestions(false);
  };

  const handleNext = () => {
    if (location.trim()) {
      onNext({ baseLocation: location });
    } else {
      alert('위치를 선택해주세요');
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
        <FormField>
          <SearchInputContainer>
            <FormInput
              type="text"
              placeholder="예: 부산"
              value={location}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleLocationChange(e.target.value)}
              onFocus={() => setShowSuggestions(true)}
              onBlur={() => setTimeout(() => setShowSuggestions(false), 100)}
            />
            <SearchIcon src={searchIcon} alt="search" />
            {showSuggestions && suggestions.length > 0 && (
              <SuggestionList>
                {suggestions.map((suggestion, index) => (
                  <SuggestionItem key={index} onClick={() => handleLocationSelect(suggestion)}>
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
        <SignupButton onClick={handleNext}>
          다음
        </SignupButton>
      </FixedFooterContainer>
    </>
  );
};

export default OnboardingStep3;

