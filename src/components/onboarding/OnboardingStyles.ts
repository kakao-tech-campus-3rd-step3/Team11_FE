import styled from '@emotion/styled';
import { colors } from '@/style/themes';

// 공통 스타일들
export const BackButton = styled.button`
  background: none;
  border: none;
  color: #333;
  cursor: pointer;
  padding: 10px 0;
  display: flex;
`;

export const BackArrowIcon = styled.img`
  width: 20px;
  height: 20px;
`;

export const CameraIcon = styled.img`
  width: 48px;
  height: 48px;
  opacity: 0.5;
`;

export const StepIndicator = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
  gap: 12px;
`;

export const StepDot = styled.span<{ $active: boolean }>`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: ${({ $active }) => ($active ? '#ff6b6b' : '#ddd')};
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  transform: ${({ $active }) => ($active ? 'scale(1.1)' : 'scale(1)')};

  &:hover {
    transform: scale(1.2);
  }
`;

export const ProfileImageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 40px 0;
  cursor: pointer;
  transition: opacity 0.3s ease;

  &:hover {
    opacity: 0.8;
  }
`;

export const ProfileImage = styled.img`
  width: 250px;
  height: 250px;
  border-radius: 50%;
  object-fit: cover;
`;

export const ProfileImagePlaceholder = styled.div`
  width: 250px;
  height: 250px;
  border-radius: 50%;
  background-color: #e9ecef;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const SuggestionList = styled.ul`
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  background-color: white;
  max-height: 200px;
  overflow-y: auto;
  z-index: 100;
  list-style: none;
  padding: 0;
  margin: 0;
  box-sizing: border-box;
`;

export const SuggestionItem = styled.li`
  padding: 20px;
  cursor: pointer;
  font-size: 16px;
  color: #333;
  transition: background-color 0.2s ease;
  border-bottom: 1px solid #f8f9fa;

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background-color: #f8f9fa;
    color: ${colors.primary};
  }
`;

export const FormLabel = styled.label`
  font-weight: 500;
  color: #333;
  margin-bottom: 8px;
`;

export const GenderButton = styled.button<{ $active: boolean }>`
  padding: 12px 20px;
  border: 1px solid ${({ $active }) => ($active ? '#ff6b6b' : '#e9ecef')};
  border-radius: 4px;
  background-color: ${({ $active }) => ($active ? '#ff6b6b' : 'white')};
  color: ${({ $active }) => ($active ? 'white' : '#6c757d')};
  font-size: 16px;
  font-weight: 300;
  cursor: pointer;
  transition: all 0.3s ease;
  flex: 1;

  &:hover {
    background-color: ${({ $active }) => ($active ? '#ff5252' : '#f8f9fa')};
    border-color: ${({ $active }) => ($active ? '#ff5252' : '#dee2e6')};
  }
`;

export const AgeControl = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 200px;
  margin-top: 16px;
  border-bottom: 1px solid #e9ecef;
  padding-bottom: 20px;
`;

export const AgeButton = styled.button`
  background: none;
  border: none;
  color: #6c757d;
  font-size: 16px;
  cursor: pointer;
  padding: 8px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    color: ${colors.primary};
  }
`;

export const AgeDisplay = styled.span`
  font-size: 32px;
  font-weight: 700;
  color: #212529;
  text-align: center;
  flex: 1;
`;

export const TextArea = styled.textarea`
  width: 100%;
  padding: 16px;
  border-radius: 4px;
  border: 1px solid #e9ecef;
  font-size: 16px;
  font-weight: 300;
  resize: vertical;
  min-height: 120px;
  box-sizing: border-box;
  margin-top: 16px;
  background-color: #f8f9fa;
  color: #212529;
  transition: 0.3s ease;

  &::placeholder {
    color: #6c757d;
    font-size: 16px;
    font-weight: 300;
  }

  &:focus {
    outline: none;
    border-color: ${colors.primary};
    background-color: white;
  }
`;

export const TopTitle = styled.h1`
  font-size: 32px;
  font-weight: 500;
  color: #212529;
  margin: 0;
  text-align: left;
`;

export const StepTitle = styled.h1`
  font-size: 28px;
  font-weight: 600;
  color: #212529;
  margin: 0;
  text-align: left;
`;

export const TopSubtitle = styled.p`
  font-size: 16px;
  color: #6c757d;
  font-weight: 400;
  margin: 0;
  text-align: left;
`;

export const FormSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  position: fixed;
  top: 200px;
  left: 0;
  right: 0;
  width: 100%;
  max-width: 720px;
  margin: 0 auto;
  padding: 0 40px;
  box-sizing: border-box;
`;

export const FormField = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const FormInput = styled.input`
  width: 100%;
  padding: 20px 0;
  border: none;
  border-bottom: 2px solid #e9ecef;
  font-size: 20px;
  font-weight: 500;
  background: transparent;
  color: #212529;
  outline: none;
  transition: border-color 0.3s ease;

  &:focus {
    border-bottom-color: ${colors.primary};
    border-bottom-width: 3px;
  }

  &::placeholder {
    color: #6c757d;
    font-size: 20px;
    font-weight: 400;
  }
`;

export const SearchInputContainer = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
`;

export const SearchIcon = styled.img`
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 24px;
  height: 24px;
  opacity: 0.6;
  pointer-events: none;
`;

export const SignupButton = styled.button`
  width: 100%;
  padding: 12px;
  background: ${colors.primary};
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 18px;
  font-weight: 300;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 16px;

  &:hover {
    background: ${colors.primary400};
  }
`;

export const ErrorMessage = styled.div`
  color: #dc3545;
  font-size: 14px;
  margin-top: 4px;
`;

// 화면 고정 헤더/푸터 스타일
export const FixedHeaderContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  max-width: 720px;
  margin: 0 auto;
  z-index: 100;
  background: white;
  padding: 40px 20px 20px 20px;
  text-align: center;
  box-sizing: border-box;
`;

export const FixedFooterContainer = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  max-width: 720px;
  margin: 0 auto;
  z-index: 100;
  background: white;
  padding: 20px;
  text-align: center;
  box-sizing: border-box;
`;