import { useState, useRef } from 'react';
import styled from '@emotion/styled';
import { colors } from '@/style/themes';
import { createReport, type CreateReportRequest } from '@/api/services/report.service';

interface ReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  targetProfileId: string;
  onSuccess: () => void;
}

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: white;
  border-radius: 16px;
  width: 90%;
  max-width: 500px;
  max-height: 80vh;
  overflow-y: auto;
  padding: 24px;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
`;

const ModalTitle = styled.h2`
  font-size: 20px;
  font-weight: 600;
  color: #333;
  margin: 0;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 24px;
  color: #666;
  cursor: pointer;
  padding: 0;
  width: 24px;
  height: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const FormField = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: block;
  font-size: 14px;
  font-weight: 500;
  color: #333;
  margin-bottom: 8px;
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

const TextArea = styled.textarea`
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 16px;
  resize: vertical;
  min-height: 100px;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: ${colors.primary};
  }
`;

const FileInput = styled.input`
  display: none;
`;

const FileInputLabel = styled.label`
  display: inline-block;
  padding: 12px 20px;
  background: #f8f9fa;
  border: 1px solid #ddd;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
  color: #333;
  transition: background-color 0.2s ease;

  &:hover {
    background: #e9ecef;
  }
`;

const ImagePreviewContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 12px;
`;

const ImagePreview = styled.div`
  position: relative;
  width: 100px;
  height: 100px;
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid #ddd;
`;

const ImagePreviewImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const RemoveImageButton = styled.button`
  position: absolute;
  top: 4px;
  right: 4px;
  background: rgba(0, 0, 0, 0.7);
  border: none;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  color: white;
  font-size: 16px;
  line-height: 1;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 24px;
`;

const Button = styled.button<{ variant?: 'primary' | 'secondary' }>`
  flex: 1;
  padding: 14px;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s ease;

  ${(props) =>
    props.variant === 'primary'
      ? `
    background: ${colors.primary};
    color: white;
    &:hover {
      background: ${colors.primary400};
    }
  `
      : `
    background: #f8f9fa;
    color: #666;
    &:hover {
      background: #e9ecef;
    }
  `}

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const REPORT_CATEGORIES = [
  { value: 'SPAM', label: '스팸' },
  { value: 'ABUSE', label: '욕설/비방' },
  { value: 'SEXUAL', label: '성적 발언/음란물' },
  { value: 'ILLEGAL', label: '불법 행위' },
  { value: 'OFFLINE_RISK', label: '오프라인 위험' },
  { value: 'ETC', label: '기타' },
];

const ReportModal = ({ isOpen, onClose, targetProfileId, onSuccess }: ReportModalProps) => {
  const [category, setCategory] = useState('SPAM');
  const [detail, setDetail] = useState('');
  const [images, setImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newFiles = Array.from(files);
      setImages((prev) => [...prev, ...newFiles]);

      // 미리보기 생성
      newFiles.forEach((file) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          setImagePreviews((prev) => [...prev, reader.result as string]);
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const handleRemoveImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
    setImagePreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    if (!detail.trim()) {
      alert('신고 내용을 입력해주세요.');
      return;
    }

    setIsSubmitting(true);
    try {
      const reportData: CreateReportRequest = {
        targetProfileId,
        category,
        detail,
        images,
      };

      await createReport(reportData);
      onSuccess();
      handleClose();
    } catch (error: any) {
      console.error('신고 제출 실패:', error);
      alert(`신고 제출에 실패했습니다: ${error.response?.data?.message || error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setCategory('SPAM');
    setDetail('');
    setImages([]);
    setImagePreviews([]);
    onClose();
  };

  return (
    <ModalOverlay onClick={handleClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <ModalTitle>사용자 신고</ModalTitle>
          <CloseButton onClick={handleClose}>×</CloseButton>
        </ModalHeader>

        <FormField>
          <Label>신고 카테고리</Label>
          <Select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="">-- 신고 유형을 선택하세요 --</option>
            {REPORT_CATEGORIES.map((cat) => (
              <option key={cat.value} value={cat.value}>
                {cat.label}
              </option>
            ))}
          </Select>
        </FormField>

        <FormField>
          <Label>신고 상세 내용</Label>
          <TextArea
            value={detail}
            onChange={(e) => setDetail(e.target.value)}
            placeholder="신고 사유를 자세히 입력해주세요."
          />
        </FormField>

        <FormField>
          <Label>이미지 첨부 (선택사항)</Label>
          <FileInputLabel onClick={() => fileInputRef.current?.click()}>이미지 추가</FileInputLabel>
          <FileInput
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageChange}
          />
          {imagePreviews.length > 0 && (
            <ImagePreviewContainer>
              {imagePreviews.map((preview, index) => (
                <ImagePreview key={index}>
                  <ImagePreviewImg src={preview} alt={`미리보기 ${index + 1}`} />
                  <RemoveImageButton onClick={() => handleRemoveImage(index)}>×</RemoveImageButton>
                </ImagePreview>
              ))}
            </ImagePreviewContainer>
          )}
        </FormField>

        <ButtonGroup>
          <Button variant="secondary" onClick={handleClose} disabled={isSubmitting}>
            취소
          </Button>
          <Button variant="primary" onClick={handleSubmit} disabled={isSubmitting}>
            {isSubmitting ? '제출 중...' : '신고 제출'}
          </Button>
        </ButtonGroup>
      </ModalContent>
    </ModalOverlay>
  );
};

export default ReportModal;
