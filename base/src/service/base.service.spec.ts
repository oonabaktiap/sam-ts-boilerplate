import {
  findBaseById,
  insertBase,
  deleteBaseById,
  updateBaseById,
  findCachedBaseById,
  setCachedBaseById
} from './base.service';
import { MyDataSource } from '../config/data-source.config';
import { Base } from '../entity/base.entity';
import { redisClient } from '../config/redis.config';

jest.mock('../config/data-source.config', () => ({
  MyDataSource: {
    isInitialized: false,
    initialize: jest.fn(),
    getRepository: jest.fn().mockReturnValue({
      findOneBy: jest.fn(),
      save: jest.fn(),
      remove: jest.fn().mockResolvedValue({}),
      update: jest.fn(),
    }),
    createQueryBuilder: jest.fn().mockReturnValue({
      delete: jest.fn().mockReturnThis(), 
      from: jest.fn().mockReturnThis(), 
      where: jest.fn().mockReturnThis(), 
      execute: jest.fn().mockResolvedValue({}), 
    }),
    
  },
}));

jest.mock('../config/redis.config', () => ({
  redisClient: {
      isOpen: true,
      isReady: true,
      connect: jest.fn(),
      get: jest.fn(),
      set: jest.fn(),
  },
}));

describe('Cache Functions', () => {
  jest.mock('./base.service', () => ({
    findBaseById: jest.fn(),
  }));
  
  beforeEach(() => {
      jest.clearAllMocks();
  });

  it('findCachedBaseById - cache hit', async () => {
      (redisClient.get as jest.Mock).mockResolvedValueOnce(JSON.stringify({ id: 1, name: 'Sample Base' }));

      const result = await findCachedBaseById(1);

      expect(result).toEqual({ id: 1, name: 'Sample Base' });
      expect(redisClient.get).toHaveBeenCalledWith('base:1');
  });

  it('findCachedBaseById - cache miss', async () => {
    (redisClient.get as jest.Mock).mockResolvedValueOnce(null);

    const result = await findCachedBaseById(1);

    expect(result).toBeNull();
    expect(redisClient.get).toHaveBeenCalledWith('base:1');
  });

  it('setCachedBaseById', async () => {
    const mockBase = { id: 1, varString: 'mock', varNumber: 123 };
    (MyDataSource.getRepository(Base) as any).findOneBy.mockResolvedValue(
      mockBase,
    );
    await setCachedBaseById(1);
    
    expect(MyDataSource.initialize).toHaveBeenCalled();
    expect(
      (MyDataSource.getRepository(Base) as any).findOneBy,
    ).toHaveBeenCalledWith({ id: 1 });
    expect(redisClient.set).toHaveBeenCalledWith('base:1', JSON.stringify({ id: 1, varString: 'mock', varNumber: 123 }));
  });
});

describe('findBaseById', () => {
  it('should find base by id', async () => {
    const mockBase = { id: 1, varString: 'mock', varNumber: 123 };
    (MyDataSource.getRepository(Base) as any).findOneBy.mockResolvedValue(
      mockBase,
    );

    const result = await findBaseById(1);
    expect(result).toEqual(mockBase);
    expect(MyDataSource.initialize).toHaveBeenCalled();
    expect(
      (MyDataSource.getRepository(Base) as any).findOneBy,
    ).toHaveBeenCalledWith({ id: 1 });
  });
});

describe('insertBase', () => {
  it('should insert a new base', async () => {
    const mockBase = { id: 1, varString: 'mock', varNumber: 123 };
    (MyDataSource.getRepository(Base) as any).save.mockResolvedValue(mockBase);

    const result = await insertBase('mock', 123);
    expect(result).toEqual(mockBase);
    expect(MyDataSource.initialize).toHaveBeenCalled();
    expect((MyDataSource.getRepository(Base) as any).save).toHaveBeenCalledWith(
      expect.any(Base),
    );
  });
});

describe('updateBaseById', () => {
  it('should update base by id', async () => {
    const mockBase = { id: 1, varString: 'mock', varNumber: 123 };
    (MyDataSource.getRepository(Base) as any).update.mockResolvedValue(
      mockBase,
    );

    const result = await updateBaseById(1, 'updated', 456);
    expect(result).toEqual(mockBase);
    expect(MyDataSource.initialize).toHaveBeenCalled();
    expect(
      (MyDataSource.getRepository(Base) as any).update,
    ).toHaveBeenCalledWith(1, { varNumber: 456, varString: 'updated' });
  });
});

describe('deleteBaseById', () => {
  it('should delete base by id', async () => {
    const id = 1;
    const deleteResult = await deleteBaseById(id);
    expect(deleteResult).toEqual({});
    expect(MyDataSource.initialize).toHaveBeenCalled();
    expect(MyDataSource.createQueryBuilder().delete).toHaveBeenCalled();
    expect(MyDataSource.createQueryBuilder().from).toHaveBeenCalledWith(Base);
    expect(MyDataSource.createQueryBuilder().where).toHaveBeenCalledWith(
      'id = :id',
      { id },
    );
    expect(MyDataSource.createQueryBuilder().execute).toHaveBeenCalled();
  });
});
