import StudyIcon from '@/assets/meeting_icons/study.svg?react';
import SportsIcon from '@/assets/meeting_icons/sport.svg?react';
import GameIcon from '@/assets/meeting_icons/game.svg?react';
import MukbangIcon from '@/assets/meeting_icons/mukbang.svg?react';
import MovieIcon from '@/assets/meeting_icons/movie.svg?react';
import DefaultIcon from '@/assets/meeting_icons/other.svg?react';

const iconComponents = {
  STUDY: StudyIcon,
  SPORTS: SportsIcon,
  GAME: GameIcon,
  MUKBANG: MukbangIcon,
  MOVIE: MovieIcon,
};

const categoryMap: { [key: string]: MeetingCategory } = {
  스터디: 'STUDY',
  운동: 'SPORTS',
  게임: 'GAME',
  맛집탐방: 'MUKBANG',
  영화: 'MOVIE',
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
