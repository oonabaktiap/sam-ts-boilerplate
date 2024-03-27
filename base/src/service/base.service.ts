/* eslint-disable prettier/prettier */
import { Base } from '../entity/base.entity';
import { MyDataSource } from '../config/data-source';

export const findBaseById = async (id_: number): Promise<any> => {
    if (!MyDataSource.isInitialized) await MyDataSource.initialize();
    const base = await MyDataSource.getRepository(Base).findOneBy({
            id : id_ 
    });
    return base;
};

export const insertBase = async (varString: string, varNumber: number): Promise<any> => {
    console.log('insertBase');
    console.log('varString :', varString);
    console.log('varNumber :', varNumber);

    const toBeInsertedBase :Base = new Base();
    toBeInsertedBase.varNumber = varNumber;
    toBeInsertedBase.varString = varString;
    
    console.log('toBeInsertedBase :', toBeInsertedBase);

    if (!MyDataSource.isInitialized) await MyDataSource.initialize();
    const insertedBase = await MyDataSource.getRepository(Base).save(toBeInsertedBase);
    return insertedBase;
};

export const deleteBaseById = async(id_: number): Promise<any> => {
    if (!MyDataSource.isInitialized) await MyDataSource.initialize();
    // const toBeDeletedBase = await findBaseById(id_);
    // const deleteResult = await MyDataSource.getRepository(Base).remove(toBeDeletedBase);
    const deleteResult = await MyDataSource.createQueryBuilder()
    .delete()
    .from(Base)
    .where("id = :id", {id: id_})
    .execute();
    // const deleteResult = await MyDataSource.getRepository(Base).delete(id_);
    return deleteResult;
}

export const updateBaseById = async(id_: number, varString: string, varNumber: number): Promise<any> => {
    if (!MyDataSource.isInitialized) await MyDataSource.initialize();
    const updatedBase = await MyDataSource.getRepository(Base).update(id_, {varNumber, varString});
    return updatedBase;
}

