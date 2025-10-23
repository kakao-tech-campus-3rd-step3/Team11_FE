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

  return [Funnel, Step, animatedSetStep, step] as const;
};

