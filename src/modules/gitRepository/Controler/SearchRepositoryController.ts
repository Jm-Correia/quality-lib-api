import { Request, Response } from 'express';
import AppError from '../../error/AppError';
import Gateway from '../infra/gateway/gateway';

class SearchRepositoryController {
    async index(request: Request, response: Response): Promise<Response> {
        const { project } = request.body;
        if (!project) throw new AppError('Project name is required', 422);
        const gateway = new Gateway();
        const gitHubFullName = await gateway.listFullProjectName(project);
        await gateway.getItemsIssuesClose(gitHubFullName);
        return response.json(gitHubFullName);
    }
}

export default new SearchRepositoryController();
