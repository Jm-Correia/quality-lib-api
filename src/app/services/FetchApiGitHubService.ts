import { fetchProjectGitHub, fetchProjectIssues } from '@infra/gateway/gateway';
import { IGitHubProject } from '../model/GitProjectModel';
import FindGitProjectService from './FindGitProjectService';
import SaveGitHubProjectService from './SaveGitHubProjectService';
import GitProjectSchema from '../schemas/GitProject';

export default class FetchApiGitHubService {
    private readonly findGitProjectService;

    private readonly saveGitHubProjectService;

    constructor() {
        this.findGitProjectService = new FindGitProjectService();
        this.saveGitHubProjectService = new SaveGitHubProjectService();
    }

    async execute(project: string): Promise<IGitHubProject> {
        const gitProject = await GitProjectSchema.findOne({
            name: project,
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

        const gitHubInfo: IGitHubProject = await fetchProjectIssues(
            await fetchProjectGitHub(project),
        );

        this.saveGitHubProjectService.execute(gitHubInfo);

        return gitHubInfo;
    }
}
