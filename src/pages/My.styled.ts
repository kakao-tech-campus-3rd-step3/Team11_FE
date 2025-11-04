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

const SectionBase = styled.div`
  width: 100%;
`;

export const BadgeSection = styled(SectionBase)`
  width: 100%;
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

export const TitleContainer = styled.div`
  position: relative;
  width: 100%;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
  padding: 0 20px;
  
`;

export const BackButton = styled.button`
  position: absolute;
  left: 20px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  padding: 8px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s ease;
  z-index: 11;

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
`;

export const HeaderTitle = styled.h1`
  font-size: 24px;
  font-weight: 600;
  color: white;
  margin: 0;
  position: relative;
  z-index: 1;
`;

// 스크롤바 숨기기
const hideScrollbar = `
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE and Edge */

  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera */
  }
`;

export const ScrollableContentContainer = styled.div`
  width: 92%;
  height: calc(100vh - 120px);
  overflow-y: auto;
  padding-bottom: 100px;
  margin-top: 120px;
  background-color: transparent;
  ${hideScrollbar}
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
  border-radius: 8px 8px 2px 2px;
  padding: 40px 20px 20px 20px;
  margin-top: 40px;
  margin-bottom: 2px;

  position: relative;
  z-index: 100;
  display: flex;
  flex-direction: column;
`;

export const SectionCard = styled.div`
  background: white;
  border-radius: 2px;
  padding: 20px;
  margin-bottom: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  position: relative;
  z-index: 100;

`;

export const ScrollableCardContent = styled.div`
  overflow-y: auto;
  flex: 1;
  padding-bottom: 20px;
  ${hideScrollbar}
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

export const UserTag = styled.span`
  font-size: 14px;
  color: #666;
  background: #f0f0f0;
  padding: 4px 8px;
  border-radius: 12px;
  font-weight: 500;
`;

// 호환성을 위한 별칭
export const UserAge = UserTag;
export const UserGender = UserTag;


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
  border-radius: 4px;
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
  ${hideScrollbar}
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

const FormInputBase = `
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: ${colors.primary};
  }
`;

export const FormInput = styled.input`
  ${FormInputBase}
`;

export const FormTextArea = styled.textarea`
  ${FormInputBase}
  resize: vertical;
  min-height: 80px;
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
  border-radius: 4px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;

  &:hover {
    background: #e9ecef;
  }
`;

const DangerButtonBase = styled.button`
  background: #ef4444;
  color: white;
  border: none;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background: #dc2626;
  }
`;

export const DeleteButton = styled(DangerButtonBase)`
  flex: 1;
  padding: 12px;
  border-radius: 4px;
  font-size: 16px;
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
  border-radius: 4px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: ${colors.primary};
    background: ${(props) => (props.selected ? colors.primary400 : '#f8f9fa')};
  }
`;

// 신고 목록 
export const ReportListContainer = styled(SectionBase)`
  padding: 0 20px;
`;

export const ReportItem = styled.div`
  padding: 16px;
  margin-bottom: 12px;
  background-color: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
`;

export const ReportItemHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 8px;
`;

export const ReportItemContent = styled.div`
  flex: 1;
`;

export const ReportCategory = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: #333;
  margin-bottom: 4px;
`;

export const ReportStatus = styled.div`
  font-size: 12px;
  color: #666;
`;

export const ReportDate = styled.div`
  font-size: 12px;
  color: #999;
  margin-top: 4px;
`;

export const ReportCancelButton = styled(DangerButtonBase)`
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 12px;
`;

export const BlockListContainer = styled(SectionBase)`
  padding: 0 20px;
`;

export const BlockItem = styled.div`
  padding: 16px;
  margin-bottom: 12px;
  background-color: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const BlockItemImage = styled.img`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #e5e7eb;
`;

export const BlockItemImagePlaceholder = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background-color: #e9ecef;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px solid #e5e7eb;
`;

export const BlockItemContent = styled.div`
  flex: 1;
  min-width: 0;
`;

export const BlockItemNickname = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: #333;
  margin-bottom: 4px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const BlockItemInfo = styled.div`
  display: flex;
  gap: 12px;
  font-size: 12px;
  color: #666;
`;

export const BlockItemTemperature = styled.span`
  color: #666;
`;

export const BlockItemDate = styled.span`
  color: #999;
`;

export const BlockUnblockButton = styled.button`
  padding: 8px 16px;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  background: #f8f9fa;
  color: #666;
  border: 1px solid #e5e7eb;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;

  &:hover {
    background: #e9ecef;
    border-color: #d1d5db;
  }
`;

// 유저 프로필 페이지 스타일
export const CenterMessage = styled.div`
  text-align: center;
  padding: 20px;
`;

export const LoadingMessage = CenterMessage;
export const ErrorMessage = CenterMessage;

export const BadgeLabel = styled(InfoLabel)`
  margin-bottom: 12px;
  display: block;
`;

export const ReportButtonContainer = styled.div`
  padding: 20px;
  margin-top: 24px;
  display: flex;
  gap: 12px;
`;

export const ReportButton = styled(DangerButtonBase)`
  flex: 1;
  padding: 12px;
  border-radius: 4px;
  font-size: 16px;
`;

// 모임 목록 스타일
export const MeetupListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const MeetupItem = styled.div`
  padding: 16px;
  background-color: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  transition: all 0.2s ease;

  &:hover {
    background-color: #f3f4f6;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  }
`;

export const MeetupItemHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
  padding-bottom: 12px;
  border-bottom: 1px solid #e5e7eb;
`;

export const MeetupName = styled.h3`
  font-size: 16px;
  font-weight: 600;
  color: #333;
  margin: 0;
  flex: 1;
`;

export const MeetupCategory = styled.span`
  font-size: 12px;
  font-weight: 500;
  color: ${colors.primary};
  background-color: ${colors.primary100};
  padding: 4px 10px;
  border-radius: 12px;
  white-space: nowrap;
`;

export const MeetupItemContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const MeetupInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
`;

export const MeetupInfoLabel = styled.span`
  font-weight: 500;
  color: #666;
`;

export const MeetupInfoValue = styled.span`
  color: #333;
  text-align: right;
  flex: 1;
  margin-left: 12px;
`;

export const MeetupStatus = styled.span<{ evaluated: boolean }>`
  font-size: 12px;
  font-weight: 500;
  padding: 4px 8px;
  border-radius: 6px;
  width: fit-content;
  margin-top: 8px;
  ${(props) =>
    props.evaluated
      ? `
    background-color: #dcfce7;
    color: #166534;
  `
      : `
    background-color: #fef3c7;
    color: #92400e;
  `}
`;