/* eslint-disable prettier/prettier */
import { IsNumber, IsString } from "class-validator";
import { ActividadEntity } from "src/actividad/actividad.entity";
import { EstudianteEntity } from "src/estudiante/estudiante.entity";
import { Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

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
