import styled from '@emotion/styled';
import { useState } from 'react';
import { createReport } from '@/api/services/report.service';
import { toast } from 'react-toastify';

interface ReportModalProps {
  onClose: () => void;
  targetProfileId: string;
}

export const REPORT_CATEGORIES = [
  { value: 'SPAM', label: 'SPAM (스팸)' },
  { value: 'ABUSE', label: 'ABUSE (욕설 / 비방)' },
  { value: 'SEXUAL', label: 'SEXUAL (성적 발언 / 음란물)' },
  { value: 'ILLEGAL', label: 'ILLEGAL (불법 행위)' },
  { value: 'OFFLINE_RISK', label: 'OFFLINE_RISK (오프라인 위험)' },
  { value: 'ETC', label: 'ETC (기타)' },
];

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
`;

const ModalContainer = styled.div`
  background: white;
  border-radius: 0.75rem;
  width: 22rem;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
`;

const Title = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
`;

const Label = styled.label`
  font-size: 0.9rem;
  font-weight: 500;
`;

const SelectWrapper = styled.div`
  position: relative;
  width: 100%;
`;

const Select = styled.select`
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;

  width: 100%;
  padding: 0.6rem 2.2rem 0.6rem 0.8rem;
  font-size: 0.9rem;
  border: 1px solid #ccc;
  border-radius: 0.5rem;
  background-color: #f9fafb;
  color: #222;
  cursor: pointer;
  outline: none;
  transition: border 0.2s ease;

  &:focus {
    border: 1px solid #007aff;
    box-shadow: 0 0 0 2px rgba(0, 122, 255, 0.2);
  }
`;

const Arrow = styled.span`
  position: absolute;
  top: 50%;
  right: 0.9rem;
  transform: translateY(-50%);
  pointer-events: none;
  width: 0;
  height: 0;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-top: 6px solid #333;
  opacity: 0.7;
`;

const TextArea = styled.textarea`
  border: 1px solid #ddd;
  border-radius: 0.5rem;
  padding: 0.6rem;
  font-size: 0.9rem;
  resize: none;
  min-height: 6rem;
  background-color: #fafafa;
`;

const FileInput = styled.input`
  font-size: 0.85rem;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 0.6rem;
`;

const Button = styled.button<{ primary?: boolean }>`
  background: ${({ primary }) => (primary ? '#007aff' : '#f2f2f2')};
  color: ${({ primary }) => (primary ? 'white' : '#333')};
  border: none;
  border-radius: 0.4rem;
  padding: 0.5rem 1rem;
  font-size: 0.9rem;
  cursor: pointer;
  font-weight: 500;

  &:hover {
    opacity: 0.9;
  }
`;

const Gap = styled.div`
  height: 0.3rem;
  width: 100%;
`;

export const ReportModal = ({ onClose, targetProfileId }: ReportModalProps) => {
  const [category, setCategory] = useState('');
  const [detail, setDetail] = useState('');
  const [images, setImages] = useState<File[]>([]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImages(Array.from(e.target.files));
    }
  };

  const handleSubmit = async () => {
    if (!category) {
      toast.warn('신고 유형을 선택해주세요.');
      return;
    }
    if (!detail.trim()) {
      toast.warn('신고 사유를 입력해주세요.');
      return;
    }

    try {
      const response = await createReport({
        targetProfileId,
        category,
        detail,
        images,
      });
      console.log(response);
      toast.success('신고가 접수되었습니다.');
      onClose();
    } catch (error: any) {
      console.error(error);
      toast.error(error.message);
    }
  };

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <Title>사용자 신고</Title>

        <div>
          <Label>신고 유형</Label>
          <Gap />
          <SelectWrapper>
            <Select value={category} onChange={(e) => setCategory(e.target.value)}>
              <option value="">-- 신고 유형을 선택하세요 --</option>
              {REPORT_CATEGORIES.map((cat) => (
                <option key={cat.value} value={cat.value}>
                  {cat.label}
                </option>
              ))}
            </Select>
            <Arrow />
          </SelectWrapper>
        </div>

        <div>
          <Label>상세 내용</Label>
          <Gap />
          <TextArea
            placeholder="신고 사유를 자세히 입력해주세요."
            value={detail}
            onChange={(e) => setDetail(e.target.value)}
          />
        </div>

        <div>
          <Label>증거 이미지 (선택)</Label>
          <Gap />
          <FileInput type="file" multiple onChange={handleImageChange} />
        </div>

        <ButtonGroup>
          <Button onClick={onClose}>취소</Button>
          <Button primary onClick={handleSubmit}>
            신고하기
          </Button>
        </ButtonGroup>
      </ModalContainer>
    </ModalOverlay>
  );
};
