import { ILineChart } from '../model/LineChart';
import GitProjectSchema from '../schemas/GitProject';
import AppError from '../error/AppError';
import { alongTime } from '../utils/chartUtil';

interface IQueries {
    project: string;
    dateBegin?: Date;
    dateEnd?: Date;
}

export default class StatisticLinearChartService {
    async execute({
        project,
        dateBegin,
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
        console.log(`Count Items: ${items.length}`);

        return alongTime(items);
    }
}
