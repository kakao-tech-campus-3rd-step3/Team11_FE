import styled from '@emotion/styled';
import BackArrow from '@/assets/meeting_room_page/chevron_left.svg?react';
import Menu from '@/assets/meeting_room_page/menu.svg?react';

const HeaderContainer = styled.div`
  position: absolute;
  top: 0;
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 720px;
  height: 6rem;
  padding-left: 2rem;
  padding-right: 2rem;
  justify-content: flex-end;
  align-items: center;
  box-sizing: border-box;
`;

const HeaderContent = styled.div`
  position: relative;
  width: 100%;
  height: 3rem;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid black;
`;

const RoomTitle = styled.div`
  position: absolute;
  top: 1.1rem;
  font-size: 1rem;
  font-weight: 500;
`;

const BACKARROW_SVG_SIZE = '2rem';
const MENU_SVG_SIZE = '1.6rem';

export const Header = () => {
  return (
    <HeaderContainer>
      <HeaderContent>
        <BackArrow
          width={BACKARROW_SVG_SIZE}
          height={BACKARROW_SVG_SIZE}
          style={{ position: 'absolute', left: 0 }}
        />
        <RoomTitle>축구할 사람 구해요~</RoomTitle>
        <Menu
          width={MENU_SVG_SIZE}
          height={MENU_SVG_SIZE}
          style={{ position: 'absolute', right: 0, top: '0.85rem' }}
        />
      </HeaderContent>
    </HeaderContainer>
  );
};
