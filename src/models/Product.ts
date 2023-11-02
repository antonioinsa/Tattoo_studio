import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { Portfolio } from "./Portfolio"

@Entity("products")
export class Product extends BaseEntity{
    @PrimaryGeneratedColumn()
    id!: number
    
    @Column()
    description!: string

    @Column()
    article!: string

    @Column()
    created_at!: Date

    @Column()
    updated_at!: Date

    @OneToMany(() => Portfolio, (portfolio) => portfolio.productPortfolio)
    productPortfolios!: Portfolio[]

}
