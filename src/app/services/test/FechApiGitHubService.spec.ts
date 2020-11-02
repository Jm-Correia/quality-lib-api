import Gateway from '@infra/gateway/gateway';
import FetchApiGitHubService from '../FetchApiGitHubService';
import api from '../../lib/stub/GitHubApiStub';
import { IGitHubProject } from '../../model/GitProjectModel';

import repo from '../../infra/database/stub/GitProjectRepoStub';

describe('Search project gitApi', () => {
    it("should be able to find 'vue' project", async () => {
        const vue: IGitHubProject = {
            name: 'vue',
            fullName: 'vuejs/vue',
            openIssues: 532,
        };

        const gitProject = await new FetchApiGitHubService(
            repo,
            new Gateway(api),
        ).execute('vue');

        const gitProjectName = await repo.findOneByName('vue');

        expect(gitProject.fullName).toBe(vue.fullName);
        expect(gitProject.openIssues).toBe(vue.openIssues);
        expect(gitProject.items?.length).toBe(100);
        expect(gitProject?.items?.length).toBe(gitProjectName?.items?.length);
    });

    it("should be able to find 'vue' project in dataBase", async () => {
        await new FetchApiGitHubService(repo, new Gateway(api)).execute('vue');

        const gitProjectSecond = await new FetchApiGitHubService(
            repo,
            new Gateway(api),
        ).execute('vue');

        expect(gitProjectSecond.name).toBe('vue');
    });
});
