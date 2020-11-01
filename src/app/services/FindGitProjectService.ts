import { findOne } from '@infra/database/GItProjectRepo';
import { IGitHubProject } from '../model/GitProjectModel';

export default class FindGitProjectService {
    async execute(project: string): Promise<IGitHubProject | null> {
        return findOne(project);
    }
}
