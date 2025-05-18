/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ActividadEntity } from './actividad.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ActividadService {
    constructor(
        @InjectRepository(ActividadEntity)
        private readonly actividadRepository: Repository<ActividadEntity>,
    ){}

    async crearActividad(actividad: ActividadEntity): Promise<ActividadEntity> {
        if (actividad.titulo.length < 15) {
            throw new Error('El título debe tener al menos 15 caracteres');
        }
        if (/[^a-zA-Z0-9 ]/.test(actividad.titulo)) {
            throw new Error('El título no puede tener símbolos');
        }
        return await this.actividadRepository.save(actividad);
    }

    async cambiarEstadoActividad(id: number, estado: number): Promise<ActividadEntity> {
        const actividad = await this.actividadRepository.findOne({
            where: { id: id }, relations: ['estudiantes'],
        });
        if (!actividad) {
            throw new Error('Actividad no encontrada');
        }
        if (estado < 0 || estado > 2) {
            throw new Error('Estado inválido');
        }
        const cupoLleno = actividad.estudiantes.length * 0.8;
        if (estado === 1 && actividad.estado === 0) {
            if (actividad.estudiantes.length < cupoLleno) {
                throw new Error('No se puede cerrar la actividad');
            }
        }

        if (estado === 2 && actividad.estado === 1) {
            if (actividad.estudiantes.length === actividad.cupoMaximo) {
                throw new Error('No se puede finalizar la actividad');
            }
        }

        actividad.estado = estado;
        return await this.actividadRepository.save(actividad);
    }

    async findAllActividadesByDate(fecha: string): Promise<ActividadEntity[]> {
        const actividades = await this.actividadRepository.find({
            where: { fecha: fecha }, 
        });
        if (!actividades) {
            throw new Error('No hay actividades');
        }
        return actividades;
    }
    
}
