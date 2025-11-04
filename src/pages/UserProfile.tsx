import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, ContentContanier } from '@/style/CommonStyle';
import { getUserBadges, getUserProfile } from '@/api/services/profile.service';
import { blockUser } from '@/api/services/block.service';
import type { MyProfileState } from '@/store/slices/myProfileSlice';
import type { Badge } from '@/types/badge';
import {
  HeaderSection,
  HeaderTitle,
  TitleContainer,
  BackButton,
  ProfileImageContainer,
  ProfileImage,
  ProfileImagePlaceholder,
  MainContentCard,
  UserInfo,
  UserBasicInfo,
  UserName,
  UserAge,
  UserGender,
  ProfileInfoSection,
  ProfileInfoItem,
  InfoLabel,
  InfoValue,
  SelfIntroItem,
  SelfIntroContent,
  SelfIntroText,
  SelfIntroPlaceholder,
  BadgeSection,
  BadgeContainer,
  BadgeItem,
  BadgeIcon,
  BadgeName,
  EmptyBadgeMessage,
  LoadingMessage,
  ErrorMessage,
  BadgeLabel,
  ReportButtonContainer,
  ReportButton,
  SectionCard,
} from './My.styled';
import BottomNav from '@/components/common/BottomNav';
import { useToast } from '@/hooks/useToast';
import { Toast } from '@/components/common/Toast';
import ReportModal from '@/components/user_profile/ReportModal';
import BlockModal from '@/components/user_profile/BlockModal';

const UserProfile = () => {
  const { userId } = useParams<{ userId: string }>();
  const navigate = useNavigate();
  const { showToast, hideToast, toast } = useToast();
  const [userProfile, setUserProfile] = useState<MyProfileState | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [badges, setBadges] = useState<Badge[]>([]);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [isBlockModalOpen, setIsBlockModalOpen] = useState(false);
  const [isBlocking, setIsBlocking] = useState(false);

  // 페이지 로드 시 프로필 조회
  useEffect(() => {
    const fetchProfile = async () => {
      if (!userId) return;

      setIsLoading(true);
      try {
        const profileData = await getUserProfile(userId);
        setUserProfile(profileData);
        console.log('사용자 프로필 조회 성공:', profileData);
      } catch (error: any) {
        console.error('사용자 프로필 조회 실패:', error);
        showToast('프로필을 불러올 수 없습니다.');
        setTimeout(() => {
          navigate(-1);
        }, 2000);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, [userId, navigate]);

  // 뱃지 조회
  useEffect(() => {
    const fetchBadges = async () => {
      if (!userId) return;

      try {
        const data = await getUserBadges(userId);
        setBadges(data.content);
        console.log('뱃지 조회 성공:', data);
      } catch (error) {
        console.error('뱃지 조회 실패:', error);
      }
    };

    fetchBadges();
  }, [userId]);

  const handleBack = () => {
    navigate(-1);
  };

  const handleBlockUser = async () => {
    if (!userId) return;

    setIsBlocking(true);
    try {
      await blockUser(userId);
      showToast('사용자가 차단되었습니다.');
      setIsBlockModalOpen(false);
      setTimeout(() => {
        navigate(-1);
      }, 1500);
    } catch (error: any) {
      console.error('사용자 차단 실패:', error);
      showToast(error.message || '사용자 차단에 실패했습니다.');
    } finally {
      setIsBlocking(false);
    }
  };

  if (isLoading) {
    return (
      <Container>
        <HeaderSection />
        <TitleContainer>
          <BackButton onClick={handleBack}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M19 12H5M12 19L5 12L12 5"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </BackButton>
          <HeaderTitle>프로필</HeaderTitle>
        </TitleContainer>
        <ContentContanier>
          <LoadingMessage>프로필 정보를 불러오는 중...</LoadingMessage>
        </ContentContanier>
      </Container>
    );
  }

  if (!userProfile) {
    return (
      <Container>
        <HeaderSection />
        <TitleContainer>
          <BackButton onClick={handleBack}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M19 12H5M12 19L5 12L12 5"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </BackButton>
          <HeaderTitle>프로필</HeaderTitle>
        </TitleContainer>
        <ContentContanier>
          <ErrorMessage>프로필을 찾을 수 없습니다.</ErrorMessage>
        </ContentContanier>
      </Container>
    );
  }

  return (
    <Container>
      <HeaderSection />
      <TitleContainer>
        <BackButton onClick={handleBack}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M19 12H5M12 19L5 12L12 5"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </BackButton>
        <HeaderTitle>프로필</HeaderTitle>
      </TitleContainer>
      <ContentContanier>
        <MainContentCard>
          <ProfileImageContainer>
            {userProfile.imageUrl ? (
              <ProfileImage src={userProfile.imageUrl} alt="프로필 이미지" />
            ) : (
              <ProfileImagePlaceholder>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="2" />
                </svg>
              </ProfileImagePlaceholder>
            )}
          </ProfileImageContainer>
          <UserInfo>
            <UserBasicInfo>
              <UserName>{userProfile.nickname || '닉네임 없음'}</UserName>
              <UserAge>{userProfile.age ? `${userProfile.age}세` : '-'}</UserAge>
              <UserGender>{userProfile.gender || '-'}</UserGender>
            </UserBasicInfo>
          </UserInfo>

          <ProfileInfoSection>
            <ProfileInfoItem>
              <InfoLabel>온도</InfoLabel>
              <InfoValue>
                {userProfile.temperature ? `${userProfile.temperature}°C` : '-'}
              </InfoValue>
            </ProfileInfoItem>

            <ProfileInfoItem>
              <InfoLabel>위치</InfoLabel>
              <InfoValue>
                {userProfile.baseLocation
                  ? typeof userProfile.baseLocation === 'string'
                    ? userProfile.baseLocation
                    : `${(userProfile.baseLocation as { sidoName: string; sigunguName: string }).sidoName} ${(userProfile.baseLocation as { sidoName: string; sigunguName: string }).sigunguName}`
                  : '-'}
              </InfoValue>
            </ProfileInfoItem>

            <SelfIntroItem>
              <InfoLabel>한 줄 소개</InfoLabel>
              <SelfIntroContent>
                {userProfile.description ? (
                  <SelfIntroText>{userProfile.description}</SelfIntroText>
                ) : (
                  <SelfIntroPlaceholder>자기소개가 없습니다</SelfIntroPlaceholder>
                )}
              </SelfIntroContent>
            </SelfIntroItem>
          </ProfileInfoSection>
        </MainContentCard>

        {/* 뱃지 섹션 */}
        <SectionCard>
          <BadgeSection>
            <BadgeLabel>
              획득한 뱃지 ({badges.length}개)
            </BadgeLabel>
            <BadgeContainer>
              {badges.length > 0 ? (
                badges.map((badge) => (
                  <BadgeItem key={badge.badgeId}>
                    <BadgeIcon src={badge.iconUrl} alt={badge.name} />
                    <BadgeName>{badge.name}</BadgeName>
                  </BadgeItem>
                ))
              ) : (
                <EmptyBadgeMessage>아직 획득한 뱃지가 없습니다</EmptyBadgeMessage>
              )}
            </BadgeContainer>
          </BadgeSection>
        </SectionCard>

        {/* 신고 및 차단 버튼 */}
        <SectionCard>
          <ReportButtonContainer>
            <ReportButton onClick={() => setIsReportModalOpen(true)}>
              사용자 신고
            </ReportButton>
            <ReportButton 
              onClick={() => setIsBlockModalOpen(true)}
              style={{ marginTop: '12px', backgroundColor: '#6b7280' }}
            >
              사용자 차단
            </ReportButton>
          </ReportButtonContainer>
        </SectionCard>

        <BottomNav />
      </ContentContanier>
      {toast.visible && <Toast message={toast.message} onClose={hideToast} />}
      {userId && (
        <>
          <ReportModal
            isOpen={isReportModalOpen}
            onClose={() => setIsReportModalOpen(false)}
            targetProfileId={userId}
            onSuccess={() => {
              showToast('신고가 성공적으로 제출되었습니다.');
            }}
          />
          <BlockModal
            isOpen={isBlockModalOpen}
            onClose={() => setIsBlockModalOpen(false)}
            onConfirm={handleBlockUser}
            isLoading={isBlocking}
            userName={userProfile?.nickname || undefined}
          />
        </>
      )}
    </Container>
  );
};

export default UserProfile;
