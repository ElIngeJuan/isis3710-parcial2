/* eslint-disable prettier/prettier */
import { Controller, Param, Post } from '@nestjs/common';

import { EstudianteActividadService } from './estudiante-actividad.service';

@Controller('estudiantes')
export class EstudianteActividadController {
    constructor(
        private readonly estudianteService: EstudianteActividadService) {}
    
    @Post(':estudianteId/actividades/:actividadId')
    async inscribirActividad(@Param('estudianteId') estudianteId: number, @Param('actividadId') actividadId: number) {
        const estudiante = await this.estudianteService.inscribirseActividad(estudianteId, actividadId);
        return estudiante;


    }
}
