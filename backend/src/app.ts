import express from 'express';
import cors from 'cors';
import routes from './routes';
import { errorHandler } from './middleware/errorHandler';

class App {
    public server: express.Application;

    constructor() {
        this.server = express();
        this.middlewares();
        this.routes();
        this.handleErrors();
    }

    private middlewares(): void {
        this.server.use(express.json());
        this.server.use(cors()); 
    }

    private routes(): void {
        this.server.use(routes);
    }

    private handleErrors(): void {
        this.server.use(errorHandler);
    }
}

export default new App().server;