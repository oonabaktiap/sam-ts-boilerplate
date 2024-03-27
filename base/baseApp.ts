/* eslint-disable prettier/prettier */
import 'reflect-metadata';
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { Base } from '../base/src/entity/base.entity';
import { findBaseById, deleteBaseById, insertBase, updateBaseById } from 'src/service/base.service';
import { BaseResponse } from 'src/dto/oona.base.response.dto';

/**
 *
 * Event doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html#api-gateway-simple-proxy-for-lambda-input-format
 * @param {Object} event - API Gateway Lambda Proxy Input Format
 *
 * Return doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html
 * @returns {Object} object - API Gateway Lambda Proxy Output Format
 *
 */


export const lambdaHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    try {
        // console.log('incoming event : ',JSON.stringify(event));
        if (event.resource === '/base/create') { //Create
            console.log('into insertBaseFunc')
            return await insertBaseFunc(event);
        }
        if (event.resource === '/base/{id}' && event.httpMethod === 'GET' ) { //Read
            console.log('into findBaseByIdFunc')
            return await findBaseByIdFunc(event);
        }
        if (event.resource === '/base/{id}' && event.httpMethod === 'PUT') {//Update
            console.log('into updateBaseByIdFunc')
            return await updateBaseByIdFunc(event);
        }
        if (event.resource === '/base/{id}' && event.httpMethod === 'DELETE') { //Delete
            console.log('into deleteBaseByIdFunc')
            return await deleteBaseByIdFunc(event);
        }
        return {
            statusCode: 404,
            body: JSON.stringify({
                message: 'not found',
            }),
        };
    } catch (err) {
        console.log(err);
        return {
            statusCode: 500,
            body: JSON.stringify({
                message: 'some error happened',
            }),
        };
    }
};

async function insertBaseFunc(event: APIGatewayProxyEvent) {
    if (event.body) {
        const createBaseParams = JSON.parse(event.body);
        console.log('event.body json object : ', createBaseParams);
        const base: Base = await insertBase(createBaseParams.varString, createBaseParams.varNumber);

        const baseResponse = new BaseResponse();
        if (base) {
            baseResponse.code = 0;
            baseResponse.status = 'success';
            baseResponse.message = JSON.stringify(base);
        }else{
            baseResponse.code = -1;
            baseResponse.status = 'failed';
            baseResponse.message = "failed to create and insert base"
        }
        return {
            statusCode: 200,
            body: JSON.stringify({
                baseResponse,
            }),
        };
    }
    return {
        statusCode: 500,
        body: JSON.stringify({
            message: 'body not found',
        }),
    };
}
async function findBaseByIdFunc(event : APIGatewayProxyEvent) {
    if (event && event.pathParameters && event.pathParameters.id) {
        const id: number = +event.pathParameters.id;
        console.log("event path parameters : ", event.pathParameters)
        console.log("event pathParameter id : ",id)
        const base = await findBaseById(id);
        if(base){
            return {
                statusCode: 200,
                body: JSON.stringify({
                    base,
                }),
            };
        }
        return {
            statusCode: 400,
            body: JSON.stringify({
                message: 'Base with ID not found',
            }),
        };
    }
    return {
        statusCode: 400,
        body: JSON.stringify({
            message: 'id cannot be empty',
        }),
    };
}
async function updateBaseByIdFunc(event: APIGatewayProxyEvent) {
    if (event && event.pathParameters && event.pathParameters.id) {
        const id: number = +event.pathParameters.id;
        console.log("event path parameters : ", event.pathParameters)
        console.log("event pathParameter id : ",id)
        if(event.body){
            const updateBaseParams = JSON.parse(event.body);
            console.log("event body json object : ", updateBaseParams)
            const base = await updateBaseById(id, updateBaseParams.varString, updateBaseParams.varNumber)
            if(base){
                return {
                    statusCode: 200,
                    body: JSON.stringify({
                        base,
                    }),
                };
            }
        }else{
            return {
                statusCode: 400,
                body: JSON.stringify({
                    message: 'body cannot be empty',
                }),
            };  
        }
    }

    return {
        statusCode: 400,
        body: JSON.stringify({
            message: 'id cannot be empty',
        }),
    };
}

async function deleteBaseByIdFunc(event: APIGatewayProxyEvent) {
    if (event && event.pathParameters && event.pathParameters.id) {
        
        const id: number = +event.pathParameters.id;
        console.log("event path parameters : ", event.pathParameters)
        console.log("event pathParameter id : ",id)
        const deleteResult  =  await deleteBaseById(id);
        if(deleteResult){
            return {
                statusCode: 200,
                body: deleteResult,
            };
        }
    }
    return {
        statusCode: 400,
        body: JSON.stringify({
            message: 'id cannot be empty',
        }),
    };
}

