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
  gap: 0.75rem;
  flex-wrap: wrap;
  min-height: 60px;
`;

export const BadgeItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
  padding: 0.5rem;
  border-radius: 0.5rem;
  background-color: transparent;
  border: 1px solid rgb(243, 244, 246);
  min-width: 80px;
  cursor: pointer;
  transition: background-color 0.15s ease;
  -webkit-tap-highlight-color: transparent;

  &:active {
    background-color: ${colors.primary100};
  }
`;

export const BadgeIcon = styled.img`
  width: 40px;
  height: 40px;
  object-fit: contain;
`;

export const BadgeName = styled.span`
  font-size: 0.75rem;
  font-weight: 500;
  line-height: 1rem;
  color: rgb(42, 48, 56);
  text-align: center;
`;

export const EmptyBadgeMessage = styled.div`
  width: 100%;
  text-align: center;
  color: rgb(156, 163, 175);
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1.25rem;
  padding: 1.25rem 0;
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
  z-index: 11;
`;

export const HeaderTitle = styled.h1`
  font-size: 1.5rem;
  font-weight: 600;
  line-height: 2rem;
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
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 1rem;
  z-index: 10;
`;

export const ProfileImage = styled.img`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid white;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  background-color: white;
`;

export const ProfileImagePlaceholder = styled.div`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background-color: #e9ecef;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const MainContentCard = styled.div`
  background: white;
  border-radius: 0.75rem 0.75rem 0.5rem 0.5rem;
  padding: 1.5rem;
  margin-top: 1rem;
  margin-bottom: 10px;

  position: relative;
  z-index: 100;
  display: flex;
  flex-direction: column;
`;

export const SectionCard = styled.div`
  background: white;
  border-radius: 0.5rem;
  padding: 1.5rem;
  margin-bottom: 10px;
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
  margin-top: 0;
  margin-bottom: 1.5rem;
  position: relative;
  z-index: 10;
`;

export const UserBasicInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  flex-wrap: wrap;
  margin-bottom: 0.5rem;
`;

export const UserName = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  line-height: 2rem;
  color: white;
  margin: 0;
`;

export const UserTag = styled.span`
  font-size: 0.875rem;
  font-weight: 500;
  line-height: 1.25rem;
  color: rgb(107, 114, 128);
  background: #f0f0f0;
  padding: 4px 8px;
  border-radius: 12px;
`;

// 호환성을 위한 별칭
export const UserAge = UserTag;
export const UserGender = UserTag;

export const UserDetailInfo = styled.div`
  display: flex;
  width: 100%;
  background: white;
  border-radius: 0.5rem;
  margin-bottom: 0.75rem;
  overflow: hidden;
  border: 1px solid rgb(243, 244, 246);
  position: relative;
  z-index: 10;
`;

export const UserDetailItem = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1.25rem 0.75rem;
  border-right: 1px solid rgb(243, 244, 246);

  &:last-child {
    border-right: none;
  }
`;

export const UserDetailLabel = styled.span`
  font-size: 0.75rem;
  font-weight: 400;
  line-height: 1rem;
  color: rgb(107, 114, 128);
  margin-bottom: 0.5rem;
`;

export const UserDetailValue = styled.span`
  font-size: 1rem;
  font-weight: 600;
  line-height: 1.5rem;
  color: rgb(42, 48, 56);
`;


export const ProfileInfoSection = styled.div`
  margin: 1.25rem 0;
  padding: 0 1.5rem;
`;

export const ProfileInfoItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 0;
  border-bottom: 1px solid rgb(220, 222, 227);

  &:last-child {
    border-bottom: none;
  }
`;

export const TemperatureCard = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 1.25rem;
`;

export const TemperatureHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const TemperatureLabel = styled.span`
  font-size: 1rem;
  font-weight: 500;
  line-height: 1.5rem;
  color: rgb(107, 114, 128);
`;

export const TemperatureValue = styled.span`
  font-size: 2rem;
  font-weight: 700;
  line-height: 2.5rem;
  color: ${colors.primary};
`;

export const TemperatureBarContainer = styled.div`
  width: 100%;
  height: 2rem;
  background-color: rgb(229, 231, 235);
  border-radius: 1rem;
  overflow: hidden;
  position: relative;
`;

export const TemperatureBar = styled.div<{ percentage: number }>`
  height: 100%;
  width: ${(props) => props.percentage}%;
  background: linear-gradient(90deg, ${colors.primary} 0%, ${colors.primary400} 100%);
  border-radius: 1rem;
  transition: width 0.5s ease-in-out;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    right: 0;
    top: 0;
    bottom: 0;
    width: 3px;
    background-color: white;
    box-shadow: 0 0 4px rgba(0, 0, 0, 0.2);
  }
`;

export const InfoLabel = styled.span`
  font-size: 1rem;
  font-weight: 500;
  line-height: 1.5rem;
  color: rgb(107, 114, 128);
`;

export const InfoValue = styled.span`
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5rem;
  color: rgb(107, 114, 128);
  text-align: right;
  max-width: 60%;
  word-wrap: break-word;
`;

export const SelfIntroItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 1.25rem;
`;

export const SelfIntroContent = styled.div`
  background: #f8f9fa;
  border-radius: 0.75rem;
  padding: 1rem;
  min-height: 5rem;
  border: 1px solid rgb(243, 244, 246);
  transition: border-color 0.2s ease;
`;

export const SelfIntroText = styled.p`
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5rem;
  color: rgb(42, 48, 56);
  margin: 0;
  word-wrap: break-word;
`;

export const SelfIntroPlaceholder = styled.p`
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5rem;
  color: rgb(156, 163, 175);
  margin: 0;
  font-style: italic;
`;

export const ActionButtons = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  margin-top: 1.875rem;
`;

export const SaveButton = styled.button<{ notVaild?: boolean }>`
  flex: 1;
  height: 3.25rem;
  background: ${colors.primary};
  color: rgba(255, 255, 255, 1);
  border: none;
  border-radius: 0.5rem;
  font-size: 1rem;
  font-weight: 600;
  line-height: 1.5rem;
  cursor: ${({ notVaild }) => (notVaild ? 'not-allowed' : 'pointer')};
  opacity: ${({ notVaild }) => (notVaild ? '0.5' : '1')};
  transition: opacity 0.2s ease;

  &:active:not(:disabled) {
    opacity: 0.8;
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
  padding: 1.25rem;
  border-bottom: 1px solid rgb(229, 231, 235);
`;

export const ModalTitle = styled.h2`
  font-size: 1.125rem;
  font-weight: 600;
  line-height: 1.75rem;
  color: rgb(42, 48, 56);
  margin: 0;
`;

export const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  font-weight: 400;
  line-height: 2rem;
  color: rgb(107, 114, 128);
  cursor: pointer;
  padding: 0;
  width: 24px;
  height: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: opacity 0.2s ease;

  &:active:not(:disabled) {
    opacity: 0.8;
  }
`;

export const ModalBody = styled.div`
  padding: 1.25rem;
`;

export const FormField = styled.div`
  margin-bottom: 1.25rem;
`;

export const FormLabel = styled.label`
  display: block;
  font-size: 0.875rem;
  font-weight: 500;
  line-height: 1.25rem;
  color: rgb(42, 48, 56);
  margin-bottom: 0.5rem;
`;

const FormInputBase = `
  width: 100%;
  box-sizing: border-box;
  color: rgb(42, 48, 56);
  transition: border-color 200ms;
  border-style: solid;
  min-height: 3rem;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5rem;
  padding: 0.75rem;
  border-width: 1px;
  border-color: rgb(229, 231, 235);
  border-radius: 0.5rem;

  &:focus {
    outline: none;
    border-color: ${colors.primary};
  }

  &::placeholder {
    color: rgb(156, 163, 175);
  }
`;

export const FormInput = styled.input`
  ${FormInputBase}
`;

export const FormTextArea = styled.textarea`
  ${FormInputBase}
  resize: vertical;
  min-height: 5rem;
  padding: 0.75rem;
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 0.75rem;
  margin-top: 1.25rem;
`;

export const CancelButton = styled.button`
  flex: 1;
  height: 3.25rem;
  background: #f8f9fa;
  color: rgb(107, 114, 128);
  border: none;
  border-radius: 0.5rem;
  font-size: 1rem;
  font-weight: 600;
  line-height: 1.5rem;
  cursor: pointer;
  transition: opacity 0.2s ease;

  &:active:not(:disabled) {
    opacity: 0.8;
  }
`;

const DangerButtonBase = styled.button`
  background: #ef4444;
  color: white;
  border: none;
  font-size: 1rem;
  font-weight: 600;
  line-height: 1.5rem;
  cursor: pointer;
  transition: opacity 0.2s ease;

  &:active:not(:disabled) {
    opacity: 0.8;
  }
`;

export const DeleteButton = styled(DangerButtonBase)`
  flex: 1;
  height: 3.25rem;
  border-radius: 0.5rem;
`;

export const GenderButtonGroup = styled.div`
  display: flex;
  gap: 0.75rem;
  width: 100%;
`;

export const GenderButton = styled.button<{ selected: boolean }>`
  flex: 1;
  height: 3.25rem;
  border: ${(props) => (props.selected ? `2px solid ${colors.primary}` : 'none')};
  background: ${(props) => (props.selected ? colors.primary : 'rgb(243, 244, 246)')};
  color: ${(props) => (props.selected ? 'white' : 'rgb(42, 48, 56)')};
  border-radius: 0.5rem;
  font-size: 1rem;
  font-weight: 600;
  line-height: 1.5rem;
  cursor: pointer;
  transition: all 0.2s ease;

  &:active:not(:disabled) {
    opacity: 0.8;
  }
`;

// 신고 목록 
export const ReportListContainer = styled(SectionBase)`
  padding: 0 1.5rem;
`;

export const ReportItem = styled.div`
  padding: 1rem;
  margin-bottom: 0.75rem;
  background-color: transparent;
  border: 1px solid rgb(243, 244, 246);
  border-radius: 0.75rem;
  cursor: pointer;
  transition: background-color 0.15s ease;
  -webkit-tap-highlight-color: transparent;

  &:active {
    background-color: ${colors.primary100};
  }
`;

export const ReportItemHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 0.5rem;
`;

export const ReportItemContent = styled.div`
  flex: 1;
`;

export const ReportCategory = styled.div`
  font-size: 0.875rem;
  font-weight: 500;
  line-height: 1.25rem;
  color: rgb(42, 48, 56);
  margin-bottom: 0.25rem;
`;

export const ReportStatus = styled.div`
  font-size: 0.75rem;
  font-weight: 400;
  line-height: 1rem;
  color: rgb(107, 114, 128);
`;

export const ReportDate = styled.div`
  font-size: 0.75rem;
  font-weight: 400;
  line-height: 1rem;
  color: rgb(156, 163, 175);
  margin-top: 0.25rem;
`;

export const ReportCancelButton = styled(DangerButtonBase)`
  padding: 0.375rem 0.75rem;
  border-radius: 0.375rem;
  font-size: 0.75rem;
  height: auto;
`;

export const BlockListContainer = styled(SectionBase)`
  padding: 0 1.5rem;
`;

export const BlockItem = styled.div`
  padding: 1rem;
  margin-bottom: 0.75rem;
  background-color: transparent;
  border: 1px solid rgb(243, 244, 246);
  border-radius: 0.75rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  cursor: pointer;
  transition: background-color 0.15s ease;
  -webkit-tap-highlight-color: transparent;

  &:active {
    background-color: ${colors.primary100};
  }
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
  font-size: 1rem;
  font-weight: 600;
  line-height: 1.5rem;
  color: rgb(42, 48, 56);
  margin-bottom: 0.25rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const BlockItemInfo = styled.div`
  display: flex;
  gap: 0.75rem;
  font-size: 0.75rem;
  font-weight: 400;
  line-height: 1rem;
  color: rgb(107, 114, 128);
`;

export const BlockItemTemperature = styled.span`
  color: rgb(107, 114, 128);
`;

export const BlockItemDate = styled.span`
  color: rgb(156, 163, 175);
`;

export const BlockUnblockButton = styled.button`
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  font-weight: 600;
  line-height: 1.25rem;
  background: #f8f9fa;
  color: rgb(107, 114, 128);
  border: 1px solid #e5e7eb;
  cursor: pointer;
  transition: opacity 0.2s ease;
  white-space: nowrap;

  &:active:not(:disabled) {
    opacity: 0.8;
  }
`;

// 유저 프로필 페이지 스타일
export const CenterMessage = styled.div`
  text-align: center;
  padding: 1.25rem;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5rem;
  color: rgb(107, 114, 128);
`;

export const LoadingMessage = CenterMessage;
export const ErrorMessage = CenterMessage;

export const BadgeLabel = styled(InfoLabel)`
  margin-bottom: 0.75rem;
  display: block;
`;

export const ReportButtonContainer = styled.div`
  padding: 1.25rem;
  margin-top: 1.5rem;
  display: flex;
  gap: 0.75rem;
`;

export const ReportButton = styled(DangerButtonBase)`
  flex: 1;
  height: 3.25rem;
  border-radius: 0.5rem;
`;

// 모임 목록 스타일
export const MeetupListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

export const MeetupItem = styled.div`
  padding: 1rem;
  background-color: transparent;
  border: 1px solid rgb(243, 244, 246);
  border-radius: 0.75rem;
  cursor: pointer;
  transition: background-color 0.15s ease;
  -webkit-tap-highlight-color: transparent;

  &:active {
    background-color: ${colors.primary100};
  }
`;

export const MeetupItemHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.75rem;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid #e5e7eb;
`;

export const MeetupName = styled.h3`
  font-size: 1rem;
  font-weight: 600;
  line-height: 1.5rem;
  color: rgb(42, 48, 56);
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
  gap: 0.5rem;
`;

export const MeetupInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.875rem;
  line-height: 1.25rem;
`;

export const MeetupInfoLabel = styled.span`
  font-size: 0.875rem;
  font-weight: 500;
  line-height: 1.25rem;
  color: rgb(107, 114, 128);
`;

export const MeetupInfoValue = styled.span`
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1.25rem;
  color: rgb(42, 48, 56);
  text-align: right;
  flex: 1;
  margin-left: 0.75rem;
`;

export const MeetupStatus = styled.span<{ evaluated: boolean }>`
  font-size: 0.75rem;
  font-weight: 500;
  line-height: 1rem;
  padding: 0.25rem 0.5rem;
  border-radius: 0.375rem;
  width: fit-content;
  margin-top: 0.5rem;
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