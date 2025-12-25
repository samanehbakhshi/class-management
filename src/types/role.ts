export const ROLES = ["admin", "teacher", "student"] as const;

export type Role = (typeof ROLES)[number];
