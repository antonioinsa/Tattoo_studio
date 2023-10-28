import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm"

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
    
    }
    
