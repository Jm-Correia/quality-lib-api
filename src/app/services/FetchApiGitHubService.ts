import IGitHubProjectRepo from '@infra/database/interface/IGitHubProjectRepo';
import IGatewayApiGitHub from '@infra/gateway/Interface/IGateway';
import { IGitHubProject } from '../model/GitProjectModel';

export default class FetchApiGitHubService {
    private gitProjectRepo: IGitHubProjectRepo;

    private gatewayApi: IGatewayApiGitHub;

    constructor(
        gitProjectRepo: IGitHubProjectRepo,
        gateway: IGatewayApiGitHub,
    ) {
        this.gitProjectRepo = gitProjectRepo;
        this.gatewayApi = gateway;
    }

    async execute(project: string): Promise<IGitHubProject> {
        const isGitHubProjectRepo = await this.gitProjectRepo.findOneByName(
            project,
        );

        if (isGitHubProjectRepo) return isGitHubProjectRepo;

        const gitHubInfo = await this.gatewayApi.fetchProjectIssues(
            await this.gatewayApi.fetchProjectGitHub(project),
        );

        this.gitProjectRepo.create(gitHubInfo);

        return gitHubInfo;
    }
}
