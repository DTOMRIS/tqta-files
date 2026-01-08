'use client';

import React, { ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { UserRole, Permission, hasPermission, hasAnyPermission } from '@/lib/permissions';

interface RoleGuardProps {
  children: ReactNode;
  requiredRole?: UserRole;
  requiredPermissions?: Permission[];
  requireAll?: boolean; // Tüm izinleri mi gerekli? (default: en az birini)
  fallback?: ReactNode;
}

/**
 * RoleGuard: Rol ve izne göre sayfa/komponent erişimini kontrol eder
 * 
 * Kullanım:
 * <RoleGuard requiredRole="ADMIN" fallback={<AccessDenied />}>
 *   <AdminPanel />
 * </RoleGuard>
 */
export const RoleGuard: React.FC<RoleGuardProps> = ({
  children,
  requiredRole,
  requiredPermissions,
  requireAll = false,
  fallback = <AccessDenied />,
}) => {
  const [userRole, setUserRole] = React.useState<UserRole | null>(null);
  const [loading, setLoading] = React.useState(true);
  const router = useRouter();

  React.useEffect(() => {
    // Kullanıcı rolünü localStorage veya API'den al
    const getUser = async () => {
      try {
        // Dummy: gerçek uygulamada API endpoint'ten çek
        const storedRole = localStorage.getItem('userRole') as UserRole;
        setUserRole(storedRole || null);
      } catch (error) {
        console.error('Kullanıcı bilgisi alınamadı:', error);
        setUserRole(null);
      } finally {
        setLoading(false);
      }
    };

    getUser();
  }, []);

  if (loading) {
    return <div className="flex items-center justify-center h-screen">Yükleniyor...</div>;
  }

  if (!userRole) {
    // Giriş sayfasına yönlendir
    router.push('/login');
    return null;
  }

  // Rol kontrolü
  if (requiredRole && userRole !== requiredRole && userRole !== UserRole.SUPER_ADMIN) {
    return fallback;
  }

  // İzin kontrolü
  if (requiredPermissions && requiredPermissions.length > 0) {
    const hasAccess = requireAll
      ? requiredPermissions.every((perm) => hasPermission(userRole, perm))
      : requiredPermissions.some((perm) => hasPermission(userRole, perm));

    if (!hasAccess) {
      return fallback;
    }
  }

  return <>{children}</>;
};

interface AccessDeniedProps {
  message?: string;
}

const AccessDenied: React.FC<AccessDeniedProps> = ({
  message = 'Bu sayfaya erişim izni yok.',
}) => (
  <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
    <div className="text-center">
      <h1 className="text-4xl font-bold text-red-600 mb-4">❌ Erişim Reddedildi</h1>
      <p className="text-gray-600 text-lg mb-8">{message}</p>
      <a href="/" className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
        Ana Sayfaya Dön
      </a>
    </div>
  </div>
);
