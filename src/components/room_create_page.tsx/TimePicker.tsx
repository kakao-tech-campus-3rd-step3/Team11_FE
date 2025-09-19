import React from 'react';
import styled from 'styled-components';
import { StyledInput, Grid } from './StyledComponents';

const ErrorMessage = styled.p`
  color: #ef4444;
  font-size: 0.8rem;
  margin-top: 4px;
`;

interface TimePickerProps {
  startTime: string;
  endTime: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string | null;
}

export const TimePicker = ({ startTime, endTime, onChange, error }: TimePickerProps) => {
  return (
    <>
      <Grid>
        <StyledInput type="datetime-local" name="startTime" value={startTime} onChange={onChange} />
        <StyledInput type="datetime-local" name="endTime" value={endTime} onChange={onChange} />
      </Grid>
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </>
  );
};
