import { useState, Children, isValidElement, useRef } from 'react';
import type { ReactElement, ReactNode } from 'react';
import PageTransition from '@/components/common/PageTransition';

interface StepProps<T extends string[]> {
  name: T[number];
  children: ReactNode;
}

interface FunnelProps<T extends string[]> {
  children: ReactElement<StepProps<T>>[];
  direction?: 'left' | 'right' | 'up' | 'down' | 'fade';
  duration?: number;
}

export const useFunnel = <T extends string[]>(steps: T) => {
  const [step, setStep] = useState<T[number]>(steps[0]);
  const [animationDirection, setAnimationDirection] = useState<'left' | 'right'>('right');
  // 이전 스텝 정보를 저장하기 위한 ref (goToPreviousStep 함수에서 사용)
  const previousStepRef = useRef<T[number] | null>(null);

  const Step = ({ children }: StepProps<T>) => <>{children}</>;

  const animatedSetStep = (newStep: T[number]) => {
    const currentIndex = steps.indexOf(step);
    const newIndex = steps.indexOf(newStep);
    
    // 이전 단계로 가는 경우 왼쪽 애니메이션, 다음 단계로 가는 경우 오른쪽 애니메이션
    if (newIndex < currentIndex) {
      setAnimationDirection('left');
    } else {
      setAnimationDirection('right');
    }
    
    previousStepRef.current = step;
    setStep(newStep);
  };

  // 이전 스텝으로 복원하는 함수
  const goToPreviousStep = () => {
    if (previousStepRef.current) {
      const previousIndex = steps.indexOf(previousStepRef.current);
      const currentIndex = steps.indexOf(step);
      
      // 이전 스텝으로 가는 경우 왼쪽 애니메이션
      if (previousIndex < currentIndex) {
        setAnimationDirection('left');
      } else {
        setAnimationDirection('right');
      }
      
      setStep(previousStepRef.current);
      // 복원 후 이전 스텝 ref는 null로 설정 (또는 이전의 이전 스텝을 추적하려면 주석 처리)
      // previousStepRef.current = null;
    }
  };

  // 이전 스텝이 존재하는지 확인하는 함수
  const hasPreviousStep = () => previousStepRef.current !== null;

  const Funnel = ({ 
    children, 
    direction = animationDirection, 
    duration = 300 
  }: FunnelProps<T>) => {
    const targetStep = Children.toArray(children).find((child) => {
      if (isValidElement<StepProps<T>>(child)) {
        return child.props.name === step;
      }
      return false;
    });

    return (
      <PageTransition
        isVisible={true}
        direction={direction}
        duration={duration}
      >
        {targetStep}
      </PageTransition>
    );
  };

  return [Funnel, Step, animatedSetStep, step, goToPreviousStep, hasPreviousStep] as const;
};

