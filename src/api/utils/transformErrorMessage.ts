import { ERROR_MESSAGES, NETWORK_ERROR_CODES, SERVER_RESPONSE_KEYS } from './errorCodes';

// 에러 메시지 변환 함수
export const transformErrorMessage = (error: any): string => {
  // 네트워크 에러 처리 (response가 없는 경우)
  if (!error.response) {
    switch (error.code) {
      case NETWORK_ERROR_CODES.ECONNABORTED:
        return ERROR_MESSAGES.TIMEOUT;
      case NETWORK_ERROR_CODES.ERR_NETWORK:
        return ERROR_MESSAGES.NETWORK_ERROR;
      default:
        return ERROR_MESSAGES.CONNECTION_ERROR;
    }
  }

  // 유효성 검사 에러 처리
  if (error.response.data?.[SERVER_RESPONSE_KEYS.VALIDATION_ERRORS]) {
    const validationErrors = error.response.data[SERVER_RESPONSE_KEYS.VALIDATION_ERRORS];
    const errorMessages = Object.entries(validationErrors)
      .map(([_, messages]) => (messages as string[]).join('\n'))
      .join('\n');
    return errorMessages || ERROR_MESSAGES.VALIDATION_ERROR;
  }

  // 서버 응답 에러 처리
  return (
    error.response.data?.[SERVER_RESPONSE_KEYS.DETAIL] ||
    error.response.data?.[SERVER_RESPONSE_KEYS.MESSAGE] ||
    ERROR_MESSAGES.DEFAULT_ERROR
  );
};
