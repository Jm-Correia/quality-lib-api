import { IGitHubProject } from '../../../model/GitProjectModel';

export default interface IGatewayApiGitHub {
    fetchProjectGitHub(projectName: string): Promise<IGitHubProject>;
    fetchProjectIssues(data: IGitHubProject): Promise<IGitHubProject>;
}
