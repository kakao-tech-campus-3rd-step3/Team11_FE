import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { colors } from '@/style/themes';
import { CreateHeader } from '@/components/room_create_page.tsx/CreateHeader';

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

const StyledInput = styled.input`
  width: 100%;
  padding: 12px;
  font-size: 1rem;
  border: 1px solid ${colors.secondary200};
  border-radius: 8px;
  box-sizing: border-box;

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
  padding-right: 40px;
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
`;

const RoomCreate = () => {
  const [formState, setFormState] = useState({
    name: '',
    hobby: 'futsal',
    time: '',
    hashtag: '',
    capacity: '',
    minTemp: '',
  });
  const [isClosing, setIsClosing] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleBackButtonClick = () => {
    setIsClosing(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form Data:', formState);
    alert('방 만들기 요청!');
  };

  useEffect(() => {
    if (isClosing) {
      const timer = setTimeout(() => {
        navigate(-1);
      }, 400);
      return () => clearTimeout(timer);
    }
  }, [isClosing, navigate]);

  return (
    <PageContainer $closing={isClosing}>
      <CreateHeader onBackButtonClick={handleBackButtonClick} />
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
