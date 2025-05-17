/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EstudianteModule } from './estudiante/estudiante.module';
import { ActividadModule } from './actividad/actividad.module';
import { ReseñaModule } from './reseña/reseña.module';
import { EstudianteActividadModule } from './estudiante-actividad/estudiante-actividad.module';
import { EstudianteEntity } from './estudiante/estudiante.entity';
import { ActividadEntity } from './actividad/actividad.entity';
import { ReseñaEntity } from './reseña/reseña.entity';

@Module({
  imports: [
    EstudianteEntity,
    ActividadEntity,
    ReseñaEntity,
    TypeOrmModule.forRoot({
     type: 'postgres',
     host: 'localhost',
     port: 5432,
     username: 'postgres',
     password: '1972',
     database: 'museum',
     entities: [EstudianteEntity, ActividadEntity, ReseñaEntity],
     dropSchema: true,
     synchronize: true,
   }),
    EstudianteModule,
    ActividadModule,
    ReseñaModule,
    EstudianteActividadModule,
 ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
