import React, { useState } from 'react';
import styled from 'styled-components';
import { colors } from '@/style/themes';

const PageContainer = styled.div`
  width: 100%;
  max-width: 720px;
  height: 100vh;
  margin: 0 auto; /* 중앙 정렬 */
  display: flex;
  flex-direction: column;
  background-color: #f0f0f0; /* 스크린샷의 연한 회색 배경 */
`;

const AppBar = styled.header`
  display: flex;
  align-items: center;
  padding: 12px 16px;
  background-color: #ffffff;
  flex-shrink: 0; /* 내용이 많아져도 줄어들지 않음 */
  border-bottom: 1px solid ${colors.secondary200};
`;

const BackButton = styled.button`
  background: none;
  border: none;
  padding: 8px;
  margin-right: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Title = styled.h1`
  font-size: 1.25rem; /* 20px */
  font-weight: 600;
  margin: 0;
`;

const FormContainer = styled.form`
  flex: 1; /* 남은 공간을 모두 차지 */
  background-color: #ffffff;
  padding: 24px 16px;
  overflow-y: auto; /* 내용이 길어지면 스크롤 */
`;

const InputGroup = styled.div`
  margin-bottom: 24px;
`;

const Label = styled.label`
  display: block;
  font-size: 0.875rem; /* 14px */
  font-weight: 500;
  color: #555;
  margin-bottom: 8px;
`;

const StyledInput = styled.input`
  width: 100%;
  padding: 12px;
  font-size: 1rem;
  border: 1px solid ${colors.secondary200};
  border-radius: 8px;
  box-sizing: border-box; /* 패딩과 테두리가 너비에 포함되도록 설정 */

  &::placeholder {
    color: ${colors.secondary300};
  }

  &:focus {
    outline: none;
    border-color: ${colors.primary400};
  }
`;

const StyledSelect = styled(StyledInput).attrs({ as: 'select' })`
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%239CA3AF' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 12px center;
  padding-right: 40px; /* 화살표 아이콘 공간 확보 */
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
`;

const LocationButton = styled.button`
  width: 100%;
  padding: 12px;
  font-size: 1rem;
  border: 1px solid ${colors.secondary200};
  border-radius: 8px;
  background-color: #f9f9f9;
  color: #888;
  display: flex;
  align-items: center;
  justify-content: space-between;
  text-align: left;
  cursor: pointer;
`;

// --- 만들기 버튼 ---
const SubmitButton = styled.button`
  width: 100%;
  padding: 16px;
  font-size: 1.125rem; /* 18px */
  font-weight: 600;
  color: #ffffff;
  background-color: ${colors.primary400};
  border: none;
  border-radius: 12px;
  cursor: pointer;
  margin-top: 16px;
`;

const RoomCreate = () => {
  const [formState, setFormState] = useState({
    name: '',
    hobby: 'futsal', // 기본값 '풋살'
    time: '',
    hashtag: '',
    capacity: '',
    minTemp: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form Data:', formState);
    alert('방 만들기 요청!');
  };

  return (
    <PageContainer>
      <AppBar>
        <BackButton onClick={() => window.history.back()}>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M15.41 7.41L14 6L8 12L14 18L15.41 16.59L10.83 12L15.41 7.41Z" fill="#333" />
          </svg>
        </BackButton>
        <Title>방 생성</Title>
      </AppBar>
      <FormContainer onSubmit={handleSubmit}>
        <InputGroup>
          <Label htmlFor="name">이름</Label>
          <StyledInput
            id="name"
            name="name"
            type="text"
            value={formState.name}
            onChange={handleChange}
          />
        </InputGroup>

        <Grid>
          <InputGroup>
            <Label htmlFor="hobby">취미</Label>
            <StyledSelect id="hobby" name="hobby" value={formState.hobby} onChange={handleChange}>
              <option value="futsal">풋살</option>
              <option value="soccer">축구</option>
              <option value="basketball">농구</option>
            </StyledSelect>
          </InputGroup>
          <InputGroup>
            <Label htmlFor="time">시작 - 종료 시간</Label>
            <StyledInput
              id="time"
              name="time"
              type="text"
              placeholder="00:00 ~ 24:00"
              value={formState.time}
              onChange={handleChange}
            />
          </InputGroup>
        </Grid>

        <Grid>
          <InputGroup>
            <Label htmlFor="hashtag">해시태그</Label>
            <StyledInput
              id="hashtag"
              name="hashtag"
              type="text"
              value={formState.hashtag}
              onChange={handleChange}
            />
          </InputGroup>
          <InputGroup>
            <Label htmlFor="capacity">모임 정원</Label>
            <StyledInput
              id="capacity"
              name="capacity"
              type="text"
              value={formState.capacity}
              onChange={handleChange}
            />
          </InputGroup>
        </Grid>

        <Grid>
          <InputGroup>
            <Label htmlFor="minTemp">입장 최저 온도</Label>
            <StyledInput
              id="minTemp"
              name="minTemp"
              type="text"
              value={formState.minTemp}
              onChange={handleChange}
            />
          </InputGroup>
          <InputGroup>
            <Label>위치설정</Label>
            <LocationButton type="button">
              위치설정
              <img
                src="https://i.ibb.co/L8f11q1/image.png"
                alt="location pin"
                style={{ width: '20px', height: '20px' }}
              />
            </LocationButton>
          </InputGroup>
        </Grid>

        <SubmitButton type="submit">만들기</SubmitButton>
      </FormContainer>
    </PageContainer>
  );
};

export default RoomCreate;
