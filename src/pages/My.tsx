import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Container, ContentContanier } from '@/style/CommonStyle';
import BackArrow from '@/assets/meeting_room_page/chevron_left.svg?react';
import type { RootState } from '@/store';
import { setMyProfile } from '@/store/slices/myProfileSlice';
import { getMyBadges, getMyProfile, updateProfile, getMyMeetups } from '@/api/services/profile.service';
import { getReports, deleteReport, type ReportListItem } from '@/api/services/report.service';
import { useLogin } from '@/hooks/useLogin';
import { getProfile } from '@/utils/tokenStorage';
import type { Badge } from '@/types/badge';
import type { Meetup } from '@/types/evaluation';
import {
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
  ActionButtons,
  SaveButton,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalTitle,
  CloseButton,
  ModalBody,
  FormField,
  FormLabel,
  FormInput,
  FormTextArea,
  ButtonGroup,
  CancelButton,
  HeaderSection,
  BadgeSection,
  BadgeContainer,
  BadgeItem,
  BadgeIcon,
  BadgeName,
  EmptyBadgeMessage,
  GenderButtonGroup,
  GenderButton,
  DeleteButton,
  ReportListContainer,
  ReportItem,
  ReportItemHeader,
  ReportItemContent,
  ReportCategory,
  ReportStatus,
  ReportDate,
  ReportCancelButton,
  MeetupListContainer,
  MeetupItem,
  MeetupItemHeader,
  MeetupName,
  MeetupCategory,
  MeetupItemContent,
  MeetupInfo,
  MeetupInfoLabel,
  MeetupInfoValue,
  MeetupStatus,
  SectionCard,
} from './My.styled';
import BottomNav from '@/components/common/BottomNav';
import { useToast } from '@/hooks/useToast';
import { Toast } from '@/components/common/Toast';
import { LocationInput } from '@/components/common/LocationInput';
import { useLocationInput } from '@/hooks/useLocationInput';
import { validateNickname, isNicknameValid } from '@/utils/nicknameValidation';
import ConfirmModal from '@/components/common/ConfirmModal';

const My = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const myProfile = useSelector((state: RootState) => state.myProfile);
  const { handleLogout, handleDeleteAccount } = useLogin();
  const { showToast, hideToast, toast } = useToast();
  const {
    sido,
    setSido,
    sigungu,
    setSigungu,
    sigunguSuggestions,
    showSigunguSuggestions,
    setShowSigunguSuggestions,
    handleSigunguChange,
    handleSigunguFocus,
    handleSigunguSelect,
  } = useLocationInput();
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [badges, setBadges] = useState<Badge[]>([]);
  const [reports, setReports] = useState<ReportListItem[]>([]);
  const [meetups, setMeetups] = useState<Meetup[]>([]);
  const [confirmModal, setConfirmModal] = useState<{
    isOpen: boolean;
    message: string;
    onConfirm: () => void;
    confirmText?: string;
    cancelText?: string;
  }>({
    isOpen: false,
    message: '',
    onConfirm: () => {},
  });
  const [editData, setEditData] = useState({
    nickname: myProfile.nickname || '',
    age: myProfile.age || '',
    gender: myProfile.gender || '',
    description: myProfile.description || '',
    temperature: myProfile.temperature || '',
    imageUrl: myProfile.imageUrl || '',
  });


  // 페이지 로드 시 프로필 조회
  useEffect(() => {
    const fetchProfile = async () => {
      setIsLoading(true);
      try {
        const profileData = await getMyProfile();
        dispatch(setMyProfile(profileData));
        console.log('프로필 조회 성공:', profileData);
      } catch (error) {
        console.error('프로필 조회 실패:', error);

        const savedProfile = getProfile();
        if (savedProfile) {
          dispatch(setMyProfile(savedProfile));
          console.log('로컬 스토리지에서 프로필 로드:', savedProfile);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, [dispatch]);

  // 뱃지 조회
  useEffect(() => {
    const fetchBadges = async () => {
      try {
        const data = await getMyBadges();
        setBadges(data.content);
        console.log('뱃지 조회 성공:', data);
      } catch (error) {
        console.error('뱃지 조회 실패:', error);
      }
    };

    fetchBadges();
  }, []);

  // 신고 목록 조회
  useEffect(() => {
    const fetchReports = async () => {
      try {
        const data = await getReports();
        setReports(data.content);
        console.log('신고 목록 조회 성공:', data);
      } catch (error) {
        console.error('신고 목록 조회 실패:', error);
      }
    };

    fetchReports();
  }, []);

  // 최근 모임 조회
  useEffect(() => {
    const fetchMeetups = async () => {
      try {
        const data = await getMyMeetups();
        setMeetups(data.content);
        console.log('모임 조회 성공:', data);
      } catch (error) {
        console.error('모임 조회 실패:', error);
      }
    };

    fetchMeetups();
  }, []);

  const handleCancel = () => {
    setIsEditing(false);
    setEditData({
      nickname: myProfile.nickname || '',
      age: myProfile.age || '',
      gender: myProfile.gender || '',
      description: myProfile.description || '',
      temperature: myProfile.temperature || '',
      imageUrl: myProfile.imageUrl || '',
    });
    setSido('');
    setSigungu('');
  };

  const handleEdit = () => {
    setIsEditing(true);

    // 기존 프로필 데이터 가져오기
    setEditData({
      nickname: myProfile.nickname || '',
      age: myProfile.age || '',
      gender: myProfile.gender || '',
      description: myProfile.description || '',
      temperature: myProfile.temperature || '',
      imageUrl: myProfile.imageUrl || '',
    });

    if (myProfile.baseLocation) {
      if (typeof myProfile.baseLocation === 'string') {
        const parts = myProfile.baseLocation.split(' ');
        if (parts.length >= 2) {
          setSido(parts[0]);
          setSigungu(parts[1]);
        }
      } else if (typeof myProfile.baseLocation === 'object' && myProfile.baseLocation !== null) {
        const location = myProfile.baseLocation as { sidoName?: string; sigunguName?: string };
        setSido(location.sidoName || '');
        setSigungu(location.sigunguName || '');
      }
    }
  };


  const handleSave = async () => {
    // 닉네임 검증
    const nicknameError = validateNickname(editData.nickname);
    if (nicknameError) {
      showToast(nicknameError);
      return;
    }

    const profileData = {
      ...myProfile,
      ...editData,
      age: typeof editData.age === 'string' ? parseInt(editData.age) || null : editData.age,
      temperature:
        typeof editData.temperature === 'string'
          ? parseFloat(editData.temperature) || null
          : editData.temperature,
      baseLocation: sido && sigungu ? `${sido} ${sigungu}` : null,
    };

    console.log('저장할 프로필 데이터:', profileData);

    try {
      await updateProfile(profileData);
      dispatch(setMyProfile(profileData));
      console.log('프로필 수정 성공:', profileData);

      showToast('프로필이 성공적으로 수정되었습니다!');
      setTimeout(() => {
        setIsEditing(false);
      }, 2000);
    } catch (error: any) {
      console.error('프로필 수정 실패:', error);
      showToast(`프로필 수정 실패: ${error.message}`);
    }
  };

  const handleInputChange = (field: string, value: string | number) => {
    setEditData((prev) => ({ ...prev, [field]: value }));
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setEditData((prev) => ({ ...prev, imageUrl: result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  const getCategoryName = (category: string): string => {
    const categoryMap: { [key: string]: string } = {
      SPORTS: '운동',
      STUDY: '스터디',
      GAME: '게임',
      MUKBANG: '맛집탐방',
      MOVIE: '영화',
      OTHER: '기타',
    };
    return categoryMap[category] || category;
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <Container>
      <HeaderSection />
      <TitleContainer>
        <BackButton onClick={handleBack}>
          <BackArrow width="24" height="24" fill="currentColor" />
        </BackButton>
        <HeaderTitle>마이 페이지</HeaderTitle>
      </TitleContainer>
      <ContentContanier>
        {isLoading ? (
          <div style={{ textAlign: 'center', padding: '20px' }}>프로필 정보를 불러오는 중...</div>
        ) : (
          <>
            <MainContentCard>
              <ProfileImageContainer>
                {myProfile.imageUrl ? (
                  <ProfileImage src={myProfile.imageUrl} alt="프로필 이미지" />
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
                  <UserName>{myProfile.nickname || '닉네임 없음'}</UserName>
                  <UserAge>{myProfile.age ? `${myProfile.age}세` : '-'}</UserAge>
                  <UserGender>{myProfile.gender || '-'}</UserGender>
                </UserBasicInfo>
              </UserInfo>

              <ProfileInfoSection>
                <ProfileInfoItem>
                  <InfoLabel>온도</InfoLabel>
                  <InfoValue>
                    {myProfile.temperature ? `${myProfile.temperature}°C` : '-'}
                  </InfoValue>
                </ProfileInfoItem>

                <ProfileInfoItem>
                  <InfoLabel>위치</InfoLabel>
                  <InfoValue>
                    {myProfile.baseLocation
                      ? typeof myProfile.baseLocation === 'string'
                        ? myProfile.baseLocation
                        : `${(myProfile.baseLocation as { sidoName: string; sigunguName: string }).sidoName} ${(myProfile.baseLocation as { sidoName: string; sigunguName: string }).sigunguName}`
                      : '-'}
                  </InfoValue>
                </ProfileInfoItem>

                <SelfIntroItem>
                  <InfoLabel>한 줄 소개</InfoLabel>
                  <SelfIntroContent>
                    {myProfile.description ? (
                      <SelfIntroText>{myProfile.description}</SelfIntroText>
                    ) : (
                      <SelfIntroPlaceholder>자기소개를 작성해보세요</SelfIntroPlaceholder>
                    )}
                  </SelfIntroContent>
                </SelfIntroItem>
              </ProfileInfoSection>

              <ActionButtons>
                <SaveButton onClick={handleEdit}>편집</SaveButton>
              </ActionButtons>
            </MainContentCard>

            {/* 뱃지 섹션 */}
            <SectionCard>
              <BadgeSection>
                <InfoLabel style={{ marginBottom: '12px', display: 'block' }}>
                  획득한 뱃지 ({badges.length}개)
                </InfoLabel>
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

            {/* 최근 모임 섹션 */}
            <SectionCard>
              <BadgeSection>
                <InfoLabel style={{ marginBottom: '12px', display: 'block' }}>
                  최근 모임 ({meetups.length}개)
                </InfoLabel>
                {meetups.length > 0 ? (
                  <MeetupListContainer>
                    {meetups.map((meetup) => (
                      <MeetupItem key={meetup.meetupId}>
                        <MeetupItemHeader>
                          <MeetupName>{meetup.name}</MeetupName>
                          <MeetupCategory>{getCategoryName(meetup.category)}</MeetupCategory>
                        </MeetupItemHeader>
                        <MeetupItemContent>
                          <MeetupInfo>
                            <MeetupInfoLabel>시작 시간:</MeetupInfoLabel>
                            <MeetupInfoValue>{formatDate(meetup.startAt)}</MeetupInfoValue>
                          </MeetupInfo>
                          <MeetupInfo>
                            <MeetupInfoLabel>종료 시간:</MeetupInfoLabel>
                            <MeetupInfoValue>{formatDate(meetup.endAt)}</MeetupInfoValue>
                          </MeetupInfo>
                          <MeetupInfo>
                            <MeetupInfoLabel>참가 인원:</MeetupInfoLabel>
                            <MeetupInfoValue>
                              {meetup.participantCount} / {meetup.capacity}명
                            </MeetupInfoValue>
                          </MeetupInfo>
                          <MeetupStatus 
                            evaluated={meetup.evaluated}
                            onClick={() => {
                              if (!meetup.evaluated) {
                                navigate('/participant-evaluation');
                              }
                            }}
                            style={{
                              cursor: meetup.evaluated ? 'default' : 'pointer',
                            }}
                          >
                            {meetup.evaluated ? '평가 완료' : '평가 미완료'}
                          </MeetupStatus>
                        </MeetupItemContent>
                      </MeetupItem>
                    ))}
                  </MeetupListContainer>
                ) : (
                  <EmptyBadgeMessage>참가한 모임이 없습니다</EmptyBadgeMessage>
                )}
              </BadgeSection>
            </SectionCard>

            {/* 신고 목록 섹션 */}
            <SectionCard>
              <BadgeSection>
                <InfoLabel style={{ marginBottom: '12px', display: 'block' }}>
                  내 신고 목록 ({reports.length}개)
                </InfoLabel>
                {reports.length > 0 ? (
                  <ReportListContainer>
                    {reports.map((report) => (
                      <ReportItem key={report.reportId}>
                        <ReportItemHeader>
                          <ReportItemContent>
                            <ReportCategory>
                              신고 카테고리: {report.category === 'SPAM' ? '스팸' : report.category === 'ABUSE' ? '욕설/비방' : report.category === 'INAPPROPRIATE' ? '부적절한 콘텐츠' : '기타'}
                            </ReportCategory>
                            <ReportStatus>
                              상태: {report.status === 'OPEN' ? '처리중' : report.status === 'CLOSED' ? '처리완료' : report.status}
                            </ReportStatus>
                            <ReportDate>
                              {new Date(report.createdAt).toLocaleDateString('ko-KR', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit',
                              })}
                            </ReportDate>
                          </ReportItemContent>
                          {report.status === 'OPEN' && (
                            <ReportCancelButton
                              onClick={() => {
                                setConfirmModal({
                                  isOpen: true,
                                  message: '정말 이 신고를 취소하시겠습니까?',
                                  onConfirm: async () => {
                                    setConfirmModal({ ...confirmModal, isOpen: false });
                                    try {
                                      await deleteReport(report.reportId);
                                      showToast('신고가 취소되었습니다.');
                                      // 목록 새로고침
                                      const data = await getReports();
                                      setReports(data.content);
                                    } catch (error: any) {
                                      console.error('신고 취소 실패:', error);
                                      showToast(`신고 취소에 실패했습니다: ${error.response?.data?.message || error.message}`);
                                    }
                                  },
                                });
                              }}
                            >
                              취소
                            </ReportCancelButton>
                          )}
                        </ReportItemHeader>
                      </ReportItem>
                    ))}
                  </ReportListContainer>
                ) : (
                  <EmptyBadgeMessage>신고 내역이 없습니다</EmptyBadgeMessage>
                )}
              </BadgeSection>
            </SectionCard>

            {/* 로그아웃 및 회원탈퇴 버튼 */}
            <ActionButtons style={{ marginTop: '20px', marginBottom: '20px', display: 'flex', gap: '12px', padding: '0 20px' }}>
              <CancelButton 
                onClick={() => {
                  setConfirmModal({
                    isOpen: true,
                    message: '로그아웃하시겠습니까?',
                    onConfirm: () => {
                      setConfirmModal({ ...confirmModal, isOpen: false });
                      handleLogout();
                    },
                  });
                }} 
                style={{ flex: 1 }}
              >
                로그아웃
              </CancelButton>
              <DeleteButton 
                onClick={() => {
                  setConfirmModal({
                    isOpen: true,
                    message: '정말 탈퇴하시겠습니까? 탈퇴 후에는 복구할 수 없습니다.',
                    onConfirm: () => {
                      setConfirmModal({ ...confirmModal, isOpen: false });
                      handleDeleteAccount();
                    },
                  });
                }} 
                style={{ flex: 1 }}
              >
                회원탈퇴
              </DeleteButton>
            </ActionButtons>

            <BottomNav />

            {isEditing && (
              <Modal>
                <ModalOverlay onClick={handleCancel} />
                <ModalContent>
                  <ModalHeader>
                    <ModalTitle>프로필 편집</ModalTitle>
                    <CloseButton onClick={handleCancel}>×</CloseButton>
                  </ModalHeader>
                  <ModalBody>
                    <FormField>
                      <FormLabel>프로필 이미지</FormLabel>
                      <div
                        onClick={() =>
                          document.getElementById('edit-profile-image-upload')?.click()
                        }
                        style={{
                          width: '120px',
                          height: '120px',
                          margin: '0 auto 20px',
                          cursor: 'pointer',
                          borderRadius: '50%',
                          overflow: 'hidden',
                          border: '2px solid #e5e7eb',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          backgroundColor: '#f9fafb',
                        }}
                      >
                        {editData.imageUrl ? (
                          <img
                            src={editData.imageUrl}
                            alt="프로필 미리보기"
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                          />
                        ) : (
                          <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
                            <path
                              d="M23 19C23 19.5304 22.7893 20.0391 22.4142 20.4142C22.0391 20.7893 21.5304 21 21 21H3C2.46957 21 1.96086 20.7893 1.58579 20.4142C1.21071 20.0391 1 19.5304 1 19V8C1 7.46957 1.21071 6.96086 1.58579 6.58579C1.96086 6.21071 2.46957 6 3 6H7L9 3H15L17 6H21C21.5304 6 22.0391 6.21071 22.4142 6.58579C22.7893 6.96086 23 7.46957 23 8V19Z"
                              stroke="#9ca3af"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <circle
                              cx="12"
                              cy="13"
                              r="4"
                              stroke="#9ca3af"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        )}
                      </div>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        style={{ display: 'none' }}
                        id="edit-profile-image-upload"
                      />
                    </FormField>

                    <FormField>
                      <FormLabel>닉네임</FormLabel>
                      <FormInput
                        type="text"
                        value={editData.nickname}
                        onChange={(e) => handleInputChange('nickname', e.target.value)}
                        placeholder="닉네임을 입력하세요"
                        maxLength={20}
                      />
                    </FormField>

                    <FormField>
                      <FormLabel>나이</FormLabel>
                      <FormInput
                        type="number"
                        value={editData.age}
                        onChange={(e) => handleInputChange('age', parseInt(e.target.value))}
                        placeholder="나이를 입력하세요"
                      />
                    </FormField>

                    <FormField>
                      <FormLabel>성별</FormLabel>
                      <GenderButtonGroup>
                        <GenderButton
                          type="button"
                          selected={editData.gender === 'MALE'}
                          onClick={() => handleInputChange('gender', 'MALE')}
                        >
                          남
                        </GenderButton>
                        <GenderButton
                          type="button"
                          selected={editData.gender === 'FEMALE'}
                          onClick={() => handleInputChange('gender', 'FEMALE')}
                        >
                          여
                        </GenderButton>
                      </GenderButtonGroup>
                    </FormField>

                    <FormField>
                      <FormLabel>한 줄 소개</FormLabel>
                      <FormTextArea
                        value={editData.description}
                        onChange={(e) => handleInputChange('description', e.target.value)}
                        placeholder="자기소개를 입력하세요"
                      />
                    </FormField>

                    <FormField>
                      <FormLabel>기본 위치</FormLabel>
                      <LocationInput
                        sido={sido}
                        setSido={setSido}
                        sigungu={sigungu}
                        onSigunguChange={handleSigunguChange}
                        onSigunguFocus={handleSigunguFocus}
                        onSigunguSelect={handleSigunguSelect}
                        onSigunguBlur={() => setTimeout(() => setShowSigunguSuggestions(false), 100)}
                        sigunguSuggestions={sigunguSuggestions}
                        showSigunguSuggestions={showSigunguSuggestions}
                      />
                    </FormField>

                    <ButtonGroup>
                      <CancelButton onClick={handleCancel}>취소</CancelButton>
                      <SaveButton 
                        onClick={handleSave}
                        disabled={!editData.nickname.trim() || !isNicknameValid(editData.nickname)}
                        style={{
                          opacity: (!editData.nickname.trim() || !isNicknameValid(editData.nickname)) ? 0.5 : 1,
                          cursor: (!editData.nickname.trim() || !isNicknameValid(editData.nickname)) ? 'not-allowed' : 'pointer'
                        }}
                      >
                        저장
                      </SaveButton>
                    </ButtonGroup>
                  </ModalBody>
                </ModalContent>
              </Modal>
            )}
          </>
        )}
      </ContentContanier>
      {toast.visible && <Toast message={toast.message} onClose={hideToast} />}
      <ConfirmModal
        isOpen={confirmModal.isOpen}
        message={confirmModal.message}
        onConfirm={confirmModal.onConfirm}
        onCancel={() => setConfirmModal({ ...confirmModal, isOpen: false })}
        confirmText={confirmModal.confirmText || '확인'}
        cancelText={confirmModal.cancelText || '취소'}
      />
    </Container>
  );
};

export default My;
