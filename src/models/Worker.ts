import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm"
//import { Appointment } from "./Appointment"
//import { Portfolio } from "./Portfolio"

@Entity("workers")
export class Worker extends BaseEntity {
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
    nationality!: string

    @Column()
    password!: string

    @Column()
    is_active!: boolean

    @Column()
    role!: string

    @Column()
    created_at!: Date

    @Column()
    updated_at!: Date

    //@OneToMany(() => Appointment, (appointment) => appointment.worker)
    //appointments!: Appointment[]
//
    //@OneToMany(() => Portfolio, (portfolio) => portfolio.worker)
    //portfolios!: Portfolio[]

}

