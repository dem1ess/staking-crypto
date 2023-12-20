import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class AdressWallet {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({name: 'address'})
    address: string;
}
