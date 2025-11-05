import React, { useCallback, useEffect, useMemo } from 'react';
import styled, { keyframes } from 'styled-components';
import { useNavigate, Link, useParams, useLocation } from 'react-router-dom';
import { useCreateForm } from '@/hooks/useCreateForm';
import { useBoolean } from '@/hooks/useBoolean';
import { CommonHeader } from '@/components/common/CommonHeader';
import { HobbySelector } from '@/components/room_create_page.tsx/HobbySelector';
import { HashtagInput } from '@/components/room_create_page.tsx/HashtagInput';
import { StyledInput } from '@/components/room_create_page.tsx/StyledComponents';
import { TimePicker } from '@/components/room_create_page.tsx/TimePicker';
import { colors } from '@/style/themes';
import { createMeetUp, getMyJoinedMeetup, updateMeetUp } from '@/api/services/meetup_room.service';
import { categoryMapper } from '@/utils/categoryMapper';
import { hashtagParser } from '@/utils/hashtagParser';
import { toast } from 'react-toastify';

const slideUp = keyframes`
  from { transform: translateY(100%); }
  to { transform: translateY(0%); }
`;

const slideDown = keyframes`
  from { transform: translateY(0%); }
  to { transform: translateY(100%); }
`;

const PageContainer = styled.div<{ $closing?: boolean }>`
  width: 100%;
  max-width: 720px;
  height: 100vh;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  background-color: #f0f0f0;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 100;
  animation: ${({ $closing }) => ($closing ? slideDown : slideUp)} 0.4s ease-out forwards;
`;

const FormContainer = styled.form`
  flex: 1;
  background-color: #ffffff;
  padding: 24px 16px;
  overflow-y: auto;
  padding-top: 7rem;
`;

const InputGroup = styled.div`
  margin-bottom: 24px;
`;

const Label = styled.label`
  display: block;
  font-size: 0.875rem;
  font-weight: 500;
  color: #555;
  margin-bottom: 8px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;

  @media (max-width: 420px) {
    grid-template-columns: 1fr;
  }
`;

const LocationButton = styled(Link)`
  width: 100%;
  padding: 12px;
  font-size: 1rem;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  background-color: #f9fafb;
  color: #333;
  display: flex;
  align-items: center;
  justify-content: space-between;
  text-align: left;
  cursor: pointer;
  box-sizing: border-box;
  text-decoration: none;
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 16px;
  font-size: 1.125rem;
  font-weight: 600;
  color: #ffffff;
  background-color: ${colors.primary400};
  border: none;
  border-radius: 12px;
  cursor: pointer;
  margin-top: 16px;
  transition: background-color 0.2s;

  &:disabled {
    background-color: ${colors.secondary300};
    cursor: not-allowed;
  }
`;

// HobbySelector.tsx의 리스트와 동일해야 합니다.
const hobbyCategoriesList = [
  '스포츠',
  '식사',
  '문화예술',
  '스터디',
  '여행',
  '게임',
  '덕질',
  '기타',
];

const RoomCreate = () => {
  const { update } = useParams<{ update?: string }>();
  const location = useLocation();
  const { formState, setFormState, hashtags, setHashtags, handleChange, timeError, isFormValid } =
    useCreateForm();

  const [isClosing, { on: startClosing }] = useBoolean(false);
  const navigate = useNavigate();

  // API 값(영어)을 표시 값(한글)으로 변환하기 위한 역방향 맵 생성
  const reverseCategoryMap = useMemo(() => {
    const map = new Map<string, string>();
    hobbyCategoriesList.forEach((category) => {
      map.set(categoryMapper(category), category);
    });
    return map;
  }, []);

  const handleBackButtonClick = () => {
    startClosing();
  };

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (!isFormValid) return;

      const finalFormState = {
        name: formState.name,
        category: categoryMapper(formState.category),
        description: '',
        hashTags: hashtagParser(hashtags),
        capacity: Number(formState.capacity),
        scoreLimit: Number(formState.scoreLimit),
        startAt: formState.startTime,
        endAt: formState.endTime,
        location: {
          latitude: formState.location!.lat,
          longitude: formState.location!.lng,
          address: formState.location!.name,
        },
      };

      console.log('최종 폼 데이터:', finalFormState);

      try {
        if (!update) {
          const response = await createMeetUp(finalFormState);
          console.log('방 생성 성공:', response);
          toast.success('모임방이 성공적으로 생성되었습니다!');
        } else {
          const response = await updateMeetUp(finalFormState);
          console.log('방 수정 성공:', response);
          toast.success('모임방이 성공적으로 수정되었습니다!');
        }
        navigate('/meeting-room');
      } catch (error: any) {
        console.error(error);
        toast.error(error.message);
      }
    },
    [update, formState, hashtags, isFormValid, navigate],
  );

  useEffect(() => {
    // 수정 모드이고, 위치 선택 등에서 돌아온 상태가 아닐 때 (formValues가 없을 때)
    if (update && !location.state?.formValues) {
      const getPrevInfo = async () => {
        const response = await getMyJoinedMeetup();

        // API 응답(영어)을 selector 표시 값(한글)으로 변환
        const displayCategory = reverseCategoryMap.get(response.category) || '';

        setFormState({
          name: response.name,
          category: displayCategory, // <-- 카테고리 문제 수정
          capacity: response.capacity.toString(),
          scoreLimit: response.scoreLimit.toString(),
          startTime: response.startAt,
          endTime: response.endAt,
          location: {
            name: response.location.address!,
            lat: response.location.latitude!,
            lng: response.location.longitude!,
          },
        });

        // --- 해시태그 문제 수정 ---
        // API 응답 (e.g., ['게임', '스터디'])을
        // Input 형식 (e.g., ['#게임', '#스터디'])으로 변환
        if (response.hashTags && Array.isArray(response.hashTags)) {
          const formattedHashtags = response.hashTags.map((tag: string) => `#${tag}`);
          setHashtags(formattedHashtags);
        }
      };

      getPrevInfo();
    }
    // 의존성 배열에 setHashtags와 reverseCategoryMap 추가
  }, [update, location.state?.formValues, setFormState, setHashtags, reverseCategoryMap]);

  useEffect(() => {
    if (isClosing) {
      const timer = setTimeout(() => {
        navigate('/home');
      }, 400);
      return () => clearTimeout(timer);
    }
  }, [isClosing, navigate]);

  return (
    <PageContainer $closing={isClosing}>
      <CommonHeader
        title={update ? '모임 수정하기' : '모임 만들기'}
        onBackButtonClick={handleBackButtonClick}
      />
      <FormContainer onSubmit={handleSubmit}>
        <InputGroup>
          <Label htmlFor="name">모임 이름</Label>
          <StyledInput
            id="name"
            name="name"
            type="text"
            value={formState.name}
            onChange={handleChange}
            placeholder="모임 이름을 입력하세요"
          />
        </InputGroup>

        <InputGroup>
          <Label htmlFor="category">카테고리</Label>
          <HobbySelector value={formState.category} onChange={handleChange} />
        </InputGroup>

        <InputGroup>
          <TimePicker
            startTime={formState.startTime}
            endTime={formState.endTime}
            onChange={handleChange}
            error={timeError}
          />
        </InputGroup>

        <InputGroup>
          <Label>해시태그</Label>
          <HashtagInput hashtags={hashtags} onChangeHashtags={setHashtags} />
        </InputGroup>

        <Grid>
          <InputGroup>
            <Label htmlFor="capacity">모임 정원</Label>
            <StyledInput
              id="capacity"
              name="capacity"
              type="number"
              value={formState.capacity}
              onChange={handleChange}
              placeholder="숫자만 입력"
            />
          </InputGroup>
          <InputGroup>
            <Label htmlFor="scoreLimit">입장 최소 매너 점수</Label>
            <StyledInput
              id="scoreLimit"
              name="scoreLimit"
              type="number"
              value={formState.scoreLimit}
              onChange={handleChange}
              placeholder="숫자만 입력"
            />
          </InputGroup>
        </Grid>

        <InputGroup>
          <Label>위치 설정</Label>
          <LocationButton
            to="/create-room/location"
            state={{
              prevPath: location.pathname,
              formValues: formState,
              hashtags: hashtags,
              currentLocation: formState.location,
            }}
          >
            <span>{formState.location ? formState.location.name : '위치를 설정해주세요'}</span>
            <span>{formState.location ? '✅' : '>'}</span>
          </LocationButton>
        </InputGroup>

        <SubmitButton type="submit" disabled={!isFormValid}>
          {update ? '수정하기' : '만들기'}
        </SubmitButton>
      </FormContainer>
    </PageContainer>
  );
};

export default RoomCreate;
