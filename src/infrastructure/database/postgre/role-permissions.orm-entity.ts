import {Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {RoleOrmEntity} from "./role.orm-entity";
import {PermissionsOrmEntity} from "./permissions.orm-entity";

@Entity({name: "role_permissions"})
export class RolePermissionsOrmEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => RoleOrmEntity, {onDelete: "CASCADE"})
    role: RoleOrmEntity;

    @ManyToOne(() => PermissionsOrmEntity, {onDelete: "CASCADE"})
    permission: PermissionsOrmEntity
}
