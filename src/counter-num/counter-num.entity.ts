import { Counter } from "src/counter/counter.entity";
import { User } from "src/users/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('counter_num')
export class CounterNum {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    num: number;

    @Column({
        type: 'enum',
        enum: [
            'Waiting',
            'Serving',
            'Completed'
        ],
        default: 'Waiting',
    })
    status: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;

    @ManyToOne(() => User, (u) => u.counterNums)
    @JoinColumn({ name: 'user_id' })
    user: User;

    @ManyToOne(() => Counter, (c) => c.id)
    @JoinColumn({ name: 'counter_id' })
    counter_id: Counter;
}
