import { Request, Response } from 'express';
import { isValid, parseISO, isBefore } from 'date-fns';
import GitProjectRepo from '@infra/database/GItProjectRepo';
import StatisticLinearChartService from '../services/StatisticLinearChartService';
import AppError from '../error/AppError';

class LinearChartController {
    async index(request: Request, response: Response): Promise<Response> {
        const { project, dateStart, dateEnd }: any = request.query;

        if (!project)
            throw new AppError('GitHub Project name is required', 422);

        const isDate =
            isValid(parseISO(dateStart)) && isValid(parseISO(dateEnd));

        if (isDate && !isBefore(parseISO(dateStart), parseISO(dateEnd))) {
            throw new AppError(
                'Dates Invalid. Start date must be before the end date.',
                422,
            );
        }

        const lineChart = await new StatisticLinearChartService(
            new GitProjectRepo(),
        ).execute({
            project,
            dateStart,
            dateEnd,
        });
        return response.json(lineChart);
    }
}
export default new LinearChartController();
