export const categoryMap: Record<string, string> = {
  스포츠: 'SPORTS',
  맛집탐방: 'FOOD',
  ' 문화/예술': 'CULTUR_ART',
  스터디: 'STUDY',
  여행: 'TRAVEL',
  게임: 'GAME',
  덕질: 'OTAKU',
  기타: 'OTHER',
};

export function categoryMapper(category: string): string {
  return categoryMap[category] ?? 'OTHER';
}
