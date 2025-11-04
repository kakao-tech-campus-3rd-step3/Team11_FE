import { useState, useEffect } from 'react';
import { getMyProfile } from '@/api/services/profile.service';
import type { MyProfileState } from '@/store/slices/myProfileSlice';

export const useMyProfile = () => {
  const [myProfile, setMyProfile] = useState<MyProfileState | null>(null);
  const [isLoadingProfile, setIsLoadingProfile] = useState(true);
  const [profileError, setProfileError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setIsLoadingProfile(true);
        const profileData = await getMyProfile();
        setMyProfile(profileData);
      } catch (err: any) {
        setProfileError(err.message || '프로필을 불러오는데 실패했습니다.');
      } finally {
        setIsLoadingProfile(false);
      }
    };

    fetchProfile();
  }, []);

  return { myProfile, isLoadingProfile, profileError };
};
