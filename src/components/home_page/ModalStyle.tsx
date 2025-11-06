import styled from '@emotion/styled';
import { colors } from '@/style/themes';

export const ModalBackdrop = styled.div<{ $isVisible: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1100;
  opacity: ${({ $isVisible }) => ($isVisible ? 1 : 0)};
  transition: opacity 0.3s ease-in-out;
`;

export const ModalContainer = styled.div<{ $isVisible: boolean }>`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  margin: 0 auto;
  width: 100%;
  max-width: 720px;
  /* max-height: 80vh; */
  height: 435px;
  background-color: white;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  box-shadow: 0px -2px 10px rgba(0, 0, 0, 0.1);
  z-index: 1111;
  display: flex;
  flex-direction: column;
  transform: translateY(${({ $isVisible }) => ($isVisible ? '0%' : '100%')});
  transition: transform 0.3s ease-in-out;
`;

export const Handle = styled.div`
  width: 40px;
  height: 4px;
  background-color: ${colors.secondary300};
  border-radius: 2px;
  margin: 10px auto;
`;

export const Content = styled.div`
  padding: 0 24px 24px;
  overflow-y: auto;
  flex: 1;
  min-height: 0;
`;

export const Title = styled.h2`
  font-size: 1.6rem;
  font-weight: bold;
  margin-bottom: 8px;
`;

export const Category = styled.p`
  font-size: 0.9rem;
  color: ${colors.secondary500};
  font-weight: 500;
  margin-bottom: 16px;
`;

export const HashtagContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 24px;
`;

export const Hashtag = styled.span`
  background-color: ${colors.secondary100};
  color: ${colors.secondary600};
  padding: 6px 12px;
  border-radius: 16px;
  font-size: 0.85rem;
  font-weight: 500;
`;

export const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin-bottom: 24px;
`;

export const InfoItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const InfoLabel = styled.span`
  font-size: 0.8rem;
  color: ${colors.secondary400};
`;

export const InfoValue = styled.span`
  font-size: 1rem;
  font-weight: 600;
  color: ${colors.secondary700};
`;

export const EnterButton = styled.button`
  width: 100%;
  padding: 16px;
  font-size: 1.125rem;
  font-weight: 600;
  color: #ffffff;
  background-color: ${colors.primary400};
  border: none;
  border-radius: 12px;
  cursor: pointer;
  margin-top: 16px;
  transition: background-color 0.2s;

  &:hover {
    background-color: ${colors.primary500};
  }
`;
