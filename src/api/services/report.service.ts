import api from '../clients/axiosInstance';

export interface CreateReportRequest {
  targetProfileId: string;
  category: string;
  detail: string;
  images?: File[];
}

export interface ReportResponse {
  reportId: string;
  reporterProfileId: string;
  targetProfileId: string;
  category: string;
  status: string;
  detail: string;
  images: string[];
  createdAt: string;
  adminReply: string | null;
  processedBy: string | null;
  processedAt: string | null;
}

export interface ReportListItem {
  reportId: string;
  targetProfileId: string;
  category: string;
  status: string;
  createdAt: string;
}

export interface PageInfo {
  size: number;
  number: number;
  totalElements: number;
  totalPages: number;
}

export interface ReportListResponse {
  content: ReportListItem[];
  page: PageInfo;
}

//신고
export const createReport = async (reportData: CreateReportRequest): Promise<ReportResponse> => {
  const formData = new FormData();
  
  formData.append('targetProfileId', reportData.targetProfileId);
  formData.append('category', reportData.category);
  formData.append('detail', reportData.detail);
  
  // 이미지 파일 추가
  if (reportData.images && reportData.images.length > 0) {
    reportData.images.forEach((image) => {
      formData.append('images', image);
    });
  }

  const response = await api.post<ReportResponse>('/api/reports', formData);
  
  return response.data;
};

//신고 목록 조회
export const getReports = async (): Promise<ReportListResponse> => {
  const response = await api.get<ReportListResponse>('/api/reports');
  return response.data;
};

//신고 취소 
export const deleteReport = async (reportId: string): Promise<void> => {
  await api.delete(`/api/reports/${reportId}`);
};

