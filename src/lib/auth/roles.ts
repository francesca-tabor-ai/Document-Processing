/**
 * Role-based access control (RBAC) roles for OptiFlowAI.
 */
export const ROLES = {
  ADMIN: "Admin",
  REVIEWER: "Reviewer",
  ANALYST: "Analyst",
  VIEWER: "Viewer",
} as const;

export type Role = (typeof ROLES)[keyof typeof ROLES];

export const ROLE_HIERARCHY: Record<Role, number> = {
  [ROLES.ADMIN]: 4,
  [ROLES.REVIEWER]: 3,
  [ROLES.ANALYST]: 2,
  [ROLES.VIEWER]: 1,
};

/** Permissions that each role has (subset; extend as needed). */
export const ROLE_PERMISSIONS: Record<Role, string[]> = {
  [ROLES.ADMIN]: [
    "users:manage",
    "documents:read",
    "documents:upload",
    "documents:delete",
    "review:approve",
    "review:reject",
    "workflows:manage",
    "audit:read",
    "audit:export",
    "settings:manage",
  ],
  [ROLES.REVIEWER]: [
    "documents:read",
    "documents:upload",
    "review:approve",
    "review:reject",
    "audit:read",
  ],
  [ROLES.ANALYST]: [
    "documents:read",
    "documents:upload",
    "audit:read",
  ],
  [ROLES.VIEWER]: ["documents:read", "audit:read"],
};

export function hasPermission(role: Role, permission: string): boolean {
  return ROLE_PERMISSIONS[role]?.includes(permission) ?? false;
}

export function hasMinRole(userRole: Role, requiredRole: Role): boolean {
  return ROLE_HIERARCHY[userRole] >= ROLE_HIERARCHY[requiredRole];
}
