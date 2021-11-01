import { capitalize } from "_libs/_helpers";

const trfn = {
    format,
    plural,
}
export default trfn;


export function format (value, format, lng) { 
    if (format === 'capitalize') return capitalize(value)
    if (format === 'month') return `${value} months`
    return value; }

export function plural(value, format, lng) {
    if (format === 'capitalize') return capitalize(value)
    if (format === 'month') return `${value} months`
    return value;
}