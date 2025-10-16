import { useState, useMemo } from 'react';
import { useLocation } from 'react-router-dom';

export interface LocationData {
  name: string;
  lat: number;
  lng: number;
}

export interface FormState {
  name: string;
  category: string;
  startTime: string;
  endTime: string;
  capacity: string;
  scoreLimit: string;
  location: LocationData | null;
}

const ONE_DAY_IN_MILLISECONDS = 24 * 60 * 60 * 1000;

const validateTime = (startTime: string, endTime: string): string | null => {
  if (!startTime || !endTime) return null;

  const now = new Date();
  const start = new Date(startTime);
  const end = new Date(endTime);
  const in24Hours = new Date(now.getTime() + ONE_DAY_IN_MILLISECONDS);

  if (start <= now) return '시작 시간은 현재 시간 이후여야 합니다.';
  if (start > in24Hours) return '모임은 24시간 이내에 시작해야 합니다.';
  if (end <= start) return '종료 시간은 시작 시간 이후여야 합니다.';

  const duration = end.getTime() - start.getTime();
  if (duration > ONE_DAY_IN_MILLISECONDS) return '총 모임 시간은 24시간을 넘을 수 없습니다.';

  return null;
};

export const useCreateForm = () => {
  const location = useLocation();

  const [formState, setFormState] = useState<FormState>(() => {
    const initialState = location.state?.formValues || {
      name: '',
      category: '',
      startTime: '',
      endTime: '',
      capacity: '',
      scoreLimit: '',
      location: null,
    };

    if (location.state?.selectedLocation) {
      initialState.location = location.state.selectedLocation;
    }

    return initialState;
  });

  const [hashtags, setHashtags] = useState<string[]>(() => {
    return location.state?.hashtags || [];
  });

  const timeError = useMemo(
    () => validateTime(formState.startTime, formState.endTime),
    [formState.startTime, formState.endTime],
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const isFormValid = useMemo(() => {
    return (
      formState.name.trim() !== '' &&
      formState.category.trim() !== '' &&
      formState.capacity.trim() !== '' &&
      formState.scoreLimit.trim() !== '' &&
      formState.startTime !== '' &&
      formState.endTime !== '' &&
      !timeError &&
      formState.location !== null
    );
  }, [formState, timeError]);

  return {
    formState,
    setFormState,
    hashtags,
    setHashtags,
    handleChange,
    timeError,
    isFormValid,
  };
};
