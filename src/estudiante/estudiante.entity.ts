/* eslint-disable prettier/prettier */
import { ActividadEntity } from "../actividad/actividad.entity";
import { ReseñaEntity } from "../reseña/reseña.entity";
import { Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class EstudianteEntity {

    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    numCedula: number;

    @Column()
    nombre: string;

    @Column()
    correo: string;

    @Column()
    programa: string;

    @Column()
    semestre: number;

    @ManyToOne(()=> ReseñaEntity,reseña=> reseña.estudiante)
    reseñas: ReseñaEntity[];

    @ManyToMany(()=>ActividadEntity, actividad => actividad.estudiantes)
    actividades: ActividadEntity[];

}
