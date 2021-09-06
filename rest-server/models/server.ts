import express, { Application } from 'express';
import cors from 'cors';

import userRoutes from '../routes/user';

class Server {

    private app  : Application;
    private port : string;
    private apiPaths = {
        users: '/api/users'
    }

    constructor() {
        this.app  = express();
        this.port = process.env.PORT || '8000';

        this.middlewares();
        this.routes();
    }

    middlewares() {

        this.app.use( cors() );

        //body reading
        this.app.use( express.json() );

        //public folder
        this.app.use( express.static( 'public' ) );

    }

    routes() {
        this.app.use( this.apiPaths.users, userRoutes );
    }

    listen() {
        this.app.listen( this.port, () => {
            console.log(`Server running on port ${this.port}`);
        })
    }

}

export default Server;