/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { ActividadDto } from './actividad.dto/actividad.dto';
import { ActividadEntity } from './actividad.entity';
import { plainToInstance } from 'class-transformer';
import { ActividadService } from './actividad.service';

@Controller('actividades')
export class ActividadController {
    constructor(
        private readonly actividadService: ActividadService
    ) {}

    @Post()
    async create(@Body() actividad: ActividadDto) {
        const actividadCreada: ActividadEntity = plainToInstance(ActividadEntity, actividad);
        return await this.actividadService.crearActividad(actividadCreada);

    }

    @Put(':actividadId')
    async updateActividad(@Param('actividadId') actividadId: number, @Body() actividad: ActividadDto) {
        const actividadActualizada: ActividadEntity = plainToInstance(ActividadEntity, actividad);
        return await this.actividadService.cambiarEstadoActividad(actividadId, actividadActualizada.estado);
    }

    @Get(':fecha')
    async findAllByDate(@Param('fecha') fecha: string) {
        return await this.actividadService.findAllActividadesByDate(fecha);
    }
}
