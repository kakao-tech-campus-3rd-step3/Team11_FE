import { useState, useCallback } from 'react';

interface ToastState {
  message: string;
  visible: boolean;
}

export const useToast = () => {
  const [toast, setToast] = useState<ToastState>({ message: '', visible: false });

  const showToast = useCallback((message: string, duration: number = 3000) => {
    setToast({ message, visible: true });
    
    setTimeout(() => {
      setToast((prev) => ({ ...prev, visible: false }));
    }, duration);
  }, []);

  const hideToast = useCallback(() => {
    setToast({ message: '', visible: false });
  }, []);

  return { toast, showToast, hideToast };
};

