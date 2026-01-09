// ===== PERMISSION ENUMları (dəyişmə) =====
export enum Permission {
  // Öğrenci izinləri
  VIEW_OWN_PROFILE = "view_own_profile",
  VIEW_OWN_SCHEDULE = "view_own_schedule",
  VIEW_OWN_GRADES = "view_own_grades",
  SUBMIT_ASSIGNMENTS = "submit_assignments",
  VIEW_COURSE_MATERIALS = "view_course_materials",
  
  // Öğretmen izinləri
  MANAGE_OWN_CLASSES = "manage_own_classes",
  GRADE_STUDENTS = "grade_students",
  VIEW_CLASS_ANALYTICS = "view_class_analytics",
  
  // Admin izinləri
  MANAGE_ALL_USERS = "manage_all_users",
  MANAGE_COURSES = "manage_courses",
  MANAGE_CTH_REGISTRATIONS = "manage_cth_registrations",
  
  // CTH panel
  APPROVE_CTH_SUBMISSIONS = "approve_cth_submissions",
  
  // IV panel
  APPROVE_IV_ASSESSMENTS = "approve_iv_assessments",
  
  // Context Graph
  VIEW_CONTEXT_GRAPH = "view_context_graph",
  
  // System
  MANAGE_SYSTEM_SETTINGS = "manage_system_settings",
  VIEW_AUDIT_LOGS = "view_audit_logs",
}

export enum UserRole {
  STUDENT = "student",
  TEACHER = "teacher",
  INVESTOR = "investor",
  CTH_ADMIN = "cth_admin",
  IV_PANEL = "iv_panel",
  DMA_ADMIN = "dma_admin",
  ADMIN = "admin",
  SUPER_ADMIN = "super_admin",
}

// ===== ROL İZİNLƏRİ (bağımlılıq sırası ilə) =====

// 1) STUDENT (əsas, bağımlı deyil)
const STUDENT_PERMISSIONS = [
  Permission.VIEW_OWN_PROFILE,
  Permission.VIEW_OWN_SCHEDULE,
  Permission.VIEW_OWN_GRADES,
  Permission.SUBMIT_ASSIGNMENTS,
  Permission.VIEW_COURSE_MATERIALS,
];

// 2) TEACHER (student izinlərinə əlavə)
const TEACHER_PERMISSIONS = [
  ...STUDENT_PERMISSIONS,
  Permission.MANAGE_OWN_CLASSES,
  Permission.GRADE_STUDENTS,
  Permission.VIEW_CLASS_ANALYTICS,
];

// 3) INVESTOR (teacher izinlərinə əlavə)
const INVESTOR_PERMISSIONS = [
  ...TEACHER_PERMISSIONS,
  Permission.VIEW_CLASS_ANALYTICS, // varsa duplikat yoxdur, amma təmizlik üçün
];

// 4) CTH_ADMIN
const CTH_ADMIN_PERMISSIONS = [
  Permission.APPROVE_CTH_SUBMISSIONS,
  Permission.MANAGE_CTH_REGISTRATIONS,
  Permission.VIEW_OWN_PROFILE,
];

// 5) IV_PANEL
const IV_PANEL_PERMISSIONS = [
  Permission.APPROVE_IV_ASSESSMENTS,
  Permission.VIEW_CLASS_ANALYTICS,
  Permission.VIEW_OWN_PROFILE,
];

// 6) DMA_ADMIN (teacher-based, context graph əlavə)
const DMA_ADMIN_PERMISSIONS = [
  ...TEACHER_PERMISSIONS,
  Permission.VIEW_CONTEXT_GRAPH,
];

// 7) ADMIN (bütün əsas izinlər)
const ADMIN_PERMISSIONS = [
  Permission.MANAGE_ALL_USERS,
  Permission.MANAGE_COURSES,
  Permission.MANAGE_CTH_REGISTRATIONS,
  Permission.VIEW_CLASS_ANALYTICS,
  Permission.VIEW_CONTEXT_GRAPH,
  ...TEACHER_PERMISSIONS,
];

// 8) SUPER_ADMIN (hər şey + sistem)
const SUPER_ADMIN_PERMISSIONS = [
  Permission.MANAGE_SYSTEM_SETTINGS,
  Permission.VIEW_AUDIT_LOGS,
  ...ADMIN_PERMISSIONS,
];

// ===== İXRAC: ROL → İZİNLƏR MAP =====
export const rolePermissions = {
  [UserRole.STUDENT]: STUDENT_PERMISSIONS,
  [UserRole.TEACHER]: TEACHER_PERMISSIONS,
  [UserRole.INVESTOR]: INVESTOR_PERMISSIONS,
  [UserRole.CTH_ADMIN]: CTH_ADMIN_PERMISSIONS,
  [UserRole.IV_PANEL]: IV_PANEL_PERMISSIONS,
  [UserRole.DMA_ADMIN]: DMA_ADMIN_PERMISSIONS,
  [UserRole.ADMIN]: ADMIN_PERMISSIONS,
  [UserRole.SUPER_ADMIN]: SUPER_ADMIN_PERMISSIONS,
} as const;

// ===== YARDIMCI FUNKSIYA =====
export function hasPermission(
  userRole: UserRole | undefined,
  permission: Permission
): boolean {
  if (!userRole) return false;
  return rolePermissions[userRole]?.includes(permission) ?? false;
}