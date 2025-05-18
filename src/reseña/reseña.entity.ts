/* eslint-disable prettier/prettier */
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ActividadEntity } from "../actividad/actividad.entity";
import { EstudianteEntity } from "../estudiante/estudiante.entity";

@Entity()
export class ReseñaEntity {

    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    comentario: string;

    @Column()
    calificacion: number;

    @Column()
    fecha: string;

    @ManyToOne(()=>EstudianteEntity, estudiante => estudiante.reseñas)
    estudiante: EstudianteEntity;

    @ManyToOne(()=>ActividadEntity, actividad => actividad.reseñas)
    actividad: ActividadEntity;

}
