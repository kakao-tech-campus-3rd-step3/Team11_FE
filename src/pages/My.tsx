import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, ContentContanier } from '@/style/CommonStyle';
import type { RootState } from '@/store';
import { setMyProfile } from '@/store/slices/myProfileSlice';
import {
  HeaderTitle,
  ProfileImageContainer,
  ProfileImage,
  ProfileImagePlaceholder,
  MainContentCard,
  UserInfo,
  UserBasicInfo,
  UserName,
  UserAge,
  UserGender,
  UserEmail,
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
  HeaderSection
} from './My.styled';
import BottomNav from '@/components/common/BottomNav';

const My = () => {
  const dispatch = useDispatch();
  const myProfile = useSelector((state: RootState) => state.myProfile);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    name: myProfile.name || '',
    age: myProfile.age || '',
    gender: myProfile.gender || '',
    description: myProfile.description || '',
    temperature: myProfile.temperature || '',
    baseLocation: myProfile.baseLocation || ''
  });


  const handleCancel = () => {
    setIsEditing(false);
    setEditData({
      name: myProfile.name || '',
      age: myProfile.age || '',
      gender: myProfile.gender || '',
      description: myProfile.description || '',
      temperature: myProfile.temperature || '',
      baseLocation: myProfile.baseLocation || ''
    });
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    const profileData = {
      ...editData,
      age: typeof editData.age === 'string' ? parseInt(editData.age) || null : editData.age,
      temperature: typeof editData.temperature === 'string' ? parseFloat(editData.temperature) || null : editData.temperature
    };
    dispatch(setMyProfile(profileData));
    setIsEditing(false);
  };

  const handleInputChange = (field: string, value: string | number) => {
    setEditData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Container>
      <HeaderSection>
        <HeaderTitle>마이 페이지</HeaderTitle>
      </HeaderSection>
      <ContentContanier>
        
      <MainContentCard>
        <ProfileImageContainer>
          {myProfile.imageUrl ? (
            <ProfileImage src={myProfile.imageUrl} alt="프로필 이미지" />
          ) : (
            <ProfileImagePlaceholder>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                <path d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="2"/>
              </svg>
            </ProfileImagePlaceholder>
          )}
        </ProfileImageContainer>
        <UserInfo>
          <UserBasicInfo>
            <UserName>{myProfile.name || '이름 없음'}</UserName>
            <UserAge>{myProfile.age ? `${myProfile.age}세` : '-'}</UserAge>
            <UserGender>{myProfile.gender || '-'}</UserGender>
          </UserBasicInfo>
          <UserEmail>email: {myProfile.name ? '1234567' : '1234567'}</UserEmail>
        </UserInfo>

        <ProfileInfoSection>
          <ProfileInfoItem>
            <InfoLabel>온도</InfoLabel>
            <InfoValue>{myProfile.temperature ? `${myProfile.temperature}°C` : '-'}</InfoValue>
          </ProfileInfoItem>
          
          <ProfileInfoItem>
            <InfoLabel>위치</InfoLabel>
            <InfoValue>{myProfile.baseLocation || '-'}</InfoValue>
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
        <BottomNav />
      </MainContentCard>

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
                <FormLabel>이름</FormLabel>
                <FormInput
                  type="text"
                  value={editData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  placeholder="이름을 입력하세요"
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
                <FormInput
                  type="text"
                  value={editData.gender}
                  onChange={(e) => handleInputChange('gender', e.target.value)}
                  placeholder="성별을 입력하세요"
                />
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
                <FormInput
                  type="text"
                  value={editData.baseLocation}
                  onChange={(e) => handleInputChange('baseLocation', e.target.value)}
                  placeholder="기본 위치를 입력하세요"
                />
              </FormField>
              
              <ButtonGroup>
                <CancelButton onClick={handleCancel}>취소</CancelButton>
                <SaveButton onClick={handleSave}>저장</SaveButton>
              </ButtonGroup>
            </ModalBody>
          </ModalContent>
        </Modal>
      )}
      </ContentContanier>
    </Container>
  );
};

export default My;