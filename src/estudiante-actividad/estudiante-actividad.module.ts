/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EstudianteEntity } from 'src/estudiante/estudiante.entity';
import { EstudianteService } from 'src/estudiante/estudiante.service';
import { EstudianteActividadController } from './estudiante-actividad.controller';
import { EstudianteActividadService } from './estudiante-actividad.service';
import { ActividadEntity } from 'src/actividad/actividad.entity';

@Module({
  providers: [EstudianteService, EstudianteActividadService],
  imports: [TypeOrmModule.forFeature([EstudianteEntity, ActividadEntity])],
  controllers: [EstudianteActividadController],
})
export class EstudianteActividadModule {}
