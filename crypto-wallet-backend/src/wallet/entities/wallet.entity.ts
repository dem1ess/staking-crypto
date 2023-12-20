import {User} from 'src/user/entities/user.entity';
import {Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn,} from 'typeorm';
import {Transaction} from "../../transaction/entities/transaction.entity";

@Entity()
export class Wallet {
    @PrimaryGeneratedColumn({name: 'wallet_id'})
    id: number;

    @Column()
    name: string;

    @Column({default: 0})
    balance: number;

    @Column({type: 'float', default: 0})
    equivalent: number;

    @Column()
    type: string;

    @Column()
    imgURL: string;

    @Column()
    userId: number;

    @ManyToOne(() => User, (user) => user.wallets)
    user: User;

    @OneToMany(() => Transaction, (transaction) => transaction.wallet)
    transactions: Transaction[];

    @Column()
    address: string;
}
