import { Request, Response, Router } from 'express';

const routes = Router();

routes.get('/', async (request: Request, response: Response) => {
    const a = 12;

    const b = a + 2;
    return response.json(b);
});

export default routes;
