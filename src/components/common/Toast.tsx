import { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';

interface ToastProps {
  message: string;
  duration?: number;
  onClose?: () => void;
  type?: 'error' | 'success' | 'info';
}

const slideDown = keyframes`
  from {
    opacity: 0;
    transform: translateX(-50%) translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateX(-50%) translateY(0);
  }
`;

const ToastContainer = styled.div`
  position: absolute;
  top: 130px;
  left: 50%;
  transform: translateX(-50%);
  background-color: rgba(0, 0, 0, 0.75);
  color: white;
  padding: 10px 20px;
  border-radius: 20px;
  z-index: 105;
  font-size: 14px;
  text-align: center;
  max-width: calc(100% - 40px);
  animation: ${slideDown} 0.3s ease-out;
  word-break: keep-all;
`;

export const Toast = ({ message, duration = 3000, onClose }: ToastProps) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(() => onClose?.(), 300); // 애니메이션 완료 대기
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return visible ? <ToastContainer>{message}</ToastContainer> : null;
};

