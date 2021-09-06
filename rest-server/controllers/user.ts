import { Request, Response } from "express";

import DataBase from "../database/database";
import parseConfiguration from "../main/utils";
import CSV from "../models/csv";

const DB = new DataBase();
const filePath = './external_config/db-config.json';

export const getUsers = ( req : Request, res : Response ) => {
    const query = parseConfiguration(filePath)["selectAllUsers"];

    DB.connectAndExecuteQuery(query)
        .then( users => {
            res.status(200).json({
                msg : 'getUsers',
                users

            });
        });
}

export const getUser = ( req : Request, res : Response ) => {
    const { id } = req.params;

    DB.connectAndSelectUserById( id )
        .then( user => {
            res.status(200).json({
                msg : 'getUsers',
                id,
                user: user.recordset
            });
        });
}

export const postUser = ( req : Request, res : Response ) => {
    const { userName, userLastName, userPlasticNumber } = req.body;

    DB.insertUserInDB( userName, userLastName, userPlasticNumber )
        .then( result => {
            res.status(201).json({
                msg : 'postUser',
                userName,
                userLastName,
                userPlasticNumber,
                result
            });
        });
}

export const putUser = ( req : Request, res : Response ) => {
    const { id } = req.params;
    const { body } = req;

    res.json({
        msg : 'putUser',
        body,
        id
    });
}

export const deleteUser = ( req : Request, res : Response ) => {
    const { id } = req.params;

    res.json({
        msg : 'deleteUser',
        id
    });
}

export const writeUserInCSV = ( req : Request, res : Response ) => {
    const { userName, userLastName, userPlasticNumber } = req.body;

    const csv = new CSV();

    csv.writeUserInCSV( userName, userLastName, userPlasticNumber )
        .then( (result) => {
            res.status(200).json({
                msg : 'for-each-user',
                status: 'done',
                userName,
                userLastName,
                userPlasticNumber,
                result
            });
        }); 
}

export const insertUsersInDBFromCSV = ( req : Request, res : Response ) => {
    const { userName, userLastName, userPlasticNumber } = req.body;

    const csv = new CSV();

    csv.readCSV()
        .then( users => {
            users.forEach( user => {
                const userName = user.NOMBRE;
                const userLastName = user.APELLIDO;
                const userPlasticNumber = user.NUMERODEPLASTICO;

                console.log( `${user.NOMBRE}, ${user.APELLIDO}, ${user.NUMERODEPLASTICO}` );

                DB.insertUserInDB( userName, userLastName, userPlasticNumber );
            });

            res.status(200).json( { 
                msg : 'insert-user-in-db-from-csv',
                status: 'done',   
                users         
            } );

        });



}