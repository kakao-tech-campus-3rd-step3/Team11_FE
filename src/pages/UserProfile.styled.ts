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

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
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
  text-align: center;
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
