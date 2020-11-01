import { Router } from 'express';
import SearchRepositoryController from '@controllers/SearchRepositoryController';
import LinearChartController from '@controllers/LinearChartController';

const routes = Router();

routes.post('/search', SearchRepositoryController.index);
routes.get('/statistic/chart', LinearChartController.index);

export default routes;
