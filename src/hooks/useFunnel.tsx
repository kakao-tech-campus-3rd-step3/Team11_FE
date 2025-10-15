import { useState, Children, isValidElement } from 'react';
import type { ReactElement, ReactNode } from 'react';

interface StepProps<T extends string[]> {
  name: T[number];
  children: ReactNode;
}

export const useFunnel = <T extends string[]>(steps: T) => {
  const [step, setStep] = useState<T[number]>(steps[0]);

  const Step = ({ children }: StepProps<T>) => <>{children}</>;

  const Funnel = ({ children }: { children: ReactElement<StepProps<T>>[] }) => {
    const targetStep = Children.toArray(children).find((child) => {
      if (isValidElement<StepProps<T>>(child)) {
        return child.props.name === step;
      }
      return false;
    });

    return <>{targetStep}</>;
  };

  return [Funnel, Step, setStep, step] as const;
};

