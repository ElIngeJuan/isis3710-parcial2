/* eslint-disable prettier/prettier */
import { IsNumber, IsString } from "class-validator";
import { ActividadEntity } from "../actividad/actividad.entity";
import { ReseñaEntity } from "../reseña/reseña.entity";
import { Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class EstudianteEntity {

    @PrimaryGeneratedColumn('increment')
    id: number;

    @IsNumber()
    numCedula: number;

    @IsString()
    nombre: string;

    @IsString()
    correo: string;

    @IsString()
    programa: string;

    @IsNumber()
    semestre: number;

    @ManyToOne(()=> ReseñaEntity,reseña=> reseña.estudiante)
    reseñas: ReseñaEntity[];

    @ManyToMany(()=>ActividadEntity, actividad => actividad.estudiantes)
    actividades: ActividadEntity[];

}
