import React from 'react';
import StudyIcon from '@/assets/meeting_icons/study.svg?react';
import SportsIcon from '@/assets/meeting_icons/sport.svg?react';
import GameIcon from '@/assets/meeting_icons/game.svg?react';
import MukbangIcon from '@/assets/meeting_icons/mukbang.svg?react';
import MovieIcon from '@/assets/meeting_icons/movie.svg?react';
import DefaultIcon from '@/assets/meeting_icons/other.svg?react';

interface MeetingIconProps {
  category: string;
  className?: string;
}

const MeetingIcon: React.FC<MeetingIconProps> = ({ category, className }) => {
  const getIcon = () => {
    switch (category) {
      case 'STUDY':
        return <StudyIcon className={className} />;
      case 'SPORTS':
        return <SportsIcon className={className} />;
      case 'GAME':
        return <GameIcon className={className} />;
      case 'MUKBANG':
        return <MukbangIcon className={className} />;
      case 'MOVIE':
        return <MovieIcon className={className} />;
      default:
        return <DefaultIcon className={className} />;
    }
  };

  return getIcon();
};

export default MeetingIcon;
