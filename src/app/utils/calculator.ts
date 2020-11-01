import {
    getYear,
    getMonth,
    getDay,
    parseISO,
    differenceInDays,
} from 'date-fns';
import { IGitHubProject, IItem } from '../model/GitProjectModel';

const differenceDaysOpen = (data: any): Array<IItem> => {
    const items: IItem[] = [];

    // eslint-disable-next-line no-plusplus
    for (let index = 0; index < data.length; index++) {
        const element = data[index];
        // eslint-disable-next-line no-unused-expressions
        element.data.map((value: any) => {
            const createIssueDate = parseISO(value.created_at);
            const differenceDays = differenceInDays(
                new Date(),
                parseISO(value.created_at),
            );

            items.push({
                differenceDays,
                created_at: new Date(
                    getYear(createIssueDate),
                    getMonth(createIssueDate),
                    getDay(createIssueDate),
                ),
                year: getYear(createIssueDate),
                month: getMonth(createIssueDate) + 1,
                issueId: value.id,
            });
        });
    }
    return items;
};

const AverageDaysOpen = ({ items, openIssues }: IGitHubProject): number => {
    const avgDays =
        items?.reduce((accumulator, current) => {
            return accumulator + current.differenceDays;
        }, 0) || 0;

    return avgDays / openIssues;
};

const standardDeviationDaysOpen = ({
    items,
    openIssues,
    averageDays,
}: IGitHubProject): number => {
    let avg = 0;
    if (averageDays) {
        avg = averageDays;
    }
    const stdAux = items?.reduce((accumulator, current) => {
        // eslint-disable-next-line no-param-reassign
        accumulator = (current.differenceDays - avg) ** 2;
        return accumulator;
    }, 0);

    let stdDays = 0;

    if (stdAux) {
        stdDays = Math.sqrt(stdAux / openIssues);
    }
    return stdDays;
};

export { differenceDaysOpen, AverageDaysOpen, standardDeviationDaysOpen };
