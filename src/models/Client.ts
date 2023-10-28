import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { Appointment } from "./Appointment"


@Entity("clients")
export class Client extends BaseEntity {

    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    first_name!: string

    @Column()
    last_name!: string

    @Column()
    email!: string

    @Column()
    phone!: string

    @Column()
    password!: string

    @Column()
    is_active!: boolean

    @Column()
    role!: string

    @Column()
    created_at!: string

    @Column()
    updated_at!: string

    @OneToMany(() => Appointment, (appointment) => appointment.client)
    appointments!: Appointment[]

}
