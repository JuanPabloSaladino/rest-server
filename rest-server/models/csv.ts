class CSV {

    private createCsvWriter = require('csv-writer').createObjectCsvWriter;

    constructor() { }

    writeUserInCSV(userName: string, userLasName: string, userPlasticNumber: string) : Promise<any> {

        const csvWriter = this.createCsvWriter({
            path: 'E:/dev/node/typescript/rest-server/resources/sampledata/users.csv',
            header: [
                {id: 'nombre', title: 'NOMBRE'},
                {id: 'apellido', title: 'APELLIDO'},
                {id: 'numerodeplastico', title: 'NUMERODEPLASTICO'},
            ],
            append: true
        });

        const record = [
            {nombre: userName, apellido: userLasName, numerodeplastico: userPlasticNumber}
        ];
        
        let result = csvWriter.writeRecords(record);

        return result;

    }

    readCSV() : Promise<any> {
        const csv       = require('csv-parser')
        const fs        = require('fs')
        const results : any  = [];

        const path = 'E:/dev/node/typescript/rest-server/resources/sampledata/users.csv';

        //Creo un objeto de tipo Promise para luego poder devolverlo.
        //Este objeto contendra cada uno de los usuarios leidos en el CSV.
        let prom = new Promise( resolve => {

            fs.createReadStream( path )
            .pipe( csv() )
            .on('data', ( data ) => {
                results.push( data );
            })
            .on( 'end', () => {
                //Resuelvo la promesa con el metodo "resolve"
                resolve(results) ;
            });    
        });

        //Devuelvo el objeto de tipo Promise.
        //Para poder ser "recibido", se debe hacer uso de .then. 
        return prom;
    }
}

export default CSV;