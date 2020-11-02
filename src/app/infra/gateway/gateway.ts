import 'dotenv/config';
import { IGitHubProject } from '../../model/GitProjectModel';
import AppError from '../../error/AppError';
import {
    differenceDaysOpen,
    AverageDaysOpen,
    standardDeviationDaysOpen,
} from '../../utils/calculator';
import IGatewayApiGitHub from './Interface/IGateway';
import IGitHubApi from '../../lib/interface/IGitHubApi';

export default class Gateway implements IGatewayApiGitHub {
    private gitHubApi: IGitHubApi;

    constructor(gitHubApi: IGitHubApi) {
        this.gitHubApi = gitHubApi;
    }

    async fetchProjectGitHub(projectName: string): Promise<IGitHubProject> {
        try {
            const response = await this.gitHubApi.searchProject(projectName);
            if (!response.data)
                throw new AppError('GitHub project does not found');
            const { name, full_name, open_issues } = response.data.items[0];
            return {
                name,
                fullName: full_name,
                openIssues: open_issues,
            };
        } catch (err) {
            if (err.response) {
                throw new AppError(
                    err.response.data.message,
                    err.response.status,
                );
            }
            console.log(err);
            throw new AppError('Error connect Github Api.', 404);
        }
    }

    async fetchProjectIssues(data: IGitHubProject): Promise<IGitHubProject> {
        const { name, fullName, openIssues } = data;
        try {
            const pages = Math.ceil(openIssues / 100);

            const items = differenceDaysOpen(
                await this.gitHubApi.fetchIssues(pages, fullName),
            );
            const averageDays = AverageDaysOpen({
                name,
                fullName,
                openIssues,
                items,
            });
            const standardDeviation = standardDeviationDaysOpen({
                name,
                fullName,
                openIssues,
                averageDays,
                items,
            });
            return {
                name,
                fullName,
                openIssues,
                averageDays,
                standardDeviation,
                items,
            };
        } catch (err) {
            throw new Error(err);
        }
    }
}
