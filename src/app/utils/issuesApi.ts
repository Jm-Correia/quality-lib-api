import 'dotenv/config';
import api from '../lib/Api';

const fetchIssues = async (page: number, name: string) => {
    api.defaults.headers.authorization = `token ${process.env.TOKEN}`;
    const issues = await api.get(
        `/repos/${name}/issues?state=open&page=${page}&per_page=100`,
    );
    return issues;
};

export default async (pages: number, fullName: string): Promise<Array<any>> => {
    const requests = [];
    // eslint-disable-next-line no-plusplus
    for (let i = 1; i <= pages; i++) {
        requests.push(fetchIssues(i, fullName));
    }
    return Promise.all(requests);
};
