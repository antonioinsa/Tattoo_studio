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

    @Column({ type: "decimal", precision: 7, scale: 2, default: 0 })
    price!: number


    @Column({ type: "date" })
    date!: string;

    @Column({ type: "enum", enum: ["morning", "afternoon"] })
    hour!: string

    @Column()
    article!: string

    @Column()
    description!: string

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    created_at!: Date

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP", onUpdate: "CURRENT_TIMESTAMP" })
    updated_at!: Date

    @ManyToOne(() => Client, (client) => client.clientAppointments)
    @JoinColumn({ name: "client_id" })
    clientAppointment!: Client;

    @ManyToOne(() => Worker, (worker) => worker.workerAppointments)
    @JoinColumn({ name: "tattoo_artist_id" })
    workerAppointment!: Worker;


}