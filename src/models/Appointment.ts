import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { Client } from "./Client"
import { Worker } from "./Worker"

@Entity("appointment")
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
    day!: string

    @Column()
    appointment_time!: string

    @Column()
    appointment_updated!: string

    @ManyToOne(() => Client, (client) => client.appointments)
    @JoinColumn({ name: "client_id" })
    client!: Client

    @ManyToOne(() => Worker, (worker) => worker.appointments)
    @JoinColumn({ name: "tattoo_artist_id" })
    worker!: Worker[]

}