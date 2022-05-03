import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, OneToOne, JoinColumn } from "typeorm";
import { User } from "./User";

@Entity()
export class puesto extends BaseEntity{
    @PrimaryGeneratedColumn()
    id_puesto!:number;
    @Column({type: 'datetime'})
    fecha_de_inicio!:Date;
    @Column({type: 'datetime'})
    fecha_de_fin!:Date;
    @Column()
    ocupado!:Boolean;
    @Column()
    disponibleParcialmente!:Boolean;
    @Column()
    bloqueado!:Boolean;
    @Column()
    ciudad!:String;
    @Column()
    n_planta!:number;
    @Column()
    observaciones!:String;



}