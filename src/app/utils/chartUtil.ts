import { IItem } from '../model/GitProjectModel';
import { ILineChart } from '../model/LineChart';

const alongTime = async (data: Array<IItem>): Promise<Array<ILineChart>> => {
    const items = data.reverse();
    const lineCharts: Array<ILineChart> = [];
    let yearAux = 0;
    let countIssuesAux = 0;

    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < items.length; i++) {
        const item = items[i];
        if (yearAux === 0) {
            yearAux = item.year;
        } else if (yearAux !== item.year) {
            lineCharts.push({ x: yearAux, y: countIssuesAux });
            yearAux = item.year;
        } else {
            countIssuesAux += 1;
        }
    }
    return lineCharts;
};

const dayOverDay = (data: IItem): Array<ILineChart> => { };

export { alongTime, dayOverDay };
