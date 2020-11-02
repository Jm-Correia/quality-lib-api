import IGitHubApi from './interface/IGitHubApi';
import api from './Api';

export default class GitHubApi implements IGitHubApi {
    async searchProject(projectName: string): Promise<any> {
        const response = await api.get('/search/repositories', {
            params: { q: `${projectName}` },
        });

        return response;
    }

    async fetchIssues(pages: number, name: string): Promise<any[]> {
        const requests = [];

        const fetchIssues = async (page: number, fullname: string) => {
            api.defaults.headers.authorization = `token ${process.env.TOKEN}`;
            const issues = await api.get(
                `/repos/${fullname}/issues?state=open&page=${page}&per_page=100`,
            );
            return issues;
        };
        // eslint-disable-next-line no-plusplus
        for (let i = 1; i <= pages; i++) {
            requests.push(fetchIssues(i, name));
        }
        return Promise.all(requests);
    }
}
