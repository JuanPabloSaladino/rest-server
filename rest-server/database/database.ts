import parseConfiguration from "../main/utils";

const sql   = require('mssql');

class DataBase {

    private DBConfig : object = {
        user        : "sa",
        password    : "4485",
        server      : "DESKTOP-SI8VLN6",
        database    : "mssql_practice",
    
        options: {
            encrypt: false,
            trustServerCertificate: true //change to true for local dev / self-signed certs
        }
    }
 
    private filePath = './external_config/db-config.json';

    constructor() {

    }

    connect() : Promise <any> {
        let pool = new sql.ConnectionPool(this.DBConfig);
        let poolConnection = pool.connect();

        return poolConnection;
    }

    async connectAndExecuteQuery(query : string) : Promise <any> {
        let poolConnection = await this.connect();
        
        try{
            const request   = poolConnection.request();
            const result    = await request.query(query);
            
            poolConnection.close();

            return result.recordset;
        }catch(error){
            console.log(error);
        }
    }

    async connectAndSelectUserById( userId : string) : Promise<any> {
        const query = parseConfiguration(this.filePath)["selectUserById"];

        let poolConnection = await this.connect();
        
        try{
            const user = poolConnection.request()
                            .input('USER_ID', sql.VarChar, userId)
                            .query(query)
            
            return user;
        }catch(error){
            console.log(error);
        }
    }

    async insertUserInDB(userName : string, userLastName : string, userPlasticNumber : string) : Promise<any> {
        const query = parseConfiguration(this.filePath)["insertUser"];

        let poolConnection = await this.connect();

        try {
            const insert = poolConnection.request()
            insert.input('USER_NAME', sql.VarChar(100), userName)
            insert.input('USER_LAST_NAME', sql.VarChar(100), userLastName)
            insert.input('USER_PLASTIC_NUMBER', sql.VarChar(100), userPlasticNumber)
            insert.query(query)

            return insert;
        } catch (error) {
            console.log(error);
        }
    }

}

export default DataBase;