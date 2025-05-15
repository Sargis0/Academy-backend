import {Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";
import {UserOrmEntity} from "./user.orm-entity";

@Entity({name: "news"})
export class NewsOrmEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    title: string;

    @Column("text")
    content: string;

    @ManyToOne(() => UserOrmEntity)
    author: UserOrmEntity;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date
}
