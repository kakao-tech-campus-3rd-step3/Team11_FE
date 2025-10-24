export const categoryMap: Record<string, string> = {
  스포츠: 'SPORTS',
  식사: 'FOOD',
  '문화/예술': 'CULTURE_ARTS',
  스터디: 'STUDY',
  여행: 'TRAVEL',
  게임: 'GAME',
  덕질: 'OTAKU',
};

export function categoryMapper(category: string): string {
  return categoryMap[category] ?? 'OTHER';
}
