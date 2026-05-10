export const users = [
  { id: 1, name: 'Alice', username: 'alice123', password: 'alice123' },
  { id: 2, name: 'Bob',username: 'bob123', password: 'bob123' },
  { id: 3, name: 'Banana',username: 'banana123', password: 'banana123' },
]

export const roles = [
  { id: 1, name: 'admin' },
  { id: 2, name: 'user_editor' },
  { id: 3, name: 'post_editor' },
]

export const permissions = [
  { id: 1, name: 'create:user' },
  { id: 2, name: 'delete:user' },
  { id: 3, name: 'update:post' },
  { id: 4, name: 'create:product' }
]

export const userRoles = [
  { userId: 1, roleId: 2 }, // Alice → user_editor
  { userId: 1, roleId: 3 }, // Alice -> post_editor
  { userId: 2, roleId: 1 }, // Bob → admin
  { userId: 3, roleId: 3 }  // Banana -> post_editor
]

export const rolePermissions = [
  { roleId: 1, permissionId: 1 }, // admin → create:user
  { roleId: 1, permissionId: 2 }, // admin → delete:user
  { roleId: 3, permissionId: 3 }, // post_editor -> update:post
  { roleId: 2, permissionId: 4 }, // user_editor → create:product
  { roleId: 2, permissionId: 1 }, // user_editor -> create:user
]