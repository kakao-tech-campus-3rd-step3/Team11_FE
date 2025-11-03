import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';

interface ProfileOptionsProps {
  position: { x: number; y: number };
  onClose: () => void;
  targetId: string | undefined;
}

const ProfileOptionsContainer = styled.div`
  position: absolute;
  background: white;
  border: 1px solid #ddd;
  border-radius: 0.5rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  padding: 0.5rem;
  z-index: 100;
`;

const Option = styled.div`
  padding: 0.3rem 0.6rem;
  font-size: 0.8rem;
  cursor: pointer;
  &:hover {
    background-color: #f3f3f3;
  }
`;

export const ProfileOptions = ({ position, onClose, targetId }: ProfileOptionsProps) => {
  const popoverRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (popoverRef.current && !popoverRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, [onClose]);

  const handleViewProfile = () => {
    navigate(`/user/${targetId}`);
    onClose();
  };

  const handleBlock = () => {
    console.log('차단:', targetId);
    onClose();
  };

  const handleReport = () => {
    console.log('신고:', targetId);
    onClose();
  };

  const handleKick = () => {
    console.log('강퇴:', targetId);
    onClose();
  };

  return createPortal(
    <ProfileOptionsContainer ref={popoverRef} style={{ top: position.y, left: position.x }}>
      <Option onClick={handleViewProfile}>프로필 보기</Option>
      <Option onClick={handleBlock}>차단</Option>
      <Option onClick={handleReport}>신고</Option>
      <Option onClick={handleKick}>강퇴</Option>
    </ProfileOptionsContainer>,
    document.body,
  );
};
