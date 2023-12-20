import {Transform} from 'class-transformer';
import {IsDateString} from 'class-validator';
import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn,} from 'typeorm';
import {User} from '../../user/entities/user.entity';

@Entity()
export class Deposit {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'decimal', precision: 10, scale: 2})
    amount: number;

    @Column({type: 'decimal', precision: 5, scale: 3})
    interestRate: number;

    @IsDateString()
    @Transform(({value}) => new Date(value).toISOString().split('T')[0])
    @Column({type: 'date'})
    startDate: string;

    @IsDateString()
    @Transform(({value}) => new Date(value).toISOString().split('T')[0])
    @Column({type: 'date'})
    endDate: string;

    @ManyToOne(() => User, (user) => user.deposits)
    @JoinColumn({name: 'user_id'})
    user: User;
}
