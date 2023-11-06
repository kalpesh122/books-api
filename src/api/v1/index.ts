import 'dotenv/config';
import validateEnv from './utils/validateEnv';
import App from './app';
import AuthRoute from '../v1/routes/auth.routes';
import definitions from '../v1/utils/definitions/custom.d';

validateEnv();

const app = new App([new AuthRoute()], Number(process.env.PORT));

app.listen();
