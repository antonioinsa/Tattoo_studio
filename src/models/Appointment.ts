import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { Client } from "./Client"
import { Worker } from "./Worker"

@Entity("appointments")
export class Appointment extends BaseEntity {

    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    client_id!: number

    @Column()
    tattoo_artist_id!: number

    @Column()
    intervention_type!: string

    @Column()
    price!: string

    @Column()
    day!: string

    @Column()
    hour!: string

    @Column()
    article!: string

    @Column()
    description!: string

    @Column()
    created_at!: string

    @Column()
    updated_at!: string

    @ManyToOne(() => Client, (client) => client.clientAppointments)
    @JoinColumn({ name: "client_id" })
    clientAppointment!: Client;

    @ManyToOne(() => Worker, (worker) => worker.workerAppointments)
    @JoinColumn({ name: "tattoo_artist_id" })
    workerAppointment!: Worker;


}