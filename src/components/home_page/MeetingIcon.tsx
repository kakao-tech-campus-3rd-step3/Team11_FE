import StudyIcon from '@/assets/meeting_icons/study.svg?react';
import SportsIcon from '@/assets/meeting_icons/sport.svg?react';
import GameIcon from '@/assets/meeting_icons/game.svg?react';
import MukbangIcon from '@/assets/meeting_icons/mukbang.svg?react';
import MovieIcon from '@/assets/meeting_icons/movie.svg?react';
import DefaultIcon from '@/assets/meeting_icons/other.svg?react';
import otakuIcon from '@/assets/meeting_icons/otaku.svg?react';
import travelIcon from '@/assets/meeting_icons/travel.svg?react';
const iconComponents = {
  STUDY: StudyIcon,
  SPORTS: SportsIcon,
  GAME: GameIcon,
  FOOD: MukbangIcon,
  CULTURE_ART: MovieIcon,
  OTHER: DefaultIcon,
  OTAKU: otakuIcon,
  TRAVEL: travelIcon,
};

const categoryMap: { [key: string]: MeetingCategory } = {
  스포츠: 'SPORTS',
  맛집탐방: 'FOOD',
  '문화/예술': 'CULTURE_ART',
  스터디: 'STUDY',
  여행: 'TRAVEL',
  게임: 'GAME',
  덕질: 'OTAKU',
  기타: 'OTHER',
};

export type MeetingCategory = keyof typeof iconComponents;

interface MeetingIconProps {
  category: string;
  className?: string;
}

const MeetingIcon = ({ category, className }: MeetingIconProps) => {
  const directKey = category.trim().toUpperCase() as MeetingCategory;

  const mappedKey = categoryMap[category.trim()];

  let IconComponent = iconComponents[directKey];

  if (!IconComponent) {
    IconComponent = iconComponents[mappedKey];
  }

  if (!IconComponent) {
    IconComponent = DefaultIcon;
  }

  return <IconComponent className={className} />;
};

export default MeetingIcon;
