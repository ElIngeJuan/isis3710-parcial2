/* eslint-disable prettier/prettier */
import { EstudianteEntity } from "../estudiante/estudiante.entity";
import { ReseñaEntity } from "../reseña/reseña.entity";
import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ActividadEntity {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    titulo: string;

    @Column()
    fecha: string;

    @Column()
    cupoMaximo: number;

    @Column()
    estado: number;

    @ManyToMany(()=>EstudianteEntity, estudiante => estudiante.actividades)
    @JoinTable()
    estudiantes: EstudianteEntity[];

    @OneToMany(()=> ReseñaEntity, reseña => reseña.actividad)
    reseñas: ReseñaEntity[];

}
