import { IPokeItem, IURL } from "../types";

export const convertToCSV = (data: IPokeItem[]): string => {
  if (!data.length) {
    return '';
  }
  const dataToCSV = [...data];
  const refinedData = []
  const titleKeys = Object.keys(dataToCSV[0]);
  titleKeys.unshift('sequence'); 
  refinedData.push(titleKeys);
  dataToCSV.forEach(item => {
    refinedData.push([item.url.slice(item.url.indexOf('pokemon') + 8, -1), ...Object.values(item)])  
  })

  return refinedData.reduce((acc, cur) => {return acc + cur.join(', ') + '\n'}, '');
};

export function collectURL(obj: IURL) {
  const queryToChange = {...obj.query}
  let queryStr = '?' + Object.entries(queryToChange).map(val => val.join('=')).join('&')
  return `${obj.pathname}/${queryStr}`
}

