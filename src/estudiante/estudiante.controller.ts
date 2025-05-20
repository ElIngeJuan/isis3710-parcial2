/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { EstudianteService } from './estudiante.service';
import { EstudianteDto } from './estudiante.dto/estudiante.dto';
import { EstudianteEntity } from './estudiante.entity';
import { plainToInstance } from 'class-transformer';

@Controller('estudiantes')
export class EstudianteController {
    constructor(
        private readonly estudianteService: EstudianteService
    ){}

    @Post()
    async create(@Body() estudiante: EstudianteDto){
        const estudianteCreado: EstudianteEntity = plainToInstance(EstudianteEntity, estudiante);
        return await this.estudianteService.crearEstudiante(estudianteCreado);
    }

    @Get(':estudianteId')
    async findOne(@Param('estudianteId') estudianteId: number) {
        return await this.estudianteService.findEstudianteById(estudianteId);
    }

}
