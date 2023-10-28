import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity("products")
export class Product extends BaseEntity{
    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    intervention_type!: string

    @Column()
    description!: string

    @Column()
    article!: string

    @Column()
    created_at!: Date

    @Column()
    updated_at!: Date

}
