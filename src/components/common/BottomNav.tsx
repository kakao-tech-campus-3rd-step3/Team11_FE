import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import {
  IoLocationOutline,
  IoMailOutline,
  IoAddCircleOutline,
  IoPersonOutline,
} from 'react-icons/io5';
import { colors } from '@/style/themes';
import { useEffect, useState } from 'react';
import { getMyJoinedMeetup } from '@/api/services/meetup_room.service';

const NavContainer = styled.nav`
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  max-width: 720px;
  height: 60px;
  padding-bottom: 5px;
  background-color: #ffffff;
  border-top: 1px solid #e0e0e0;
  display: flex;
  justify-content: space-around;
  align-items: center;
  z-index: 1000;
`;

const NavButton = styled.button<{ $isActive: boolean }>`
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 26px;
  color: ${(props) => (props.$isActive ? colors.primary400 : '#8e8e8e')};
  transition: color 0.2s ease-in-out;

  &:hover {
    color: ${colors.primary400};
  }
`;

const BottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [userIsInGroup, setUserIsInGroup] = useState(false);

  const handleChatClick = () => {
    if (userIsInGroup) {
      navigate('/meeting-room');
    } else {
      alert('속한 모임이 없습니다.');
    }
  };

  const handleCreateRoomClick = () => {
    if (userIsInGroup) {
      alert('이미 모임에 소속되어 있습니다.');
    } else {
      navigate('/create-room');
    }
  };

  useEffect(() => {
    const checkUserGroupStatus = async () => {
      try {
        const response = await getMyJoinedMeetup();
        setUserIsInGroup(!!response);
      } catch (error) {
        setUserIsInGroup(false);
      }
    };
    checkUserGroupStatus();
  });

  return (
    <NavContainer>
      <NavButton $isActive={location.pathname === '/home'} onClick={() => navigate('/home')}>
        <IoLocationOutline />
      </NavButton>
      <NavButton $isActive={location.pathname === '/meeting-room'} onClick={handleChatClick}>
        <IoMailOutline />
      </NavButton>
      <NavButton $isActive={location.pathname === '/create-room'} onClick={handleCreateRoomClick}>
        <IoAddCircleOutline />
      </NavButton>
      <NavButton $isActive={location.pathname === '/my'} onClick={() => navigate('/my')}>
        <IoPersonOutline />
      </NavButton>
    </NavContainer>
  );
};

export default BottomNav;
