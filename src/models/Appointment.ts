import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm"

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

}