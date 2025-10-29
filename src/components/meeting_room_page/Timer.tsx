import styled from '@emotion/styled';
import { useEffect, useState } from 'react';

interface TimerProps {
  startAt: string | undefined;
  isStarted: boolean;
}

const Container = styled.div`
  position: absolute;
  top: 12.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 720px;
  height: 3rem;
  font-size: 1rem;
  color: white;
  background-color: #ff8a8a;
`;

export const Timer = ({ startAt, isStarted }: TimerProps) => {
  const [remainingTime, setRemainingTime] = useState('');

  useEffect(() => {
    if (!startAt) return;

    const startTime = new Date(startAt).getTime();

    const updateRemainingTime = () => {
      const now = new Date().getTime();
      const diff = startTime - now;

      if (isStarted) {
        setRemainingTime('모임이 시작되었습니다!');
        return;
      }

      if (diff <= 0) {
        setRemainingTime('모집이 마감되었습니다.');
        return;
      }

      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      const formatted =
        hours > 0
          ? `모집 종료까지 ${hours}시간 ${minutes}분 ${seconds}초 남음`
          : minutes > 0
            ? `모집 종료까지 ${minutes}분 ${seconds}초 남음`
            : `모집 종료까지 ${seconds}초 남음`;

      setRemainingTime(formatted);
    };

    updateRemainingTime();
    const interval = setInterval(updateRemainingTime, 1000);
    return () => clearInterval(interval);
  }, [startAt, isStarted]);

  return <Container>{remainingTime}</Container>;
};
