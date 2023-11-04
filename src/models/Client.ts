import { BaseEntity, Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { Appointment } from "./Appointment"
import { Worker } from "./Worker"

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

    @OneToMany(() => Appointment, (appointment) => appointment.clientAppointment)
    clientAppointments!: Appointment[]
    
    @ManyToMany ( () => Worker)
  @JoinTable ({
    name:"appointments",
    joinColumn:{
        name:"client_id",
        referencedColumnName: "id",
    },
    inverseJoinColumn: {
        name:"tattoo_artist_id",
        referencedColumnName:"id",
    }
  })clientWorkers!:Worker [];

}
