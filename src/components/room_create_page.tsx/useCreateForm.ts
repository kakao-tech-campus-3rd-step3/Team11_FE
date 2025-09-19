import { useState, useMemo, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export interface LocationData {
  name: string;
  lat: number;
  lng: number;
}

export interface FormState {
  name: string;
  hobby: string;
  startTime: string;
  endTime: string;
  capacity: string;
  minTemp: string;
  location: LocationData | null;
}

const validateTime = (startTime: string, endTime: string): string | null => {
  if (!startTime || !endTime) return null;

  const now = new Date();
  const start = new Date(startTime);
  const end = new Date(endTime);
  const in24Hours = new Date(now.getTime() + 24 * 60 * 60 * 1000);

  if (start <= now) return '시작 시간은 현재 시간 이후여야 합니다.';
  if (start > in24Hours) return '모임은 24시간 이내에 시작해야 합니다.';
  if (end <= start) return '종료 시간은 시작 시간 이후여야 합니다.';

  const duration = end.getTime() - start.getTime();
  if (duration > 24 * 60 * 60 * 1000) return '총 모임 시간은 24시간을 넘을 수 없습니다.';

  return null;
};

export const useCreateForm = () => {
  const [formState, setFormState] = useState<FormState>({
    name: '',
    hobby: '풋살',
    startTime: '',
    endTime: '',
    capacity: '',
    minTemp: '',
    location: null,
  });

  const [hashtags, setHashtags] = useState<string[]>([]);

  const [timeError, setTimeError] = useState<string | null>(null);

  const location = useLocation();

  useEffect(() => {
    if (location.state?.selectedLocation) {
      setFormState((prevState) => ({
        ...prevState,
        location: location.state.selectedLocation,
      }));
    }
  }, [location.state]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  useEffect(() => {
    const error = validateTime(formState.startTime, formState.endTime);
    setTimeError(error);
  }, [formState.startTime, formState.endTime]);

  const isFormValid = useMemo(() => {
    return (
      formState.name.trim() !== '' &&
      formState.capacity.trim() !== '' &&
      formState.minTemp.trim() !== '' &&
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
