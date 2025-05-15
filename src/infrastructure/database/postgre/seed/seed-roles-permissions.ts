import { AppDataSource } from "../data-source/data-source"
import { RoleOrmEntity } from '../role.orm-entity';
import { PermissionsOrmEntity } from "../permissions.orm-entity";
import { RolePermissionsOrmEntity } from "../role-permissions.orm-entity";

import { Role } from "../../../../domain/enums/role.enum";
import { Permission } from "../../../../domain/enums/permission.enum";

const dataSource = AppDataSource;

const allPermissions = Object.values(Permission);
const allRoles = Object.values(Role);

const rolePermissionMap: Record<Role, Permission[]> = {
    [Role.SYSTEM_ADMIN]: allPermissions,
    [Role.DEPARTMENT_HEAD]: [
        Permission.CREATE_USER,
        Permission.UPDATE_USER,
        Permission.DELETE_USER,
        Permission.READ_USER,

        Permission.CREATE_DEPARTMENT,
        Permission.UPDATE_DEPARTMENT,
        Permission.READ_DEPARTMENT,
        Permission.DELETE_DEPARTMENT,

        Permission.CREATE_GROUP,
        Permission.READ_GROUP,
        Permission.UPDATE_GROUP,
        Permission.DELETE_GROUP,

        Permission.CREATE_NEWS,
        Permission.READ_NEWS,
        Permission.UPDATE_NEWS,
        Permission.DELETE_NEWS,
    ],
    [Role.TEACHER]: [
        Permission.READ_USER,
        Permission.READ_DEPARTMENT,
        Permission.READ_GROUP,
        Permission.CREATE_NEWS,
        Permission.READ_NEWS,
        Permission.UPDATE_NEWS,
    ],
    [Role.CONTENT_WRITER]: [
        Permission.READ_USER,
        Permission.READ_DEPARTMENT,
        Permission.READ_GROUP,
        Permission.CREATE_NEWS,
        Permission.READ_NEWS,
        Permission.UPDATE_NEWS,
        Permission.DELETE_NEWS,
    ],
    [Role.STUDENT]: [
        Permission.READ_USER,
        Permission.READ_DEPARTMENT,
        Permission.READ_GROUP,
        Permission.READ_NEWS,
    ],
}

async function seedRolesAndPermissions() {
    await dataSource.initialize();

    const roleRepo = dataSource.getRepository(RoleOrmEntity);
    const permRepo = dataSource.getRepository(PermissionsOrmEntity);
    const rolePermRepo = dataSource.getRepository(RolePermissionsOrmEntity);

    for (const permName of allPermissions) {
        const existing = await permRepo.findOne({ where: { action: permName } });
        if (!existing) {
            const perm = permRepo.create({ action: permName });
            await permRepo.save(perm);
        }
    }

    for (const roleName of allRoles) {
        const existing = await roleRepo.findOne({ where: { name: roleName } });
        if (!existing) {
            const role = roleRepo.create({ name: roleName });
            await roleRepo.save(role);
        }
    }

    for (const [roleName, perms] of Object.entries(rolePermissionMap) as [Role, Permission[]][]) {
        const role = await roleRepo.findOne({ where: { name: roleName } });
        for (const permName of perms) {
            const permission = await permRepo.findOne({ where: { action: permName } });

            if (role && permission) {
                const exists = await rolePermRepo.findOne({
                    where: {
                        role: { id: role.id },
                        permission: { id: permission.id },
                    },
                    relations: ['role', 'permission'],
                });

                if (!exists) {
                    const rp = rolePermRepo.create({ role, permission });
                    await rolePermRepo.save(rp);
                }
            }
        }
    }

    console.log('✅ Seeded roles and permissions successfully.');
    await dataSource.destroy();
}
seedRolesAndPermissions();
