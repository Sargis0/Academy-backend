import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity({name: "permissions"})
export class PermissionsOrmEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({unique: true})
    action: string
}
