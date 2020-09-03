export const Permissions = ['READ', 'WRITE', 'DELETE', 'SHARE', 'UPLOAD_FILES'] as const;
type Permission = typeof Permissions[number];

export type Group= {
  id: string;
  name: string;
  permissions: Permission[]  ;
};
