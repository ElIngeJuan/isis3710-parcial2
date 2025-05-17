/* eslint-disable prettier/prettier, @typescript-eslint/unbound-method */
import { Test, TestingModule } from '@nestjs/testing';
import { EstudianteActividadService } from './estudiante-actividad.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { EstudianteEntity } from '../estudiante/estudiante.entity';
import { ActividadEntity } from '../actividad/actividad.entity';
import { Repository } from 'typeorm';

describe('EstudianteActividadService', () => {
  let service: EstudianteActividadService;
  let estudianteRepo: jest.Mocked<Repository<EstudianteEntity>>;
  let actividadRepo: jest.Mocked<Repository<ActividadEntity>>;

  const mockActividad: ActividadEntity = {
    id: 42,
    titulo: 'Actividad de prueba',
    fecha: '2025-06-01',
    cupoMaximo: 2,
    estado: 0,
    estudiantes: [],
    reseñas: [],
  };

  const mockEstudiante: EstudianteEntity = {
    id: 7,
    numCedula: 87654321,
    nombre: 'Ana Gómez',
    correo: 'ana.gomez@example.com',
    programa: 'Matemáticas',
    semestre: 3,
    reseñas: [],
    actividades: [],
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EstudianteActividadService,
        {
          provide: getRepositoryToken(EstudianteEntity),
          useValue: {
            findOne: jest.fn(),
            save: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(ActividadEntity),
          useValue: {
            findOne: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<EstudianteActividadService>(EstudianteActividadService);
    estudianteRepo = module.get(getRepositoryToken(EstudianteEntity));
    actividadRepo = module.get(getRepositoryToken(ActividadEntity));
  });

  it('debería inscribir al estudiante en la actividad correctamente', async () => {
    actividadRepo.findOne.mockResolvedValue({ ...mockActividad });
    estudianteRepo.findOne.mockResolvedValue({ ...mockEstudiante });
    estudianteRepo.save.mockImplementation(e => Promise.resolve(e as any));

    const result = await service.inscribirseActividad(7, 42);

    expect(actividadRepo.findOne).toHaveBeenCalledWith({ where: { id: 42 } });
    expect(estudianteRepo.findOne).toHaveBeenCalledWith({ where: { id: 7 }, relations: ['actividades'] });
    expect(result.actividades).toContainEqual(expect.objectContaining({ id: 42 }));
  });

  it('debería lanzar error si la actividad no existe', async () => {
    actividadRepo.findOne.mockResolvedValue(null);
    await expect(service.inscribirseActividad(7, 42)).rejects.toThrow(
      'Actividad no encontrada',
    );
  });

  it('debería lanzar error si la actividad no está abierta', async () => {
    actividadRepo.findOne.mockResolvedValue({ ...mockActividad, estado: 1 });
    await expect(service.inscribirseActividad(7, 42)).rejects.toThrow(
      'La actividad no está disponible para inscripción',
    );
  });

  it('debería lanzar error si no hay cupo disponible', async () => {
    actividadRepo.findOne.mockResolvedValue({ 
      ...mockActividad, 
      estudiantes: [
        { ...mockEstudiante, id: 1, actividades: [] },
        { ...mockEstudiante, id: 2, actividades: [] }
      ] 
    });
    await expect(service.inscribirseActividad(7, 42)).rejects.toThrow(
      'No hay cupo',
    );
  });


  it('debería lanzar error si el estudiante no existe', async () => {
    actividadRepo.findOne.mockResolvedValue({ ...mockActividad });
    estudianteRepo.findOne.mockResolvedValue(null);
    await expect(service.inscribirseActividad(7, 42)).rejects.toThrow(
      'Estudiante no encontrado',
    );
  });

  it('debería lanzar error si el estudiante ya está inscrito', async () => {
    actividadRepo.findOne.mockResolvedValue({ ...mockActividad });
    estudianteRepo.findOne.mockResolvedValue({
      ...mockEstudiante,
      actividades: [{ id: 42 } as ActividadEntity],
    });
    await expect(service.inscribirseActividad(7, 42)).rejects.toThrow(
      'ya está inscrito',
    );
  });
});
