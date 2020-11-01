import { Request, Response } from 'express';
import { fetchProjectGitHub, fetchProjectIssues } from '@infra/gateway/gateway';
import { IGitHubProject } from 'app/model/repository';
import AppError from '../error/AppError';

class SearchRepositoryController {
    async index(request: Request, response: Response): Promise<Response> {
        const { project } = request.body;
        if (!project) throw new AppError('Project name is required', 422);
        const gitHubInfo: IGitHubProject = await fetchProjectIssues(
            await fetchProjectGitHub(project),
        );
        return response.json(gitHubInfo);
    }
}

export default new SearchRepositoryController();
