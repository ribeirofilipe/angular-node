import { Router } from 'express';
import ProductController from './controllers/ProductController';

const routes = new Router();

routes.get('/', ProductController.index);
routes.post('/publicaSkus', ProductController.store);

export default routes;