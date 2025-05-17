/* eslint-disable prettier/prettier, @typescript-eslint/unbound-method */
import { Test, TestingModule } from '@nestjs/testing';
import { ReseñaService } from './reseña.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ReseñaEntity } from './reseña.entity';
import { Repository } from 'typeorm';
import { ActividadEntity } from '../actividad/actividad.entity';
import { EstudianteEntity } from '../estudiante/estudiante.entity';

describe('ReseñaService', () => {
  let service: ReseñaService;
  let repository: jest.Mocked<Repository<ReseñaEntity>>;

  const mockActividad: ActividadEntity = {
    id: 10,
    titulo: 'Prueba',
    fecha: '2025-06-01',
    cupoMaximo: 5,
    estado: 2,          
    estudiantes: [],
    reseñas: [],
  };

  const mockEstudiante: EstudianteEntity = {
    id: 3,
    numCedula: 123,
    nombre: 'Test',
    correo: 'test@example.com',
    programa: 'Prog',
    semestre: 2,
    reseñas: [],
    actividades: [{ id: 10 } as ActividadEntity],
  };

  const mockReseña: ReseñaEntity = {
    id: 0,
    comentario: 'Muy buena',
    calificacion: 5,
    fecha: '2025-06-02',
    estudiante: mockEstudiante,
    actividad: mockActividad,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ReseñaService,
        {
          provide: getRepositoryToken(ReseñaEntity),
          useValue: { save: jest.fn() },
        },
      ],
    }).compile();

    service = module.get<ReseñaService>(ReseñaService);
    repository = module.get(getRepositoryToken(ReseñaEntity));
  });

  it('debería agregar la reseña cuando todo es válido', async () => {
    repository.save.mockResolvedValue({ ...mockReseña, id: 1 });
    const result = await service.agregarReseña(mockReseña);
    expect(repository.save).toHaveBeenCalledWith(mockReseña);
    expect(result.id).toBe(1);
  });

  it('debería lanzar error si la actividad no está finalizada', async () => {
    const reseñaBad = {
      ...mockReseña,
      actividad: { ...mockActividad, estado: 1 },
    };
    await expect(service.agregarReseña(reseñaBad)).rejects.toThrow(
      'La actividad no está finalizada',
    );
  });

  it('debería lanzar error si el estudiante no está inscrito', async () => {
    const reseñaBad = {
      ...mockReseña,
      estudiante: { ...mockEstudiante, actividades: [] },
    };
    await expect(service.agregarReseña(reseñaBad)).rejects.toThrow(
      'No esta inscrito',
    );
  });
});
