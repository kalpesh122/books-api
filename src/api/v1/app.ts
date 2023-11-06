import express, { Application } from 'express';
import compression from 'compression';
import cors from 'cors';
import morgan from 'morgan';
import Route from './utils/interfaces/route.interface';
import ErrorMiddleware from './middleware/error.middleware';
import helmet from 'helmet';
import MongoDBConnection from './models/connect';
import requestLogger from './middleware/requestLogger.middleware';
import errorLogger from './middleware/errorLogger.middleware';

class App {
  public express: Application;
  public port: number;

  private mongoDB = new MongoDBConnection(
    process.env.MONGO_USER,
    process.env.MONGO_PASSWORD,
    process.env.MONGO_PATH,
    {}
  );

  constructor(routes: Route[], port: number) {
    this.express = express();
    this.port = port;

    this.mongoDB.connect();
    this.initialiseMiddleware();
    this.initialiseRoutes(routes);
    this.initialiseErrorHandling();
  }

  private initialiseMiddleware(): void {
    this.express.use(helmet());
    this.express.use(cors());
    this.express.use(morgan('development'));
    this.express.use(express.json());
    this.express.use(express.urlencoded({ extended: false }));
    this.express.use(compression());
    this.express.use(requestLogger);
    this.express.use(errorLogger);
  }

  private initialiseRoutes(routes: Route[]): void {
    routes.forEach((route: Route) => {
      this.express.use('/api/v1', route.router);
    });
  }
  private initialiseErrorHandling(): void {
    this.express.use(ErrorMiddleware);
  }

  public listen(): void {
    this.express.listen(this.port, () => {
      console.log(`App listening on the port ${this.port}`);
    });
  }
}

export default App;
