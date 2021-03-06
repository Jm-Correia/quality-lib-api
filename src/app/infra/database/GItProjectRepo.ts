import { IGitHubProject } from '../../model/GitProjectModel';
import GitProjectSchema from '../../schemas/GitProject';
import IGitHubProjectRepo from './interface/IGitHubProjectRepo';

export default class GitProjectRepo implements IGitHubProjectRepo {
    async create(data: IGitHubProject): Promise<void> {
        const {
            fullName,
            openIssues,
            averageDays,
            standardDeviation,
            items,
        } = data;
        const name = data.name.toLowerCase();
        await GitProjectSchema.create<Promise<IGitHubProject>>({
            name,
            fullName,
            openIssues,
            averageDays,
            standardDeviation,
            items,
        });
    }

    async update(data: IGitHubProject): Promise<void> {
        const {
            _id,
            name,
            fullName,
            openIssues,
            averageDays,
            standardDeviation,
            items,
        } = data;
        const gitProjectUpdate: IGitHubProject = {
            name,
            fullName,
            openIssues,
            averageDays,
            standardDeviation,
            items,
        };
        await GitProjectSchema.findByIdAndUpdate(_id, gitProjectUpdate, {
            new: true,
        });
    }

    async findOneByName(projectName: string): Promise<IGitHubProject | null> {
        const gitProject = await GitProjectSchema.findOne({
            name: projectName,
        });
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
