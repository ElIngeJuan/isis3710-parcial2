import { Test, TestingModule } from '@nestjs/testing';
import { EstudianteActividadController } from './estudiante-actividad.controller';

describe('EstudianteActividadController', () => {
  let controller: EstudianteActividadController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EstudianteActividadController],
    }).compile();

    controller = module.get<EstudianteActividadController>(EstudianteActividadController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
