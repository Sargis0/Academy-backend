import { DataSource } from 'typeorm';
import { UserOrmEntity } from "../user.orm-entity";
import { RoleOrmEntity } from '../role.orm-entity';
import * as bcrypt from 'bcryptjs';
import {AppDataSource} from "../data-source/data-source";

const dataSource = AppDataSource;

const seedAdminUser = async (dataSource: DataSource) => {
    await dataSource.initialize();
    const roleRepo = dataSource.getRepository(RoleOrmEntity);
    const userRepo = dataSource.getRepository(UserOrmEntity);

    const adminEmail = 'admin@example.com';

    const existing = await userRepo.findOneBy({ email: adminEmail });
    if (existing) return;

    const adminRole = await roleRepo.findOneBy({ name: 'system_admin' });
    if (!adminRole) {
        throw new Error('Role "system_admin" not found');
    }

    const hashedPassword = await bcrypt.hash('admin1234', 10);

    const adminUser = userRepo.create({
        name: 'Admin',
        surname: 'User',
        email: adminEmail,
        password: hashedPassword,
        is_activated: true,
        is_public: true,
        role: adminRole,
    });

    await userRepo.save(adminUser);
    console.log('✅ Admin user seeded successfully');
    await dataSource.destroy();
};
seedAdminUser(dataSource)
