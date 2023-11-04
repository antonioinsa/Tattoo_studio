import { BaseEntity, Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { Appointment } from "./Appointment"
import { Portfolio } from "./Portfolio"
import { Client } from "./Client"

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

    
    @OneToMany(() => Portfolio, (portfolio) => portfolio.workerPortfolio)
    workerPortfolios!: Portfolio[];

    @OneToMany(() => Appointment, (appointment) => appointment.workerAppointment)
    workerAppointments!: Appointment[];
    
    @ManyToMany ( () => Client)
    @JoinTable ({
      name:"appointments",
      joinColumn:{
          name:"tattoo_artist_id",
          referencedColumnName: "id",
      },
      inverseJoinColumn: {
          name:"client_id",
          referencedColumnName:"id",
      }
    })workerClients!:Client [];
}

