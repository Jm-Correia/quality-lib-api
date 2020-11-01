import { Request, Response } from 'express';
import AppError from '../error/AppError';
import FetchApiGitHubService from '../services/FetchApiGitHubService';

class SearchRepositoryController {
    async index(request: Request, response: Response): Promise<Response> {
        const { project } = request.body;
        if (!project) throw new AppError('Project name is required', 422);

        const gitHubInfo = await new FetchApiGitHubService().execute(project);

        return response.json(gitHubInfo);
    }
}

export default new SearchRepositoryController();
