import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, OneToOne, JoinColumn, PrimaryColumn} from "typeorm";
import{puesto} from "./puesto"

@Entity()
export class User extends BaseEntity{
    @PrimaryGeneratedColumn()
    id_usuario!:number;
    @Column()
    nombre!:String;
    @Column()
    apellidos!:String;
    @OneToOne(() => puesto)
    @JoinColumn()
    id_puesto_fk!: Promise<puesto>;
    

    

}