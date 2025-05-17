/* eslint-disable prettier/prettier, @typescript-eslint/unbound-method */
import { Test, TestingModule } from '@nestjs/testing';
import { EstudianteService } from './estudiante.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { EstudianteEntity } from './estudiante.entity';
import { Repository } from 'typeorm';

describe('EstudianteService', () => {
  let service: EstudianteService;
  let repository: jest.Mocked<Repository<EstudianteEntity>>;

  const mockEstudiante: EstudianteEntity = {
    id: 1,
    numCedula: 12345678,
    nombre: 'Juan Perez',
    correo: 'juan.perez@example.com',
    programa: 'Ingenieria de Sistemas',
    semestre: 5,
    reseñas: [],
    actividades: [],
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EstudianteService,
        {
          provide: getRepositoryToken(EstudianteEntity),
          useValue: {
            save: jest.fn(),
            findOne: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<EstudianteService>(EstudianteService);
    repository = module.get(getRepositoryToken(EstudianteEntity));
  });

  it('debería crear el estudiante cuando los datos son válidos', async () => {
    repository.save.mockResolvedValue(mockEstudiante);
    const result = await service.crearEstudiante(mockEstudiante);
    expect(repository.save).toHaveBeenCalledWith(mockEstudiante);
    expect(result).toEqual(mockEstudiante);
  });

  it('debería lanzar error si el correo es inválido', async () => {
    const badEmail = { ...mockEstudiante, correo: 'correo-invalido' };
    await expect(service.crearEstudiante(badEmail)).rejects.toThrow(
      'Email inválido',
    );
  });

  it('debería lanzar error si el semestre es menor que 1', async () => {
    const badSem = { ...mockEstudiante, semestre: 0 };
    await expect(service.crearEstudiante(badSem)).rejects.toThrow(
      'Semestre inválido',
    );
  });

  it('debería lanzar error si el semestre es mayor que 10', async () => {
    const badSem = { ...mockEstudiante, semestre: 11 };
    await expect(service.crearEstudiante(badSem)).rejects.toThrow(
      'Semestre inválido',
    );
  });

  it('debería retornar el estudiante existente por id', async () => {
    repository.findOne.mockResolvedValue(mockEstudiante);
    const result = await service.findEstudianteById(1);

    expect(repository.findOne).toHaveBeenCalledWith({
      where: { id: 1 },
      relations: ['actividad', 'reseña'],
    });
    expect(result).toEqual(mockEstudiante);
  });

  it('debería lanzar error si no encuentra el estudiante', async () => {
    repository.findOne.mockResolvedValue(null);
    await expect(service.findEstudianteById(99)).rejects.toThrow(
      'Estudiante no encontrado',
    );
  });
});
