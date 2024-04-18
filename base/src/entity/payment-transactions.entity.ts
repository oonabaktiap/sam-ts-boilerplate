import { Column, Entity, Generated, PrimaryGeneratedColumn } from "typeorm";
import { BasicField } from "./basic-fields";
import { PaymentStatus } from "../enum/payment-status.enum";
import { IssuanceStatus } from "../enum//issuance-status.enum";

@Entity({ name: 'payment_transaction' })
export class PaymentTransaction extends BasicField {
    // PaymentReferenceNo (randomly generate)
    // ProductPaymentConfigId
    // TransactionId
    // PaymentStatus (NEW / FAILED / PAID)
    // IssuanceStatus (NEW / FAILED / ISSUED / NULL)
    // PaymentGatewayRequest (JSON)
    // PaymentGatewayResponse (JSON)
    // IssuanceReferenceNo ( proposalNo / JourneyId / etc)
    // AdditionalInfo (JSON)
    // submittedAt

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ default: null, type: 'varchar' })
    paymentReferenceNo: any;

    @Column({ default: null, type: 'int' })
    productPaymentConfigId: number;

    @Column({ default: null, type: 'string' })
    @Generated("uuid")
    transactionId: string;

    @Column({
        type: "enum",
        enum: PaymentStatus,
        default: PaymentStatus.NEW
    })
    paymentStatus: string;

    @Column({
        type: "enum",
        enum: IssuanceStatus,
        default: IssuanceStatus.NEW
    })
    issuanceStatus: string;

    @Column({ default: null, type: 'json' })
    paymentGatewayRequest: string;

    @Column({ default: null, type: 'json' })
    paymentGatewayResponse: string;

    @Column({ default: null, type: 'varchar' })
    IssuanceReferenceNo: string;

    @Column({ default: null, type: 'json' })
    additionalInfo: string;

    @Column({ default: null, type: 'date' })
    submittedAt: string;
}