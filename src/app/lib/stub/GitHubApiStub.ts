import IGitHubApi from '../interface/IGitHubApi';

import projectMock from './mocks/git-project-mock.json';
import issueMock from './mocks/issue-project-mock.json';

class GitHubApiStub implements IGitHubApi {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async searchProject(projectName: string): Promise<any> {
        const responseStubProjectName = projectMock;
        return responseStubProjectName;
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async fetchIssues(pages: number, name: string): Promise<any> {
        const responseSubIssues = issueMock;
        return responseSubIssues;
    }
}

export default new GitHubApiStub();
