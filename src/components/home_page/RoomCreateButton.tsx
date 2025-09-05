import React from 'react';
import styled from '@emotion/styled';
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
export const RoomCreate = (props: React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  return <RoomCreateButton {...props}>+</RoomCreateButton>;
};
export { RoomCreateButton };
