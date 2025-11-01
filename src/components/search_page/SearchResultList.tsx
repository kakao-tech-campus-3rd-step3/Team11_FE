import styled from '@emotion/styled';
import { colors } from '@/style/themes';
import type { Meeting } from '@/types/meeting';

const ListContainer = styled.div`
  width: 100%;
  padding: 0 5%;
  overflow-y: auto;
  flex: 1;
  box-sizing: border-box;
`;

const ResultItem = styled.div`
  padding: 16px;
  border-bottom: 1px solid ${colors.secondary200};
`;

const ItemTitle = styled.h4`
  margin: 0 0 4px 0;
  font-size: 1.1rem;
  font-weight: 600;
  color: ${colors.secondary900};
`;

const ItemInfo = styled.p`
  margin: 0;
  font-size: 0.9rem;
  color: ${colors.secondary600};
`;

interface Props {
  results: (Meeting & { location: string })[];
  onItemClick: (meeting: Meeting) => void;
}

export const SearchResultList = ({ results, onItemClick }: Props) => {
  if (results.length === 0) {
    return <ItemInfo>검색 결과가 없습니다.</ItemInfo>;
  }

  return (
    <ListContainer>
      {results.map((item) => (
        <ResultItem key={item.id} onClick={() => onItemClick(item)}>
          <ItemTitle>{item.title}</ItemTitle>
          <ItemInfo>
            📍 {item.location} | 🏷️ {item.category}
          </ItemInfo>
        </ResultItem>
      ))}
    </ListContainer>
  );
};
