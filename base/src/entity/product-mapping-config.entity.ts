import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'product_mapping_config' })
export class ProductMappingConfig {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ default: null, type: 'varchar' })
    fCode: string;
    
    @Column({ default: null, type: 'varchar' })
    productCode: string;

    @Column({ default: null, type: 'varchar' })
    planCode: string;
}