import {Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn,} from 'typeorm';
import {Transaction} from "../../transaction/entities/transaction.entity";
import {Wallet} from "../../wallet/entities/wallet.entity";
import {Deposit} from "../../deposit/entities/deposit.entity";

@Entity()
export class User {
    @PrimaryGeneratedColumn({name: 'user_id'})
    id: number;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column()
    role: string;

    @OneToMany(() => Wallet, (wallet) => wallet.user, {
        onDelete: 'CASCADE',
    })
    wallets: Wallet[];

    @OneToMany(() => Transaction, (transaction) => transaction.user, {
        onDelete: 'CASCADE',
    })
    transactions: Transaction[];

    @OneToMany(() => Deposit, (deposit) => deposit.user)
    deposits: Deposit[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
