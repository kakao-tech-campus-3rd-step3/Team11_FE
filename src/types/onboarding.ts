import type { MyProfileState } from '@/store/slices/myProfileSlice';

export interface OnboardingStepProps {
  data: MyProfileState;
  onNext: (data: Partial<MyProfileState>) => void;
  onPrev?: () => void;
  onComplete?: (data: Partial<MyProfileState>) => void;
}
