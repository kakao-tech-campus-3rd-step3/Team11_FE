import styled from '@emotion/styled';
import { colors } from '@/style/themes';

export const HeaderSection = styled.div`
  background: linear-gradient(135deg, ${colors.primary} 0%, ${colors.primary400} 100%);
  padding: 60px 20px 120px 20px;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 40%;
  z-index: 0;
  overflow: hidden;
  clip-path: ellipse(130% 100% at 50% 0%);
`;

// 뱃지 섹션
export const BadgeSection = styled.div`
  margin-top: 24px;
  padding: 0 20px;
`;

export const BadgeContainer = styled.div`
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  min-height: 60px;
`;

export const BadgeItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  padding: 8px;
  border-radius: 8px;
  background-color: #f9fafb;
  border: 1px solid #e5e7eb;
  min-width: 80px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: #f3f4f6;
    transform: translateY(-2px);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
`;

export const BadgeIcon = styled.img`
  width: 40px;
  height: 40px;
  object-fit: contain;
`;

export const BadgeName = styled.span`
  font-size: 0.75rem;
  color: #374151;
  text-align: center;
  font-weight: 500;
`;

export const EmptyBadgeMessage = styled.div`
  width: 100%;
  text-align: center;
  color: #9ca3af;
  font-size: 0.875rem;
  padding: 20px 0;
`;

export const HeaderTitle = styled.h1`
  font-size: 24px;
  font-weight: 600;
  color: white;
  margin: 0;
  position: relative;
  z-index: 1;
`;

export const ProfileImageContainer = styled.div`
  position: absolute;
  top: -40px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 200;
`;

export const ProfileImage = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid white;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
`;

export const ProfileImagePlaceholder = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background-color: #e9ecef;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const MainContentCard = styled.div`
  background: white;
  border-radius: 20px;
  padding: 40px 20px 20px 20px;
  margin-top: 40px;
  box-shadow: 0 4px 500px rgba(214, 214, 214, 0.49);
  position: relative;
  z-index: 100;
`;

export const UserInfo = styled.div`
  text-align: center;
  margin-top: 20px;
  margin-bottom: 30px;
`;

export const UserBasicInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  flex-wrap: wrap;
  margin-bottom: 8px;
`;

export const UserName = styled.h2`
  font-size: 20px;
  font-weight: 600;
  color: #2c3e50;
  margin: 0;
`;

export const UserAge = styled.span`
  font-size: 14px;
  color: #666;
  background: #f0f0f0;
  padding: 4px 8px;
  border-radius: 12px;
  font-weight: 500;
`;

export const UserGender = styled.span`
  font-size: 14px;
  color: #666;
  background: #f0f0f0;
  padding: 4px 8px;
  border-radius: 12px;
  font-weight: 500;
`;


export const ProfileInfoSection = styled.div`
  margin: 20px 0;
  padding: 0 20px;
`;

export const ProfileInfoItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 0;
  border-bottom: 1px solid #f0f0f0;

  &:last-child {
    border-bottom: none;
  }
`;

export const InfoLabel = styled.span`
  font-size: 16px;
  font-weight: 500;
  color: #333;
`;

export const InfoValue = styled.span`
  font-size: 16px;
  color: #666;
  text-align: right;
  max-width: 60%;
  word-wrap: break-word;
`;

export const SelfIntroItem = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px 0;
  border-bottom: 1px solid #f0f0f0;

  &:last-child {
    border-bottom: none;
  }
`;

export const SelfIntroContent = styled.div`
  background: #f8f9fa;
  border-radius: 12px;
  padding: 16px;
  min-height: 80px;
  border: 0.2px solid #e9ecef;
  transition: border-color 0.2s ease;
  margin-top: 12px;
`;

export const SelfIntroText = styled.p`
  font-size: 16px;
  line-height: 1.6;
  color: #333;
  margin: 0;
  word-wrap: break-word;
`;

export const SelfIntroPlaceholder = styled.p`
  font-size: 16px;
  color: #999;
  margin: 0;
  font-style: italic;
`;

export const ActionButtons = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  margin-top: 30px;
`;

export const SaveButton = styled.button`
  flex: 1;
  padding: 16px;
  background: ${colors.primary};
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background: ${colors.primary400};
  }
`;

export const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ModalOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
`;

export const ModalContent = styled.div`
  background: white;
  border-radius: 16px;
  width: 90%;
  max-width: 400px;
  max-height: 80vh;
  overflow-y: auto;
  position: relative;
  z-index: 1001;

  /* 스크롤바 숨기기 */
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE and Edge */

  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera */
  }
`;

export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border-bottom: 1px solid #f0f0f0;
`;

export const ModalTitle = styled.h2`
  font-size: 18px;
  font-weight: 600;
  color: #333;
  margin: 0;
`;

export const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 24px;
  color: #666;
  cursor: pointer;
  padding: 0;
  width: 24px;
  height: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ModalBody = styled.div`
  padding: 20px;
`;

export const FormField = styled.div`
  margin-bottom: 20px;
`;

export const FormLabel = styled.label`
  display: block;
  font-size: 14px;
  font-weight: 500;
  color: #333;
  margin-bottom: 8px;
`;

export const FormInput = styled.input`
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 16px;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: ${colors.primary};
  }
`;

export const FormTextArea = styled.textarea`
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 16px;
  resize: vertical;
  min-height: 80px;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: ${colors.primary};
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 20px;
`;

export const CancelButton = styled.button`
  flex: 1;
  padding: 12px;
  background: #f8f9fa;
  color: #666;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;

  &:hover {
    background: #e9ecef;
  }
`;

export const DeleteButton = styled.button`
  flex: 1;
  padding: 12px;
  background: #ef4444;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background: #dc2626;
  }
`;

export const GenderButtonGroup = styled.div`
  display: flex;
  gap: 12px;
  width: 100%;
`;

export const GenderButton = styled.button<{ selected: boolean }>`
  flex: 1;
  padding: 12px;
  border: 2px solid ${(props) => (props.selected ? colors.primary : '#ddd')};
  background: ${(props) => (props.selected ? colors.primary : 'white')};
  color: ${(props) => (props.selected ? 'white' : '#666')};
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: ${colors.primary};
    background: ${(props) => (props.selected ? colors.primary400 : '#f8f9fa')};
  }
`;