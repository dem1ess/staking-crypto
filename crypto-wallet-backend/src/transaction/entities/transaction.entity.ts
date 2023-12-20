import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import {User} from '../../user/entities/user.entity';
import {Wallet} from '../../wallet/entities/wallet.entity';

@Entity()
export class Transaction {
    @PrimaryGeneratedColumn({name: 'transaction_id'})
    id: number;

    @Column({type: 'float'})
    amount: number;

    @ManyToOne(() => User, (user) => user.transactions, {
        onDelete: 'SET NULL',
    })
    @JoinColumn({name: 'user_id'})
    user: User;

    @Column({nullable: true})
    type: string;

    @ManyToOne(() => Wallet, (wallet) => wallet.transactions, {
        onDelete: 'SET NULL',
    })
    @JoinColumn({name: 'wallet_id'})
    wallet: Wallet;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
