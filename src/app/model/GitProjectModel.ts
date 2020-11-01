export interface IItem {
    differenceDays: number;
    created_at: Date;
    year: number;
    month: number;
    issueId: number;
}

export interface IGitHubProject {
    _id?: string;
    name: string;
    fullName: string;
    openIssues: number;
    averageDays?: number | 0;
    standardDeviation?: number | 0;
    items?: Array<IItem>;
}
