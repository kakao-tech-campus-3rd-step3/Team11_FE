import React from 'react';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import { colors } from '@/style/themes';

const RoomCreateLink = styled(Link)`
  position: absolute;
  bottom: 20px;
  right: 20px;
  z-index: 1000;
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
  display: inline-flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
`;

type Props = React.ComponentProps<typeof Link> & {
  onAction?: () => void;
};

export const RoomCreate: React.FC<Props> = ({
  to = '/create-room',
  onClick,
  onAction,
  ...rest
}) => {
  const handleClick: React.MouseEventHandler<HTMLAnchorElement> = (e) => {
    onClick?.(e);
    if (e.defaultPrevented) return;
    onAction?.();
    try {
      (navigator as any).vibrate?.(10);
    } catch {}
  };

  return (
    <RoomCreateLink to={to} aria-label="방 생성" onClick={handleClick} {...rest}>
      +
    </RoomCreateLink>
  );
};

export const RoomCreateButton = RoomCreate;
