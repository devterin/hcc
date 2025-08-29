import { CounterServices } from "src/counter-service/counter-service.entity";
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('counter')
export class Counter {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    name: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;

    @ManyToMany(() => CounterServices, service => service.counters)
    @JoinTable({
        name: 'counter_services', //name tables
        joinColumn: {
            name: 'counter_id',
            referencedColumnName: 'id',
        },
        inverseJoinColumn: {
            name: 'service_id',
            referencedColumnName: 'id',
        },
    })
    services: CounterServices[];

}