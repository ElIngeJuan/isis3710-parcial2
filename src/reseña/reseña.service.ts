/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ReseñaEntity } from './reseña.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ReseñaService {
    constructor(
        @InjectRepository(ReseñaEntity)
        private readonly reseñaRepository: Repository<ReseñaEntity>,
    ) { }

    async agregarReseña(reseña: ReseñaEntity): Promise<ReseñaEntity> {
        if(reseña.actividad.estado !== 2 && reseña.estudiante.actividades.findIndex(actividad => actividad.id === reseña.actividad.id) === -1){
            throw new Error('La actividad no está finalizada');
        }

        return await this.reseñaRepository.save(reseña);
    }

}
