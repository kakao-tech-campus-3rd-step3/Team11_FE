// src/components/search_page/SearchResultList.tsx
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
  margin: 0 0 8px 0;
  font-size: 0.9rem;
  color: ${colors.secondary600};
`;

const HashtagContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-bottom: 8px;
`;

const ItemHashtag = styled.span`
  background-color: ${colors.secondary100};
  color: ${colors.secondary700};
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 0.8rem;
`;

const ItemDetails = styled.p`
  margin: 0;
  font-size: 0.85rem;
  color: ${colors.secondary500};
`;

const NoResultsInfo = styled(ItemInfo)`
  text-align: center;
  margin-top: 2rem;
`;

// `Meeting` 타입에 hashtags, capacity 등이 포함되어 있다고 가정합니다.
interface Props {
  results: (Meeting & {
    location: string;
    hashtags?: string[];
    capacity?: number;
    participantCount?: number;
    scoreLimit?: number;
  })[];
  onItemClick: (meeting: Meeting) => void;
  className?: string;
}

export const SearchResultList = ({ results, onItemClick, className }: Props) => {
  if (results.length === 0) {
    return <NoResultsInfo>검색 결과가 없습니다.</NoResultsInfo>;
  }

  return (
    <ListContainer className={className}>
      {results.map((item) => (
        <ResultItem key={item.id} onClick={() => onItemClick(item)}>
          <ItemTitle>{item.title}</ItemTitle>
          <ItemInfo>
            📍 {item.location} | 🏷️ {item.category}
          </ItemInfo>

          {Array.isArray(item.hashtags) && item.hashtags.length > 0 && (
            <HashtagContainer>
              {item.hashtags.map((tag) => (
                <ItemHashtag key={tag}>#{tag}</ItemHashtag>
              ))}
            </HashtagContainer>
          )}

          <ItemDetails>
            {typeof item.capacity === 'number' && (
              <span>
                👤 {item.participantCount ?? 0} / {item.capacity}
              </span>
            )}
            {typeof item.scoreLimit === 'number' && item.scoreLimit > 0 && (
              <span style={{ marginLeft: '12px' }}>✨ {item.scoreLimit}점 이상</span>
            )}
          </ItemDetails>
        </ResultItem>
      ))}
    </ListContainer>
  );
};
