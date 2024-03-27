import {
  findBaseById,
  insertBase,
  deleteBaseById,
  updateBaseById,
} from './base.service';
import { MyDataSource } from '../config/data-source';
import { Base } from '../entity/base.entity';

jest.mock('../config/data-source', () => ({
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
      delete: jest.fn().mockReturnThis(), // Mock the delete method of query builder
      from: jest.fn().mockReturnThis(), // Mock the from method of query builder
      where: jest.fn().mockReturnThis(), // Mock the where method of query builder
      execute: jest.fn().mockResolvedValue({}), // Mock execute method to return expected result
    }),
  },
}));

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
