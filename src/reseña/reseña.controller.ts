/* eslint-disable prettier/prettier */
import { Body, Controller, Post } from '@nestjs/common';
import { ReseñaService } from './reseña.service';
import { ReseñaDto } from './reseña.dto/reseña.dto';
import { ReseñaEntity } from './reseña.entity';
import { plainToInstance } from 'class-transformer';

@Controller('resenias')
export class ReseñaController {
    constructor(
        private readonly reseñaService: ReseñaService,
    ) {}

    @Post()
    async create(@Body() reseña: ReseñaDto) {
        const reseñaCreada: ReseñaEntity = plainToInstance(ReseñaEntity, reseña);
        return await this.reseñaService.agregarReseña(reseñaCreada);
    }   
    
}
