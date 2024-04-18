import { Column } from "typeorm";

export class BasicField {

    @Column({ default: null, type: 'date' })
    createdAt: Date;

    @Column({ default: null, type: 'date' })
    updatedAt: Date;

    @Column({ default: null, type: 'varchar' })
    createdBy: String;

    @Column({ default: null, type: 'varchar' })
    updatedBy: String;
}