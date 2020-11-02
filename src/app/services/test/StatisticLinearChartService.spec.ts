import Gateway from '@infra/gateway/gateway';
import api from '../../lib/stub/GitHubApiStub';
import { ILineChart } from '../../model/LineChart';
import StatisticLinearChartService from '../StatisticLinearChartService';
import FetchApiGitHubService from '../FetchApiGitHubService';
import repo from '../../infra/database/stub/GitProjectRepoStub';
import AppError from '../../error/AppError';

describe('LineChart Information ', () => {
    it("should be able to throw AppError 404 ' vue not found' ", async () => {
        expect(
            new StatisticLinearChartService(repo).execute({
                project: 'vue',
                dateStart: '2020-09-01',
                dateEnd: '2020-10-31',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });
    it('should be able to return dates for create chart along time', async () => {
        await new FetchApiGitHubService(repo, new Gateway(api)).execute('vue');
        const lineChart: ILineChart[] = await new StatisticLinearChartService(
            repo,
        ).execute({
            project: 'vue',
        });

        expect(lineChart.length).toBe(1);
    });
    it('should be able to return dates for create chart day over Day', async () => {
        await new FetchApiGitHubService(repo, new Gateway(api)).execute('vue');
        const lineChart: ILineChart[] = await new StatisticLinearChartService(
            repo,
        ).execute({
            project: 'vue',
            dateStart: '2020-09-01',
            dateEnd: '2020-10-31',
        });

        expect(lineChart.length).toBe(9);
    });
});
