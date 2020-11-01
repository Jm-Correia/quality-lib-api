export interface IItem {
    differenceDays: number;
}

export interface IGitHubProject {
    fullName: string;
    openIssues: number;
    averageDays?: number | 0;
    standardDeviation?: number | 0;
    items?: Array<IItem>;
}
