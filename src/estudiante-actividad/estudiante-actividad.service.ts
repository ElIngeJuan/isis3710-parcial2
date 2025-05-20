/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EstudianteEntity } from '../estudiante/estudiante.entity';
import { ActividadEntity } from '../actividad/actividad.entity';
import { Repository } from 'typeorm';

@Injectable()
export class EstudianteActividadService {
    constructor(
        @InjectRepository(EstudianteEntity)
        private readonly estudianteRepository: Repository<EstudianteEntity>,
        @InjectRepository(ActividadEntity)
        private readonly actividadRepository: Repository<ActividadEntity>,
    ){}

    async inscribirseActividad(estudianteId: number, actividadId: number): Promise<EstudianteEntity> {
        const actividad = await this.actividadRepository.findOne({
            where: { id: actividadId },
            relations: ['estudiantes'],
        });
        if (!actividad) {
            throw new Error('Actividad no encontrada');
        }
        if (actividad.estado !== 0) {
            throw new Error('La actividad no está disponible para inscripción');
        }
        if (actividad.estudiantes.length >= actividad.cupoMaximo) {
            throw new Error('No hay cupo');
        }

        const estudiante = await this.estudianteRepository.findOne({
            where: { id: estudianteId },
            relations: ['actividades'],
        });
        if (!estudiante) {
            throw new Error('Estudiante no encontrado');
        }
        if (estudiante.actividades.findIndex(actividad => actividad.id === actividadId) !== -1) {
            throw new Error('ya está inscrito');
        }
        

        estudiante.actividades.push(actividad);
        return await this.estudianteRepository.save(estudiante);
    }
}
