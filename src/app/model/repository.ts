export interface IItem {
    created_at: Date;
    closed_at: Date;
}

export interface IGitHubProject {
    fullName: string;
    openIssues: number;
    avgAge?: number;
    stdAge?: number;
    items?: Array<IItem>;
}

// eslint-disable-next-line no-shadow
export enum STATUS {
    open = 'open',
    closed = 'closed',
    create = 'create',
}
