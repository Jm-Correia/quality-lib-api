import { Request, Response } from 'express';
import GitProjectRepo from '@infra/database/GItProjectRepo';
import Gateway from '@infra/gateway/gateway';
import AppError from '../error/AppError';
import FetchApiGitHubService from '../services/FetchApiGitHubService';
import GitHubApi from '../lib/GitHubApi';

class SearchRepositoryController {
    async index(request: Request, response: Response): Promise<Response> {
        const { project } = request.body;
        if (!project) throw new AppError('Project name is required', 422);

        const gitHubInfo = await new FetchApiGitHubService(
            new GitProjectRepo(),
            new Gateway(new GitHubApi()),
        ).execute(project);

        return response.json(gitHubInfo);
    }
}

export default new SearchRepositoryController();
