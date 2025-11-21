import express from 'express';
import cors from 'cors';
import routes from './routes';
import { errorHandler } from './middleware/errorHandler';

class App {
    public server: express.Application;

    constructor() {
        this.server = express();
        this.routes();
        this.middlewares();
    }

    private middlewares(): void {
        this.server.use(express.json());
        this.server.use(cors()); 
        this.server.use(errorHandler);
    }

    private routes(): void {
        this.server.use(routes);
    }
}

export default new App().server;