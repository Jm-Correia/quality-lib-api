import { Request, Response } from 'express';
import StatisticLinearChartService from '../services/StatisticLinearChartService';

class LinearChartController {
    async index(request: Request, response: Response): Promise<Response> {
        const { project, dateBegin, dateEnd }: any = request.query;
        console.log(project, dateBegin, dateEnd);
        const lineChart = await new StatisticLinearChartService().execute({
            project,
        });
        return response.json(lineChart);
    }
}
export default new LinearChartController();
