import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'user' })
export class user {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ default: null, type: 'varchar' })
    userName: string;

    @Column({ default: null, type: 'int' })
    age: number;
}
