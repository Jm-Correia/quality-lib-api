import { IGitHubProject } from '../../model/GitProjectModel';
import GitProjectSchema from '../../schemas/GitProject';

const create = async ({
    name,
    fullName,
    openIssues,
    averageDays,
    standardDeviation,
    items,
}: IGitHubProject): Promise<void> => {
    await GitProjectSchema.create({
        name,
        fullName,
        openIssues,
        averageDays,
        standardDeviation,
        items,
    });
};

const update = async ({
    _id,
    name,
    fullName,
    openIssues,
    averageDays,
    standardDeviation,
    items,
}: IGitHubProject): Promise<void> => {
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
};

export { create, update };
