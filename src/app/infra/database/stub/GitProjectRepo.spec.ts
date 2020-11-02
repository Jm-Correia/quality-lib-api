import { v4 as uuidv4 } from 'uuid';
import { IGitHubProject } from '../../../model/GitProjectModel';
import IGitHubProjectRepo from '../interface/IGitHubProjectRepo';

export default class GitProjectRepo implements IGitHubProjectRepo {
    private projects: IGitHubProject[] = [];

    async create(data: IGitHubProject): Promise<void> {
        const {
            fullName,
            openIssues,
            averageDays,
            standardDeviation,
            items,
        } = data;
        // eslint-disable-next-line no-underscore-dangle
        const _id = uuidv4();
        const name = data.name.toLowerCase();
        this.projects.push({
            _id,
            name,
            fullName,
            openIssues,
            averageDays,
            standardDeviation,
            items,
        });
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async update(data: IGitHubProject): Promise<void> {
        throw new Error('Method not implemented');
    }

    async findOneByName(projectName: string): Promise<IGitHubProject | null> {
        const gitProject = this.projects.find(
            project => project.name === projectName,
        );
        if (gitProject) {
            const {
                name,
                fullName,
                openIssues,
                averageDays,
                standardDeviation,
                items,
            }: any = gitProject;
            return {
                name,
                fullName,
                openIssues,
                averageDays,
                standardDeviation,
                items,
            };
        }
        return null;
    }
}
