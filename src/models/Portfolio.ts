import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
//import { Product } from "./Product"
//import { Worker } from "./Worker"

@Entity("portfolio")
export class Portfolio extends BaseEntity{

        @PrimaryGeneratedColumn()
        id!: number
    
        @Column()
        tattoo_artist_id!: number
    
        @Column()
        product_id!: number
    
        @Column()
        created_at!: Date
    
        @Column()
        updated_at!: Date
    
        //@ManyToOne(() => Worker, (worker) => worker.portfolios)
        //@JoinColumn({ name: "tattoo_artist_id" })
        //worker!: Worker[]
//
        //@ManyToOne(() => Product, (product) => product.portfolios)
        //@JoinColumn({ name: "tattoo_artist_id" })
        //product!: Product[]

    }
    
