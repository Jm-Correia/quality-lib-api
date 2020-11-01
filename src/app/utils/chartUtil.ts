/* eslint-disable no-restricted-syntax */
import { parseISO } from 'date-fns';
import { IItem } from '../model/GitProjectModel';
import { ILineChart } from '../model/LineChart';
import Util from './Utils.js';

const alongTime = async (data: Array<IItem>): Promise<Array<ILineChart>> => {
    const items = data.reverse();
    const lineCharts: Array<ILineChart> = [];
    const agrupados = Util(items, 'year');
    // eslint-disable-next-line no-restricted-syntax
    // eslint-disable-next-line guard-for-in
    for (const year in agrupados) {
        // eslint-disable-next-line no-console
        // console.log(year, agrupados[year].length);
        lineCharts.push({ year, issues: agrupados[year].length });
    }

    return lineCharts;
};

const dayOverDay = async (
    data: Array<IItem>,
    dateStart,
    dateEnd,
): Promise<Array<ILineChart>> => {
    const lineCharts: Array<ILineChart> = [];
    const dtStart = parseISO(dateStart);
    const dtEnd = parseISO(dateEnd);
    const filterBetweenDates = value => {
        return value.created_at >= dtStart && value.created_at <= dtEnd;
    };
    const items = data.filter(filterBetweenDates).reverse();

    const reduzidos = Util(items, 'created_at');
    // eslint-disable-next-line guard-for-in
    for (const date in reduzidos) {
        // eslint-disable-next-line no-console
        // console.log(year, agrupados[year].length);
        lineCharts.push({ year: date, issues: reduzidos[date].length });
    }
    return lineCharts;
};

export { alongTime, dayOverDay };
