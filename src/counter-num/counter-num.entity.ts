import { Counter } from "src/counter/counter.entity";
import { User } from "src/users/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, RelationId } from "typeorm";

export enum CounterStatus {
    Waiting = 'Waiting',
    Serving = 'Serving',
    Completed = 'Completed',
}

@Entity('counter_num')
export class CounterNum {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    num: number;

    @Column({
        type: 'enum',
        enum: CounterStatus,
        default: CounterStatus.Waiting,
    })
    status: CounterStatus;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;

    @ManyToOne(() => User, (u) => u.counter_nums)
    @JoinColumn({ name: 'user_id' })
    user: User;

    @ManyToOne(() => Counter, (c) => c.id)
    @JoinColumn({ name: 'counter_id' })
    counter_id: Counter;
}
