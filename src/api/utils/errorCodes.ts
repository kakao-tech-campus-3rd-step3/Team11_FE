// 네트워크 에러 코드
export const NETWORK_ERROR_CODES = {
  ECONNABORTED: 'ECONNABORTED',
  ERR_NETWORK: 'ERR_NETWORK',
} as const;

// HTTP 상태 코드
export const HTTP_STATUS = {
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
} as const;

// 에러 메시지
export const ERROR_MESSAGES = {
  TIMEOUT: '서버 응답 시간이 초과되었습니다. 잠시 후 다시 시도해주세요.',
  NETWORK_ERROR: '네트워크 연결에 실패했습니다. 인터넷 연결을 확인해주세요.',
  CONNECTION_ERROR: '서버에 연결할 수 없습니다. 잠시 후 다시 시도해주세요.',
  VALIDATION_ERROR: '유효성 검사에 실패했습니다.',
  DEFAULT_ERROR: '요청 처리 중 오류가 발생했습니다.',
} as const;

// 서버 응답 데이터 키
export const SERVER_RESPONSE_KEYS = {
  DETAIL: 'detail',
  MESSAGE: 'message',
  VALIDATION_ERRORS: 'validationErrors',
} as const;
