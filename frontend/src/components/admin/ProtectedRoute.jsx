import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';

const ProtectedRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('adminToken');
      
      if (!token) {
        setIsAuthenticated(false);
        setLoading(false);
        return;
      }

      try {
        // Kiểm tra token với server
        await axios.get('http://localhost:3000/api/admin/me', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setIsAuthenticated(true);
      } catch (error) {
        // Token không hợp lệ, xóa token
        localStorage.removeItem('adminToken');
        localStorage.removeItem('adminInfo');
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-600">Đang kiểm tra...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/admin/signin" replace />;
  }

  return children;
};

export default ProtectedRoute;
