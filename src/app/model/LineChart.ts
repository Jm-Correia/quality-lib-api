/**
 * [x,y]
 * First Chart (Along Time):
 *  - y: Count Issues
 *  - x: Year
 * Second Chart (Day over Day):
 *  - y: Count Issues by day
 *  - x: Date (year-month-day)
 */

export interface ILineChart {
    year: string;
    issues: number;
}
