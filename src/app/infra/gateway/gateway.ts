import 'dotenv/config';
import { AxiosResponse } from 'axios';
import { IGitHubProject, STATUS, IItem } from '../../model/repository';
import api from '../../services/api';
import AppError from '../../error/AppError';

export default class Gateway {
    private response: AxiosResponse;

    constructor() {
        api.defaults.headers.authorization = `token ${process.env.TOKEN}`;
    }

    // ?q=repo:vuejs/vue+type:issue+state:closed
    async listFullProjectName(projectName: string): Promise<IGitHubProject> {
        try {
            this.response = await api.get('/search/repositories', {
                params: { q: `${projectName}` },
            });
        } catch (err) {
            if (err.response) {
                throw new AppError(
                    err.response.data.message,
                    err.response.status,
                );
            }
            throw new Error('Connect Api gitHub Erro');
        }

        if (!this.response.data)
            throw new AppError('GitHub project does not found');
        const { full_name, open_issues } = this.response.data.items[0];
        return {
            fullName: full_name,
            openIssues: open_issues,
        };
    }

    async getItemsIssuesClose({
        fullName,
        openIssues,
    }: IGitHubProject): Promise<void> {
        try {
            const pages = Math.ceil(openIssues / 100);
            console.log(pages);
            const vetor = await Promise.all([
                api.get(`/repos/${fullName}/issues`, {
                    params: {
                        state: 'open',
                        page: 1,
                        per_page: 100,
                    },
                }),
                api.get(`/repos/${fullName}/issues`, {
                    params: {
                        state: 'open',
                        page: 2,
                        per_page: 100,
                    },
                }),
                api.get(`/repos/${fullName}/issues`, {
                    params: {
                        state: 'open',
                        page: 3,
                        per_page: 100,
                    },
                }),
                api.get(`/repos/${fullName}/issues`, {
                    params: {
                        state: 'open',
                        page: 4,
                        per_page: 100,
                    },
                }),
                api.get(`/repos/${fullName}/issues`, {
                    params: {
                        state: 'open',
                        page: 5,
                        per_page: 100,
                    },
                }),
                api.get(`/repos/${fullName}/issues`, {
                    params: {
                        state: 'open',
                        page: 6,
                        per_page: 100,
                    },
                }),
            ]);

            vetor.forEach(dados => {
                console.log(dados.data.length);
            });
        } catch (err) {
            throw new Error(err);
        }

        const [, name] = fullName.split('/');
        if (!this.response.data)
            throw new AppError(
                `GitHub project: ${name} does not have issues closed`,
            );
        const items = this.response.data as Array<IItem>;
    }
}
