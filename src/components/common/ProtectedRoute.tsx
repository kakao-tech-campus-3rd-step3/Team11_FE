import { Navigate, Outlet } from 'react-router-dom';
import { getAccessToken } from '@/utils/tokenStorage';

const ProtectedRoute = () => {
  const accessToken = getAccessToken();

  if (!accessToken) {
    return <Navigate to="/login" replace state={{ fromProtected: true }} />;
  }

  // Outlet: 중첩된 자식 라우트를 렌더링
  return <Outlet />;
};

export default ProtectedRoute;

