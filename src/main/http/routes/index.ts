import { Router } from 'express';
import controller from '@controllers/SearchRepositoryController';

const routes = Router();

routes.post('/search', controller.index);

export default routes;
