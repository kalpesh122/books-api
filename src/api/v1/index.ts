import 'dotenv/config';
import validateEnv from './utils/validateEnv';
import App from './app';
import BookRoute from '../v1/routes/book.routes';
import definitions from '../v1/utils/definitions/custom.d';

validateEnv();

const app = new App([new BookRoute()], Number(process.env.PORT));

app.listen();
