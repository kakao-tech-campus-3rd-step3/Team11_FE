import styled from 'styled-components';
import { colors } from '../../style/themes';

const RoomCreateButton = styled.button`
  position: absolute;
  bottom: 20px;
  right: 20px;
  z-index: 10;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  border: none;
  background-color: ${colors.primary400};
  color: #fff;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  font-size: 32px;
  line-height: 56px;
  cursor: pointer;
`;

export const RoomCreateButtonComponent = () => {
  return <RoomCreateButton>+</RoomCreateButton>;
};

export { RoomCreateButton };
