import { useState, useEffect } from 'react';
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

const OnboardingStep3 = ({ data, onNext, onPrev }: OnboardingStepProps) => {
  const [sido, setSido] = useState('');
  const [sigungu, setSigungu] = useState('');
  const [sidoSuggestions, setSidoSuggestions] = useState<string[]>([]);
  const [sigunguSuggestions, setSigunguSuggestions] = useState<string[]>([]);
  const [showSidoSuggestions, setShowSidoSuggestions] = useState(false);
  const [showSigunguSuggestions, setShowSigunguSuggestions] = useState(false);

  // 더미 위치 데이터
  const sidoList = ['서울특별시', '부산광역시', '대구광역시', '인천광역시', '광주광역시', '대전광역시', '울산광역시', '세종특별자치시', '경기도', '강원도', '충청북도', '충청남도', '전라북도', '전라남도', '경상북도', '경상남도', '제주특별자치도'];
  
  const sigunguData: { [key: string]: string[] } = {
    '서울특별시': ['강남구', '강동구', '강북구', '강서구', '관악구', '광진구', '구로구', '금천구', '노원구', '도봉구', '동대문구', '동작구', '마포구', '서대문구', '서초구', '성동구', '성북구', '송파구', '양천구', '영등포구', '용산구', '은평구', '종로구', '중구', '중랑구'],
    '부산광역시': ['중구', '서구', '동구', '영도구', '부산진구', '동래구', '남구', '북구', '해운대구', '사하구', '금정구', '강서구', '연제구', '수영구', '사상구', '기장군'],
    '대구광역시': ['중구', '동구', '서구', '남구', '북구', '수성구', '달서구', '달성군'],
    '인천광역시': ['중구', '동구', '미추홀구', '연수구', '남동구', '부평구', '계양구', '서구', '강화군', '옹진군'],
    '경기도': ['수원시', '성남시', '의정부시', '안양시', '부천시', '광명시', '평택시', '과천시', '오산시', '시흥시', '군포시', '의왕시', '하남시', '용인시', '파주시', '이천시', '안성시', '김포시', '화성시', '광주시', '여주시', '양평군', '고양시', '의정부시', '동두천시', '가평군', '연천군']
  };


  const handleSidoChange = (value: string) => {
    setSido(value);
    setSigungu(''); // 시/도 변경 시 시/군/구 초기화

    if (value.trim()) {
      const filtered = sidoList.filter((sidoName) =>
        sidoName.toLowerCase().includes(value.toLowerCase()),
      );
      setSidoSuggestions(filtered);
      setShowSidoSuggestions(true);
    } else {
      setSidoSuggestions([]);
      setShowSidoSuggestions(false);
    }
  };

  const handleSigunguChange = (value: string) => {
    setSigungu(value);

    if (value.trim() && sido) {
      const sigunguList = sigunguData[sido] || [];
      const filtered = sigunguList.filter((sigunguName) =>
        sigunguName.toLowerCase().includes(value.toLowerCase()),
      );
      setSigunguSuggestions(filtered);
      setShowSigunguSuggestions(true);
    } else {
      setSigunguSuggestions([]);
      setShowSigunguSuggestions(false);
    }
  };

  const handleSidoSelect = (selectedSido: string) => {
    setSido(selectedSido);
    setSigungu('');
    setShowSidoSuggestions(false);
  };

  const handleSigunguSelect = (selectedSigungu: string) => {
    setSigungu(selectedSigungu);
    setShowSigunguSuggestions(false);
  };

  const handleNext = () => {
    if (sido.trim() && sigungu.trim()) {
      onNext({ 
        baseLocation: {
          sidoName: sido,
          sigunguName: sigungu
        }
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
        <FormField>
          <SearchInputContainer>
            <FormInput
              type="text"
              placeholder="시/도 선택 (예: 부산광역시)"
              value={sido}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleSidoChange(e.target.value)
              }
              onFocus={() => setShowSidoSuggestions(true)}
              onBlur={() => setTimeout(() => setShowSidoSuggestions(false), 100)}
            />
            <SearchIcon src={searchIcon} alt="search" />
            {showSidoSuggestions && sidoSuggestions.length > 0 && (
              <SuggestionList>
                {sidoSuggestions.map((suggestion, index) => (
                  <SuggestionItem key={index} onClick={() => handleSidoSelect(suggestion)}>
                    {suggestion}
                  </SuggestionItem>
                ))}
              </SuggestionList>
            )}
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
              disabled={!sido.trim()}
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