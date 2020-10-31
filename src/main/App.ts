import 'reflect-metadata';
import 'express-async-errors';
import express, { Request, Response, NextFunction } from 'express';
import routes from './http/routes/index';
import AppError from '../app/error/AppError';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(routes);

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
    if (err instanceof AppError) {
        return response.status(err.statusCode).json({
            status: 'error',
            message: err.message,
        });
    }

    return response.status(500).json({
        status: 'error',
        message: 'Internal server error',
    });
});

export default app;
