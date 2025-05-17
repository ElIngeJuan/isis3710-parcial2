/* eslint-disable prettier/prettier */
import { IsNumber, IsString } from "class-validator";
import { EstudianteEntity } from "../estudiante/estudiante.entity";
import { ReseñaEntity } from "../reseña/reseña.entity";
import { Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ActividadEntity {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @IsString()
    titulo: string;

    @IsString()
    fecha: string;

    @IsNumber()
    cupoMaximo: number;

    @IsNumber()
    estado: number;

    @ManyToMany(()=>EstudianteEntity, estudiante => estudiante.actividades)
    estudiantes: EstudianteEntity[];

    @OneToMany(()=> ReseñaEntity, reseña => reseña.actividad)
    reseñas: ReseñaEntity[];

}
