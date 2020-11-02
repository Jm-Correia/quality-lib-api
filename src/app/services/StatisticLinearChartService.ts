import IGitHubProjectRepo from '@infra/database/interface/IGitHubProjectRepo';
import { ILineChart } from '../model/LineChart';
import AppError from '../error/AppError';
import { alongTime, dayOverDay } from '../utils/chartUtil';

interface IQueries {
    project: string;
    dateStart?: Date;
    dateEnd?: Date;
}

export default class StatisticLinearChartService {
    private gitHubProjectRepo: IGitHubProjectRepo;

    constructor(gitHubProjectRepo: IGitHubProjectRepo) {
        this.gitHubProjectRepo = gitHubProjectRepo;
    }

    async execute({
        project,
        dateStart,
        dateEnd,
    }: IQueries): Promise<Array<ILineChart>> {
        const projectGitHub = await this.gitHubProjectRepo.findOneByName(
            project,
        );

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
