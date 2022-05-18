import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, OneToOne, JoinColumn, PrimaryColumn } from "typeorm";
import { User } from "./User";

@Entity()
export class puesto extends BaseEntity{
    @PrimaryColumn()
    id_puesto!:String;
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
    n_planta!:String;
    @Column()
    observaciones!:String;



}