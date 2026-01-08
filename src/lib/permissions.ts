// lib/permissions.ts
// Rol-Tabanlı Erişim Kontrol (RBAC)

export enum UserRole {
  STUDENT = 'STUDENT',
  TEACHER = 'TEACHER',
  ADMIN = 'ADMIN',
  SUPER_ADMIN = 'SUPER_ADMIN',
}

export enum Permission {
  // Öğrenci İzinleri
  VIEW_OWN_COURSES = 'view:own:courses',
  VIEW_OWN_ASSIGNMENTS = 'view:own:assignments',
  SUBMIT_ASSIGNMENT = 'submit:assignment',
  VIEW_OWN_GRADES = 'view:own:grades',
  VIEW_OWN_CERTIFICATES = 'view:own:certificates',

  // Öğretmen İzinleri
  MANAGE_OWN_COURSES = 'manage:own:courses',
  CREATE_MODULE = 'create:module',
  CREATE_ASSIGNMENT = 'create:assignment',
  GRADE_ASSIGNMENTS = 'grade:assignments',
  VIEW_CLASS_STUDENTS = 'view:class:students',
  VIEW_CLASS_ANALYTICS = 'view:class:analytics',

  // Admin İzinleri
  MANAGE_ALL_USERS = 'manage:all:users',
  MANAGE_ALL_COURSES = 'manage:all:courses',
  VIEW_SYSTEM_ANALYTICS = 'view:system:analytics',
  MANAGE_LEADS = 'manage:leads',
  ACCESS_SIMULATOR = 'access:simulator',
  VIEW_CONTEXT_GRAPH = 'view:context:graph',

  // Super Admin İzinleri
  MANAGE_SYSTEM_SETTINGS = 'manage:system:settings',
  ACCESS_LOGS = 'access:logs',
  BACKUP_DATABASE = 'backup:database',
  MANAGE_ADMINS = 'manage:admins',
}

export const rolePermissions: Record<UserRole, Permission[]> = {
  [UserRole.STUDENT]: [
    Permission.VIEW_OWN_COURSES,
    Permission.VIEW_OWN_ASSIGNMENTS,
    Permission.SUBMIT_ASSIGNMENT,
    Permission.VIEW_OWN_GRADES,
    Permission.VIEW_OWN_CERTIFICATES,
  ],
  [UserRole.TEACHER]: [
    Permission.MANAGE_OWN_COURSES,
    Permission.CREATE_MODULE,
    Permission.CREATE_ASSIGNMENT,
    Permission.GRADE_ASSIGNMENTS,
    Permission.VIEW_CLASS_STUDENTS,
    Permission.VIEW_CLASS_ANALYTICS,
    // Öğrenci izinlerini de dahil et
    ...rolePermissions[UserRole.STUDENT] || [],
  ],
  [UserRole.ADMIN]: [
    Permission.MANAGE_ALL_USERS,
    Permission.MANAGE_ALL_COURSES,
    Permission.VIEW_SYSTEM_ANALYTICS,
    Permission.MANAGE_LEADS,
    Permission.ACCESS_SIMULATOR,
    Permission.VIEW_CONTEXT_GRAPH,
    // Öğretmen ve öğrenci izinlerini de dahil et
    ...rolePermissions[UserRole.TEACHER] || [],
  ],
  [UserRole.SUPER_ADMIN]: [
    Permission.MANAGE_SYSTEM_SETTINGS,
    Permission.ACCESS_LOGS,
    Permission.BACKUP_DATABASE,
    Permission.MANAGE_ADMINS,
    // Admin ve tüm alt roller
    ...rolePermissions[UserRole.ADMIN] || [],
  ],
};

export function hasPermission(
  userRole: UserRole,
  requiredPermission: Permission
): boolean {
  const permissions = rolePermissions[userRole] || [];
  return permissions.includes(requiredPermission);
}

export function hasAnyPermission(
  userRole: UserRole,
  requiredPermissions: Permission[]
): boolean {
  return requiredPermissions.some((perm) =>
    hasPermission(userRole, perm)
  );
}

export function hasAllPermissions(
  userRole: UserRole,
  requiredPermissions: Permission[]
): boolean {
  return requiredPermissions.every((perm) =>
    hasPermission(userRole, perm)
  );
}
