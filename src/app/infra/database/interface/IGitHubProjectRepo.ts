// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { IGitHubProject } from '../../../model/GitProjectModel';

export default interface IGitHubProjectRepo {
    create(data: IGitHubProject): Promise<void>;
    update(data: IGitHubProject): Promise<void>;
    findOneByName(projectName: string): Promise<IGitHubProject | null>;
}
