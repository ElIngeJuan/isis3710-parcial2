/* eslint-disable prettier/prettier */
import { IsNumber, IsString } from "class-validator";
import { Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ActividadEntity } from "../actividad/actividad.entity";
import { EstudianteEntity } from "../estudiante/estudiante.entity";

@Entity()
export class ReseñaEntity {

    @PrimaryGeneratedColumn('increment')
    id: number;

    @IsString()
    comentario: string;

    @IsNumber()
    calificacion: number;

    @IsString()
    fecha: string;

    @ManyToOne(()=>EstudianteEntity, estudiante => estudiante.reseñas)
    estudiante: EstudianteEntity;

    @ManyToOne(()=>ActividadEntity, actividad => actividad.reseñas)
    actividad: ActividadEntity;

}
