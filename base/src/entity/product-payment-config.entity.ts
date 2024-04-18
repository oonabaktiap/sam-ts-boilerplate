import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { BasicField } from "./basic-fields";

@Entity({ name: 'product_payment_config' })
export class ProductPaymentConfig extends BasicField {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'product_mapping_config_id', default: null, type: 'int' })
    productMappingConfigId: number;

    @Column({ default: null, type: 'varchar' })
    provider: string;

    @Column({ default: null, type: 'json' })
    paymentConfig: string;

    @Column({ default: null, type: 'int' })
    insureMoPortalId: number;

    @Column({ default: null, type: 'boolean' })
    isActive: boolean;

}