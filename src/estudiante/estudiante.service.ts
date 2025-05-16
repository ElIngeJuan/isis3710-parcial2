/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { EstudianteEntity } from './estudiante.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class EstudianteService {
    constructor(
        @InjectRepository(EstudianteEntity)
        private readonly estudianteRepository: Repository<EstudianteEntity>)
        {}


     async crearEstudiante(estudiante: EstudianteEntity): Promise<EstudianteEntity> {
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(estudiante.correo)) {
            throw new Error('Email inválido');
        }
        if (estudiante.semestre < 1 || estudiante.semestre > 10) {
            throw new Error('Semestre inválido');
        }
        return await this.estudianteRepository.save(estudiante);
     }

     async findEstudianteById(id: number): Promise<EstudianteEntity> {
        const estudiante = await this.estudianteRepository.findOne({
            where: { id }, relations: ['actividad', 'reseña'],
        });
        if (!estudiante) {
            throw new Error('Estudiante no encontrado');
        }
        return estudiante;
     }

}
