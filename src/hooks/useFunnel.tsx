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
  const stepHistoryRef = useRef<T[number][]>([]);

  const Step = ({ children }: StepProps<T>) => <>{children}</>;

  const animatedSetStep = (newStep: T[number]) => {
    const currentIndex = steps.indexOf(step);
    const newIndex = steps.indexOf(newStep);
    
    if (newIndex < currentIndex) {
      setAnimationDirection('left');
    } else {
      setAnimationDirection('right');
      stepHistoryRef.current.push(step);
    }
    
    setStep(newStep);
  };

  // 이전 스텝으로 복원하는 함수
  const goToPreviousStep = () => {
    if (stepHistoryRef.current.length > 0) {
      const previousStep = stepHistoryRef.current[stepHistoryRef.current.length - 1];
      const previousIndex = steps.indexOf(previousStep);
      const currentIndex = steps.indexOf(step);
      

      if (previousIndex < currentIndex) {
        setAnimationDirection('left');
      } else {
        setAnimationDirection('right');
      }
      

      stepHistoryRef.current.pop();
      setStep(previousStep);
    }
  };

  const hasPreviousStep = () => stepHistoryRef.current.length > 0;

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

