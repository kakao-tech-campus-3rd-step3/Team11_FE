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

type Category = keyof typeof iconComponents;

interface MeetingIconProps {
  category: Category;
  className?: string;
}

const MeetingIcon = ({ category, className }: MeetingIconProps) => {
  const IconComponent = iconComponents[category] || DefaultIcon;

  return <IconComponent className={className} />;
};

export default MeetingIcon;
