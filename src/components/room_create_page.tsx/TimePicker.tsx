import styled from 'styled-components';
import { StyledSelect } from './StyledComponents';

const TimePickerContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;
`;

const TimeInputWrapper = styled.div`
  display: grid;
  /* 날짜, 시간, 분 필드의 비율을 조정합니다. */
  grid-template-columns: 2.5fr 1.5fr 1.5fr;
  gap: 8px;
  align-items: center;
`;

const DateInput = styled.input`
  padding: 11px;
  font-size: 0.9rem;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  background-color: #f9fafb;
  color: #333;
  box-sizing: border-box;
  width: 100%;
`;

const ErrorMessage = styled.p`
  color: #ef4444;
  font-size: 0.8rem;
  margin-top: 4px;
`;

interface TimePickerProps {
  startTime: string;
  endTime: string;
  onChange: (e: { target: { name: string; value: string } }) => void;
  error?: string | null;
}

const hourOptions = Array.from({ length: 24 }, (_, i) => String(i).padStart(2, '0'));
const minuteOptions = ['00', '30'];

const CustomTimeInput = ({
  name,
  value,
  onChange,
}: {
  name: 'startTime' | 'endTime';
  value: string;
  onChange: (e: { target: { name: string; value: string } }) => void;
}) => {
  const [datePart, timePart] = value.split('T');
  const [hourPart, minutePart] = timePart?.split(':') || ['', ''];

  const handleValueChange = (part: 'date' | 'hour' | 'minute', newValue: string) => {
    let newDate = datePart || '';
    let newHour = hourPart || '00';
    let newMinute = minutePart || '00';

    if (part === 'date') newDate = newValue;
    if (part === 'hour') newHour = newValue;
    if (part === 'minute') newMinute = newValue;

    if (!newDate && part !== 'date') {
      alert('날짜를 먼저 선택해주세요.');
      return;
    }

    const combinedValue = `${newDate}T${newHour}:${newMinute}`;
    onChange({ target: { name, value: combinedValue } });
  };

  return (
    <TimeInputWrapper>
      <DateInput
        type="date"
        value={datePart || ''}
        onChange={(e) => handleValueChange('date', e.target.value)}
      />
      <StyledSelect
        value={hourPart || '00'}
        onChange={(e) => handleValueChange('hour', e.target.value)}
      >
        {hourOptions.map((h) => (
          <option key={h} value={h}>
            {h}시
          </option>
        ))}
      </StyledSelect>
      <StyledSelect
        value={minutePart || '00'}
        onChange={(e) => handleValueChange('minute', e.target.value)}
      >
        {minuteOptions.map((m) => (
          <option key={m} value={m}>
            {m}분
          </option>
        ))}
      </StyledSelect>
    </TimeInputWrapper>
  );
};

export const TimePicker = ({ startTime, endTime, onChange, error }: TimePickerProps) => {
  return (
    <TimePickerContainer>
      <label>시작 시간</label>
      <CustomTimeInput name="startTime" value={startTime} onChange={onChange} />
      <label>종료 시간</label>
      <CustomTimeInput name="endTime" value={endTime} onChange={onChange} />
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </TimePickerContainer>
  );
};
