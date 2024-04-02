import { Base } from '../entity/base.entity';
import { MyDataSource } from '../config/data-source.config';
import { redisClient } from '../config/redis.config';

export const findCachedBaseById = async (id_: number): Promise<any> => {
    console.log(`checking cache with key : base:${id_}`)
    if (!redisClient.isOpen && !redisClient.isReady) redisClient.connect();
    const redisValue = await redisClient.get(`base:${id_}`);
    console.log(`redisValue : ${redisValue}`);
    if (redisValue) {
        return JSON.parse(redisValue);
    }
    return null;
}

export const setCachedBaseById = async (id_: number): Promise<any> => {
    if (!MyDataSource.isInitialized) await MyDataSource.initialize();
    const base = await MyDataSource.getRepository(Base).findOneBy({
        id: id_
    });
    console.log(`set cache key base:${id_} with value ${JSON.stringify(base)}`)
    if (!redisClient.isOpen && !redisClient.isReady) redisClient.connect();
    await redisClient.set(`base:${id_}`, JSON.stringify(base));
    return base;
}

export const findBaseById = async (id_: number): Promise<any> => {
    // console.log(`checking cache with key : base:${id_}`)
    // if(!redisClient.isOpen && !redisClient.isReady) redisClient.connect();
    // const redisValue = await redisClient.get(`base:${id_}`);
    // console.log(`redisValue : ${redisValue}`);
    // if(redisValue){
    //     return JSON.parse(redisValue);
    // }
    if (!MyDataSource.isInitialized) await MyDataSource.initialize();
    const base = await MyDataSource.getRepository(Base).findOneBy({
        id: id_
    });
    // if(base){
    //     console.log('base :', base);
    //     redisClient.set(`base:${id_}`, JSON.stringify(base));
    // }
    return base;
};

export const insertBase = async (varString: string, varNumber: number): Promise<any> => {
    console.log('insertBase');
    console.log('varString :', varString);
    console.log('varNumber :', varNumber);

    const toBeInsertedBase: Base = new Base();
    toBeInsertedBase.varNumber = varNumber;
    toBeInsertedBase.varString = varString;

    console.log('toBeInsertedBase :', toBeInsertedBase);

    if (!MyDataSource.isInitialized) await MyDataSource.initialize();
    const insertedBase = await MyDataSource.getRepository(Base).save(toBeInsertedBase);
    return insertedBase;
};

export const deleteBaseById = async (id_: number): Promise<any> => {
    if (!MyDataSource.isInitialized) await MyDataSource.initialize();
    // const toBeDeletedBase = await findBaseById(id_);
    // const deleteResult = await MyDataSource.getRepository(Base).remove(toBeDeletedBase);
    const deleteResult = await MyDataSource.createQueryBuilder()
        .delete()
        .from(Base)
        .where("id = :id", { id: id_ })
        .execute();
    // const deleteResult = await MyDataSource.getRepository(Base).delete(id_);
    return deleteResult;
}

export const updateBaseById = async (id_: number, varString: string, varNumber: number): Promise<any> => {
    if (!MyDataSource.isInitialized) await MyDataSource.initialize();
    const updatedBase = await MyDataSource.getRepository(Base).update(id_, { varNumber, varString });
    return updatedBase;
}

export const getBaseNoDb = async (): Promise<any> => {
    const base: Base = new Base();
    base.id = 3;
    base.varNumber = 33;
    base.varString = '33';
    return base;
}
