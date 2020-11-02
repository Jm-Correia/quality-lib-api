export default interface IGitHubApi {
    searchProject(projectName: string): Promise<any>;
    fetchIssues(pages: number, name: string): Promise<Array<any>>;
}
