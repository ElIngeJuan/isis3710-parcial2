/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { ActividadService } from './actividad.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ActividadEntity } from './actividad.entity';
import { Repository } from 'typeorm';

describe('ActividadService', () => {
  let service: ActividadService;
  let repository: jest.Mocked<Repository<ActividadEntity>>;

  const mockActividad: ActividadEntity = {
    id: 1,
    titulo: 'Titulo de actividad valido',
    fecha: '2025-05-20',
    cupoMaximo: 10,
    estado: 0,
    estudiantes: [],
    reseñas: [],
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ActividadService,
        {
          provide: getRepositoryToken(ActividadEntity),
          useValue: {
            find: jest.fn(),
            findOne: jest.fn(),
            save: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<ActividadService>(ActividadService);
    repository = module.get(getRepositoryToken(ActividadEntity));
  });

  it('debería crear la actividad cuando el título es válido', async () => {
    repository.save.mockResolvedValue(mockActividad);
    const result = await service.crearActividad(mockActividad);
    expect(result).toEqual(mockActividad);
  });

  it('debería lanzar error si el título es muy corto', async () => {
    await expect(
      service.crearActividad({ ...mockActividad, titulo: 'Muy corto' }),
    ).rejects.toThrow('El título debe tener al menos 15 caracteres');
  });

  it('debería lanzar error si el título tiene símbolos', async () => {
    const tituloConSimbolo = 'Titulo invalido con #';
    expect(tituloConSimbolo.length).toBeGreaterThanOrEqual(15);
    await expect(
      service.crearActividad({ ...mockActividad, titulo: tituloConSimbolo }),
    ).rejects.toThrow('El título no puede tener símbolos');
  });

  it('debería cambiar el estado correctamente', async () => {
    const actividadDB = { ...mockActividad, estudiantes: new Array(8) }; 
    repository.findOne.mockResolvedValue(actividadDB);
    repository.save.mockResolvedValue({ ...actividadDB, estado: 1 });

    const result = await service.cambiarEstadoActividad(1, 1);
    expect(result.estado).toBe(1);
  });

  it('debería lanzar error si la actividad no existe', async () => {
    repository.findOne.mockResolvedValue(null);
    await expect(service.cambiarEstadoActividad(99, 1)).rejects.toThrow(
      'Actividad no encontrada',
    );
  });

  it('debería rechazar estados fuera de rango', async () => {
    repository.findOne.mockResolvedValue(mockActividad);
    await expect(service.cambiarEstadoActividad(1, 5)).rejects.toThrow(
      'Estado inválido',
    );
  });

  it('permite cerrar incluso con <80% (lógica actual)', async () => {
    // Según tu lógica, no dará error
    const actividadDB = { ...mockActividad, estudiantes: new Array(5) };
    repository.findOne.mockResolvedValue(actividadDB);
    repository.save.mockResolvedValue({ ...actividadDB, estado: 1 });

    const result = await service.cambiarEstadoActividad(1, 1);
    expect(result.estado).toBe(1);
  });

  it('no permite finalizar si el cupo está lleno', async () => {
    const actividadDB = {
      ...mockActividad,
      estado: 1,
      estudiantes: new Array(10),
    };
    repository.findOne.mockResolvedValue(actividadDB);
    await expect(service.cambiarEstadoActividad(1, 2)).rejects.toThrow(
      'No se puede finalizar la actividad',
    );
  });


  it('debería devolver actividades por fecha', async () => {
    repository.find.mockResolvedValue([mockActividad]);
    const result = await service.findAllActividadesByDate('2025-05-20');
    expect(result).toEqual([mockActividad]);
  });

  it('debería devolver arreglo vacío si no hay actividades', async () => {
    repository.find.mockResolvedValue([]);
    const result = await service.findAllActividadesByDate('2025-05-20');
    expect(result).toEqual([]);
  });
});
