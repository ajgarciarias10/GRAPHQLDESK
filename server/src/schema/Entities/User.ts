import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, OneToOne, JoinColumn} from "typeorm";
import{puesto} from "./puesto"

@Entity()
export class User extends BaseEntity{
    @PrimaryGeneratedColumn()
    dni!:String;
    @Column()
    nombre!:String;
    @Column()
    apellidos!:String;
    @Column()
    puestoempresa!:String;
    @OneToOne(() => puesto)
    @JoinColumn()
    id_puesto_fk!: Promise<puesto>;
    

    

}