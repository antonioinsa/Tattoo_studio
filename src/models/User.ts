import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity("users")
export class User extends BaseEntity {

    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    First_name!: string

    @Column()
    Last_name!: string

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
    created_at!: Date

    @Column()
    updated_at!: Date

}
