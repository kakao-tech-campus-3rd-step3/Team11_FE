import { useState, useEffect } from 'react';
import { useUserSigungu } from '@/hooks/useUserSigungu';

export const useLocationInput = () => {
  const { sidoName, sigunguList } = useUserSigungu();
  const [sido, setSido] = useState('');
  const [sigungu, setSigungu] = useState('');
  const [sigunguSuggestions, setSigunguSuggestions] = useState<string[]>([]);
  const [showSigunguSuggestions, setShowSigunguSuggestions] = useState(false);

  // sido가 로드되면 자동으로 sido 설정
  useEffect(() => {
    if (sidoName && !sido) {
      setSido(sidoName);
    }
  }, [sidoName, sido]);

  // sido가 변경될 때 자동으로 시군구 목록 업데이트
  useEffect(() => {
    if (sido && sigunguList.length > 0) {
      setSigunguSuggestions(sigunguList.map((s) => s.sigunguName));
    }
  }, [sido, sigunguList]);

  const handleSigunguChange = (value: string) => {
    setSigungu(value);

    if (value.trim()) {
      const filtered = sigunguList
        .map((s) => s.sigunguName)
        .filter((sigunguName) => sigunguName.toLowerCase().includes(value.toLowerCase()));
      setSigunguSuggestions(filtered);
    } else {
      // 입력값이 없으면 전체 목록 표시
      setSigunguSuggestions(sigunguList.map((s) => s.sigunguName));
    }
    setShowSigunguSuggestions(true);
  };

  const handleSigunguFocus = () => {
    // 포커스 시 전체 목록 또는 필터된 목록 표시
    if (sigungu.trim()) {
      const filtered = sigunguList
        .map((s) => s.sigunguName)
        .filter((sigunguName) => sigunguName.toLowerCase().includes(sigungu.toLowerCase()));
      setSigunguSuggestions(filtered);
    } else {
      setSigunguSuggestions(sigunguList.map((s) => s.sigunguName));
    }
    setShowSigunguSuggestions(true);
  };

  const handleSigunguSelect = (selectedSigungu: string) => {
    setSigungu(selectedSigungu);
    setShowSigunguSuggestions(false);
  };

  return {
    sido,
    setSido,
    sigungu,
    setSigungu,
    sigunguSuggestions,
    showSigunguSuggestions,
    setShowSigunguSuggestions,
    handleSigunguChange,
    handleSigunguFocus,
    handleSigunguSelect,
  };
};

