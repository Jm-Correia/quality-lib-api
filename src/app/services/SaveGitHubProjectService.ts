import { create } from '@infra/database/GItProjectRepo';
import { IGitHubProject } from '../model/GitProjectModel';

export default class SaveGitHubProjectService {
    async execute(data: IGitHubProject): Promise<void> {
        await create(data);
    }
}
