import { ILineChart } from '../model/LineChart';
import GitProjectSchema from '../schemas/GitProject';
import AppError from '../error/AppError';
import { alongTime, dayOverDay } from '../utils/chartUtil';

interface IQueries {
    project: string;
    dateStart?: Date;
    dateEnd?: Date;
}

export default class StatisticLinearChartService {
    async execute({
        project,
        dateStart,
        dateEnd,
    }: IQueries): Promise<Array<ILineChart>> {
        const projectGitHub = await GitProjectSchema.findOne({
            name: project,
        });

        if (!projectGitHub)
            throw new AppError(
                `Statistics about GitHub: ${project} is not found`,
                404,
            );
        const { items }: any = projectGitHub;
        if (dateStart && dateEnd) {
            return dayOverDay(items, dateStart, dateEnd);
        }

        return alongTime(items);
    }
}
