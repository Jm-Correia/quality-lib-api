import 'dotenv/config';
import { IGitHubProject } from '../../model/repository';
import api from '../../lib/api';
import AppError from '../../error/AppError';
import fetchIssues from '../../utils/issuesApi';
import {
    differenceDaysOpen,
    AverageDaysOpen,
    standardDeviationDaysOpen,
} from '../../utils/calculator';

const fetchProjectGitHub = async (
    projectName: string,
): Promise<IGitHubProject> => {
    try {
        const response = await api.get('/search/repositories', {
            params: { q: `${projectName}` },
        });
        if (!response.data) throw new AppError('GitHub project does not found');
        const { full_name, open_issues } = response.data.items[0];
        return {
            fullName: full_name,
            openIssues: open_issues,
        };
    } catch (err) {
        if (err.response) {
            throw new AppError(err.response.data.message, err.response.status);
        }
        throw new Error('Connect Api gitHub Erro');
    }
};

const fetchProjectIssues = async ({
    fullName,
    openIssues,
}: IGitHubProject): Promise<IGitHubProject> => {
    try {
        const pages = Math.ceil(openIssues / 100);

        const items = differenceDaysOpen(await fetchIssues(pages, fullName));
        const averageDays = AverageDaysOpen({
            fullName,
            openIssues,
            items,
        });
        const standardDeviation = standardDeviationDaysOpen({
            fullName,
            openIssues,
            averageDays,
            items,
        });
        return {
            fullName,
            openIssues,
            averageDays,
            standardDeviation,
            items,
        };
    } catch (err) {
        throw new Error(err);
    }
};

export { fetchProjectGitHub, fetchProjectIssues };
