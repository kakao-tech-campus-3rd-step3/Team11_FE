import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';
import { blockUser } from '@/api/services/block.service';
import { toast } from 'react-toastify';
import { kickUser } from '@/api/services/meetup_room.service';
import type { ParticipantDTO } from '@/api/types/meeting_room.dto';
import ReportModal from '../user_profile/ReportModal';

interface ProfileOptionsProps {
  myId: number | null;
  isHost: boolean;
  position: { x: number; y: number };
  onClose: () => void;
  meetUpId: string;
  target: ParticipantDTO;
}

const ProfileOptionsContainer = styled.div`
  position: absolute;
  background: white;
  border: 0.5px solid #e5e7eb;
  border-radius: 0.75rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  padding: 0.5rem;
  z-index: 100;
`;

const Option = styled.div`
  padding: 0.5rem 0.75rem;
  font-size: 0.85rem;
  color: #374151;
  cursor: pointer;
  border-radius: 0.5rem;
  transition: background-color 0.2s ease;
  
  &:hover {
    background-color: #f3f4f6;
  }
`;

export const ProfileOptions = ({
  myId,
  isHost,
  position,
  onClose,
  meetUpId,
  target,
}: ProfileOptionsProps) => {
  const popoverRef = useRef<HTMLDivElement>(null);
  const [isReportOpen, setIsReportOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (popoverRef.current && !popoverRef.current.contains(e.target as Node)) {
        if (isReportOpen) return;
        onClose();
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, [onClose, isReportOpen]);

  const handleViewProfile = () => {
    if (myId !== target.id) navigate(`/user/${target.profile.id}`);
    else navigate('/my');
    onClose();
  };

  const handleBlock = async () => {
    if (!target.profile.id) return;

    try {
      await blockUser(target.profile.id);
      toast.info('해당 사용자를 차단했습니다.');
    } catch (error: any) {
      toast.info(
        <>
          {error.message}
          <br />
          차단 해제: 나의 프로필 → 차단 목록
        </>,
      );
      console.error(error);
    }
    onClose();
  };

  const handleReport = () => {
    setIsReportOpen(true);
  };

  const handleKick = async () => {
    try {
      await kickUser(meetUpId, target.id);
    } catch (error) {
      console.error(error);
    }
    onClose();
  };

  return (
    <>
      {createPortal(
        <ProfileOptionsContainer ref={popoverRef} style={{ top: position.y, left: position.x }}>
          <Option onClick={handleViewProfile}>프로필 보기</Option>
          {myId !== target.id && (
            <>
              <Option onClick={handleBlock}>차단</Option>
              <Option onClick={handleReport}>신고</Option>
              {isHost && <Option onClick={handleKick}>강퇴</Option>}
            </>
          )}
        </ProfileOptionsContainer>,
        document.body,
      )}
      {isReportOpen && target.profile.id && (
        <ReportModal
          isOpen={isReportOpen}
          onClose={() => setIsReportOpen(false)}
          targetProfileId={target.profile.id}
          onSuccess={() => {
            toast.success('신고가 접수되었습니다.');
          }}
        />
      )}
    </>
  );
};
