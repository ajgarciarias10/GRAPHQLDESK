import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, OneToOne, JoinColumn, PrimaryColumn} from "typeorm";
import{User} from "./User"

@Entity()
export class Favoritos extends BaseEntity{
    @PrimaryGeneratedColumn()
    id_favorito!:number;
    @Column()
    puesto!:String
    @OneToOne(() => User)
    @JoinColumn()
    id_user_fk!: Promise<User>;
}