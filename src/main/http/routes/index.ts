import { Router } from 'express';
import controller from '../../../modules/gitRepository/Controler/SearchRepositoryController';

const routes = Router();

routes.post('/search', controller.index);

export default routes;
