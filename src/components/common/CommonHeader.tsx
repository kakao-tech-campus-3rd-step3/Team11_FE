import styled from 'styled-components';
import React from 'react';
import BackArrow from '@/assets/meeting_room_page/chevron_left.svg?react';

const HeaderContainer = styled.header`
  position: absolute;
  top: 0;
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 720px;
  height: 4rem;
  padding: 0 2rem;
  justify-content: flex-end;
  align-items: center;
  box-sizing: border-box;
  background-color: #fff;
  z-index: 10;
`;

const HeaderContent = styled.div`
  position: relative;
  width: 100%;
  height: 3rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 0.5px solid #e5e7eb;
`;

const BackButton = styled.button`
  all: unset;
  cursor: pointer;
  position: absolute;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Title = styled.h1`
  font-size: 1rem;
  font-weight: 600;
  line-height: 1.5rem;
  color: #374151;
  margin: 0;
`;

const RightContent = styled.div`
  position: absolute;
  right: 0;
  display: flex;
  align-items: center;
  height: 100%;
`;
const BACKARROW_SVG_SIZE = '32';
const MENU_SVG_SIZE = '25.6';
interface CommonHeaderProps {
  title: string;
  onBackButtonClick?: () => void;
  children?: React.ReactNode;
}

export const CommonHeader = ({ title, onBackButtonClick, children }: CommonHeaderProps) => {
  return (
    <HeaderContainer>
      <HeaderContent>
        {onBackButtonClick && (
          <BackButton onClick={onBackButtonClick}>
            <BackArrow width={BACKARROW_SVG_SIZE} height={MENU_SVG_SIZE} fill="#6b7280" />
          </BackButton>
        )}
        <Title>{title}</Title>
        {children && <RightContent>{children}</RightContent>}
      </HeaderContent>
    </HeaderContainer>
  );
};
